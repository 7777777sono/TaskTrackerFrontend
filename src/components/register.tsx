import { useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  type userInfoType = {
    name: string;
    email: string;
    google_id: string;
    password: string;
  };

  // 何でも追加できるようにする
  interface googleAccountInfo {
    [prop: string]: any;
  }

  const [googleAccountIsFirstRender, setGoogleAccountIsFirstRender] =
    useState(true); // (グーグルアカウントの情報のときの) 初回レンダリング時に無視するための変数
  const [registerUserIsFirstRender, setRegisterUserIsFirstRender] =
    useState(true); // (登録ユーザの情報のときの) 初回レンダリング時に無視するための変数
  const [isPasswordValid, setIsPasswordValid] = useState(true); // パスワードの文字数が適切な文字数(5~20)なのかを判別する変数
  const [password, setPassword] = useState(""); // パスワード
  const [confirmPassword, setConfirmPassword] = useState(""); // 確認用パスワード
  const [registerUserInfo, setRegisterUserInfo] = useState<userInfoType>({
    name: "",
    email: "",
    google_id: "",
    password: "",
  }); // 登録するユーザの情報を格納するオブジェクト
  // 取得するグーグルアカウントの情報を格納しておく
  const [googleAccountInfo, setGoogleAccountInfo] = useState<googleAccountInfo>(
    {}
  );
  const router = useRouter();

  useEffect(() => {
    const minPasswordValid: number = 5; // パスワードの最小文字数
    const maxPasswordValid: number = 20; // パスワードの最大文字数
    // パスワードの文字数が適切なら登録できるようにする。
    if (
      minPasswordValid <= password.length &&
      password.length <= maxPasswordValid
    ) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  }, [password]);

  useEffect(() => {
    // 初回のレンダリング時は無視する
    if (googleAccountIsFirstRender) {
      setGoogleAccountIsFirstRender(false);
      return;
    }

    setRegisterUserInfo({
      name: googleAccountInfo.displayName,
      email: googleAccountInfo.email,
      google_id: googleAccountInfo.uid,
      password: password,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleAccountInfo]);

  useEffect(() => {
    // ユーザ情報を送る関数
    const userDataPost = async () => {
      try {
        // axios.postを使ってPOSTリクエストを送信
        const response = await axios.post(
          "http://127.0.0.1:4000/users",
          registerUserInfo
        );
        await alert(response.data.message);
        // 登録の処理が終了したら最初のページ戻す。
        router.push("/");
      } catch (error) {
        alert("登録失敗しました。一度ログインページに戻します。");
        router.push("/");
      }
    };

    // 初回のレンダリング時は無視する
    if (registerUserIsFirstRender) {
      setRegisterUserIsFirstRender(false);
      return;
    }

    userDataPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerUserInfo]);

  // Googleアカウント情報を得る関数
  const getGoogleAccountInfo = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // ユーザーの身元情報を表す認証情報
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // type Guard (credentialがnullの可能性があるため)
        if (credential !== null) {
          const token = credential.accessToken;
        }
        // アカウントの情報が格納
        setGoogleAccountInfo(result.user);
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
      });
  };

  // 新規登録を行う関数
  const signup = async () => {
    if (passwardCheck()) {
      await getGoogleAccountInfo();
    } else {
      alert("パスワードが異なります。");
    }
  };

  // パスワードが一致しているのかを確認する関数
  const passwardCheck = () => {
    if (password === confirmPassword) {
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
          <button onClick={signup} disabled={isPasswordValid}>
            登録
          </button>
        </div>
        <h6>※5文字から20文字まででお願いします。</h6>
      </div>
    </>
  );
};

export default Register;
