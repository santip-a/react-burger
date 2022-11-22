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

const apiFailed = () => {
  return {
    type: API_FAILED
  }
}

const apiRequest = () => {
  return {
    type: API_REQUEST
  }
}

const userAuthApi = (data) => {
  return {
    type: USER_AUTH,
    payload: data.user
  }
}

const forgotPasword = () => {
  return {
    type: FORGOT_PASSWORD,
  }
}

const ressetPasword = () => {
  return {
    type: RESET_PASSWORD,
  }
}

const userExit = () => {
  return {
    type: USER_EXIT,
  }
}

const tokenUpdated = () => {
  return {
    type: TOKEN_UPDATED,
  }
}

const tokenUpdatedFailed = () => {
  return {
    type: TOKEN_UPDATED_FAILED,
  }
}

export const setPassword = (data) => {
  return {
    type: SET_PASSWORD,
    payload: data
  }
}

export const setForgotPasswor = () => {
  return {
    type: RESET_FORGOT_PASSWORD
  }
}

export function getRegistration(form) {
  return function (dispatch) {
    dispatch(apiRequest())
    getRegistrationApi(form)
      .then(
        (data) => {
          setCookie('token', data.refreshToken);
          setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
          dispatch(userAuthApi(data))
        }
      )
      .catch(err => {
        dispatch(apiFailed());
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function forgotPassword(form) {
  return function (dispatch) {
    dispatch(apiRequest())
    forgotPasswordApi(form)
      .then(
        (data) => {
          dispatch(forgotPasword())
        }
      )
      .catch(err => {
        dispatch(apiFailed());
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function ressetPassword(form) {
  return function (dispatch) {
    dispatch(apiRequest())
    resetPasswordApi(form)
      .then(
        (data) => {
          dispatch(ressetPasword())
        }
      )
      .catch(err => {
        dispatch(apiFailed());
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function getAuth(form) {
  return function (dispatch) {
    dispatch(apiRequest())
    getAuthApi(form)
      .then(
        (data) => {
          setCookie('token', data.refreshToken);
          setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
          dispatch(userAuthApi(data))
        }
      )
      .catch(err => {
        dispatch(apiFailed());
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function exitUser(form) {
  return function (dispatch) {
    dispatch(apiRequest())
    getLogoutApi(form)
      .then(
        (data) => {
          setCookie('token', null, { expires: -1 });
          setCookie('accessToken', null, { expires: -1 });
          dispatch(userExit())
        }
      )
      .catch(err => {
        dispatch(apiFailed());
        alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

// export function getUserData() {
//   return function (dispatch) {
//     dispatch(apiRequest())
//     getUserApi()
//       .then(
//         (res) => {
//           if (res.ok) {
//             return res.json();
//           }
//           else {
//             getAccessToken()
//               .then(
//                 (res) => {
//                   dispatch(getUserData());
//                   dispatch(tokenUpdated())
//                   console.log('Заменили :-) ');
//                 }
//               )
//               .catch(
//                 (res) => { dispatch(tokenUpdatedFailed()); console.log('Не удалось. Ошибка: ', res) }
//               )
//             return Promise.reject(`Ошибка ${res.status}`);
//           }
//         }
//       )
//       .then((data) => {
//         dispatch(userAuthApi(data))
//       })
//       .catch(err => {
//         dispatch(apiFailed());
//         const textError = err === 'Ошибка 403' ? 'Токен протух, сейчас заменим ! ' : ''
//         console.log(err, '  ', textError)
//         //alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
//       })
//   }
// }

// export function updateUserData(form) {
//   return function (dispatch) {
//     dispatch(apiRequest())
//     updateUserApi(form)
//       .then(
//         (res) => {
//           if (res.ok) {
//             return res.json();
//           }
//           else {
//             getAccessToken()
//               .then(
//                 (res) => {
//                   dispatch(getUserData());
//                   dispatch(tokenUpdated())
//                   console.log('Заменили :-) ');
//                 }
//               )
//               .catch(
//                 (res) => { dispatch(tokenUpdatedFailed()); console.log('Не удалось заменить. Ошибка: ', res) }
//               )
//             return Promise.reject(`Ошибка ${res.status}`);
//           }
//         }
//       )
//       .then((data) => {
//         dispatch(userAuthApi(data))
//       })
//       .catch(err => {

//         dispatch(apiFailed());
//         const textError = err === 'Ошибка 403' ? 'Токен протух, сейчас заменим ! ' : ''
//         console.log(err, '  ', textError)
//         //alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
//       })
//   }
// }

export function getUserData() {
  return function (dispatch) {
    dispatch(apiRequest())
    getUserApi()
      .then(
        (res) => {
          if (res.success === true) {
            return res;
          }
          else {
            return Promise.reject(`Ошибка -- ${res.status}`);
          }
        }
      )
      .then((data) => {
        dispatch(userAuthApi(data))
      })
      .catch(err => {
        dispatch(apiFailed());
        const textError = err === 'Ошибка 403' ? 'Токен протух, сейчас заменим ! ' : ''
        console.log(err, ' - ', textError)
        getAccessToken()
        .then(
          (res) => {
            dispatch(getUserData());
            dispatch(tokenUpdated())
            console.log('Заменили :-) ');
          }
        )
        .catch(
          (res) => { dispatch(tokenUpdatedFailed()); console.log('Не удалось. Ошибка: ', res) }
        )
        //alert(`Ошибка загрузки данных с сервера ! ${err.status}`);
      })
  }
}

export function updateUserData(form) {
  return function (dispatch) {
    dispatch(apiRequest())
    updateUserApi(form)
    .then(
      (res) => {
        if (res.success === true) {
          return res;
        }
        else {
          return Promise.reject(`Ошибка -- ${res.status}`);
        }
      }
    )
    .then((data) => {
      dispatch(userAuthApi(data))
    })
    .catch(err => {
      dispatch(apiFailed());
      const textError = err === 'Ошибка 403' ? 'Токен протух, сейчас заменим ! ' : ''
      console.log(err, ' - ', textError)
      getAccessToken()
      .then(
        (res) => {
          dispatch(getUserData());
          dispatch(tokenUpdated())
          console.log('Заменили :-) ');
        }
      )
      .catch(
        (res) => { dispatch(tokenUpdatedFailed()); console.log('Не удалось. Ошибка: ', res) }
      )
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


