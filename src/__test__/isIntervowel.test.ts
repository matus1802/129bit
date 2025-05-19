import isIntervowel from '../lib/isIntervowel';

test('isIntervowel', () => {
  expect(isIntervowel('XabcdeX')).toBe(false);
  expect(isIntervowel('dbaXdcaX')).toBe(true);
  expect(isIntervowel('decXdcaX')).toBe(true);
  expect(isIntervowel('abXcd')).toBe(false);
  expect(isIntervowel('bXd')).toBe(false);
  expect(isIntervowel('aXd')).toBe(false);
  expect(isIntervowel('aaXd')).toBe(false);
  expect(isIntervowel('aaXda')).toBe(true);
});
