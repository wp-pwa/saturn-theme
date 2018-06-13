import { flow, addMiddleware } from 'mobx-state-tree';
import requestsMiddleware from './requests';

export default self =>
  flow(function* SaturnClientFlow() {
    addMiddleware(self.connection, requestsMiddleware);

    // Request next pages.
    yield self.theme.requestFirstExtracted();

    while (true) {
      yield self.theme.requestNextPageInSingle();
    }
  });
