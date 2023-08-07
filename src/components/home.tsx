import { useIsLogin, useLoginUser } from "../context/accountManagementContext";
import Login from "./login";
import Task from "./task";

const Home = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト

  return <>{isLogin ? <Task></Task> : <Login></Login>}</>;
};

export default Home;
