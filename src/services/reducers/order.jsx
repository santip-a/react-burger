import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_CLEAR
} from '../actions/order'

const inicialOrder = {
  order: {},
  isLoading: false,
  errorLoadinf: false
}

export const orderDetalis = (state = inicialOrder, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,        
        isLoading: true,
        errorLoadinf: false
      };
    }

    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        isLoading: false
      };
    }

    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorLoadinf: true
      };
    }

    case CREATE_ORDER_CLEAR: {
      return {
        ...state,
        order: {}
      };
    }

    default: {
      return state;
    }
  }
};