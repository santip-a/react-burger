import { uuid } from '../../utils/utils';

export const ADD_FILLING_TO_CONSTRUCTOR = 'ADD_FILLING_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const DEL_FILLING_T0_CONSTRUCTOR = 'DEL_FILLING_T0_CONSTRUCTOR';
export const SORT_IN_TO_CONSTRUCTOR = 'SORT_IN_TO_CONSTRUCTOR';
export const INCREASE_COUTER = 'INCREASE_COUTER';
export const DECREASE_COUTER = 'DECREASE_COUTER';


// ===== проверка типа ингредиента =======
export function checkIngredientType(item) {
  const cloneItem = Object.assign({}, item);
  cloneItem.idInBurger = uuid();
  if (item.type === 'bun') {
    return { type: ADD_BUN_TO_CONSTRUCTOR, payload: cloneItem };
  }
  return { type: ADD_FILLING_TO_CONSTRUCTOR, payload: cloneItem };
}

// =====  сортировка ингредиентов  ========
export function sortInToConstructor(indexOut, elemIn, fillingList) {
  const indexElem = fillingList.indexOf(elemIn)
  fillingList.splice(indexElem, 1);
  fillingList.splice(indexOut, 0, elemIn);
  return fillingList
}
