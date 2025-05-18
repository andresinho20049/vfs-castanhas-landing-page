import { fetchAuthSession } from "@aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLoading } from "./LoadingContext";

type UserInfoType = {
  id: string;
  email: string;
  picture: string;
  roles: string[];
};

type AuthContextType = {
  userInfo: UserInfoType | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator();

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const isAuthenticated = useMemo(() => !!userInfo, [userInfo]);

  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    fetchAuthSession()
      .then((session) => {
        const payload = session?.tokens?.idToken?.payload;
        if (!payload) {
          setUserInfo(null);
          return;
        }

        const userInfo: UserInfoType = {
          id: payload.sub,
          email: payload["email"] as string,
          picture: payload["picture"] as string,
          roles: (payload["cognito:groups"] as string[]) || [],
        };
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error("Error fetching auth session:", error);

        setUserInfo(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
