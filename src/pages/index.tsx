import Header from "../components/header";
import Home from "../components/home";
import { AccountManagementProvider } from "../context/accountManagementContext";

const Index = () => {
  return (
    <>
      <AccountManagementProvider>
        <Header></Header>
        <Home></Home>
      </AccountManagementProvider>
    </>
  );
};

export default Index;
