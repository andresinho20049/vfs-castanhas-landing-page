import { Toaster as Sonner } from "@/components/ui/sonner";
import { Authenticator } from "@aws-amplify/ui-react";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/Routes";
import { LoadingProvider } from "./context/LoadingContext";
import { AiChatProvider } from "./context/AiChatContext";

export default function App() {
  return (
    <Authenticator.Provider>
      <LoadingProvider>
        <AuthProvider>
          <AiChatProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </AiChatProvider>
        </AuthProvider>
      </LoadingProvider>
    </Authenticator.Provider>
  );
}
