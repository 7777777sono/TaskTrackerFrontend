import { useState } from "react";

const Register = () => {
  const [password, setPassword] = useState(""); // パスワード
  const [confirmPassword, setConfirmPassword] = useState(""); // 確認用パスワード

  // 新規登録を行う関数
  const signup = async () => {
    if (passwardCheck()) {
    }
  };

  // パスワードが一致しているのかを確認する関数
  const passwardCheck = () => {
    if (password == confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div>
        <div>
          <h4>下にある入力欄からパスワードを決めてください。</h4>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <h4>確認用</h4>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={signup}>登録</button>
        </div>
        <h6>※5文字から20文字まででお願いします。</h6>
      </div>
    </>
  );
};

export default Register;
