import { getOrderApi } from '../api/api';
import {AppThunk, AppDispatch} from '../types/index'
import {TOrder} from '../../utils/types'

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';
export const CREATE_ORDER_CLEAR: 'CREATE_ORDER_CLEAR' = 'CREATE_ORDER_CLEAR';

export interface ICreatOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreatOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: TOrder
}

export interface ICreatOrderCleardAction {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export interface ICreatOrderFailedAction {
  readonly type: typeof CREATE_ORDER_CLEAR;
}

export type TOrderActions =
  | ICreatOrderRequestAction
  | ICreatOrderSuccessAction
  | ICreatOrderCleardAction
  | ICreatOrderFailedAction


export const getOrder: AppThunk = (listId: string[]) => {
  return function (dispatch: AppDispatch) {
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
