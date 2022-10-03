import {
  ADD_INGREDIENT_DETALIS,
  DEL_INGREDIENT_DETALIS
} from '../actions/ingredient-details'

const inicialDetalis = {
  elem: {}
}

export const ingredientDetalis = (state = inicialDetalis, action ) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETALIS: {
      return {
        ...state,
        elem: action.payload
      };
    }
    case DEL_INGREDIENT_DETALIS: {
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