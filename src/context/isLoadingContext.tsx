import { createContext, useContext, useState } from "react";

export const isLoadingContext = createContext<any>([0, () => {}]);

export const IsLoadingProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false); // ロード中画面を表示するかどうかを判別する
  return (
    <isLoadingContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </isLoadingContext.Provider>
  );
};

export const useIsLoading = () => useContext(isLoadingContext);

