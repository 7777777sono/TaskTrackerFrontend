import { useIsLogin, useLoginUser } from "../context/accountManagementContext";
import { useQuery } from "../context/queryContext";
import Login from "./login";
import Task from "./task";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト
  const query = useQuery(); // クエリパラメータを格納する

  useEffect(() => {
    // ログインしたユーザの情報の取得をする関数
    const getLoginUser = async () => {
      let getLoginUserUrl: string =
        "https://task-tracker-ftp3.onrender.com/users/" + query.userId;
      try {
        const response = await axios.get(getLoginUserUrl);
        setUser(response.data);
        setIsLogin(true);
      } catch (error) {
        setIsLogin(false);
        alert("ユーザの情報取得に失敗しましたのでログアウトしました。");
      }
    };

    // クエリパラメータが空かどうかを判別
    const isQueryParamEmpty: boolean = Object.keys(query).length === 0;
    if (!isQueryParamEmpty && query.isLogin === "true") {
      getLoginUser();
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLogin ? <Task></Task> : <Login></Login>}</>;
};

export default Home;
