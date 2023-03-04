import {
  API_REQUEST,
  USER_AUTH,
  API_FAILED,
  USER_EXIT,
  TOKEN_UPDATED,
  TOKEN_UPDATED_FAILED,
  FORGOT_PASSWORD,
  RESET_FORGOT_PASSWORD,
  RESET_PASSWORD,
  SET_PASSWORD,
  TAuthUserActions
} from '../actions/auth-user';

type TUserAuth = {
  name?: string 
  email?: string 
  password?: string 
}

type TInitialAuthUser = {
  user: TUserAuth | {} ,
  userAuth?: boolean,

  tokenUpdated?: boolean,
  errorTokenUpdated?: boolean,

  isLoading?: boolean,
  errorLoading?: boolean,

  forgotPassword?: boolean,
  resetPassword?: boolean
}


const initialAuthUser: TInitialAuthUser = {
  user: {
    name: '',
    email: '',
    password: ''
  },
  userAuth: false,

  tokenUpdated: false,
  errorTokenUpdated: false,

  isLoading: false,
  errorLoading: false,

  forgotPassword: false,
  resetPassword: false
}

export const authUser = (state = initialAuthUser, action: TAuthUserActions): TInitialAuthUser => {
  switch (action.type) {
    case API_REQUEST: {
      return {
        ...state,
        isLoading: true,
        errorLoading: false
      };
    }
    
    case USER_AUTH: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email
        },
        isLoading: false,
        userAuth: true
      };
    }

    case API_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorLoading: true
      };
    }

    case USER_EXIT: {
      return {
        ...state,
        user: {},
        userAuth: false,
        isLoading: false,
        errorLoading: false,
        forgotPassword: false,
        resetPassword: false
      };
    }

    case FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPassword: true
      };
    }

    case RESET_FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPassword: false
      };
    }

    case RESET_PASSWORD: {
      return {
        ...state,
        resetPassword: true
      };
    }

    case SET_PASSWORD: {
      return {
        user: {
          ...state.user,
          password: action.payload
        }
      };
    }

    case TOKEN_UPDATED: {
      return {
        ...state,
        tokenUpdated: true,
        errorTokenUpdated: false
      };
    }

    case TOKEN_UPDATED_FAILED: {
      return {
        ...state,
        tokenUpdated: false,
        errorTokenUpdated: true
      };
    }

    default: {
      return state;
    }
  }
};