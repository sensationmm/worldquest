import onlyUnique from './onlyUnique';

describe('onlyUnique()', () => {
  it('example 1', () => {
    const initialArray = [false, false, false];
    const finalArray = [false];
    const object = onlyUnique(initialArray);
    expect(object).toEqual(finalArray);
  });

  it('example 2', () => {
    const initialArray = [false, true, false];
    const finalArray = [false, true];
    const object = onlyUnique(initialArray);
    expect(object).toEqual(finalArray);
  });

  it('example 3', () => {
    const initialArray = [false, true, 1];
    const finalArray = [false, true, 1];
    const object = onlyUnique(initialArray);
    expect(object).toEqual(finalArray);
  });

  it('example 4', () => {
    const initialArray = [[undefined, undefined, undefined], false];
    const finalArray = [false];
    const object = onlyUnique(initialArray);
    expect(object).toEqual(finalArray);
  });
});
