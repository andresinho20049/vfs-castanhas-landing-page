import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { userInfo, isAuthenticated } = useAuth();
  const { user, signOut } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut(user);
    navigate("/");
  };

  const navLinks = [
    { href: "#home", label: "Início" },
    { href: "#about", label: "Nossa História" },
    { href: "#products", label: "Produtos" },
    { href: "#location", label: "Localização" },
    { href: "#comments", label: "Comentários" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className="flex items-center">
            <img
              src="/lovable-uploads/dd52ac67-cefc-4e4d-805a-004df220a65a.png"
              alt="VFS Castanhas e Doces Logo"
              className="h-12 w-auto mr-2"
            />
            <span className="text-2xl md:text-3xl font-serif font-bold">
              <span className="text-vfs-blue">VFS</span>
              <span
                className={`${
                  isScrolled ? "text-vfs-brown" : "text-white"
                } transition-colors duration-300`}
              >
                {" "}
                Castanhas & Doces
              </span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors hover:text-vfs-blue ${
                isScrolled ? "text-gray-800" : "text-white drop-shadow-md"
              }`}
            >
              {link.label}
            </a>
          ))}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={userInfo?.picture} alt={userInfo.email} />
                    <AvatarFallback className="bg-vfs-blue text-white">
                      {userInfo.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuItem disabled className="opacity-70">
                  {userInfo.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/perfil")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                {userInfo && userInfo.roles.includes("Admin") && (
                  <DropdownMenuItem onClick={() => navigate("/console")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Console</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="bg-vfs-blue hover:bg-vfs-blue/80 text-white"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="mr-2">
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={userInfo?.picture}
                      alt={userInfo?.email}
                    />
                    <AvatarFallback className="bg-vfs-blue text-white text-xs">
                      {userInfo?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuItem disabled className="opacity-70">
                  {userInfo?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                {userInfo && userInfo.roles.includes("Admin") && (
                  <DropdownMenuItem onClick={() => navigate("/console")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Console</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="bg-vfs-blue hover:bg-vfs-blue/80 text-white mr-2"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
          )}
          <button
            onClick={toggleMenu}
            className={`p-2 focus:outline-none ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800 font-medium px-4 py-2 hover:bg-gray-100 rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
