import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsActions
} from '../actions/wsAction'

type TInitWebSoketState = {
  wsConnected: Boolean,
  wsError: Boolean,
  orders: [],
  total: Number,
  totalToday: Number,
}

const initWebSoketState: TInitWebSoketState = {
  wsConnected: false,
  wsError: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const webSoket = (state = initWebSoketState, action: TWsActions): TInitWebSoketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        wsError: false
      };
    }

    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        wsError: true
      };
    }

    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        wsError: false,
        orders: []
      };
    }

    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    }

    default: return state;

  }
}

