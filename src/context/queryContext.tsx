import { useRouter } from "next/router";
import { createContext, useContext } from "react";

export const queryContext = createContext<any>({});

export const QueryProvider = ({ children }: any) => {
  const router = useRouter();
  const query = router.query; // クエリパラメータを格納しておく変数

  return (
    <queryContext.Provider value={query}>{children}</queryContext.Provider>
  );
};

export const useQuery = () => useContext(queryContext);
