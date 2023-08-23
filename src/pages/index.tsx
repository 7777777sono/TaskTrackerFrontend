import HeadZone from "../components/HeadZone";
import Header from "../components/header";
import Home from "../components/home";
import { AccountManagementProvider } from "../context/accountManagementContext";
import { IsLoadingProvider } from "../context/isLoadingContext";
import { QueryProvider } from "../context/queryContext";
import { TasksProvider } from "../context/tasksContext";

const Index = () => {
  return (
    <>
      <HeadZone></HeadZone>
      <QueryProvider>
        <AccountManagementProvider>
          <Header></Header>
          <TasksProvider>
            <IsLoadingProvider>
              <Home></Home>
            </IsLoadingProvider>
          </TasksProvider>
        </AccountManagementProvider>
      </QueryProvider>
    </>
  );
};

export default Index;
