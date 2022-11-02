export const LOGIN = 'LOGIN';

export const changeUser = (data) => ({
  type: LOGIN,
  data,
});

const requestAPI = () => ({
  type: 'REQUEST_API',
});

const changeState = (data) => ({
  type: 'CHANGE_STATE',
  payload: data,
});

const filterData = (data) => {
  delete data.USDT;
  const dataArray = Object.values(data);
  const currency = dataArray.map((dado) => dado.code);
  return currency;
};

const fetchAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};

export const getDataAPI = () => async (dispatch) => {
  const data = await fetchAPI();
  const filteredData = filterData(data);
  dispatch(changeState(filteredData));
};

export const getDataWallet = () => async (dispatch) => {
  dispatch(requestAPI());
  const data = await fetchAPI();
  delete data.USDT;
  return data;
};

export const changeStateExpenses = (data) => ({
  type: 'CHANGE_STATE_EXPENSES',
  payload: data,
});

export const deleteExpense = (data) => ({
  type: 'DELETE_EXPENSE',
  payload: data,
});
