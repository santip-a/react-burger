import {
  ADD_INGREDIENT_DETAILS,
  DEL_INGREDIENT_DETAILS,
  TInredientDetalisActions
} from '../actions/ingredient-details'

type TInitialDetails = {
  elem: {}
}

const initialDetails: TInitialDetails = {
  elem: {}
}

export const ingredientDetalis = (state = initialDetails, action: TInredientDetalisActions): TInitialDetails => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        elem: action.payload
      };
    }
    case DEL_INGREDIENT_DETAILS: {
      return {
        ...state,
        elem: {}
      };
    }

    default: {
      return state;
    }
  }
};