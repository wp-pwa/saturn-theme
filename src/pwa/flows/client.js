import { flow, addMiddleware } from 'mobx-state-tree';
import { requestNextColumnEntities } from './requests';
import { syncActionEnds } from './actionEnds';

export default self =>
  flow(function* SaturnClientFlow() {
    const { connection } = self;

    addMiddleware(
      connection,
      syncActionEnds('routeChangeSucceed', () => requestNextColumnEntities(connection)),
    );

    // Handles intial requests in List view.
    requestNextColumnEntities(connection);

    // Request next pages.
    yield self.theme.requestFirstExtracted();

    while (true) {
      yield self.theme.requestNextPageInSingle();
    }
  });
