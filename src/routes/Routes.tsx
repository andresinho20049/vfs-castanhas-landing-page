import { useAuth } from "@/context/AuthContext";
import Console from "@/pages/Console";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Perfil from "@/pages/Perfil";
import { Authenticator } from "@aws-amplify/ui-react";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

type MyRouteType = {
  path: string;
  isPrivate?: boolean;
  requiredRoles?: string[];
  element: React.ReactNode;
};

const routes: MyRouteType[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: (
      <Authenticator
        socialProviders={["google"]}
        loginMechanism="email"
        variation="modal"
        children={<Navigate to="/" />}
      />
    ),
  },
  {
    path: "/perfil",
    isPrivate: true,
    element: <Perfil />,
  },
  {
    path: "/console",
    isPrivate: true,
    requiredRoles: ["Admin"],
    element: <Console />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const AppRoutes = () => {
  const { userInfo, isAuthenticated } = useAuth();

  const showRoutes = useMemo(
    () =>
      routes.filter((route) => {
        if (route.isPrivate && !isAuthenticated) {
          return false;
        }
        if (route.requiredRoles && userInfo) {
          const hasRole = route.requiredRoles.some((role) =>
            userInfo.roles.includes(role)
          );
          return hasRole;
        }
        return true;
      }),
    [userInfo, isAuthenticated]
  );

  return (
    <BrowserRouter>
      <Routes>
        {showRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
