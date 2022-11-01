import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { currency } = this.props;
    const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            name="valor"
            id="valor"
          />
        </label>
        <br />
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            id="description"
          />
        </label>
        <br />
        <Select
          dataTestid="currency-input"
          label="Moeda:"
          id="currency"
          name="currency"
          value="BRL"
          options={ currency }
        />
        <Select
          dataTestid="method-input"
          label="Método de Pagamento:"
          id="method"
          name="method"
          value=""
          options={ metodos }
        />
        <Select
          dataTestid="tag-input"
          label="Categoria:"
          id="tag"
          name="tag"
          value=""
          options={ tags }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

WalletForm.propTypes = {
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
