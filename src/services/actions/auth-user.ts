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

export const USER_AUTH: 'USER_AUTH' = 'USER_AUTH';
export const API_REQUEST: 'API_REQUEST' = 'API_REQUEST';
export const API_FAILED: 'API_FAILED' = 'API_FAILED';
export const USER_EXIT: 'USER_EXIT' = 'USER_EXIT';
export const TOKEN_UPDATED: 'TOKEN_UPDATED' = 'TOKEN_UPDATED';
export const TOKEN_UPDATED_FAILED: 'TOKEN_UPDATED_FAILED' = 'TOKEN_UPDATED_FAILED';
export const SET_USER_UPDATE: 'SET_USER_UPDATE' = 'SET_USER_UPDATE';
export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const SET_PASSWORD: 'SET_PASSWORD' = 'SET_PASSWORD';
export const RESET_FORGOT_PASSWORD: 'RESET_FORGOT_PASSWORD' = 'RESET_FORGOT_PASSWORD'


export interface IUserAuthAction {
  readonly type: typeof USER_AUTH;
  readonly payload: any
}

export interface IApiRequestAction {
  readonly type: typeof API_REQUEST;
}

export interface IApiFailedAction {
  readonly type: typeof API_FAILED;
}

export interface IUserExitAction {
  readonly type: typeof USER_EXIT;
}

export interface ITokenUpdatedAction {
  readonly type: typeof TOKEN_UPDATED;
}

export interface ITokenUpdatedFailedAction {
  readonly type: typeof TOKEN_UPDATED_FAILED;
}

export interface ISetUserUpdateAction {
  readonly type: typeof SET_USER_UPDATE;
}

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD;
}

export interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD;
}

export interface ISetPasswordAction {
  readonly type: typeof SET_PASSWORD;
  readonly payload: any
}

export interface IResetForgotPasswordAction {
  readonly type: typeof RESET_FORGOT_PASSWORD;
}


export type TAuthUserActions = 
  | IUserAuthAction
  | IApiRequestAction
  | IApiFailedAction
  | IUserExitAction
  | ITokenUpdatedAction
  | ITokenUpdatedFailedAction
  | ISetUserUpdateAction
  | IForgotPasswordAction
  | IResetPasswordAction
  | ISetPasswordAction
  | IResetForgotPasswordAction




const apiFailed = (): IApiFailedAction => {
  return {
    type: API_FAILED
  }
}

const apiRequest = (): IApiRequestAction => {
  return {
    type: API_REQUEST
  }
}

const userAuthApi = (data: any): IUserAuthAction => {
  return {
    type: USER_AUTH,
    payload: data.user
  }
}

const forgotPasword = (): IForgotPasswordAction => {
  return {
    type: FORGOT_PASSWORD,
  }
}

const ressetPasword = (): IResetPasswordAction => {
  return {
    type: RESET_PASSWORD,
  }
}

const userExit = (): IUserExitAction => {
  return {
    type: USER_EXIT,
  }
}

const tokenUpdated = (): ITokenUpdatedAction => {
  return {
    type: TOKEN_UPDATED,
  }
}

const tokenUpdatedFailed = (): ITokenUpdatedFailedAction => {
  return {
    type: TOKEN_UPDATED_FAILED,
  }
}

export const setPassword = (data: any): ISetPasswordAction => {
  return {
    type: SET_PASSWORD,
    payload: data
  }
}

export const setForgotPasswor = (): IResetForgotPasswordAction => {
  return {
    type: RESET_FORGOT_PASSWORD
  }
}

export function getRegistration(form: any) {
  return function (dispatch: any) {
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

export function forgotPassword(form: any) {
  return function (dispatch: any) {
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

export function ressetPassword(form: any) {
  return function (dispatch: any) {
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

export function getAuth(form: any) {
  return function (dispatch: any) {
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

export function exitUser(form: any) {
  return function (dispatch: any) {
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


export function getUserData() {
  return function (dispatch: any) {
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

export function updateUserData(form: any) {
  return function (dispatch: any) {
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


