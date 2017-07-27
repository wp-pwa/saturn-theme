import React from 'react';
import { Field } from 'redux-form';
import * as deps from '../../../deps';

export const CategorySelector = ({ name, label, categories }) => (
  <Field
    name={name}
    label={label}
    component={deps.elements.Select}
    size="small"
    options={categories.map(category => category.name)}
    values={categories.map(category => category.id)}
  />
);
CategorySelector.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  categories: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export const TagSelector = ({ name, label, tags }) => (
  <Field
    name={name}
    label={label}
    component={deps.elements.Select}
    size="small"
    options={tags.map(tag => tag.name)}
    values={tags.map(tag => tag.id)}
  />
);
TagSelector.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export const PagesSelector = ({ name, label, pages }) => (
  <Field
    name={name}
    label={label}
    component={deps.elements.Select}
    size="small"
    options={pages.map(page => page.title.rendered)}
    values={pages.map(page => page.id)}
  />
);
PagesSelector.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  pages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
