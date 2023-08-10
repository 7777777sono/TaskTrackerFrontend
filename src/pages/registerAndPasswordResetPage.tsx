import Header from "../components/header";
import RegisterAndPasswordReset from "../components/registerAndPasswordReset";
import { QueryProvider } from "../context/queryContext";
import { AccountManagementProvider } from "../context/accountManagementContext";
import HeadZone from "../components/HeadZone";

const RegisterAndPasswordResetPage = () => {
  return (
    <>
      <HeadZone></HeadZone>
      <QueryProvider>
        <AccountManagementProvider>
          <Header></Header>
          <RegisterAndPasswordReset></RegisterAndPasswordReset>
        </AccountManagementProvider>
      </QueryProvider>
    </>
  );
};

export default RegisterAndPasswordResetPage;
