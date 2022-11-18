import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { ingredientsInConstructor } from './ingredients-in-constructor';
import { ingredientDetalis } from './ingredient-details';
import { orderDetalis } from './order';

export const rootReducer = combineReducers({
  ingredients,
  ingredientsInConstructor,
  ingredientDetalis,
  orderDetalis
});