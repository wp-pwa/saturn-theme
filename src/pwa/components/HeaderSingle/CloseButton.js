import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

const CloseButton = ({ selected, context, Link }) => (
  <Link selected={selected} context={context}>
    <a>
      <Container>
        <IconClose size={33} />
      </Container>
    </a>
  </Link>
);

CloseButton.propTypes = {
  selected: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(
  inject(({ connection }, { menuItems }) => {
    const { listType, listId } = connection.selected.fromList || {
      listType: 'latest',
      listId: 'post',
    };
    const menuList = menuItems.filter(({ type }) => type !== 'link').map(list => {
      const id = list.type === 'latest' ? 'post' : parseInt(list[list.type], 10);

      if (['page'].includes(list.type)) {
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
      selected: { listType, listId },
      context: {
        items: menuList,
        infinite: false,
        options: {
          bar: 'list',
          recipient: 'primary',
        },
      },
    };
  })(CloseButton),
);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  color: ${({ theme }) => theme.color};
`;
