// Componente baseado no código disponibilizado no repositório:
// https://github.com/tryber/exercise-forms-redux

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const {
      label,
      name,
      dataTestid,
      onChange,
      value,
      options,
    } = this.props;
    return (
      <label htmlFor={ name } className="label">
        { label }
        <div className="select">
          <select
            data-testid={ dataTestid }
            name={ name }
            id={ name }
            required
            onChange={ onChange }
            defaultValue={ value }
          >
            {
              options.map((option, index) => (
                <option key={ index }>{ option }</option>
              ))
            }
          </select>
        </div>
      </label>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Select;
