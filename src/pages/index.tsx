import Header from "../components/header";
import { LoginUserProvider } from "../context/loginUserContext";
import Home from "../components/home";

const Index = () => {
  return (
    <>
      <LoginUserProvider>
        <Header></Header>
        <Home></Home>
      </LoginUserProvider>
    </>
  );
};

export default Index;
