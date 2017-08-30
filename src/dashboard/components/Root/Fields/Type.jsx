import React from 'react';
import { findKey } from 'lodash';
import { Field } from 'redux-form';
import * as deps from '../../../deps';

const parsing = {
  latest: 'Latest posts',
  category: 'Category',
  tag: 'Tag',
  page: 'Page',
  link: 'External Link',
};

const Type = ({ name, pages, options }) => (
  <div className="control">
    <Field
      name={name}
      label="Type"
      component={deps.elements.Select}
      size="small"
      options={options.filter(item => item !== 'Page' || pages.length > 0)}
      parse={key => findKey(parsing, item => item === key)}
      format={key => parsing[key]}
    />
  </div>
);
Type.propTypes = {
  name: React.PropTypes.string.isRequired,
  pages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Type;
