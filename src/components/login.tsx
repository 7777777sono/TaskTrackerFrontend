import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  useEmail,
  useIsLogin,
  useLoginUser,
  usePassword,
} from "../context/accountManagementContext";

// ログインのためのコンポーネント
const Login = () => {
  const [email, setEmail] = useEmail(); // メールアドレス
  const [password, setPassword] = usePassword(); // パスワード
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト

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
      <div>
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
          <Link
            href={{
              pathname: "/registerAndPasswordResetPage",
              query: { isRegister: false },
            }}
            legacyBehavior
          >
            <a>パスワード忘れた方</a>
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: "/registerAndPasswordResetPage",
              query: { isRegister: true },
            }}
            legacyBehavior
          >
            <a>登録はこちらから</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
