import {
  GET_INGREDIENTS_DATA_REQUEST,
  GET_INGREDIENTS_DATA_FAILED,
  GET_INGREDIENTS_DATA_SUCCESS
} from '../actions/ingredients'

const initialIngredients = {
  data: [],
  isLoading: false,
  errorLoading: false
}

export const ingredients = (state = initialIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_DATA_REQUEST: {
      return {        
        ...state,        
        isLoading: true,
        errorLoading: false
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
        errorLoading: true
      };
    }

    default: {
      return state;
    }
  }
};