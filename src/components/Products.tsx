
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  description: string;
  imagePath: string;
  category: string;
}

const ProductCard = ({ title, description, imagePath, category }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg border-none">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={imagePath} 
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
        />
        <div className="absolute top-4 right-4 bg-vfs-blue text-white text-sm px-3 py-1 rounded-full">
          {category}
        </div>
      </div>
      <CardContent className="p-6 bg-white">
        <h3 className="font-serif font-bold text-xl text-vfs-brown mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const productCategories = [
    { 
      id: 'castanhas', 
      name: 'Castanhas',
      description: 'Castanhas selecionadas de primeira qualidade'
    },
    { 
      id: 'doces', 
      name: 'Doces Artesanais',
      description: 'Feitos com muito carinho e ingredientes selecionados'
    },
    { 
      id: 'restaurante', 
      name: 'Restaurante',
      description: 'Sabores que encantam em frente à orla'
    },
    { 
      id: 'adega', 
      name: 'Adega',
      description: 'Uma seleção especial de bebidas para todos os gostos'
    }
  ];

  const products = [
    {
      title: "Castanha de Caju Premium",
      description: "Nossas famosas castanhas de caju, selecionadas e preparadas com muito cuidado.",
      imagePath: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
      category: "Castanhas"
    },
    {
      title: "Doces Tradicionais",
      description: "Doces deliciosos preparados com receitas tradicionais e ingredientes de qualidade.",
      imagePath: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
      category: "Doces"
    },
    {
      title: "Pratos à Beira-mar",
      description: "Experimente nosso cardápio especial com vista para o mar de Itanhaém.",
      imagePath: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
      category: "Restaurante"
    },
    {
      title: "Seleção de Vinhos",
      description: "Nossa adega conta com os melhores vinhos para acompanhar sua refeição.",
      imagePath: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
      category: "Adega"
    },
    {
      title: "Mix de Castanhas",
      description: "Combinação perfeita de castanhas selecionadas para você desfrutar.",
      imagePath: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
      category: "Castanhas"
    },
    {
      title: "Doces Gourmet",
      description: "Experimente nossas criações especiais de doces com um toque gourmet.",
      imagePath: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
      category: "Doces"
    },
  ];

  return (
    <section id="products" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-vfs-blue mb-4">Nossos Produtos</h2>
          <div className="w-20 h-1 bg-vfs-sand mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Descubra nossos produtos exclusivos feitos com os melhores ingredientes e todo o carinho para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {productCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-serif font-bold text-xl text-vfs-blue mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              imagePath={product.imagePath}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
