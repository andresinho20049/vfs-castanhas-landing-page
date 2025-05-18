import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Perfil = () => {
  const { userInfo } = useAuth();
  const { loading } = useLoading();

  const navigate = useNavigate();

  // Redireciona se não for administrador
  useEffect(() => {
    if (!userInfo) {
      toast.error("Acesso restrito a administradores");
      navigate("/");
    }
  }, [userInfo]);

  if (!userInfo) {
    return null; // Retorno nulo enquanto redireciona
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-vfs-blue text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-vfs-blue/60"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={20} className="mr-2" /> Voltar ao site
              </Button>
              <h1 className="text-3xl font-bold">Perfil</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Olá, {userInfo.email}</span>
              <Avatar>
                <AvatarImage src={userInfo.picture} alt={userInfo.email} />
                <AvatarFallback className="bg-vfs-brown text-white">
                  {userInfo.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* User Info */}
        <div
          className={`bg-white shadow-md rounded-lg p-6 mb-6 ${
            loading ? "hidden" : ""
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Informações do Usuário</h2>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={userInfo.picture} alt={userInfo.email} />
              <AvatarFallback className="bg-vfs-brown text-white">
                {userInfo.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{userInfo.email}</h3>
              <p className="text-sm text-gray-500">
                Grupos: {userInfo.roles.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
