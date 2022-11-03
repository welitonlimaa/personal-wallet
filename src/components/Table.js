import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEditExpense, setIdExp } from '../redux/actions';

class Table extends Component {
  excluirExpense = (id) => {
    const { despesas, dispatch, changeStateEditar } = this.props;
    const newDespesas = despesas.filter((dado) => dado.id !== id);
    dispatch(deleteEditExpense(newDespesas));
    changeStateEditar(false);
  };

  setIdExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(setIdExp(id));
  };

  render() {
    const { despesas } = this.props;
    let tableDespesas = null;
    if (despesas.length !== 0) {
      tableDespesas = (
        despesas.map((dado) => {
          const {
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          } = dado;

          return (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}</td>
              <td>{currency}</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.setIdExpense(id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.excluirExpense(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })
      );
    }
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {tableDespesas}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  changeStateEditar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
