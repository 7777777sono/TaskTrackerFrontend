import { useIsLogin, useLoginUser } from "../context/accountManagementContext";
import Login from "./login";
import TaskList from "./taskList";

const Home = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト

  return <>{isLogin ? <TaskList></TaskList> : <Login></Login>}</>;
};

export default Home;
