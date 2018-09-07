/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import Image from '../../../shared/components/Image';
import ShareButton from './ListItemShareButton';
import Link from '../Link';

const ListItemFirst = ({
  type,
  id,
  title,
  media,
  item,
  context,
  listShareButtonDisplay,
}) => (
  <Post>
    <Link
      type={item.type}
      id={item.id}
      page={item.page}
      context={context}
      eventCategory="List"
      eventAction="open single"
    >
      <A>
        <Image
          lazy
          offsetHorizontal={-50}
          id={media}
          width="100%"
          height="100%"
        />
        <Info>
          <Title dangerouslySetInnerHTML={{ __html: title }} />
        </Info>
      </A>
    </Link>
    {listShareButtonDisplay ? (
      <ShareButton id={id} type={type} itemType="first" />
    ) : null}
  </Post>
);

ListItemFirst.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.number,
  item: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  listShareButtonDisplay: PropTypes.bool,
};

ListItemFirst.defaultProps = {
  media: null,
  listShareButtonDisplay: true,
};

export default inject(({ stores: { settings } }) => {
  const listShareButton = settings.theme.listShareButton || {};

  return {
    listShareButtonDisplay: listShareButton.display,
  };
})(ListItemFirst);

const Post = styled.div`
  box-sizing: border-box;
  height: 250px;
  position: relative;
`;

const A = styled.a`
  all: inherit;
  box-shadow: none;
  margin: 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 20%;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
  background-color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.h2`
  box-sizing: border-box;
  margin: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8rem;
`;
