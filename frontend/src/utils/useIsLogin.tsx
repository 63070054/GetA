import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useIsLogin = () => {

  const [isLogin, setIsLogin] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {

    const isLogin = Cookies.get("token") ? true : false
    setIsLogin(isLogin)

  }, [router])

  return {
    isLogin,
    setIsLogin
  };

};
