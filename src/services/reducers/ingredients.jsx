import {
  GET_INGREDIENTS_DATA_REQUEST,
  GET_INGREDIENTS_DATA_FAILED,
  GET_INGREDIENTS_DATA_SUCCESS
} from '../actions/ingredients'

const inicialIngredients = {
  data: [],
  isLoading: false,
  errorLoadinf: false
}

export const ingredients = (state = inicialIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_DATA_REQUEST: {
      return {        
        ...state,        
        isLoading: true,
        errorLoadinf: false
      };
    }

    case GET_INGREDIENTS_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    }

    case GET_INGREDIENTS_DATA_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorLoadinf: true
      };
    }

    default: {
      return state;
    }
  }
};