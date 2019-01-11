import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInputGroup = ({
  label, name, value, placeholder, type, onChange, error,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}

    </label>
    <input
      name={name}
      type={type}
      className={classnames('form-control form-control-lg', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error}</div>}

  </div>
);

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInputGroup.defaultProps = {
  type: 'text',
  error: '',
};

export default TextInputGroup;
