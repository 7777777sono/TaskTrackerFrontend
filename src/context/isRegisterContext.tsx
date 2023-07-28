import { useState, createContext, useContext } from "react";

export const isRegisterContext = createContext<any>([0, () => {}]);

export const IsRegisterProvider = ({ children }: any) => {
  const [isRegister, setIsRegister] = useState(false); // 登録するどうかを判別する

  return (
    <>
      <isRegisterContext.Provider value={[isRegister, setIsRegister]}>
        {children}
      </isRegisterContext.Provider>
    </>
  );
};

export const useIsLogin = () => useContext(isRegisterContext);
