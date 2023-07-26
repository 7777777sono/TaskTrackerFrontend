import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// ログインのためのコンポーネント
const Login = () => {
  const [mail, setMail] = useState(""); // メールアドレス
  const [password, setPassword] = useState(""); // パスワード
  const [users, setUsers] = useState([]); // 登録されているユーザの情報を格納する変数

  // 登録してあるユーザと入力情報が一致しているかを確認する関数
  const loginCheck = async () => {
    await getUsers();
  };

  // ユーザの情報を得る関数
  const getUsers = async () => {
    try {
      // axios.getを使ってGETリクエストを送信
      const response = await axios.get("http://127.0.0.1:4000/users");

      await setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      {/* メール入力 */}
      <div>
        <h4>Gmail</h4>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
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
