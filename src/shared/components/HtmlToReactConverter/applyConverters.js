export default function applyConverters(element, converters, payload) {
  let match;
  try {
    match = converters.find(({ test }) => test(element));
  } catch (e) {
    return element;
  }

  try {
    return match ? match.converter(element, payload) : element;
  } catch (e) {
    console.error(e);
    return element;
  }
}
