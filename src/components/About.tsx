
import React from 'react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-vfs-blue">Nossa História</h2>
            <img 
              src="/lovable-uploads/dd52ac67-cefc-4e4d-805a-004df220a65a.png" 
              alt="VFS Logo" 
              className="h-10 w-auto opacity-80" 
            />
          </div>
          <div className="w-20 h-1 bg-vfs-sand mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=600" 
                alt="VFS Castanhas e Doces" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-8 -right-8 hidden md:block">
                <div className="bg-vfs-sand p-4 md:p-6 rounded-lg shadow-lg animate-float">
                  <p className="text-xl font-serif font-medium text-vfs-brown">Desde 2015</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-vfs-brown mb-6">
              Um Sabor que Conquistou Itanhaém
            </h3>
            
            <div className="prose prose-lg">
              <p className="mb-4">
                Imagine um lugar onde a brisa do mar encontra o sabor irresistível dos nossos doces caseiros e a qualidade inigualável das VFS Castanhas e Doces.
              </p>
              
              <p className="mb-4">
                Localizado em frente à orla de Itanhaém, nosso espaço é perfeito para todos os momentos: Saboreie pratos deliciosos em nosso restaurante, acompanhados de uma seleção especial de bebidas da nossa adega e petiscos saborosos do nosso barzinho.
              </p>
              
              <p className="mb-4">
                Delicie-se com nossos doces artesanais, feitos com carinho e ingredientes frescos. Adquira nossas VFS Castanhas e Doces no varejo para você ou no atacado para o seu negócio. Nossas castanhas de caju já conquistaram o paladar da região!
              </p>
              
              <p className="font-medium">
                Venha viver momentos únicos com uma vista privilegiada e sabores que encantam!
              </p>
            </div>
            
            <div className="flex items-center mt-8">
              <Button 
                className="bg-vfs-brown hover:bg-vfs-brown/80 text-white mr-4"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conheça Nossos Produtos
              </Button>
              <img 
                src="/lovable-uploads/dd52ac67-cefc-4e4d-805a-004df220a65a.png" 
                alt="VFS Logo" 
                className="h-10 w-auto opacity-70" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
