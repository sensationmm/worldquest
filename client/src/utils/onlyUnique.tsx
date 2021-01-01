const onlyUnique = (searchArray: Array<any>) => {
  const reducer = (value: any, index: number, self: Array<any>) => {
    return self.indexOf(value) === index;
  };

  return searchArray
    .flat()
    .filter((val) => val !== undefined)
    .filter(reducer);
};

export default onlyUnique;
