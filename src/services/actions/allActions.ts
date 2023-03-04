import {TAuthUserActions} from './auth-user';
import {TInredientDetalisActions}  from './ingredient-details';
import {TIngredientsInConstructorActions} from './ingredients-in-constructor';
import {TIngredientActions} from './ingredients';
import {TOrderActions} from './order';
import {TWsActions} from './wsAction';

export type TAllActions = 
  | TAuthUserActions
  | TInredientDetalisActions
  | TIngredientsInConstructorActions
  | TIngredientActions
  | TOrderActions
  | TWsActions