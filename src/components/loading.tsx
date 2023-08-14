import { useIsLoading } from "../context/isLoadingContext";
import loadingStyles from "../styles/loading.module.scss";

const Loading = () => {
  const [isLoading, setIsloading] = useIsLoading();

  return (
    <>
      {isLoading ? (
        <div className={loadingStyles.overlay}>
          <h3 className={loadingStyles.text}>ログイン中</h3>
          <div className={loadingStyles.spinnerBox}>
            <div className={loadingStyles.circleBorder}>
              <div className={loadingStyles.circleCore}></div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loading;
