import { useCallback } from "react";
import { authSelector, isAuthenticatedSelector } from "../selectors";
import { useRecoilState } from "recoil";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(
    isAuthenticatedSelector
  );
  const [currentUser, setCurrentUser] = useRecoilState(authSelector);

  const updateCurrentUser = useCallback(() => {
    setIsAuthenticated(!isAuthenticated);
  }, [setIsAuthenticated, isAuthenticated]);

  return {
    updateCurrentUser,
    isAuthenticated,
    currentUser,
  };
};

export default useAuth;
