import { useEffect, useState } from "react";
import { useLoginUser } from "../context/accountManagementContext";
import axios from "axios";
import { useTasks } from "../context/tasksContext";
import styles from "../styles/task.module.scss";

const TaskList = () => {
  const [tasks, setTasks] = useTasks(); // 追加したタスク一覧を格納する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト

  useEffect(() => {
    // ユーザが登録したタスクを取得する関数
    const getTasks = async () => {
      let getTasksUrl: string =
        "https://task-tracker-ftp3.onrender.com/users/" + user.id + "/tasks";
      try {
        const response: any = await axios.get(getTasksUrl);
        setTasks(response.data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // タスク名が変更されたらtasksを更新する関数
  const tasksUpdate = async (newTaskName: string, index: number) => {
    const updatedArray = [...tasks]; // オリジナル配列のコピーを作成
    updatedArray[index].name = newTaskName; // 特定の要素を変更
    setTasks(updatedArray);
  };

  // 更新後のタスク一覧を取得する関数
  const getNewTasks = async () => {
    let getTasksUrl: string =
      "https://task-tracker-ftp3.onrender.com/users/" + user.id + "/tasks";
    try {
      const response: any = await axios.get(getTasksUrl);
      setTasks(response.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  // 登録済みのタスク名に変更があったら更新する関数
  const taskNameUpdate = async (newValue: string, task: any) => {
    let updateUrl: string = "https://task-tracker-ftp3.onrender.com/tasks/" + task.id;
    try {
      await axios.patch(updateUrl, { name: newValue, user_id: user.id });
    } catch (error) {
      alert("更新失敗しました。");
    }
    getNewTasks();
  };

  // 締切日に変更が合ったら更新する関数
  const taskDeadlineUpdate = async (newValue: string, task: any) => {
    // 文字列を日付に変換
    const date = new Date(newValue);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間を00:00:00に設定

    // 今日以降かどうか
    if (date > today) {
      let updateUrl: string = "https://task-tracker-ftp3.onrender.com/tasks/" + task.id;
      try {
        await axios.patch(updateUrl, { deadline: date, user_id: user.id });
      } catch (error) {
        alert("更新失敗しました。");
      }
      getNewTasks();
    } else {
      alert("締め切りは今日以降にしてください。");
    }
  };

  // 優先度に変更が合ったら更新する関数
  const taskPriorityUpdate = async (newValue: string, task: any) => {
    let updateUrl: string = "https://task-tracker-ftp3.onrender.com/tasks/" + task.id;
    try {
      await axios.patch(updateUrl, {
        priority: Number(newValue),
        user_id: user.id,
      });
    } catch (error) {
      alert("更新失敗しました。");
    }
    getNewTasks();
  };

  // 完了かどうかに変更が合ったら更新する関数
  const taskIsCompleteUpdate = async (newValue: string, task: any) => {
    let updateUrl: string = "https://task-tracker-ftp3.onrender.com/tasks/" + task.id;

    if (newValue === "true") {
      try {
        await axios.patch(updateUrl, {
          is_complete: true,
          user_id: user.id,
        });
      } catch (error) {
        alert("更新失敗しました。");
      }
    } else if (newValue === "false") {
      try {
        await axios.patch(updateUrl, {
          is_complete: false,
          user_id: user.id,
        });
      } catch (error) {
        alert("更新失敗しました。");
      }
    }

    getNewTasks();
  };

  // 課題を削除する関数
  const taskDelete = async (task: any) => {
    let result = confirm("本当に削除してよろしいですか？");

    if (result) {
      let deleteUrl: string = "https://task-tracker-ftp3.onrender.com/tasks/" + task.id;

      try {
        await axios.delete(deleteUrl, { data: { user_id: user.id } });
      } catch (error) {
        alert("削除に失敗しました。");
      }

      getNewTasks();
    }
  };

  // 優先度(priority)でソートしたものを格納する
  const sortedTasks = tasks.sort(
    (a: any, b: any) => Number(a.priority) - Number(b.priority)
  );

  return (
    <div className={styles.listZone}>
      <div className={styles.title}>
        <h1>タスク一覧</h1>
      </div>
      {/* タスクが存在しているかどうかによって表示内容を変更 */}
      {tasks.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>締め切り</th>
                <th>優先度</th>
                <th>完了済み？</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <input
                          className={styles.taskNameZone}
                          type="text"
                          value={task.name}
                          onChange={(e) => {
                            tasksUpdate(e.target.value, index);
                          }}
                          onBlur={(e) => {
                            taskNameUpdate(e.target.value, task);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="date"
                          value={task.deadline}
                          onChange={(e) => {
                            taskDeadlineUpdate(e.target.value, task);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <label className={styles.selectBox}>
                          <select
                            value={task.priority}
                            onChange={(e) => {
                              taskPriorityUpdate(e.target.value, task);
                            }}
                          >
                            <option value={1}>高</option>
                            <option value={2}>中</option>
                            <option value={3}>低</option>
                          </select>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div>
                        <label className={styles.selectBox}>
                          <select
                            value={task.is_complete}
                            onChange={(e) => {
                              taskIsCompleteUpdate(e.target.value, task);
                            }}
                          >
                            <option value={"true"}>完了</option>
                            <option value={"false"}>未完了</option>
                          </select>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div>
                        <button
                          className={styles.deleteButton}
                          onClick={() => {
                            taskDelete(task);
                          }}
                        >
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskList;
