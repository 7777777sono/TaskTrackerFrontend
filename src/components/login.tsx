import Link from "next/link";

// ログインのためのコンポーネント
const Login = () => {
  return (
    <>
      {/* メール入力 */}
      <div>
        <h4>Gmail</h4>
        <input type="email" />
      </div>
      {/* パスワード入力 */}
      <div>
        <h4>パスワード</h4>
        <input type="password" />
      </div>
      {/* メールとパスワードが登録したのと一致したらログインする。 */}
      <div>
        <button>ログイン</button>
      </div>
      <div>
        <h5>登録してない人は下のリンクからお願いします。</h5>
        <>
          <Link href={{ pathname: "/" }} legacyBehavior>
            <a>登録はこちらから</a>
          </Link>
        </>
      </div>
    </>
  );
};

export default Login;
