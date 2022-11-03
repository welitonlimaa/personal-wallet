import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import { getDataAPI, getDataWallet, changeStateExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      description: '',
      moeda: 'USD',
      method: '',
      category: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDataAPI());
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  newObj = (id, data) => {
    const {
      valor,
      description,
      moeda,
      method,
      category,
    } = this.state;

    const obj = {
      id,
      value: valor,
      description,
      currency: moeda,
      method,
      tag: category,
      exchangeRates: data,
    };

    return obj;
  };

  insertDataStore = async () => {
    const { dispatch, despesas } = this.props;
    let id = 0;
    if (despesas.length !== 0) {
      id = despesas[despesas.length - 1].id + 1;
    }

    const dataApi = await dispatch(getDataWallet());
    const fullObj = this.newObj(id, dataApi);
    dispatch(changeStateExpenses(fullObj));

    this.setState({
      valor: '',
      description: '',
    });
  };

  render() {
    const {
      valor,
      description,
      moeda,
      method,
      category,
    } = this.state;

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
            value={ valor }
            onChange={ this.onInputChange }
          />
        </label>
        <br />
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.onInputChange }
          />
        </label>
        <br />
        <Select
          dataTestid="currency-input"
          label="Moeda:"
          id="currency"
          name="moeda"
          value={ moeda }
          options={ currency }
          onChange={ this.onInputChange }
        />
        <Select
          dataTestid="method-input"
          label="Método de Pagamento:"
          id="method"
          name="method"
          value={ method }
          options={ metodos }
          onChange={ this.onInputChange }
        />
        <Select
          dataTestid="tag-input"
          label="Categoria:"
          id="tag"
          name="category"
          value={ category }
          options={ tags }
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="button-adc"
          onClick={ this.insertDataStore }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
  despesas: state.wallet.expenses,
});

WalletForm.propTypes = {
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
