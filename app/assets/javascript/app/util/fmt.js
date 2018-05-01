export default function fmt(template, ...inserts) {
  return inserts.reduce((value, insert) => value.replace('{}', insert), template);
}
