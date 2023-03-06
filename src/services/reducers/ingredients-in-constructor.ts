import {
  ADD_FILLING_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  DEL_FILLING_T0_CONSTRUCTOR,
  SORT_IN_TO_CONSTRUCTOR,
  RESET_IN_TO_CONSTRUCTOR,
  TIngredientsInConstructorActions
} from '../actions/ingredients-in-constructor';
import {TItemIngredient} from '../../utils/types'

type TInitialConstructor = {
  filling: TItemIngredient[] ,
  bunType: TItemIngredient ,
}

const initialConstructor: TInitialConstructor = {
  filling: [],
  bunType: {	
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    idInBurger: '',
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: ''
  },
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
        filling: state.filling.filter((el: TItemIngredient) => el.idInBurger !== action.payload.idInBurger)
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
        bunType: {
          calories: 0,
          carbohydrates: 0,
          fat: 0,
          idInBurger: '',
          image: '',
          image_large: '',
          image_mobile: '',
          name: '',
          price: 0,
          proteins: 0,
          type: '',
          __v: 0,
          _id: ''
        },
        filling: []
      }
    }

    default: {
      return state;
    }
  }
};