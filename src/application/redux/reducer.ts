import {combineReducers} from 'redux';
import {
  AUTHENTICATION_STATE,
  FINISHED_VERIFYING_AUTHENTICATION,
  FINISHED_SPLASH_ANIMATION,
  INITIAL_DATA_LOAD_STATE,
  USER_DATA_LOAD_STATE,
  USER_LOGGED_OUT,
} from './actions';

const APP_INTIAL_STATE = {
  isAuthenticated: false,
  isInitialDataLoaded: false,
  isUserDataLoaded: false,
  isSplashAnimationFinished: false,
  isVerifyingAuthenticationFinished: false,
};

type ReducerAction = {type: string; payload: any};

const appStateReducer = (state = APP_INTIAL_STATE, action: ReducerAction) => {
  switch (action.type) {
    case AUTHENTICATION_STATE:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case FINISHED_SPLASH_ANIMATION:
      return {
        ...state,
        isSplashAnimationFinished: true,
      };
    case FINISHED_VERIFYING_AUTHENTICATION:
      return {
        ...state,
        isVerifyingAuthenticationFinished: true,
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
    case USER_LOGGED_OUT:
      return {
        isSplashAnimationFinished: true,
        isVerifyingAuthenticationFinished: true,
        isAuthenticated: false,
        isInitialDataLoaded: false,
        isUserDataLoaded: false,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  appState: appStateReducer,
});

export default reducer;
