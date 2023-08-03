import { createContext, useContext, useState } from "react";

export const tasksContext = createContext<any>({});

export const TasksProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState([]); // 追加したタスク一覧を格納する

  return (
    <tasksContext.Provider value={[tasks, setTasks]}>
      {children}
    </tasksContext.Provider>
  );
};

export const useTasks = () => useContext(tasksContext);
