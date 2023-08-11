import Image from "next/image";
import { useIsLogin, useLoginUser } from "../context/accountManagementContext";
import headerStyles from "../styles/header.module.scss";

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
      <header className={headerStyles.headerZone}>
        <h1 className={headerStyles.title}>Task Tracker</h1>
        {isLogin ? (
          <Image
            src="/images/logout_icon.png"
            alt="logout"
            width={35}
            height={35}
            className={headerStyles.logoutImage}
            onClick={logout}
          />
        ) : (
          <></>
        )}
        
      </header>
    </>
  );
};

export default Header;
