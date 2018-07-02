export default function*(self) {
  if (selectedItem.page) {
    const { menu } = self.settings.theme;
    const context = home(menu);
    self.connection.routeChangeSucceed({ selectedItem, context });
    yield self.connection.fetchListPage(selectedItem);
  } else {
    const context = single();
    self.connection.routeChangeSucceed({ selectedItem, context });
    yield self.connection.fetchEntity(selectedItem);
  }
}
