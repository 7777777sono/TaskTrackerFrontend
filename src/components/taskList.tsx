import { useEffect, useState } from "react";
import { useLoginUser } from "../context/accountManagementContext";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // 追加したタスク一覧を格納する
  const [user, setUser] = useLoginUser(); // ログインしたユーザの情報を格納するオブジェクト

  useEffect(() => {
    const getTasks = async () => {
      let getTasksUrl: string =
        "http://127.0.0.1:4000/users/" + user.id + "/tasks";
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

  return (
    <>
      <div>
        <h1>タスク一覧</h1>
      </div>
      {/* タスクが存在しているかどうかによって表示内容を変更 */}
      {tasks.length > 0 ? (
        <>
          <div>
            <h3>タイトル</h3>
            <h3>締め切り</h3>
            <h3>優先度</h3>
            <h3>完了済み？</h3>
          </div>
          {tasks.map((task: any, index: number) => {
            return (
              <div key={index}>
                <h3>{task.name}</h3>
                <h3>{task.deadline}</h3>
                <h3>{task.priority}</h3>
                <h3>{task.is_complete}</h3>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskList;
