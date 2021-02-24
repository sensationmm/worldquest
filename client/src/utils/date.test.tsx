import { dateNoTime, formatDate } from './date';

describe('formatDate()', () => {
  it('example 1', () => {
    const object = formatDate(new Date('2020-11-06T02:01:58.594Z'));
    expect(object).toEqual('5th November 2020');
  });

  it('example 2', () => {
    const object = formatDate(new Date('2020-06-16T16:04:14.085Z'));
    expect(object).toEqual('16th June 2020');
  });
});

describe('dateNoTime()', () => {
  it('example 1', () => {
    const object = dateNoTime(new Date('2020-11-06T17:01:58.594Z'));
    expect(object).toEqual(new Date(2020, 10, 6, 0, 0, 0));
  });
});
