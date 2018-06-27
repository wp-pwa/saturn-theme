// Filters out items that have already been requested.
export function filterAlreadyRequested(items, connection) {
  return items.filter(({ type, id, page }) => {
    if (page) {
      const { isReady, isFetching } = connection.list(type, id).page(page);

      return !isReady && !isFetching;
    }

    const { isReady, isFetching } = connection.entity(type, id);
    return !isReady && !isFetching;
  });
}

export function requestNeededLists(connection) {
  if (connection.selectedContext.options.bar === 'list') {
    const { rawColumns } = connection.selectedContext;
    const selectedColumnIndex = connection.selectedColumn.index;
    const previousIndex =
      selectedColumnIndex === 0 ? null : selectedColumnIndex - 1;
    const nextIndex =
      selectedColumnIndex === rawColumns.length - 1
        ? null
        : selectedColumnIndex + 1;
    const neededColumns = [rawColumns[selectedColumnIndex]];

    if (previousIndex !== null) neededColumns.push(rawColumns[previousIndex]);
    if (nextIndex !== null) neededColumns.push(rawColumns[nextIndex]);

    const items = neededColumns.map(column => ({
      type: column.rawItems[0].type,
      id: column.rawItems[0].id,
      page: column.rawItems[0].page,
    }));

    filterAlreadyRequested(items, connection).forEach(item => {
      if (item.page) connection.fetchListPage(item);
      else connection.fetchEntity(item);
    });
  }
}
