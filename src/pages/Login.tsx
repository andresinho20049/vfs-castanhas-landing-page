
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toSignIn } = useAuthenticator();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toSignIn({ username: email, password });
      navigate('/');
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-vfs-blue/30 to-vfs-brown/30">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} /> Voltar
          </Button>
          
          <img 
            src="/lovable-uploads/dd52ac67-cefc-4e4d-805a-004df220a65a.png" 
            alt="VFS Castanhas e Doces" 
            className="h-16 mx-auto" 
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Acesse sua conta
          </h1>
          <p className="mt-2 text-gray-600">
            Entre com suas credenciais para acessar
          </p>
          <div className="mt-4 text-sm text-gray-500 border-t pt-4">
            <p>Demonstração:</p>
            <p>Administrador: admin@vfs.com / admin123</p>
            <p>Usuário: user@example.com / user123</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-vfs-blue hover:bg-vfs-blue/80"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
