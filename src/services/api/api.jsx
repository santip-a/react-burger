import {baseUrl} from '../../constants/constants';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
    }
  return Promise.reject(`Ошибка ${res.status}`);
}


export const getDataApi = () => {
  return fetch(baseUrl + '/ingredients')
    .then(checkResponse)
}


export const getOrderApi = (listId) => {
  return fetch(baseUrl + '/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: listId
    })
  })
    .then(checkResponse)
}
