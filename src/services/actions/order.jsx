import { getOrderApi } from '../api/api'

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const CREATE_ORDER_CLEAR = 'CREATE_ORDER_CLEAR';

export const getOrder = (listId) => {
  return function (dispatch) {
    dispatch({ type: CREATE_ORDER_CLEAR })
    dispatch({
      type: CREATE_ORDER_REQUEST
    })
    getOrderApi(listId)
      .then(
        (data) => {
          if (data) {
            dispatch({
              type: CREATE_ORDER_SUCCESS,
              payload: data
            })
          }
        }
      )
      .catch(err => {
        dispatch({
          type: CREATE_ORDER_FAILED
        });
        alert(`Ошибка -  ${err.status}`);
      })
  }
}
