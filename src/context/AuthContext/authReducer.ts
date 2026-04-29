export interface AuthState {
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
};

type Action = { type: "LOGIN" } | { type: "LOGOUT" };

export const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isLoggedIn: true };

    case "LOGOUT":
      return { isLoggedIn: false };

    default:
      return state;
  }
};
