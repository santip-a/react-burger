import { type } from "os";
import {TItemIngredient} from '../../utils/types'

export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DEL_INGREDIENT_DETAILS: 'DEL_INGREDIENT_DETAILS' = 'DEL_INGREDIENT_DETAILS'

export interface IAddIngredientDetalisAction {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  readonly payload: TItemIngredient
}

export interface IDelIngredientDetalisAction {
  readonly type: typeof DEL_INGREDIENT_DETAILS;
}

export type TInredientDetalisActions = 
  | IAddIngredientDetalisAction
  | IDelIngredientDetalisAction
