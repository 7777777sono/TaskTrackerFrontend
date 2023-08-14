import { useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import axios from "axios";
import {
  useConfirmPassword,
  useEmail,
  useGoogleAccountInfo,
  usePassword,
  useUserId,
  useUserInfo,
} from "../context/accountManagementContext";
import passwordResetStyles from "../styles/form.module.scss";
import { useIsLoading } from "../context/isLoadingContext";

const PasswordReset = () => {
  const [email, setEmail] = useEmail(); // メールアドレス
  const [isPasswordValid, setIsPasswordValid] = useState(true); // パスワードの文字数が適切な文字数(5~20)なのかを判別する変数
  const [password, setPassword] = usePassword(); // パスワード
  const [confirmPassword, setConfirmPassword] = useConfirmPassword(); // 確認用パスワード
  const [updateUserId, setUpdateUserId] = useUserId(); // 更新するユーザのidを格納する関数
  const [updateUserInfo, setUpdateUserInfo] = useUserInfo(); // 更新するユーザの情報を格納するオブジェクト
  const [googleAccountInfo, setGoogleAccountInfo] = useGoogleAccountInfo(); // 取得するグーグルアカウントの情報を格納しておく
  const [isLoading, setIsLoading] = useIsLoading(); // ロード中かどうかを判別する
  const [googleAccountIsFirstRender, setGoogleAccountIsFirstRender] =
    useState(true); // (グーグルアカウントの情報のときの) 初回レンダリング時に無視するための変数
  const [updateUserIsFirstRender, setUpdateUserIsFirstRender] = useState(true); // (更新ユーザの情報のときの) 初回レンダリング時に無視するための変数
  const [updateUserIdIsFirstRender, setUpdateUserIdIsFirstRender] =
    useState(true); // (更新ユーザのidのときの) 初回レンダリング時に無視するための変数
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

    // 入力したアドレスと取得したアドレスが一致していたらユーザの情報として登録を行う。
    if (email === googleAccountInfo.email) {
      setUpdateUserInfo({
        name: googleAccountInfo.displayName,
        email: googleAccountInfo.email,
        google_id: googleAccountInfo.uid,
        password: password,
        is_update: true,
      });
    } else {
      setIsLoading(false);
      alert("メールアドレスが違います。一度ログインページに戻します。");
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleAccountInfo]);

  useEffect(() => {
    // ユーザ情報を送る関数
    const userDataPost = async () => {
      try {
        // axios.postを使ってPOSTリクエストを送信
        const response = await axios.post(
          "http://127.0.0.1:4000/users",
          updateUserInfo
        );
        await setUpdateUserId(response.data.id);
      } catch (error) {
        setIsLoading(false);
        alert("エラーが発生しました。一度ログインページに戻します。");
        router.push("/");
      }
    };

    // 初回のレンダリング時は無視する
    if (updateUserIsFirstRender) {
      setUpdateUserIsFirstRender(false);
      return;
    }

    userDataPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserInfo]);

  useEffect(() => {
    // パスワードリセットを行う関数。
    const passwordReset = async () => {
      let updateUrl: string = "http://127.0.0.1:4000/users/" + updateUserId;
      try {
        const response = await axios.patch(updateUrl, { password: password });
        setIsLoading(false);
        await alert(response.data.message);
        router.push("/");
      } catch (error) {
        setIsLoading(false);
        alert("更新失敗しました。一度ログインページに戻します。");
        router.push("/");
      }
    };

    // 初回のレンダリング時は無視する
    if (updateUserIdIsFirstRender) {
      setUpdateUserIdIsFirstRender(false);
      return;
    }

    // 更新ユーザのidを取得したら更新パスワードを送る。
    if (updateUserId !== -1) {
      passwordReset();
    } else {
      setIsLoading(false);
      alert("登録してください。一度ログインページに戻します。");
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserId]);

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

  // パスワードリセットを行う関数
  const passwordReset = async () => {
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
      <div className={passwordResetStyles.form}>
        <div>
          <h3 className={passwordResetStyles.passwordResetDescription}>
            登録したメールアドレスと再設定するパスワードを入力してください。
          </h3>
        </div>
        {/* メール入力 */}
        <div>
          <input
            type="email"
            placeholder="Gmail"
            value={email}
            className={passwordResetStyles.inputForm}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={passwordResetStyles.inputForm}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className={passwordResetStyles.inputForm}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className={passwordResetStyles.formButton}
            onClick={passwordReset}
            disabled={isPasswordValid}
          >
            再決定
          </button>
        </div>
        <div>
          <h6 className={passwordResetStyles.precautions}>
            ※5文字から20文字まででお願いします。
          </h6>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
