import { inject } from 'mobx-react';
import { computed } from 'mobx';
import { isMatch } from 'lodash';
import styled from 'styled-components';

const NavbarSlotPlaceholder = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  background: ${({ theme, bar }) =>
    bar === 'media' ? '#0e0e0e' : theme.colors.background};
`;

export default inject(({ stores: { settings } }, { item }) => ({
  height: computed(() => {
    const { slots, ...others } = settings.theme;

    const allFills = Object.values(others).reduce((all, { fills }) => {
      if (fills && fills.length) {
        all.concat(fills);
      }
      return all;
    }, []);

    // debugger;
    if (!allFills.length || !slots || !slots.length) return '0px';

    const aboveNavbarSlot = slots.find(
      slot =>
        slot.position === 'before navbar' &&
        slot.rules &&
        slot.rules.item &&
        slot.rules.item.some(i => isMatch(item, i)),
    );

    if (!aboveNavbarSlot) return '0px';

    return `calc(${aboveNavbarSlot.names
      .map(name => {
        const fill = allFills.find(f => f.name === name);
        const height = (fill && fill.height) || 0;
        return typeof height === 'number' ? `${height}px` : height;
      })
      .join(' + ')})`;
  }).get(),
}))(NavbarSlotPlaceholder);
