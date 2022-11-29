import { getCookie } from '../api/api';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

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