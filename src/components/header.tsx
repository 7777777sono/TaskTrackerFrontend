import { useIsLogin, useLoginUser } from "../context/accountManagementContext";

const Header = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト

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
