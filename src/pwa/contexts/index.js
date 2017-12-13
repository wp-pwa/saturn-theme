export const home = menu => {
  const items = menu.filter(({ type }) => type !== "link").map(list => {
    const id = list.type === "latest" ? "post" : parseInt(list[list.type], 10);

    if (["page"].includes(list.type)) {
      return {
        singleType: list.type,
        singleId: id,
      };
    }

    return {
      listType: list.type,
      listId: id,
      page: 1,
    };
  });

  return {
    items,
    infinite: false,
    options: {
      bar: "list",
    },
  };
};

export const single = (selected, list = { listType: "latest", listId: "post", extract: true }) => ({
  items: [{ ...selected, fromList: { listType: "latest", listId: "post" } }, list],
  options: {
    bar: "single",
  },
});

export const singleLink = (list = { listType: "latest", listId: "post", extract: true }) => ({
  items: [list],
  options: {
    bar: "single",
  },
});
