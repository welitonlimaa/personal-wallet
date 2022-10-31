export const LOGIN = 'LOGIN';

export const changeUser = (data) => ({
  type: LOGIN,
  data,
});

export const DADOSWALLET = 'DADOS_WALLET';

export const wallet = (data) => ({
  type: DADOSWALLET,
  data,
});
