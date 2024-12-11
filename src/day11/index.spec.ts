import { removeLeadingZeros } from '.';

it('removesTrailingZeros', () => {
  expect(removeLeadingZeros('1234')).toEqual('1234');
  expect(removeLeadingZeros('12340')).toEqual('12340');
  expect(removeLeadingZeros('20')).toEqual('20');
  expect(removeLeadingZeros('000')).toEqual('0');
});
