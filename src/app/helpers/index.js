export const handleNavBarScroll = (node, styles) => {
  const listNode = node;

  if (listNode) {
    const activeItem = node.querySelector(`.${styles.navBarItemActive}`);

    if (activeItem) {
      const move = activeItem.getBoundingClientRect().left;
      listNode.scrollLeft += move;
    }
  }
};
