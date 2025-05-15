
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Definição dos tipos
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock de usuários para demonstração
const mockUsers = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@vfs.com',
    password: 'admin123',
    isAdmin: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: '2',
    name: 'Usuário Regular',
    email: 'user@example.com',
    password: 'user123',
    isAdmin: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verifica se o usuário estava logado anteriormente
  useEffect(() => {
    const storedUser = localStorage.getItem('vfs-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação de login
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('vfs-user', JSON.stringify(userWithoutPassword));
      toast.success(`Bem-vindo, ${foundUser.name}!`);
      return;
    }
    
    throw new Error('Credenciais inválidas');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vfs-user');
    toast.info('Você saiu da sua conta');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
