import { getDataApi } from '../api/api'

export const GET_INGREDIENTS_DATA_REQUEST: 'GET_INGREDIENTS_DATA' = 'GET_INGREDIENTS_DATA';
export const GET_INGREDIENTS_DATA_FAILED: 'GET_INGREDIENTS_DATA_FAILED' = 'GET_INGREDIENTS_DATA_FAILED';
export const GET_INGREDIENTS_DATA_SUCCESS: 'GET_INGREDIENTS_DATA_SUCCESS' = 'GET_INGREDIENTS_DATA_SUCCESS';

export interface IGetIngredientsDataRequestAction {
  readonly type: typeof GET_INGREDIENTS_DATA_REQUEST;
}

export interface IGetIngredientsDataFailedAction {
  readonly type: typeof GET_INGREDIENTS_DATA_FAILED;
}

export interface IGetIngredientsDataSuccassAction {
  readonly type: typeof GET_INGREDIENTS_DATA_SUCCESS;
  readonly payload: any
}

export type TIngredientActions =
  | IGetIngredientsDataRequestAction
  | IGetIngredientsDataFailedAction
  | IGetIngredientsDataSuccassAction

export function getData() {
  return function (dispatch: any) {
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