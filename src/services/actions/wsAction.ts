export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export interface IIwsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string | null | undefined;
  readonly user: boolean | undefined;
}

export interface IwsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IwsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IwsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IwsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {orders: [], total: number, totalToday: number};
}

export type TWsActions = 
  | IIwsConnectionStartAction
  | IwsConnectionSuccessAction
  | IwsConnectionErrorAction
  | IwsConnectionClosedAction
  | IwsGetMessageAction

export type TwsActionsTypes = {
  wsInit: typeof  WS_CONNECTION_START,
  onOpen: typeof  WS_CONNECTION_SUCCESS,
  onClose: typeof  WS_CONNECTION_CLOSED,
  onError: typeof  WS_CONNECTION_ERROR,
  onMessage: typeof  WS_GET_MESSAGE
} 

export const wsActions: TwsActionsTypes = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}

export const wsConnectionStart = (payload?: string | null, user?: boolean): IIwsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload,
    user
  };
};

export const wsConnectionSuccess = (): IwsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IwsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IwsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = (message: {orders: [], total: number, totalToday: number}): IwsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};


