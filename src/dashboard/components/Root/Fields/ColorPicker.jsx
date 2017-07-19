/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ChromePicker } from 'react-color';
import * as deps from '../../../deps';
import styles from '../style.css';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showColorPicker: false };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.hideColorPicker = this.hideColorPicker.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange({ hex }) {
    this.props.input.onChange(hex);
  }

  hideColorPicker() {
    this.setState({ showColorPicker: false });
  }

  toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  render() {
    const { label, input: { value } } = this.props;
    const popover = { position: 'absolute', zIndex: '2' };
    const cover = { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' };
    return (
      <div className="control">
        <span className="label">{label}</span>
        <p className="control">
          <span
            id="colorSample"
            className={`button is-medium is-disabled ${styles.colorSample}`}
            style={{ backgroundColor: value }}
          />
          <deps.elements.Button size="medium" onClick={this.toggleColorPicker}>
            <deps.elements.Icon small code="paint-brush" />
            <span>Change color</span>
          </deps.elements.Button>
        </p>
        {
          this.state.showColorPicker ? <div style={popover}>
              <div style={cover} onClick={this.hideColorPicker} />
              <ChromePicker onChangeComplete={this.onChange} color={value} disableAlpha />
            </div> : null
        }
      </div>
    );
  }
}
ColorPicker.propTypes = {
  label: React.PropTypes.string.isRequired,
  input: React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }),
};

export default ColorPicker;
