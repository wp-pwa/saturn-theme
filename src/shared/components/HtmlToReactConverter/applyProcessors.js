export default (() => {
  let currentPayload;

  const applyProcessor = (processed, { test, process }) => {
    try {
      return test(processed, currentPayload)
        ? process(processed, currentPayload)
        : processed;
    } catch (e) {
      return processed;
    }
  };

  return function applyProcessors(element, processors, payload) {
    currentPayload = payload;
    return processors.reduce(applyProcessor, element);
  };
})();
