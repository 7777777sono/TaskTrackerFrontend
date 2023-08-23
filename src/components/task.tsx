import Link from "next/link";
import TaskAdd from "./taskAdd";
import TaskList from "./taskList";
import { useIsLogin, useLoginUser } from "../context/accountManagementContext";
import styles from "../styles/task.module.scss";

const Task = () => {
  const [isLogin, setIsLogin] = useIsLogin(); // ログインしているかどうかを判別する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト

  return (
    <>
      <TaskAdd></TaskAdd>
      <TaskList></TaskList>
      <div className={styles.linePageLinkZone}>
        <Link
          href={{
            pathname: "/notifySettingPage",
            query: { isLogin: isLogin, userId: user.id },
          }}
          legacyBehavior
        >
          <a className={styles.linePageLink}>LINEの通知設定は、こちらから</a>
        </Link>
      </div>
    </>
  );
};

export default Task;
