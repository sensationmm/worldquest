const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const multer = require('multer');
const upload = multer();
const { uuid } = require('uuidv4');
const datefns = require('date-fns');

// Load input validation
const validateEditInput = require('../../validation/edit');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');
const validatePasswordResetInput = require('../../validation/passwordReset');

// Load models
const Image = require('../../models/Image');
const User = require('../../models/User');
const generateRandomNumber = require('../../utils/generateRandomNumber');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "kevin@sensationmultimedia.co.uk",
    pass: "Guimares319!",
  },
});

// @route   GET api/accounts/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users works',
  }),
);

// @route   POST api/accounts/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ msg: errors });
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        clue_tokens: 5,
        theme: 'brand'
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          newUser.password = hash;

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/accounts/login
// @desc    Login User / returning JWT
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ msg: errors });
  }

  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    // check user exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check correct password
    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          user.last_logged_in = Date.now();
          user.save();

          // Create JWT payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            theme: user.theme
          };

          // Sign token
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({ success: true, token: token, theme: user.theme });
          });
        } else {
          return res.status(400).json({ msg: 'Password incorrect' });
        }
      })
      .catch(() => res.status(400).json({ msg: 'BCrypt failure' }));
  });
});

// @route   GET api/accounts/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
    createdAt: req.user.created_at,
    lastPlayedAt: req.user.last_played_at,
    clueTokens: req.user.clue_tokens,
    theme: req.user.theme
  });
});

// @route   POST api/accounts/requestReset
// @desc    Initiate password reset flow
// @access  Public
router.post('/requestReset', (req, res) => {
  const { errors, isValid } = validatePasswordResetInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ msg: errors });
  }

  const { email } = req.body;

  User.findOne({ email }).then(async (user) => {
    // check user exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const authCode = generateRandomNumber(999999, 6);

    user.resetAuth = authCode;
    user.resetAuthExpiry = datefns.addMinutes(Date.now(), 15);
    await user.save();

    await transporter.sendMail({
      from: '"WorldQuest" <noreply@sensationmultimedia.co.uk>', // sender address
      to: user.email, // list of receivers
      subject: "Password Reset", // Subject line
      text: `Auth Code: ${authCode}`, // plain text body
    }).then(() => {
      res.json({ success: true });
    }).catch((e) => {
      console.log(e)
      res.json({ success: false, msg: 'Email failure' });  
    });
  })
});

// @route   POST api/accounts/authoriseReset
// @desc    Checks authorisation code in password reset flow
// @access  Public
router.post('/authoriseReset', (req, res) => {
  // Validation
  const { errors, isValid } = validatePasswordResetInput(req.body, 'auth');

  // Check validation
  if (!isValid) {
    return res.status(400).json({ msg: errors });
  }

  // Check user exists
  const { email, authCode } = req.body;

  User.findOne({ email }).then(async (user) => {
    // check user exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check auth code exists
    if (!user.resetAuth || user.resetAuth === undefined) {
      return res.status(404).json({ msg: 'Reset Not Initiated' });
    }

    // Check auth code correct
    if (authCode !== user.resetAuth) {
      return res.status(404).json({ msg: 'Authorisation Code Incorrect' });
    }

    // Check auth code not expired
    if (Date.now() > user.resetAuthExpiry) {
      user.resetAuth = undefined;
      user.resetAuthExpiry = undefined;
      return res.status(404).json({ msg: 'Authorisation Code Expired' });
    }

    // Clear reset flow for user
    user.resetAuth = undefined;
    user.resetAuthExpiry = undefined;
    await user.save();

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      theme: user.theme
    };
    
    // Auth token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      return res.json({ success: true, token: token });
    });
  })
})

// @route   POST api/accounts/resetPassword
// @desc    Resets user password
// @access  Private
router.post('/resetPassword', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePasswordResetInput(req.body, 'newPass');

  if (!isValid) {
    return res.status(400).json({ msg: errors });
  }
  
  User.findOne({ email: req.user.email }).then((user) => {
    // check user exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }

        user.password = hash;

        user
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  })
})

// @route   POST api/accounts/played
// @desc    Update last played time
// @access  Private
router.post('/played', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOneAndUpdate({ email: req.user.email }, { $set: { last_played_at: Date.now() } }, { new: true })
      .then(() => res.json({ success: true, msg: 'Last played updated' }))
      .catch(() => res.status(400).json({ msg: 'User not found' }));
  },
  (error) => {
    res.status(400).json({ msg: error });
  },
);

// @route   POST api/accounts/buyClues
// @desc    Purchase clues
// @access  Private
router.post('/buyClues', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { numClues } = req.body;

    if (!numClues) {
      return res.status(400).json({ msg: 'numClues must be provided' });
    }

    User.findOneAndUpdate({ email: req.user.email }, { $set: { clue_tokens: req.user.clue_tokens + parseInt(numClues) } }, { new: true })
      .then(() => res.json({ success: true, msg: 'User clues updated' }))
      .catch(() => res.status(400).json({ msg: 'User not found' }));
  },
  (error) => {
    res.status(400).json({ msg: error });
  },
);

// @route   POST api/accounts/theme
// @desc    Set user defined theme
// @access  Private
router.post('/theme', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { theme } = req.body;

    if (!theme) {
      return res.status(400).json({ msg: 'theme must be provided' });
    }

    User.findOneAndUpdate({ email: req.user.email }, { $set: { theme: theme } }, { new: true })
      .then((data) => res.json({ success: true, msg: 'Theme updated', theme: data.theme }))
      .catch(() => res.status(400).json({ msg: 'User not found' }));
  },
  (error) => {
    res.status(400).json({ msg: error });
  },
);

// @route   POST api/accounts/edit
// @desc    Edit user profile details
// @access  Private
router.post('/edit', [passport.authenticate('jwt', { session: false }), upload.single('image')], async (req, res) => {
    const { name, email, avatar } = req.body;
    const { errors, isValid } = validateEditInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json({ msg: errors });
    }

    User.findOneAndUpdate({ email: req.user.email }, { $set: { name: name, email: email, avatar: avatar || '' } }, { new: true })
      .then((data) => res.json({ success: true, msg: 'User updated', user: { name: data.name, email: data.email, avatar: data.avatar } }))
      .catch(() => res.status(400).json({ msg: 'User not found' }));
  },
  (error) => {
    res.status(400).json({ msg: error });
  },
);

// @route   POST api/accounts/images
// @desc    Upload user avatar
// @access  Private
router.post('/images', upload.single('image'), async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({success: false, message: 'No file provided.'});
    }
    const image = new Image({
      name: `${uuid()}.${req.file.mimetype.split('/')[1]}`,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    try {
      await image.save();
    } catch (error) {
      console.log(error);
      return res.status(400).json({success: false, message: error.message});
    }
    return res.status(201).json({
        success: true,
        message: 'Image created successfully.',
        imageName: image.name,
      });
  },
);

// @route   GET api/accounts/images/<name>
// @desc    Fetches user avatar image
// @access  Private
router.get('/images/:name', async (req, res) => {
  const {name} = req.params;
  const image = await Image.findOne({name: name}).catch(() => res.status(400).json({ success: false, msg: 'Image not found' }));
  if (!image) {
    return res.status(404).json({success: false, message: 'Image not found.'});
  }
  res.set('Content-Type', 'image/jpeg');
  return res.status(200).send(image.data);
});

// @route   DELETE api/accounts/images/<name>
// @desc    Fetches user avatar image
// @access  Private
router.delete('/images/:name', async (req, res) => {
  const {name} = req.params;
  await Image.findOneAndDelete({name: name}).catch(() => res.status(400).json({ success: false, msg: 'Image not found' }));
  return res.status(200).json({
    success: true,
    message: 'Image deleted successfully.',
    imageName: name,
  });
});

module.exports = router;
