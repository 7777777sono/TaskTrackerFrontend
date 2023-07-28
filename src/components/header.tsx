import { useIsLogin, useUser } from "../context/loginUserContext";

const Header = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useUser(); // ログインしたユーザの情報を格納するオブジェクト

  // ログアウトする関数
  const logout = () => {
    setUser({});
    setIsLogin(false);
  };

  return (
    <>
      <header>
        <h1>Task Tracker</h1>
        {isLogin ? <button onClick={logout}>ログアウト</button> : <></>}
      </header>
    </>
  );
};

export default Header;
