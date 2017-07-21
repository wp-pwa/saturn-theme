/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import * as selectors from '../../selectors';
import ColorPicker from './Fields/ColorPicker';

class SaturnThemeFormClass extends React.Component {
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
    const { pristine, waiting, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitSettings)}>
        <Field name="mainColor" component={ColorPicker} label="Main Color" />
        <deps.elements.Button
          color="primary"
          size="large"
          type="submit"
          disabled={pristine}
          loading={waiting}
        >
          Save
        </deps.elements.Button>
      </form>
    );
  }
}

SaturnThemeFormClass.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  initialValues: React.PropTypes.shape({
    mainColor: React.PropTypes.string,
  }),
};

const mapStateToFormProps = state => {
  const themeSettings = selectors.getThemeSettings(state);
  return {
    initialValues: { mainColor: themeSettings.mainColor },
    waiting: deps.selectors.getSavingSettings(state) === 'saturn-app-theme-worona',
    siteId: deps.selectors.getSelectedSiteId(state),
    mainColor: state.theme.reduxForm.SaturnThemeForm &&
      state.theme.reduxForm.SaturnThemeForm.values &&
      state.theme.reduxForm.SaturnThemeForm.values.mainColor,
  };
};

const mapDispatchToFormProps = dispatch => ({
  updateColorSelected: color => dispatch(change('SaturnThemeForm', 'mainColor', color.hex)),
});

const SaturnThemeForm = reduxForm({
  form: 'SaturnThemeForm',
  getFormState: state => state.theme.reduxForm,
  enableReinitialize: true,
})(SaturnThemeFormClass);

export default connect(mapStateToFormProps, mapDispatchToFormProps)(SaturnThemeForm);
