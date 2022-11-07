import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEditExpense, setIdExp } from '../redux/actions';
import excluirImg from '../style/images/excluir.png';
import editarImg from '../style/images/editar.png';

class TableMobile extends Component {
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

    const buttonEditar = (
      <img src={ editarImg } alt="botão editar" id="btn-editar" />
    );

    const buttonExcluir = (
      <img src={ excluirImg } alt="botão excluir" id="btn-excluir" />
    );

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
          const coin = exchangeRates[currency].name.split('/R');
          return (
            <table key={ id }>
              <tr>
                <td>Descrição</td>
                <td>{description}</td>
              </tr>
              <tr>
                <td>Tag</td>
                <td>{tag}</td>
              </tr>
              <tr>
                <td>Método de pagamento</td>
                <td>{method}</td>
              </tr>
              <tr>
                <td>Valor</td>
                <td>{Number(value).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Moeda</td>
                <td>{coin[0]}</td>
              </tr>
              <tr>
                <td>Câmbio utilizado</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Valor convertido</td>
                <td>
                  {(Number(value) * Number(exchangeRates[currency].ask))
                    .toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Moeda de conversão</td>
                <td>Real</td>
              </tr>
              <tr>
                <td>Editar/Excluir</td>
                <td>
                  <button
                    type="button"
                    name="editar"
                    data-testid="edit-btn"
                    onClick={ () => this.setIdExpense(id) }
                  >
                    {buttonEditar}
                  </button>
                  <button
                    type="button"
                    name="excluir"
                    data-testid="delete-btn"
                    onClick={ () => this.excluirExpense(id) }
                  >
                    {buttonExcluir}
                  </button>
                </td>
              </tr>
            </table>
          );
        })
      );
    }
    return (
      <div id="container-table-mobile">
        {tableDespesas}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

TableMobile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  changeStateEditar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TableMobile);
