export const authActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REFRESH_ACCESS: "REFRESH_ACCESS",
};

export const login = (payload: { email: string; password: string }) => ({
  type: authActionTypes.LOGIN,
  payload,
});

export const logout = () => ({
  type: authActionTypes.LOGOUT,
});

export const refreshAccessToken = (payload: string) => ({
  type: authActionTypes.REFRESH_ACCESS,
  payload,
});
