
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section 
      id="home"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('public/lovable-uploads/1008ce79-9d2d-4ecb-8815-cf1ad06219f9.png')`,
        backdropFilter: 'blur(2px)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-sm" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/dd52ac67-cefc-4e4d-805a-004df220a65a.png" 
              alt="VFS Castanhas e Doces Logo" 
              className="h-24 w-auto animate-float" 
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Sabores que Encantam à Beira-Mar
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
            Castanhas, doces artesanais e experiências únicas em frente à orla de Itanhaém
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-vfs-blue hover:bg-vfs-blue/80 text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conheça Nossos Produtos
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg font-medium bg-black/30 backdrop-blur-sm"
              onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Como Chegar
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-wave-pattern bg-repeat-x" />
    </section>
  );
};

export default Hero;
