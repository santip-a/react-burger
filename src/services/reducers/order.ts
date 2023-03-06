import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_CLEAR,
  TOrderActions
} from '../actions/order'
import {TOrder, TItemIngredient} from '../../utils/types'

type TInicialOrder = {
  order: TOrder 
  isLoading: boolean,
  errorLoadinf: boolean
}

const inicialOrder: TInicialOrder = {
  order: {
    name: '',
    order: {
      createdAt: '',
      ingredients: [],
      length: 0,
      name: '',
      number: 0,
      owner: {
        createdAt: '',
        email: '',
        name: '',
        updatedAt: '',
      },
      price: 0,
      status: '',
      updatedAt: '',
      _id: '',
    },
    success: false
  },
  isLoading: false,
  errorLoadinf: false
}

export const orderDetalis = (state = inicialOrder, action:TOrderActions): TInicialOrder => {
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
        order: {
          name: '',
          order: {
            createdAt: '',
            ingredients: [],
            length: 0,
            name: '',
            number: 0,
            owner: {
              createdAt: '',
              email: '',
              name: '',
              updatedAt: '',
            },
            price: 0,
            status: '',
            updatedAt: '',
            _id: '',
          },
          success: false
        }
      };
    }

    default: {
      return state;
    }
  }
};