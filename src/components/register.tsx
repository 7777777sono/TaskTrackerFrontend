import { useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";
import {
  useConfirmPassword,
  useGoogleAccountInfo,
  useIsPasswordValid,
  usePassword,
  useUserInfo,
} from "../context/accountManagementContext";
import registerStyles from "../styles/form.module.scss";
import { useIsLoading } from "../context/isLoadingContext";

const Register = () => {
  const [isPasswordValid, setIsPasswordValid] = useIsPasswordValid(); // パスワードの文字数が適切な文字数(5~20)なのかを判別する変数
  const [password, setPassword] = usePassword(); // パスワード
  const [confirmPassword, setConfirmPassword] = useConfirmPassword(); // 確認用パスワード
  const [registerUserInfo, setRegisterUserInfo] = useUserInfo(); // 登録するユーザの情報を格納するオブジェクト
  const [googleAccountInfo, setGoogleAccountInfo] = useGoogleAccountInfo(); // 取得するグーグルアカウントの情報を格納しておく
  const [isLoading, setIsLoading] = useIsLoading(); // ロード中かどうかを判別する
  const [googleAccountIsFirstRender, setGoogleAccountIsFirstRender] =
    useState(true); // (グーグルアカウントの情報のときの) 初回レンダリング時に無視するための変数
  const [registerUserIsFirstRender, setRegisterUserIsFirstRender] =
    useState(true); // (登録ユーザの情報のときの) 初回レンダリング時に無視するための変数
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      is_update: false,
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
        setIsLoading(false);
        await alert(response.data.message);
        // 登録の処理が終了したら最初のページ戻す。
        router.push("/");
      } catch (error) {
        setIsLoading(false);
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
        setIsLoading(false);
        console.error("エラーが発生しました:", error);
      });
  };

  // 新規登録を行う関数
  const signup = async () => {
    setIsLoading(true);
    if (passwordCheck()) {
      await getGoogleAccountInfo();
    } else {
      setIsLoading(false);
      alert("パスワードが異なります。");
    }
  };

  // パスワードが一致しているのかを確認する関数
  const passwordCheck = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className={registerStyles.form}>
        <div>
          <h3 className={registerStyles.description}>
            下にある入力欄からパスワードを決めてください。
          </h3>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={registerStyles.inputForm}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className={registerStyles.inputForm}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className={registerStyles.formButton}
            onClick={signup}
            disabled={isPasswordValid}
          >
            登録
          </button>
        </div>
        <div>
          <h6 className={registerStyles.precautions}>
            ※5文字から20文字まででお願いします。
          </h6>
        </div>
      </div>
    </>
  );
};

export default Register;
