
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: '#home', label: 'Início' },
    { href: '#about', label: 'Nossa História' },
    { href: '#products', label: 'Produtos' },
    { href: '#location', label: 'Localização' },
    { href: '#contact', label: 'Contato' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className="text-2xl md:text-3xl font-serif font-bold">
            <span className="text-vfs-blue">VFS</span> 
            <span className="text-vfs-brown"> Castanhas & Doces</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors hover:text-vfs-blue ${
                isScrolled ? 'text-gray-800' : 'text-white drop-shadow-md'
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button 
            className="bg-vfs-blue hover:bg-vfs-blue/80 text-white"
            onClick={() => window.open('tel:+5513123456789')}
          >
            Contate-nos
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`p-2 focus:outline-none ${
              isScrolled ? 'text-gray-800' : 'text-white'
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
              <Button 
                className="bg-vfs-blue hover:bg-vfs-blue/80 text-white"
                onClick={() => window.open('tel:+5513123456789')}
              >
                Contate-nos
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
