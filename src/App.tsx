import { Toaster as Sonner } from "@/components/ui/sonner";
import { Authenticator } from "@aws-amplify/ui-react";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/Routes";
import { LoadingProvider } from "./context/LoadingContext";
import { ChatBotProvider } from "./context/ChatBotContext";

export default function App() {
  return (
    <Authenticator.Provider>
      <LoadingProvider>
        <AuthProvider>
          <ChatBotProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </ChatBotProvider>
        </AuthProvider>
      </LoadingProvider>
    </Authenticator.Provider>
  );
}
