import { useState, createContext, useContext, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../libs/firebase";

export const isLoginContext = createContext<any>([0, () => {}]);
export const loginUserContext = createContext<any>([0, () => {}]);
export const isRegisterContext = createContext<any>([0, () => {}]);
export const isPasswordValidContext = createContext<any>([0, () => {}]);
export const emailContext = createContext<any>([0, () => {}]);
export const passwordContext = createContext<any>([0, () => {}]);
export const confirmPasswordContext = createContext<any>([0, () => {}]);
export const userIdContext = createContext<any>([0, () => {}]);
export const userInfoContext = createContext<any>([0, () => {}]);
export const googleAccountInfoContext = createContext<any>([0, () => {}]);

export const AccountManagementProvider = ({ children }: any) => {
  type userInfoType = {
    name: string;
    email: string;
    google_id: string;
    password: string;
    is_update: boolean;
  };

  // 何でも追加できるようにする
  interface googleAccountInfo {
    [prop: string]: any;
  }

  const [isLogin, setIsLogin] = useState(false); // ログインしているかどうかを判別する
  const [loginUser, setLoginUser] = useState({}); // ログインしたユーザの情報を格納するオブジェクト
  const [isRegister, setIsRegister] = useState(false); // 登録するどうかを判別する
  const [isPasswordValid, setIsPasswordValid] = useState(true); // パスワードの文字数が適切な文字数(5~20)なのかを判別する変数
  const [email, setEmail] = useState(""); // メールアドレス
  const [password, setPassword] = useState(""); // パスワード
  const [confirmPassword, setConfirmPassword] = useState(""); // 確認用パスワード
  const [userId, setUserId] = useState(0); // ユーザidを格納する関数
  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: "",
    email: "",
    google_id: "",
    password: "",
    is_update: false,
  }); // 登録するユーザの情報を格納するオブジェクト
  const [googleAccountInfo, setGoogleAccountInfo] = useState<googleAccountInfo>(
    {}
  ); // 取得するグーグルアカウントの情報を格納しておく

  return (
    <>
      <isLoginContext.Provider value={[isLogin, setIsLogin]}>
        <loginUserContext.Provider value={[loginUser, setLoginUser]}>
          <isRegisterContext.Provider value={[isRegister, setIsRegister]}>
            <isPasswordValidContext.Provider
              value={[isPasswordValid, setIsPasswordValid]}
            >
              <emailContext.Provider value={[email, setEmail]}>
                <passwordContext.Provider value={[password, setPassword]}>
                  <confirmPasswordContext.Provider
                    value={[confirmPassword, setConfirmPassword]}
                  >
                    <userIdContext.Provider value={[userId, setUserId]}>
                      <userInfoContext.Provider value={[userInfo, setUserInfo]}>
                        <googleAccountInfoContext.Provider
                          value={[googleAccountInfo, setGoogleAccountInfo]}
                        >
                          {children}
                        </googleAccountInfoContext.Provider>
                      </userInfoContext.Provider>
                    </userIdContext.Provider>
                  </confirmPasswordContext.Provider>
                </passwordContext.Provider>
              </emailContext.Provider>
            </isPasswordValidContext.Provider>
          </isRegisterContext.Provider>
        </loginUserContext.Provider>
      </isLoginContext.Provider>
    </>
  );
};

export const useIsLogin = () => useContext(isLoginContext);
export const useLoginUser = () => useContext(loginUserContext);
export const useIsRegister = () => useContext(isRegisterContext);
export const useIsPasswordValid = () => useContext(isPasswordValidContext);
export const useEmail = () => useContext(emailContext);
export const usePassword = () => useContext(passwordContext);
export const useConfirmPassword = () => useContext(confirmPasswordContext);
export const useUserId = () => useContext(userIdContext);
export const useUserInfo = () => useContext(userInfoContext);
export const useGoogleAccountInfo = () => useContext(googleAccountInfoContext);
