import { useState, createContext, useContext, useEffect } from "react";

export const isLoginContext = createContext<any>([0, () => {}]);
export const userContext = createContext<any>([0, () => {}]);

export const LoginUserProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false); // ログインしているかどうかを判別する
  const [user, setUser] = useState({}); // ログインしたユーザの情報を格納するオブジェクト

  // useEffect(() => {
  //   console.log(isLogin);
  // }, [isLogin]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <>
      <isLoginContext.Provider value={[isLogin, setIsLogin]}>
        <userContext.Provider value={[user, setUser]}>
          {children}
        </userContext.Provider>
      </isLoginContext.Provider>
    </>
  );
};

export const useIsLogin = () => useContext(isLoginContext);
export const useUser = () => useContext(userContext);
