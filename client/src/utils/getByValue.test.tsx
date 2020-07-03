import getByValue from './getByValue';

describe('getByValue()', () => {
  let searchArray: object[];

  beforeEach(() => {
    searchArray = [
      {
        keyOne: 'valOne',
        keyTwo: 'valTwo',
      },
      {
        keyOne: 'valThree',
        keyTwo: 'valFour',
      },
    ];
  });

  test('returns object if key/value pair found', () => {
    const searchKey = 'valOne';
    const object = getByValue(searchArray, 'keyOne', searchKey);
    expect(object).toEqual(searchArray[0]);
  });

  test('returns `null` if key/value pair not found', () => {
    const searchKey = 'valFive';
    const object = getByValue(searchArray, 'keyOne', searchKey);
    expect(object).toEqual(undefined);
  });
});
