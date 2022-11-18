import {
  getRegistrationApi,
  getAuthApi,
  getLogoutApi,
  getUserApi,
  getAccessTokenApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '../api/api';
import { setCookie } from '../../utils/utils';

export const USER_AUTH = 'USER_AUTH';
export const API_REQUEST = 'API_REQUEST';
export const API_FAILED = 'API_FAILED';
export const USER_EXIT = 'USER_EXIT';
export const TOKEN_UPDATED = 'TOKEN_UPDATED';
export const TOKEN_UPDATED_FAILED = 'TOKEN_UPDATED_FAILED';
export const SET_USER_UPDATE = 'SET_USER_UPDATE';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SET_PASSWORD = 'SET_PASSWORD';
export const RESET_FORGOT_PASSWORD = 'RESET_FORGOT_PASSWORD'


export function getRegistration(form) {
  return function (dispatch) {
    dispatch({
      type: API_REQUEST
    })
    getRegistrationApi(form)
      .then(
        (data) => {
          setCookie('token', data.refreshToken);
          setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
          dispatch({
            type: USER_AUTH,
            payload: { data: data.user }
          })
        }
      )
      .catch(err => {
        dispatch({
          type: API_FAILED
        });
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function forgotPassword(form) {
  return function (dispatch) {
    dispatch({
      type: API_REQUEST
    })
    forgotPasswordApi(form)
      .then(
        (data) => {
          dispatch({
            type: FORGOT_PASSWORD
          })
        }
      )
      .catch(err => {
        dispatch({
          type: API_FAILED
        });
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function ressetPassword(form) {
  return function (dispatch) {
    dispatch({
      type: API_REQUEST
    })
    resetPasswordApi(form)
      .then(
        (data) => {
          dispatch({
            type: RESET_PASSWORD
          })
        }
      )
      .catch(err => {
        dispatch({
          type: API_FAILED
        });
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function getAuth(form) {
  return function (dispatch) {
    dispatch({
      type: API_REQUEST
    })
    getAuthApi(form)
      .then(
        (data) => {
          setCookie('token', data.refreshToken);
          setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
          dispatch({
            type: USER_AUTH,
            payload: { data: data.user }
          })
        }
      )
      .catch(err => {
        dispatch({
          type: API_FAILED
        });
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function exitUser(form) {
  return function (dispatch) {
    dispatch({
      type: API_REQUEST
    })
    getLogoutApi(form)
      .then(
        (data) => {
          setCookie('token', null, { expires: -1 });
          setCookie('accessToken', null, { expires: -1 });
          dispatch({
            type: USER_EXIT
          })
        }
      )
      .catch(err => {
        dispatch({
          type: API_FAILED
        });
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function getUserData() {
  return function (dispatch) {
    dispatch({
      type: API_REQUEST
    })
    getUserApi()
      .then(
        (res) => {
          if (res.ok) {
            return res.json();
          }
          else {
            getAccessToken()
              .then(
                (res) => {
                  dispatch(getUserData());
                  dispatch({ type: TOKEN_UPDATED })
                  console.log('Заменили :-) ');
                }
              )
              .catch(
                (res) => { dispatch({ type: TOKEN_UPDATED_FAILED }); console.log('Не удалось заменить. Ошибка: ', res) }
              )
            return Promise.reject(`Ошибка ${res.status}`);
          }
        }
      )
      .then((data) => {

        dispatch({
          type: USER_AUTH,
          payload: data.user
        })
      })
      .catch(err => {

        dispatch({
          type: API_FAILED
        });
        const textError = err === 'Ошибка 403' ? 'Токен протух, сейчас заменим ! ' : ''
        console.log(err, '  ', textError)
        //alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function updateUserData(form) {
  return function (dispatch) {
    dispatch({
      type: API_REQUEST
    })
    updateUserApi(form)
      .then(
        (res) => {
          if (res.ok) {
            return res.json();
          }
          else {
            getAccessToken()
              .then(
                (res) => {
                  dispatch(getUserData());
                  dispatch({ type: TOKEN_UPDATED })
                  console.log('Заменили :-) ');
                }
              )
              .catch(
                (res) => { dispatch({ type: TOKEN_UPDATED_FAILED }); console.log('Не удалось заменить. Ошибка: ', res) }
              )
            return Promise.reject(`Ошибка ${res.status}`);
          }
        }
      )
      .then((data) => {

        dispatch({
          type: USER_AUTH,
          payload: data.user
        })
      })
      .catch(err => {

        dispatch({
          type: API_FAILED
        });
        const textError = err === 'Ошибка 403' ? 'Токен протух, сейчас заменим ! ' : ''
        console.log(err, '  ', textError)
        //alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function getAccessToken() {
  return getAccessTokenApi()
    .then(
      (data) => {
        setCookie('token', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
      }
    )
    .catch(err => {
      alert(`Ошибка загрузки данных с сервера токена! ${err.status}`);
    })
}


