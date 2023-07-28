import { useState, createContext, useContext } from "react";

export const isLoginContext = createContext<any>([0, () => {}]);
export const userContext = createContext<any>([0, () => {}]);

export const LoginUserProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false); // ログインしているかどうかを判別する
  const [user, setUser] = useState({}); // ログインしたユーザの情報を格納するオブジェクト

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
