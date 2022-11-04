import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../style/images/logo.png';

class Header extends Component {
  render() {
    const { emailUser, despesas } = this.props;
    let soma = 0;
    if (despesas.length !== 0) {
      for (let i = 0; i < despesas.length; i += 1) {
        const coin = despesas[i].exchangeRates[despesas[i].currency].ask;
        soma += Number(despesas[i].value) * Number(coin);
      }
    }

    return (
      <div id="header">
        <img src={ logo } alt="logo" />
        <div>
          <span>Total de despesas: </span>
          <span data-testid="total-field">{soma.toFixed(2)}</span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
        <p data-testid="email-field">{emailUser}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  despesas: state.wallet.expenses,
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default connect(mapStateToProps)(Header);
