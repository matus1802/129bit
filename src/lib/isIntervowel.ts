export default function isIntervowel(value: string) {
  return /[aeiouy].*X.*[aeiouy]/i.test(value);
}
