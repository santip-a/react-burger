import { store } from '../store/store';
import {TAllActions} from '../actions/allActions';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

export type RootState = ReturnType<typeof store.getState>; 

//type TApplicationActions = TAllActions;


// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAllActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 