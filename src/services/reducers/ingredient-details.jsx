import {
  ADD_INGREDIENT_DETAILS,
  DEL_INGREDIENT_DETAILS
} from '../actions/ingredient-details'

const initialDetails = {
  elem: {}
}

export const ingredientDetalis = (state = initialDetails, action) => {
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