import {
  GET_INGREDIENTS_DATA_REQUEST,
  GET_INGREDIENTS_DATA_FAILED,
  GET_INGREDIENTS_DATA_SUCCESS,
  TIngredientActions
} from '../actions/ingredients'

type TInitialIngredients = {
  data: [],
  isLoading: boolean,
  errorLoading: boolean
}

const initialIngredients: TInitialIngredients = {
  data: [],
  isLoading: false,
  errorLoading: false
}

export const ingredients = (state = initialIngredients, action: TIngredientActions): TInitialIngredients => {
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