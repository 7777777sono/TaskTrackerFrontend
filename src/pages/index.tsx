import Header from "../components/header";
import Home from "../components/home";
import { AccountManagementProvider } from "../context/accountManagementContext";
import { QueryProvider } from "../context/queryContext";
import { TasksProvider } from "../context/tasksContext";

const Index = () => {
  return (
    <>
      <QueryProvider>
        <AccountManagementProvider>
          <Header></Header>
          <TasksProvider>
            <Home></Home>
          </TasksProvider>
        </AccountManagementProvider>
      </QueryProvider>
    </>
  );
};

export default Index;
