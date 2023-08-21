import { useRouter } from "next/router";
import { useIsLogin, useLoginUser } from "../context/accountManagementContext";
import { useQuery } from "../context/queryContext";
import { useState, useEffect } from "react";
import axios from "axios";
import NotifyTokenGetDescription from "./notifyTokenGetDescription";
import Link from "next/link";
import styles from "../styles/form.module.scss";

const NotifySetting = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト
  const [token, setToken] = useState(""); // ラインに通知を送る際に必要なトークンを格納する
  const query = useQuery(); // クエリパラメータを格納する
  const router = useRouter();

  useEffect(() => {
    // ログインしたユーザの情報の取得をする関数
    const getLoginUser = async () => {
      let getLoginUserUrl: string =
        "http://127.0.0.1:4000/users/" + query.userId;
      try {
        const response = await axios.get(getLoginUserUrl);
        setUser(response.data);
      } catch (error) {
        alert("ユーザの情報取得に失敗しました。");
        router.push({
          pathname: "/",
          query: { isLogin: query.isLogin, userId: query.userId },
        });
      }
    };

    if (query.isLogin === "true") {
      setIsLogin(true);
      getLoginUser();
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 入力したトークンを登録する。
  const registerToken = async () => {
    try {
      let registerTokenUrl: string =
        "http://127.0.0.1:4000/line_tokens/" + user.id;
      const response: any = await axios.patch(registerTokenUrl, {
        token: token,
        user_id: user.id,
      });
      await alert(response.data.message);
      router.push({
        pathname: "/",
        query: { isLogin: isLogin, userId: user.id },
      });
    } catch (error) {
      console.log(error);
      alert("トークンの登録に失敗しました。");
      router.push({
        pathname: "/",
        query: { isLogin: isLogin, userId: user.id },
      });
    }
  };

  return (
    <>
      <div className={styles.form}>
        {isLogin ? (
          <>
            <div>
              <h3 className={styles.description}>
                トークンを入力してください。
              </h3>
            </div>
            <div>
              <input
                type="text"
                placeholder="トークン"
                className={styles.inputForm}
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                }}
              />
            </div>
            <div>
              <button className={styles.formButton} onClick={registerToken}>
                登録
              </button>
            </div>
          </>
        ) : (
          <div>
            <h3 className={styles.description}>
              以下のリンクよりお戻りください。
            </h3>
          </div>
        )}
        <div>
          <Link
            href={{
              pathname: "/",
              query: { isLogin: isLogin, userId: user.id },
            }}
            legacyBehavior
          >
            <a className={styles.link}>戻る</a>
          </Link>
        </div>
      </div>
      {isLogin ? (
        <NotifyTokenGetDescription></NotifyTokenGetDescription>
      ) : (
        <></>
      )}
    </>
  );
};

export default NotifySetting;
