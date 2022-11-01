import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     soma: 0,
  //   };
  // }

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
      <div>
        <p data-testid="email-field">{emailUser}</p>
        <p data-testid="total-field">{soma.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
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
