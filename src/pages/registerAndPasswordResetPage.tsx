import Header from "../components/header";
import RegisterAndPasswordReset from "../components/registerAndPasswordReset";
import { QueryProvider } from "../context/queryContext";
import { AccountManagementProvider } from "../context/accountManagementContext";
import HeadZone from "../components/HeadZone";
import { IsLoadingProvider } from "../context/isLoadingContext";

const RegisterAndPasswordResetPage = () => {
  return (
    <>
      <HeadZone></HeadZone>
      <QueryProvider>
        <AccountManagementProvider>
          <Header></Header>
          <IsLoadingProvider>
            <RegisterAndPasswordReset></RegisterAndPasswordReset>
          </IsLoadingProvider>
        </AccountManagementProvider>
      </QueryProvider>
    </>
  );
};

export default RegisterAndPasswordResetPage;
