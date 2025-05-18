import { Toaster as Sonner } from "@/components/ui/sonner";
import { Authenticator } from "@aws-amplify/ui-react";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/Routes";
import { LoadingProvider } from "./context/LoadingContext";

export default function App() {
  return (
    <Authenticator.Provider>
      <LoadingProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </LoadingProvider>
    </Authenticator.Provider>
  );
}
