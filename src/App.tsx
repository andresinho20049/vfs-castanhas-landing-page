import { Toaster as Sonner } from "@/components/ui/sonner";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/Routes";

Amplify.configure(awsExports);

export default function App() {
    return (
        <Authenticator.Provider>
            <AuthProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <AppRoutes />
                </TooltipProvider>
            </AuthProvider>
        </Authenticator.Provider>
    );
}