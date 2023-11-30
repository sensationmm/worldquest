const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateEditInput = require('../../validation/edit');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

// Load User model
const User = require('../../models/User');

// @route   GET api/accounts/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users works',
  }),
);

// @route   GET api/accounts/register
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
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm', // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
        clue_tokens: 5,
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

// @route   GET api/accounts/login
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
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name, email, avatar } = req.body;

    const { errors, isValid } = validateEditInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json({ msg: errors });
    }

    User.findOneAndUpdate({ email: req.user.email }, { $set: { name: name, email: email, avatar: avatar } }, { new: true })
      .then((data) => res.json({ success: true, msg: 'User updated', user: { name: data.name, email: data.email, avatar: data.avatar } }))
      .catch(() => res.status(400).json({ msg: 'User not found' }));
  },
  (error) => {
    res.status(400).json({ msg: error });
  },
);

module.exports = router;
