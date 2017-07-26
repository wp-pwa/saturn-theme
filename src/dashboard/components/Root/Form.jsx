/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React from 'react';
import { flow } from 'lodash/fp';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import * as selectors from '../../selectors';
import validate from './validate';
import ColorPicker from './Fields/ColorPicker';
import Menu from './Fields/Menu';
import styles from './style.css';

class saturnThemeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitSettings = this.submitSettings.bind(this);
  }

  submitSettings(values, dispatch) {
    dispatch(
      deps.actions.saveSettingsRequested(values, {
        siteId: this.props.siteId,
        name: 'saturn-app-theme-worona',
      }),
    );
  }

  render() {
    const { pristine, waiting, handleSubmit, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitSettings)}>
        <Field name="mainColor" component={ColorPicker} label="Main Color" />
        <FieldArray name="menu" component={Menu} label="Menu" />
        <span className={styles.section}>
          <deps.elements.Button
            color="primary"
            size="large"
            type="submit"
            disabled={waiting || pristine || invalid}
            loading={waiting}
          >
            Save
          </deps.elements.Button>
        </span>
      </form>
    );
  }
}

saturnThemeForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  initialValues: React.PropTypes.shape({
    mainColor: React.PropTypes.string,
    displayFeaturedImage: React.PropTypes.bool,
    displayCategories: React.PropTypes.bool,
    menu: React.PropTypes.arrayOf(React.PropTypes.object),
    frontPage: React.PropTypes.shape({}),
  }),
};

const mapStateToProps = state => {
  const themeSettings = selectors.getThemeSettings(state);
  return {
    initialValues: {
      mainColor: themeSettings.mainColor,
      displayFeaturedImage: themeSettings.displayFeaturedImage,
      displayCategories: themeSettings.displayCategories,
      menu: themeSettings.menu,
      frontPage: themeSettings.frontPage,
      language: themeSettings.language,
      rtl: themeSettings.rtl,
    },
    waiting: deps.selectors.getSavingSettings(state) === 'saturn-app-theme-worona',
    siteId: deps.selectors.getSelectedSiteId(state),
  };
};

export default flow(
  reduxForm({
    form: 'saturnThemeForm',
    getFormState: state => state.theme.reduxForm,
    enableReinitialize: true,
    validate,
  }),
  connect(mapStateToProps),
)(saturnThemeForm);
