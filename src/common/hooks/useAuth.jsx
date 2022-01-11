import { useCallback } from "react";
import { authSelector, isAuthenticatedSelector } from "../selectors";
import { useRecoilState } from "recoil";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(
    isAuthenticatedSelector
  );

  const updateCurrentUser = useCallback(
    (user) => {
      setIsAuthenticated(true);
    },
    [setIsAuthenticated]
  );

  return {
    updateCurrentUser,
  };
};

export default useAuth;
