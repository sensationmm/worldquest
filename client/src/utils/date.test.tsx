import { formatDate } from './date';

describe('format()', () => {
  it('example 1', () => {
    const object = formatDate(new Date('2020-11-06T02:01:58.594Z'));
    expect(object).toEqual('5th Nov 2020 06:01 PM');
  });

  it('example 2', () => {
    const object = formatDate(new Date('2020-06-16T16:04:14.085Z'));
    expect(object).toEqual('16th Jun 2020 09:04 AM');
  });
});
