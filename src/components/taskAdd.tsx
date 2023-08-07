import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import axios from "axios";
import { useLoginUser } from "../context/accountManagementContext";

const TaskAdd = () => {
  const [tasks, setTasks] = useTasks(); // 追加したタスク一覧を格納する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト
  const [name, setName] = useState(""); // タスクの名前
  const [deadline, setDeadline] = useState(""); // 締切日
  const [priority, setPriority] = useState(""); // 優先度
  const [isDisabled, setIsDisabled] = useState(true); // disabled属性を付与するかどうかを決める変数

  useEffect(() => {
    // disabled属性を判定する関数
    const disabledCheck = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 時間を00:00:00に設定

      // タスク名が書かれているかつ締切日が今日以降かつ優先度が範囲以内ならdisabled属性の付与をなくす
      if (
        name.length > 0 &&
        new Date(deadline) > today &&
        Number(priority) >= 1 &&
        Number(priority) <= 3
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    disabledCheck();
  }, [name, deadline, priority]);

  // タスクを追加する関数
  const taskAdd = async () => {
    try {
      let postUrl: string = "http://127.0.0.1:4000/users/" + user.id + "/tasks";
      // バックエンドでログイン処理
      const response = await axios.post(postUrl, {
        name: name,
        deadline: new Date(deadline),
        priority: Number(priority),
        is_complete: false,
        user_id: user.id,
      });
      await alert(response.data.message);
    } catch (error: any) {
      alert("登録失敗しました。");
    }
    getNewTasks();
  };

  // 更新後のタスク一覧を取得する関数
  const getNewTasks = async () => {
    let getTasksUrl: string =
      "http://127.0.0.1:4000/users/" + user.id + "/tasks";
    try {
      const response: any = await axios.get(getTasksUrl);
      setTasks(response.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <div>
          <h3>タイトル</h3>
          <h3>締め切り</h3>
          <h3>優先度</h3>
          <h3>完了済み？</h3>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => {
            setDeadline(e.target.value);
          }}
        />
        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option value={1}>高</option>
          <option value={2}>中</option>
          <option value={3}>低</option>
        </select>
        <div>
          <button onClick={taskAdd} disabled={isDisabled}>
            追加
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskAdd;
