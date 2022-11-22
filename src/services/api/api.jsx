import { baseUrl } from '../../constants/constants';

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getDataApi = () => {
  return request(baseUrl + '/ingredients')
}

export const getOrderApi = (listId) => {
  return request(baseUrl + '/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: listId
    })
  })
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const getApi = (data, path) => {
  return request(baseUrl + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}

export const getAccessTokenApi = () => {
  return request(baseUrl + '/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie('token') })
  })
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
  return request(baseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
}

export const getLogoutApi = (data) => {
  return getApi(data, '/auth/logout')
}

export const getUserApi = () => {
  return request(baseUrl + '/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
  })
}

export const updateUserApi = (data) => {
  return request(baseUrl + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
}




