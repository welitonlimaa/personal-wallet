import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import { getDataAPI, getDataWallet,
  changeStateExpenses, deleteEditExpense } from '../redux/actions';

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
    const { editor, changeStateEditar } = this.props;
    const { name, value } = target;
    if (editor) {
      changeStateEditar(true);
      this.setState({
        [name]: value,
      });
    } else {
      changeStateEditar(false);
      this.setState({
        [name]: value,
      });
    }
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

  getDataToEdit = () => {
    const { idDespesa, despesas } = this.props;
    const objEdit = despesas.find((dado) => dado.id === idDespesa);
    return objEdit;
  };

  editarExpense = () => {
    const { idDespesa, despesas, dispatch } = this.props;
    const { exchangeRates } = this.getDataToEdit();
    const fullObj = this.newObj(idDespesa, exchangeRates);
    const newDespesas = despesas.filter((dado) => dado.id !== idDespesa);
    newDespesas.splice(idDespesa, 0, fullObj);
    dispatch(deleteEditExpense(newDespesas));
  };

  render() {
    const { currency, editor, editar } = this.props;

    const {
      valor,
      description,
      moeda,
      method,
      category,
    } = this.state;
    console.log(editor, editar);
    const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const ButtonAdc = (
      <button
        type="button"
        data-testid="button-adc"
        onClick={ this.insertDataStore }
      >
        Adicionar despesa
      </button>
    );

    const ButtonEdit = (
      <button
        type="button"
        // data-testid="button-adc"
        onClick={ this.editarExpense }
      >
        Editar despesa
      </button>
    );
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            name="valor"
            id="valor"
            value={ editor !== editar ? this.getDataToEdit().value : valor }
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
            value={ editor !== editar ? this.getDataToEdit().description : description }
            onChange={ this.onInputChange }
          />
        </label>
        <br />
        <Select
          dataTestid="currency-input"
          label="Moeda:"
          id="currency"
          name="moeda"
          value={ editor !== editar ? this.getDataToEdit().currency : moeda }
          options={ currency }
          onChange={ this.onInputChange }
        />
        <Select
          dataTestid="method-input"
          label="Método de Pagamento:"
          id="method"
          name="method"
          value={ editor !== editar ? this.getDataToEdit().method : method }
          options={ metodos }
          onChange={ this.onInputChange }
        />
        <Select
          dataTestid="tag-input"
          label="Categoria:"
          id="tag"
          name="category"
          value={ editor !== editar ? this.getDataToEdit().tag : category }
          options={ tags }
          onChange={ this.onInputChange }
        />
        { editor ? ButtonEdit : ButtonAdc }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
  despesas: state.wallet.expenses,
  idDespesa: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  idDespesa: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  editar: PropTypes.bool.isRequired,
  changeStateEditar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
