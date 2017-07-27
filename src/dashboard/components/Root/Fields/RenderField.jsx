import React from 'react';

const RenderField = ({ input, label, type, meta: { error }, placeholder }) => (
  <div>
    <span className="label">{label}</span>
    <p className="control">
      <input {...input} type={type} placeholder={placeholder || label} className="input" />
      {error && <span className="help is-danger">{error}</span>}
    </p>
  </div>
);
RenderField.propTypes = {
  input: React.PropTypes.shape({}).isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string,
  }).isRequired,
};

export default RenderField;
