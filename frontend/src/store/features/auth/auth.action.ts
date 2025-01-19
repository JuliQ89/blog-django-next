export const authActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  CREATE_ACCOUNT: "CREATE_ACCOUNT",
  REFRESH_ACCESS: "REFRESH_ACCESS",
};

export const login = (payload: { email: string; password: string }) => ({
  type: authActionTypes.LOGIN,
  payload,
});

export const create_account = (payload: {
  username: string;
  email: string;
  password: string;
}) => ({
  type: authActionTypes.CREATE_ACCOUNT,
  payload,
});

export const logout = () => ({
  type: authActionTypes.LOGOUT,
});

export const refreshAccessToken = (payload: string) => ({
  type: authActionTypes.REFRESH_ACCESS,
  payload,
});
