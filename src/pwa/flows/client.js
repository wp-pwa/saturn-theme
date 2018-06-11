import { flow } from 'mobx-state-tree';

export default self =>
  flow(function* SaturnClientFlow() {
    // Request next pages.
    yield self.theme.requestFirstExtracted();

    while (true) {
      yield self.theme.requestNextPageInSingle();
    }
  });
