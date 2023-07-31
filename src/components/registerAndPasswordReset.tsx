import { useEffect } from "react";
import PasswordReset from "../components/passwordReset";
import Register from "../components/register";
import { useIsRegister } from "../context/accountManagementContext";
import { useQuery } from "../context/queryContext";

const RegisterAndPasswordReset = () => {
  const query = useQuery(); // クエリパラメータを格納する
  const [isRegister, setIsRegister] = useIsRegister(); // 登録するどうかを判別する

  useEffect(() => {
    if (query.isRegister === "true") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{isRegister ? <Register></Register> : <PasswordReset></PasswordReset>}</>
  );
};

export default RegisterAndPasswordReset;
