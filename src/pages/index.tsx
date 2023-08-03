import Header from "../components/header";
import Home from "../components/home";
import { AccountManagementProvider } from "../context/accountManagementContext";
import { TasksProvider } from "../context/tasksContext";

const Index = () => {
  return (
    <>
      <AccountManagementProvider>
        <Header></Header>
        <TasksProvider>
          <Home></Home>
        </TasksProvider>
      </AccountManagementProvider>
    </>
  );
};

export default Index;
