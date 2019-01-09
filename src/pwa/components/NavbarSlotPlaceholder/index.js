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

    // Get fills from 'theme' settings
    // CAUTION - this must change in the future
    //         - keep in mind these settings will be in
    //         - other packages
    const allFills = Object.values(others)
      .map(({ fills }) => (fills instanceof Array ? fills : []))
      .reduce((all, fills) => all.concat(fills));

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
