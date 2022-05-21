import {combineReducers} from 'redux';
import {
  FINISHED_VERIFYING_AUTHENTICATION,
  FINISHED_SPLASH_ANIMATION,
  AUTHENTICATION_STATE,
  INITIAL_DATA_LOAD_STATE,
  USER_DATA_LOAD_STATE,
  USER_LOGGED_OUT,
  USER_AUTH_SIGN_METHOD_STATE,
} from './actions';

const APP_INTIAL_STATE = {
  didSplashAnimationFinish: false,
  didVerifyingAuthenticationFinish: false,
  isAuthenticated: false,
  isInitialDataLoaded: false,
  isUserDataLoaded: false,
  isSignedUp: false,
};

type ReducerAction = {type: string; payload: any};

const appStateReducer = (state = APP_INTIAL_STATE, action: ReducerAction) => {
  switch (action.type) {
    case FINISHED_SPLASH_ANIMATION:
      return {
        ...state,
        didSplashAnimationFinish: true,
      };
    case FINISHED_VERIFYING_AUTHENTICATION:
      return {
        ...state,
        didVerifyingAuthenticationFinish: true,
      };
    case AUTHENTICATION_STATE:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case INITIAL_DATA_LOAD_STATE:
      return {
        ...state,
        isInitialDataLoaded: action.payload,
      };
    case USER_DATA_LOAD_STATE:
      return {
        ...state,
        isUserDataLoaded: action.payload,
      };
    case USER_AUTH_SIGN_METHOD_STATE:
      return {
        ...state,
        isSignedUp: action.payload,
      };
    case USER_LOGGED_OUT:
      return {
        didSplashAnimationFinish: true,
        didVerifyingAuthenticationFinish: true,
        isAuthenticated: false,
        isInitialDataLoaded: false,
        isUserDataLoaded: false,
        isSignedUp: false,
      };
    default:
      return state;
  }
};

// Combine all these reducers to create the MAIN one
const reducer = combineReducers({
  appState: appStateReducer,
});

export default reducer;
