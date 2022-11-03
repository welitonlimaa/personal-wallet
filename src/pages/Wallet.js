import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      editar: false,
    };
  }

  changeStateEditar = (status) => {
    this.setState({
      editar: status,
    });
  };

  render() {
    const { editar } = this.state;
    return (
      <div>
        <Header />
        <WalletForm changeStateEditar={ this.changeStateEditar } editar={ editar } />
        <br />
        <br />
        <Table changeStateEditar={ this.changeStateEditar } />
      </div>
    );
  }
}

export default connect()(Wallet);
