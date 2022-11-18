import { baseUrl } from '../../constants/constants';

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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: listId
    })
  })
    .then(checkResponse)
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const getApi = (data, path) => {
  return fetch(baseUrl + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}

export const getUserApi = () => {
  return fetch(baseUrl + '/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
  })
}

export const getAccessTokenApi = () => {
  return fetch(baseUrl + '/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie('token') })
  })
    .then(checkResponse)
}

export const getRegistrationApi = (form) => {
  return getApi(form, '/auth/register')
}


export const forgotPasswordApi = (email) => {
  return getApi(email, '/password-reset')
}

export const resetPasswordApi = (data) => {
  return getApi(data, '/password-reset/reset')
}


export const getAuthApi = (data) => {
  return fetch(baseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}

export const getLogoutApi = (data) => {
  return getApi(data, '/auth/logout')
}

export const updateUserApi = (data) => {
  return fetch(baseUrl + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
}




