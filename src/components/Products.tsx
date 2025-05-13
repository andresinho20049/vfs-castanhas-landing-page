
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Music, Dog, Waves, Users } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-none">
      <CardContent className="p-6 bg-white text-center">
        <div className="flex justify-center mb-4 text-vfs-blue">
          {icon}
        </div>
        <h3 className="font-serif font-bold text-xl text-vfs-brown mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const establishmentFeatures = [
    {
      icon: <Music size={32} />,
      title: "Pagode ao Vivo",
      description: "Aprecie música boa enquanto desfruta das nossas deliciosas castanhas e doces"
    },
    {
      icon: <Dog size={32} />,
      title: "Pet Friendly",
      description: "Traga seu amigo de quatro patas! Nosso espaço é receptivo aos pets"
    },
    {
      icon: <Waves size={32} />,
      title: "Vista para o Mar",
      description: "Aproveite a linda vista para o mar de Itanhaém enquanto se delicia"
    },
    {
      icon: <Users size={32} />,
      title: "Ambiente Familiar",
      description: "Espaço aconchegante e seguro para toda a família se divertir e relaxar"
    }
  ];

  return (
    <section id="products" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-vfs-blue mb-4">Nossos Produtos</h2>
          <div className="w-20 h-1 bg-vfs-sand mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            Na VFS Castanhas & Doces, oferecemos uma experiência única com produtos artesanais de qualidade excepcional. 
            Nossas castanhas são cuidadosamente selecionadas e preparadas para proporcionar o melhor sabor.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="/lovable-uploads/8730518e-7d07-4349-9919-7ea5da1fed49.png" 
                alt="Castanhas de Caju VFS" 
                className="w-full h-auto object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif font-bold text-2xl text-vfs-blue mb-2">Castanhas de Caju Premium</h3>
                <p className="text-gray-600 mb-4">
                  Nossas castanhas são vendidas tanto no varejo quanto no atacado. Com qualidade superior 
                  e processo artesanal, garantimos o sabor autêntico em cada embalagem.
                </p>
                <div className="flex items-center text-vfs-brown">
                  <span className="font-bold">Disponível em diversos tamanhos e quantidades</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h3 className="font-serif font-bold text-2xl text-vfs-blue mb-4">Venha Nos Visitar!</h3>
              <p className="text-gray-600 mb-6">
                Além das nossas deliciosas castanhas e doces artesanais, oferecemos um ambiente 
                acolhedor e repleto de atrações para você e sua família. Seja para um encontro com 
                amigos, uma tarde relaxante ou um momento especial, a VFS Castanhas & Doces é o lugar perfeito.
              </p>
              <p className="text-gray-600 mb-6">
                Também atendemos encomendas para festas e eventos. Entre em contato conosco 
                pelo WhatsApp (13) 99790-7864 para mais informações sobre atacado e varejo.
              </p>
              <p className="text-vfs-blue font-medium">
                "Agradecemos Aquele que nos Fortalece"
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {establishmentFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
