import { getCookie } from '../api/api';
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from '../types';
import {TwsActionsTypes} from '../actions/wsAction'

export const socketMiddleware = (wsUrl: string, wsActions: TwsActionsTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload  } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage } = wsActions;
      if (action.user && type === wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')}`);
      } else if (type === wsInit) {  
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = evt => {
          dispatch({ type: onOpen, payload: evt });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parseData = JSON.parse(data);
          const { success, ...restParseData } = parseData;
          dispatch({ type: onMessage, payload: restParseData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

      }

      next(action);
    };
  };

}