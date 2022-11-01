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

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const filteredData = filterData(data);
  dispatch(changeState(filteredData));
};
