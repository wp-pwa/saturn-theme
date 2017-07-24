/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
} from 'react-sortable-hoc';
import { Field, formValueSelector, getFormSyncErrors } from 'redux-form';
import * as deps from '../../../../deps';
import * as selectors from '../../../../selectors';
import * as actions from '../../../../actions';
import RenderField from '../RenderField';
import Type from '../Type';
import { CategorySelector, PagesSelector } from '../Selectors';

const DragHandle = sortableHandle(({ label, error }) => (
  <p style={{ cursor: 'move' }}>
    <i
      className="fa fa-bars"
      aria-hidden="true"
      style={{ color: '#dbdbdb', marginRight: '0.4em' }}
    />
    {label}
    {error && <span className="help is-danger">Contains some errors, please check</span>}
  </p>
));

const MenuCard = sortableElement(({
  member,
  isOpen = false,
  openMenuItem,
  closeMenuItem,
  label,
  type,
  remove,
  categories,
  pages,
  syncErrors,
}) => (
  <div className="card">
    <header className="card-header">
      <div className="card-header-title">
        <DragHandle label={label} error={!isEmpty(syncErrors)} />
      </div>
      <a className="card-header-icon" onClick={isOpen ? closeMenuItem : openMenuItem}>
        <span className="icon">
          {isOpen ? <i className="fa fa-angle-up" /> : <i className="fa fa-angle-down" />}
        </span>
      </a>
    </header>
    <div className="card-content" style={{ display: `${isOpen ? 'block' : 'none'}` }}>
          <div className="control">
      <Field name={`${member}.label`} component={RenderField} type="text" label="Label" />
          </div>
          <div className="control">
      <Type
        name={`${member}.type`}
        options={['Latest posts', 'Category', 'Page', 'External Link']}
        pages={pages}
      />
          </div>
      {type === 'category' &&
        <CategorySelector name={`${member}.category`} label="Category" categories={categories} />}
      {type === 'page' && <PagesSelector name={`${member}.page`} label="Page" pages={pages} />}
      {type === 'link' &&
        <Field
          name={`${member}.url`}
          component={RenderField}
          type="text"
          label="Url"
          placeholder="http://www.example.com"
        />}
      <br />
      <p>
        <deps.elements.Button onClick={remove} color="danger" size="small" outlined>
          Delete
        </deps.elements.Button>
        {' '}
        <deps.elements.Button onClick={closeMenuItem} color="primary" size="small" outlined>
          Close
        </deps.elements.Button>
      </p>
    </div>
  </div>
));

MenuCard.propTypes = {
  fields: React.PropTypes.shape({}),
  index: React.PropTypes.number.isRequired,
  label: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  isOpen: React.PropTypes.bool,
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
  pages: React.PropTypes.arrayOf(React.PropTypes.object),
};

const formSelector = formValueSelector('saturnThemeForm', st => st.theme.reduxForm);
const syncErrorsSelector = getFormSyncErrors('saturnThemeForm', st => st.theme.reduxForm);
const mapStateToProps = (state, { index, member }) => ({
  isOpen: selectors.getMenuItemOpen(state) === index,
  label: formSelector(state, `${member}.label`),
  type: formSelector(state, `${member}.type`),
  syncErrors: syncErrorsSelector(state) && syncErrorsSelector(state).menu[index],
  categories: selectors.getCategoriesList(state),
  pages: selectors.getPagesList(state),
});
const mapDispatchToProps = (dispatch, { index }) => ({
  openMenuItem() {
    dispatch(actions.menuItemOpened({ index }));
  },
  closeMenuItem() {
    dispatch(actions.menuItemClosed({ index }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuCard);
