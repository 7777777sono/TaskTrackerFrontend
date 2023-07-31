import Header from "../components/header";
import RegisterAndPasswordReset from "../components/registerAndPasswordReset";
import { QueryProvider } from "../context/queryContext";
import { AccountManagementProvider } from "../context/accountManagementContext";

const RegisterAndPasswordResetPage = () => {
  return (
    <>
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
