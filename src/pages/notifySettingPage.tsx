import NotifySetting from "../components/notifySetting";
import { AccountManagementProvider } from "../context/accountManagementContext";
import { QueryProvider } from "../context/queryContext";

const NotifySettingPage = () => {
  return (
    <QueryProvider>
      <AccountManagementProvider>
        <NotifySetting></NotifySetting>
      </AccountManagementProvider>
    </QueryProvider>
  );
};

export default NotifySettingPage;
