import { IsRegisterProvider } from "../context/isRegisterContext";
import { LoginUserProvider } from "../context/loginUserContext";
import Header from "../components/header";
import RegisterAndPasswordReset from "../components/registerAndPasswordReset";
import { QueryProvider } from "../context/queryContext";

const RegisterAndPasswordResetPage = () => {
  return (
    <>
      <QueryProvider>
        <LoginUserProvider>
          <Header></Header>
          <IsRegisterProvider>
            <RegisterAndPasswordReset></RegisterAndPasswordReset>
          </IsRegisterProvider>
        </LoginUserProvider>
      </QueryProvider>
    </>
  );
};

export default RegisterAndPasswordResetPage;
