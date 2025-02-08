"use client";

import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { loginSuccess } from "@/store/features/auth/auth.slice";
import { logoutSuccess } from "@/store/features/auth/auth.slice";
import { refreshAccessToken } from "@/store/features/auth/auth.action";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";

interface LoginLayoutI {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutI) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    if (!access_token || !refresh_token) {
      setIsLoading(true);
      return;
    }

    try {
      dispatch(refreshAccessToken(refresh_token));
      dispatch(loginSuccess(access_token));
    } catch (error) {
      console.log(error);
      dispatch(logoutSuccess());
    }
    setIsLoading(true);
  }, []);

  if (isLoading) {
    return <>{children}</>;
  }
};

export default LoginLayout;
