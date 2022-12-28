import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { ingredientsInConstructor } from './ingredients-in-constructor';
import { ingredientDetalis } from './ingredient-details';
import { orderDetalis } from './order';
import { authUser } from './auth-user';
import {webSoket} from './wsReducer'

export const rootReducer = combineReducers({
  ingredients,
  ingredientsInConstructor,
  ingredientDetalis,
  orderDetalis,
  authUser,
  webSoket
});