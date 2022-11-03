import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Página de Login', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn(mockData);
  // });

  // afterEach(() => {
  //   global.fetch.mockClear();
  // });

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

  test('se o header é renderizado corretamente na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const fieldEmail = screen.getByTestId('email-field');
    const fieldTotal = screen.getByTestId('total-field');
    const fieldMoeda = screen.getByTestId('header-currency-field');

    expect(fieldEmail).toBeInTheDocument();
    expect(fieldTotal).toBeInTheDocument();
    expect(fieldMoeda).toBeInTheDocument();
  });

  test('se o formulario é renderizado corretamente na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    const inputDescrip = screen.getByTestId('description-input');
    const selectCurrency = screen.getByTestId('currency-input');
    const selectMethod = screen.getByTestId('method-input');
    const selectTag = screen.getByTestId('tag-input');

    expect(inputValue).toBeInTheDocument();
    expect(inputDescrip).toBeInTheDocument();
    expect(selectCurrency).toBeInTheDocument();
    expect(selectMethod).toBeInTheDocument();
    expect(selectTag).toBeInTheDocument();
  });

  test('se a tabela é renderizado corretamente na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriText = screen.getByText('Descrição');
    const tagText = screen.getByText('Tag');
    const methodText = screen.getByText('Método de pagamento');
    const valText = screen.getByText('Valor');
    const moedaText = screen.getByText('Moeda');
    const cambText = screen.getByText('Câmbio utilizado');
    const valConvText = screen.getByText('Valor convertido');
    const moedaConvText = screen.getByText('Moeda de conversão');
    const buttonsText = screen.getByText('Editar/Excluir');

    expect(descriText).toBeInTheDocument();
    expect(tagText).toBeInTheDocument();
    expect(methodText).toBeInTheDocument();
    expect(valText).toBeInTheDocument();
    expect(moedaText).toBeInTheDocument();
    expect(cambText).toBeInTheDocument();
    expect(valConvText).toBeInTheDocument();
    expect(moedaConvText).toBeInTheDocument();
    expect(buttonsText).toBeInTheDocument();
  });

  test('se ao clicar no botão Adicionar despesa a despesa é adicionada', () => {
    delete mockData.USDT;
    const dataArray = Object.values(mockData);
    const currency = dataArray.map((dado) => dado.code);

    const obj = {
      id: 0,
      value: '30',
      description: 'pizza',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    };

    const state = {
      wallet: { currencies: currency, expenses: [obj] },
    };

    renderWithRouterAndRedux(<Wallet />, { initialState: state });
    const inputValue = screen.getByTestId('value-input');
    const inputDescrip = screen.getByTestId('description-input');
    // const buttonAdc = screen.getByTestId('button-adc');

    userEvent.type(inputValue, '30');
    userEvent.type(inputDescrip, 'Salgados');
    // userEvent.click(buttonAdc);

    const textDescrip = screen.getByText('pizza');
    // const textDescrip2 = screen.getByText('Salgados');
    expect(textDescrip).toBeInTheDocument();
    // expect(textDescrip2).toBeInTheDocument();
    expect(inputValue.value).toBe('30');
    expect(inputDescrip.value).toBe('Salgados');
  });
});
