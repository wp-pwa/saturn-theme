import { flow } from 'mobx-state-tree';

export default self =>
  flow(function* ServerSaturn() {
    // Set the theme language.
    self.theme.lang.setLang(self.settings.theme.lang);
  });
