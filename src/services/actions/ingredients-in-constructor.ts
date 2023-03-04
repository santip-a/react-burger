import { uuid } from '../../utils/utils';

export const ADD_FILLING_TO_CONSTRUCTOR: 'ADD_FILLING_TO_CONSTRUCTOR' = 'ADD_FILLING_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR: 'ADD_BUN_TO_CONSTRUCTOR' = 'ADD_BUN_TO_CONSTRUCTOR';
export const DEL_FILLING_T0_CONSTRUCTOR: 'DEL_FILLING_T0_CONSTRUCTOR' = 'DEL_FILLING_T0_CONSTRUCTOR';
export const SORT_IN_TO_CONSTRUCTOR: 'SORT_IN_TO_CONSTRUCTOR' = 'SORT_IN_TO_CONSTRUCTOR';
export const INCREASE_COUTER: 'INCREASE_COUTER' = 'INCREASE_COUTER';
export const DECREASE_COUTER: 'DECREASE_COUTER' = 'DECREASE_COUTER';
export const RESET_IN_TO_CONSTRUCTOR: 'RESET_IN_TO_CONSTRUCTOR' = 'RESET_IN_TO_CONSTRUCTOR'

export interface IAddFillingToConstructortAction {
  readonly type: typeof ADD_FILLING_TO_CONSTRUCTOR;
  readonly payload: number
}

export interface IAddBunToConstructortAction {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: any
}

export interface IDelFillingToConstructortAction {
  readonly type: typeof DEL_FILLING_T0_CONSTRUCTOR;
  readonly payload: any
}

export interface ISortInToConstructortAction {
  readonly type: typeof SORT_IN_TO_CONSTRUCTOR;
  readonly payload: any
}

export interface IIncreaseCouterAction {
  readonly type: typeof INCREASE_COUTER;
}

export interface IDecreaseCouterAction {
  readonly type: typeof DECREASE_COUTER;
}

export interface IResetInToConstructortAction {
  readonly type: typeof RESET_IN_TO_CONSTRUCTOR;
}

export type TIngredientsInConstructorActions =
  | IAddFillingToConstructortAction
  | IAddBunToConstructortAction
  | IDelFillingToConstructortAction
  | ISortInToConstructortAction
  | IIncreaseCouterAction
  | IDecreaseCouterAction
  | IResetInToConstructortAction



// ===== проверка типа ингредиента =======
export function checkIngredientType(item: any) {
  const cloneItem = Object.assign({}, item);
  cloneItem.idInBurger = uuid();
  if (item.type === 'bun') {
    return { type: ADD_BUN_TO_CONSTRUCTOR, payload: cloneItem };
  }
  return { type: ADD_FILLING_TO_CONSTRUCTOR, payload: cloneItem };
}

// =====  сортировка ингредиентов  ========
export function sortInToConstructor(indexOut:any, elemIn: any, fillingList: any) {
  const indexElem = fillingList.indexOf(elemIn)
  fillingList.splice(indexElem, 1);
  fillingList.splice(indexOut, 0, elemIn);
  return fillingList
}
