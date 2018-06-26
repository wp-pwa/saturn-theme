import { flow, addMiddleware } from 'mobx-state-tree';
import { requestNextColumnEntities } from './requests';
import { syncActionEnds } from './utils';
import progressMiddleware from './progress';
import { scrollMiddleware, initializeScrollListener } from './scroll';

export default self =>
  flow(function* SaturnClientFlow() {
    const { connection } = self;

    // Handles requests on route change.
    addMiddleware(
      connection,
      syncActionEnds('routeChangeSucceed', () =>
        requestNextColumnEntities(connection),
      ),
    );

    // Handles progress bar.
    addMiddleware(connection, progressMiddleware);
    addMiddleware(connection, scrollMiddleware);

    // Logger.
    // addMiddleware(self, (call, next) => {
    //   console.log(call);
    //   next(call);
    // });

    // Handles scroll events.
    initializeScrollListener(self.theme.scroll);

    // Handles intial requests in List view.
    requestNextColumnEntities(connection);

    // Request next pages.
    yield self.theme.requestFirstExtracted();

    while (true) yield self.theme.requestNextPageInSingle();
  });
