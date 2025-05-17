import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Definição do tipo de produto
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

// Mock de produtos iniciais
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Castanha Especial",
    description: "Nossa castanha especial, torrada com temperos exclusivos.",
    price: 25.9,
    imageUrl: "/lovable-uploads/1008ce79-9d2d-4ecb-8815-cf1ad06219f9.png",
  },
  {
    id: "2",
    name: "Mix de Castanhas Premium",
    description:
      "Uma seleção de castanhas premium, com cashew, pará e amêndoas.",
    price: 32.5,
    imageUrl: "/lovable-uploads/8730518e-7d07-4349-9919-7ea5da1fed49.png",
  },
];

const Console = () => {
  const { userInfo } = useAuth();

  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Redireciona se não for administrador
  useEffect(() => {
    if (!userInfo) {
      toast.error("Acesso restrito a administradores");
      navigate("/");
    }
  }, [userInfo]);

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        imageUrl: product.imageUrl || "",
      });
      setImagePreview(product.imageUrl || null);
    } else {
      setCurrentProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
      });
      setImagePreview(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular upload com URL de objeto local
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({
        ...formData,
        imageUrl,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: currentProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      imageUrl: formData.imageUrl || imagePreview || undefined,
    };

    if (currentProduct) {
      // Editar produto existente
      setProducts(
        products.map((p) => (p.id === currentProduct.id ? newProduct : p))
      );
      toast.success(`Produto "${newProduct.name}" atualizado com sucesso!`);
    } else {
      // Adicionar novo produto
      setProducts([...products, newProduct]);
      toast.success(`Produto "${newProduct.name}" adicionado com sucesso!`);
    }

    handleCloseForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Produto excluído com sucesso!");
    }
  };

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
              <h1 className="text-3xl font-bold">Console Administrativo</h1>
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

      <div>
        <Alert variant="destructive" className="my-4 container mx-auto">
          <AlertTitle>Importante</AlertTitle>
          <AlertDescription>
            Valores iniciais são apenas para demonstração. Para adicionar novos
            produtos, clique no botão "Adicionar Produto" e preencha os detalhes
            necessários.
            <br />
            Os produtos adicionados não são persistidos em um banco de dados
            real, portanto, ao atualizar a página, os dados serão perdidos.
            <br />
            <br />
            <strong>Pagina apenas para fins de demonstração.</strong>
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Catálogo de Produtos
            </h2>
            <Button
              onClick={() => handleOpenForm()}
              className="bg-vfs-blue hover:bg-vfs-blue/80"
            >
              <Plus size={18} className="mr-2" /> Adicionar Produto
            </Button>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4">Imagem</th>
                  <th className="p-4">Nome</th>
                  <th className="p-4">Descrição</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                          Sem imagem
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">
                      {product.description}
                    </td>
                    <td className="p-4">R$ {product.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                        onClick={() => handleOpenForm(product)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 ml-1"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Nenhum produto cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? "Editar Produto" : "Adicionar Novo Produto"}
            </DialogTitle>
            <DialogDescription>
              {currentProduct
                ? "Atualize as informações do produto abaixo."
                : "Preencha as informações para adicionar um novo produto."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Imagem do Produto</Label>
                <div className="flex items-start space-x-4">
                  <div>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="max-w-xs"
                    />
                  </div>
                  {(imagePreview || formData.imageUrl) && (
                    <div>
                      <img
                        src={imagePreview || formData.imageUrl}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-vfs-blue hover:bg-vfs-blue/80"
              >
                {currentProduct ? "Atualizar Produto" : "Cadastrar Produto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Console;
