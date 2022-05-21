export const FINISHED_SPLASH_ANIMATION = 'FINISHED_SPLASH_ANIMATION';
export const FINISHED_VERIFYING_AUTHENTICATION =
  'FINISHED_VERIFYING_AUTHENTICATION';
export const AUTHENTICATION_STATE = 'AUTHENTICATION_STATE';
export const INITIAL_DATA_LOAD_STATE = 'INITIAL_DATA_LOAD_STATE';
export const USER_DATA_LOAD_STATE = 'USER_DATA_LOAD_STATE';
export const USER_AUTH_SIGN_METHOD_STATE = 'USER_AUTH_SIGN_METHOD_STATE';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

/// Helper actions

export const finishedSplashAnimation = () => {
  return {type: FINISHED_SPLASH_ANIMATION};
};

export const finishedVerifyingAuthentication = () => {
  return {type: FINISHED_VERIFYING_AUTHENTICATION};
};

export const setAuthenticationState = (isAuthenticated: boolean) => {
  return {type: AUTHENTICATION_STATE, payload: isAuthenticated};
};

export const setLoadInitialDataState = (isLoaded: boolean) => {
  return {type: INITIAL_DATA_LOAD_STATE, payload: isLoaded};
};

export const setLoadUserDataState = (isLoaded: boolean) => {
  return {type: USER_DATA_LOAD_STATE, payload: isLoaded};
};

export const setAuthenticationSignMethodState = (isSignedUp: boolean) => {
  return {type: USER_AUTH_SIGN_METHOD_STATE, payload: isSignedUp};
};

export const logOut = () => {
  return {type: USER_LOGGED_OUT};
};
