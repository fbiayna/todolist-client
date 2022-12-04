export type AuthenticationScreenTitleComponentProps = {
  title: string;
};

export type AuthenticationScreenInputComponentProps = {
  title: string;
  placeholder: string;
  setValue: (newValue: string) => void;
  value?: string;
};
