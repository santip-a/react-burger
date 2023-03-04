import {
  ADD_FILLING_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  DEL_FILLING_T0_CONSTRUCTOR,
  SORT_IN_TO_CONSTRUCTOR,
  RESET_IN_TO_CONSTRUCTOR,
  TIngredientsInConstructorActions
} from '../actions/ingredients-in-constructor';

type TInitialConstructor = {
  filling: any[] | any[] ,
  bunType: {} | any,
}

const initialConstructor: TInitialConstructor = {
  filling: [],
  bunType: {},
}


export const ingredientsInConstructor = (state = initialConstructor, action: TIngredientsInConstructorActions): TInitialConstructor => {
  switch (action.type) {
    case ADD_FILLING_TO_CONSTRUCTOR: {
      return {
        ...state,
        filling: [...state.filling, action.payload]
      }
    }

    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bunType: action.payload
      }
    }

    case DEL_FILLING_T0_CONSTRUCTOR: {
      return {
        ...state,
        filling: state.filling.filter((el: any) => el.idInBurger !== action.payload.idInBurger)
      }
    }

    case SORT_IN_TO_CONSTRUCTOR: {
      return {
        ...state,
        filling: [...action.payload]
      }
    }

    case RESET_IN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bunType: {},
        filling: []
      }
    }

    default: {
      return state;
    }
  }
};