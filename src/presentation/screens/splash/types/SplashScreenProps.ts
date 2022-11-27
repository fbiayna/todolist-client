export type SplashScreenProps = {
  finishedSplashAnimation: () => void;
  finishedVerifyingAuthentication: () => void;
  setAuthenticationState: (isAuthenticated: boolean) => void;
};
