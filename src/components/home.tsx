import { useIsLogin, useUser } from "../context/loginUserContext";
import Login from "./login";
import TaskList from "./taskList";


const Home = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useUser(); // ログインしたユーザの情報を格納するオブジェクト

  return <>
    {isLogin ? <TaskList></TaskList> : <Login></Login>}
  </>;
};

export default Home;
