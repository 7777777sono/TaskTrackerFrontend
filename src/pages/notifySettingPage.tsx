import HeadZone from "../components/HeadZone";
import NotifySetting from "../components/notifySetting";
import { AccountManagementProvider } from "../context/accountManagementContext";
import { QueryProvider } from "../context/queryContext";

const NotifySettingPage = () => {
  return (
    <>
      <HeadZone></HeadZone>
      <QueryProvider>
        <AccountManagementProvider>
          <NotifySetting></NotifySetting>
        </AccountManagementProvider>
      </QueryProvider>
    </>
  );
};

export default NotifySettingPage;
