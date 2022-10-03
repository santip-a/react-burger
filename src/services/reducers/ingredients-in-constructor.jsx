import {
  ADD_FILLING_T0_CONSTRUCTOR,
  ADD_BUN_T0_CONSTRUCTOR,
  DEL_FILLING_T0_CONSTRUCTOR,
  ADD_IN_T0_CONSTRUCTOR
} from '../actions/ingredients-in-constructor';

const inicialConstructor = {
  filling: [],
  bunType: {},
}

export const ingredientsInConstructor = (state = inicialConstructor, action) => {
  switch (action.type) {
    case ADD_FILLING_T0_CONSTRUCTOR: {
      return {
        ...state,
        filling: [...state.filling, action.payload]       
      }
    }
    case ADD_BUN_T0_CONSTRUCTOR: {
      return {
        ...state,
        bunType: action.payload
      }
    }
    case DEL_FILLING_T0_CONSTRUCTOR: {
      return {
        ...state,
        filling: [...state.filling.filter(el => el.idInBurger !== action.payload.idInBurger)]
      }
    }
    case ADD_IN_T0_CONSTRUCTOR: {
      return {
        ...state,
        filling: [...state.filling.filter((item,index) => 
          index < action.payload.indexOut), 
          action.payload.elemIn,
          ...state.filling.filter((item,index) => 
          index > action.payload.indexOut-1)
        ]         
      }
    }
    
    default: {
      return state;
    }
  }
};