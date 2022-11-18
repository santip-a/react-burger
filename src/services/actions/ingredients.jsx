import { getDataApi } from '../api/api'

export const GET_INGREDIENTS_DATA_REQUEST = 'GET_INGREDIENTS_DATA';
export const GET_INGREDIENTS_DATA_FAILED = 'GET_INGREDIENTS_DATA_FAILED';
export const GET_INGREDIENTS_DATA_SUCCESS = 'GET_INGREDIENTS_DATA_SUCCESS';

export function getData() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_DATA_REQUEST
    })
    getDataApi()
      .then(
        (data) => {
          if (data) {
            dispatch({
              type: GET_INGREDIENTS_DATA_SUCCESS,
              payload: data.data
            })
          }
        }
      )
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_DATA_FAILED
        });
        alert(`Ошибка загрузки данных с сервера ${err.status}`);
      })
  }
} 