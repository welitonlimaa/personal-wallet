import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeUser } from '../redux/actions';
import logo from '../style/images/logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'test@test.com',
      senha: '12345678',
      isDisabled: true,
    };
  }

  onSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(changeUser(email));
    history.push('/carteira');
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, senha } = this.state;
    let { isDisabled } = this.state;

    const re = /\S+@\S+\.\S+/;
    const limit = 6;
    if (re.test(email) === true && senha.length >= limit) {
      isDisabled = false;
    }

    return (
      <main>
        <form id="form-login">
          <img src={ logo } alt="logo" />
          <br />
          <input
            data-testid="email-input"
            name="email"
            placeholder="E-mail"
            value={ email }
            onChange={ this.onInputChange }
          />
          <br />
          <input
            data-testid="password-input"
            name="senha"
            placeholder="Senha"
            value={ senha }
            onChange={ this.onInputChange }
          />
          <br />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.onSubmit }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

// const mapStateToProps = (state) => ({
//   ...state.user,
// });

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
