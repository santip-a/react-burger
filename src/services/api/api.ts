import { baseUrl } from '../../constants/constants';


function request(url: string, options?: object) {  
  return fetch(url, options).then(checkResponse)
}

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getDataApi = () => {
  return request(baseUrl + '/ingredients')
}

export const getOrderApi = (listId: string[]) => {  
  return request(baseUrl + '/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients: listId
    })
  })
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const getApi = (data: {email?: string, name?: string, password?: string, token?: string}, path: string) => {  
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

export const getRegistrationApi = (form: {email?: string, name?: string, password?: string}) => {
  return getApi(form, '/auth/register')
}


export const forgotPasswordApi = (email: {email?: string}) => {
  return getApi(email, '/password-reset')
}

export const resetPasswordApi = (data: {password?: string, token?: string}) => {
  return getApi(data, '/password-reset/reset')
}

export const getAuthApi = (data: {email?: string, password?: string}) => {
  return request(baseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
}

export const getLogoutApi = (data: {token?: string}) => {
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

export const updateUserApi = (data: {  name: string | undefined;  email: string | undefined;}) => {
  return request(baseUrl + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
}




