import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  excluirExpense = (id) => {
    const { despesas, dispatch } = this.props;
    const newDespesas = despesas.filter((dado) => dado.id !== id);
    dispatch(deleteExpense(newDespesas));
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
                Editar
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
};

export default connect(mapStateToProps)(Table);
