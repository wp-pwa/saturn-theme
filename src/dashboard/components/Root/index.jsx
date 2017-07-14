/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import * as deps from '../../deps';
import * as selectors from '../../selectors';
import styles from './style.css';

class SaturnThemeFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showColorPicker: false };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.hideColorPicker = this.hideColorPicker.bind(this);
  }

  toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  hideColorPicker() {
    this.setState({ showColorPicker: false });
  }

  render() {
    const {
      pristine,
      waiting,
      updateColorSelected,
      initialValues,
      handleSubmit,
      siteId,
    } = this.props;
    const chosenColor = this.props.chosenColor || initialValues.chosenColor;
    const Button = deps.elements.Button;
    const Icon = deps.elements.Icon;
    const cover = { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' };
    const popover = { position: 'absolute', zIndex: '2' };
    const submitThemeSettings = handleSubmit(
      (values, dispatch) =>
        dispatch(
          deps.actions.saveSettingsRequested(values, { siteId, name: 'saturn-app-theme-worona' }),
        ),
    );
    return (
      <form onSubmit={submitThemeSettings}>
        <label className="label" htmlFor="color">Color</label>
        <p className="control">
          <span
            id="colorSample"
            className={`button is-medium is-disabled ${styles.colorSample}`}
            style={{ backgroundColor: chosenColor }}
          />
          <Button size="medium" onClick={this.toggleColorPicker}>
            <Icon small code="paint-brush" />
            <span>Change color</span>
          </Button>
        </p>
        {
          this.state.showColorPicker ?
            <div style={popover}>
              <div style={cover} onClick={this.hideColorPicker} />
              <ChromePicker
                onChangeComplete={updateColorSelected}
                color={chosenColor}
                disableAlpha
              />
            </div> : null
        }
        <Field name="chosenColor" component="input" type="hidden" />
        <Button color="primary" size="large" type="submit" disabled={pristine} loading={waiting}>
          Save
        </Button>
      </form>
    );
  }
}

SaturnThemeFormClass.propTypes = {
  chosenColor: React.PropTypes.string,
  updateColorSelected: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  initialValues: React.PropTypes.shape({
    chosenColor: React.PropTypes.string,
  }),
};

const mapStateToFormProps = state => {
  const themeSettings = selectors.getThemeSettings(state);
  return {
    initialValues: {
      chosenColor: themeSettings.chosenColor,
    },
    waiting: deps.selectors.getSavingSettings(state) === 'saturn-app-theme-worona',
    siteId: deps.selectors.getSelectedSiteId(state),
    chosenColor: state.theme.reduxForm.SaturnThemeForm &&
      state.theme.reduxForm.SaturnThemeForm.values &&
      state.theme.reduxForm.SaturnThemeForm.values.chosenColor,
  };
};

const mapDispatchToFormProps = dispatch => ({
  updateColorSelected: color => dispatch(change('SaturnThemeForm', 'chosenColor', color.hex)),
});

let SaturnThemeForm = reduxForm({
  form: 'SaturnThemeForm',
  fields: ['chosenColor'],
  getFormState: state => state.theme.reduxForm,
  enableReinitialize: true,
})(SaturnThemeFormClass);
SaturnThemeForm = connect(mapStateToFormProps, mapDispatchToFormProps)(SaturnThemeForm);

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <h1 className="title">Saturn Theme settings</h1>
      <hr />
      <SaturnThemeForm />
    </RootContainer>
  );
};
