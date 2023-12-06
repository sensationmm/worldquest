const generateRandomNumber = (max: number, startZero = false) => {
  const randomNumber = Math.floor(Math.random() * max);
  return startZero ? randomNumber : randomNumber + 1;
};

export default generateRandomNumber;
