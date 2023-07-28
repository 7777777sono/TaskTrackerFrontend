import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useIsLogin, useUser } from "../context/loginUserContext";

// ログインのためのコンポーネント
const Login = () => {
  const [email, setEmail] = useState(""); // メールアドレス
  const [password, setPassword] = useState(""); // パスワード
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useUser(); // ログインしたユーザの情報を格納するオブジェクト

  // 登録してあるユーザと入力情報が一致しているかを確認する関数
  const loginCheck = async () => {
    await postInputDatas();
  };

  // 入力した情報を送る関数
  const postInputDatas = async () => {
    try {
      // バックエンドでログイン処理
      const response = await axios.post("http://127.0.0.1:4000/sessions", {
        email: email,
        password: password,
      });

      setIsLogin(true);
      setUser(response.data.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      {/* メール入力 */}
      <div>
        <h4>Gmail</h4>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* パスワード入力 */}
      <div>
        <h4>パスワード</h4>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* メールとパスワードが登録したのと一致したらログインする。 */}
      <div>
        <button onClick={loginCheck}>ログイン</button>
      </div>
      <div>
        <h5>登録してない人は下のリンクからお願いします。</h5>
        <>
          <Link href={{ pathname: "/registerPage" }} legacyBehavior>
            <a>登録はこちらから</a>
          </Link>
        </>
      </div>
    </>
  );
};

export default Login;
