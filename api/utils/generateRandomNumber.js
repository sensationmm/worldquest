module.exports = function generateRandomNumber(max, minLength = 1, startZero = false) {
  let randomNumber = Math.floor(Math.random() * max);

  if (!startZero) {
    randomNumber = randomNumber + 1;
  }

  if (randomNumber.toString().length < minLength) {
    randomNumber = parseInt(String(randomNumber).padEnd(4, '0'));
  }

  return randomNumber;
};
