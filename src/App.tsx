import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Console from "./pages/Console";
import NotFound from "./pages/NotFound";

Amplify.configure(awsExports);

export default function App() {
    return (
        <Authenticator.Provider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Authenticator socialProviders={["google"]}  loginMechanism="email" variation="modal" children={<Navigate to="/" />} />} />
                    <Route
                        path="/console"
                        element={
                            <ProtectedRoute roles={['admin']}>
                                <Console />
                            </ProtectedRoute>
                        }
                        />
                    <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </Authenticator.Provider>
    );
}

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuthenticator();
    return !!user ? children : <Navigate to="/" replace />;
}