import HeadZone from "../components/HeadZone";
import Header from "../components/header";
import NotifySetting from "../components/notifySetting";
import { AccountManagementProvider } from "../context/accountManagementContext";
import { QueryProvider } from "../context/queryContext";

const NotifySettingPage = () => {
  return (
    <>
      <HeadZone></HeadZone>
      <QueryProvider>
        <AccountManagementProvider>
          <Header></Header>
          <NotifySetting></NotifySetting>
        </AccountManagementProvider>
      </QueryProvider>
    </>
  );
};

export default NotifySettingPage;
