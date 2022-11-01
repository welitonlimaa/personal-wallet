// import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Página de Login', () => {
  //   beforeEach(() => {
  //     global.fetch = jest.fn(mockData);
  //   });

  //   afterEach(() => {
  //     global.fetch.mockClear();
  //   });

  test('se o formulário de Login está disponível na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonEntrar = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(buttonEntrar).toBeInTheDocument();

    expect(buttonEntrar.disabled).toBe(true);

    const EMAIL_USER = 'email@email.com';
    const SENHA_USER = '999999';
    userEvent.type(inputEmail, EMAIL_USER);
    userEvent.type(inputSenha, SENHA_USER);
    expect(buttonEntrar.disabled).toBe(false);
  });

  test('se ao clicar no botão o email é renderizado na tela', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEntrar = screen.getByRole('button');
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const EMAIL_USER = 'email@email.com';
    const SENHA_USER = '999999';
    userEvent.type(inputEmail, EMAIL_USER);
    userEvent.type(inputSenha, SENHA_USER);
    userEvent.click(buttonEntrar);

    const emailText = screen.getByText(EMAIL_USER);
    expect(emailText).toBeInTheDocument();
  });

  test('se o formulário de Login está disponível na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const fieldEmail = screen.getByTestId('email-field');
    const fieldTotal = screen.getByTestId('total-field');
    const fieldMoeda = screen.getByTestId('header-currency-field');

    expect(fieldEmail).toBeInTheDocument();
    expect(fieldTotal).toBeInTheDocument();
    expect(fieldMoeda).toBeInTheDocument();
  });
});
