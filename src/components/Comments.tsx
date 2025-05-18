import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { Bold, Italic, List, MessageSquare, User } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useLoading } from "@/context/LoadingContext";

// Tipo para os comentários
interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

// Mock de comentários iniciais
const initialComments: Comment[] = [
  {
    id: "1",
    userId: "2",
    userName: "Usuário Regular",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    content:
      "Recomendo muito a castanha especial! **Sensacional**!\n\nEsse lugar é incrível, com uma vista linda para o mar. Adorei o ambiente familiar e o atendimento.",
    createdAt: new Date(2023, 3, 15),
  },
  {
    id: "2",
    userId: "3",
    userName: "Maria Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    content:
      "O pagode aos domingos é *imperdível*. Venho com minha família toda semana!\n\n* Atendimento excelente\n* Comida deliciosa\n* Vista maravilhosa",
    createdAt: new Date(2023, 4, 22),
  },
];

// Função para renderizar markdown básico
const renderMarkdown = (text: string) => {
  let rendered = text;

  // Negrito
  rendered = rendered.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Itálico
  rendered = rendered.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Lista
  rendered = rendered.replace(/^\* (.*?)$/gm, "<li>$1</li>");
  rendered = rendered
    .replace(/<li>/g, "<ul><li>")
    .replace(/<\/li>\s*<ul>/g, "<ul>");
  rendered = rendered.replace(/<\/li>\s*(?!<ul|<li)/g, "</li></ul>");

  // Quebras de linha
  rendered = rendered.replace(/\n\n/g, "<br/><br/>");

  return rendered;
};

const Comments = () => {
  const { userInfo, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const { loading, setLoading } = useLoading();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast.error("O comentário não pode estar vazio");
      return;
    }

    setLoading(true);

    // Simular envio para o servidor
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        userId: userInfo?.id || "",
        userName: userInfo?.email || "Anônimo",
        userAvatar: userInfo?.picture,
        content: newComment,
        createdAt: new Date(),
      };

      setComments([comment, ...comments]);
      setNewComment("");
      toast.success("Comentário publicado com sucesso!");
      setLoading(false);
    }, 500);
  };

  const handleFormatting = (type: "bold" | "italic" | "list") => {
    const textarea = document.getElementById(
      "comment-textarea"
    ) as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = newComment.substring(start, end);
    let formattedText = "";
    let newCursorPos = 0;

    switch (type) {
      case "bold":
        formattedText = `**${selectedText}**`;
        newCursorPos = end + 4;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        newCursorPos = end + 2;
        break;
      case "list":
        formattedText = `\n* ${selectedText}`;
        newCursorPos = end + 3;
        break;
    }

    const newValue =
      newComment.substring(0, start) +
      formattedText +
      newComment.substring(end);
    setNewComment(newValue);

    // Restaurar foco e posição do cursor após a atualização
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <section id="comments" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Comentários dos Clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos clientes estão dizendo sobre nós. Se você já nos
            visitou, compartilhe sua experiência!
          </p>
        </div>

        {/* Comment Form */}
        {isAuthenticated ? (
          <div className="max-w-3xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarImage src={userInfo?.picture} alt={userInfo?.email} />
                <AvatarFallback className="bg-vfs-blue text-white">
                  {userInfo?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{userInfo?.email}</p>
                <p className="text-sm text-gray-500">
                  Compartilhe sua experiência
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-2 rounded flex flex-wrap gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFormatting("bold")}
                  title="Negrito"
                >
                  <Bold size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFormatting("italic")}
                  title="Itálico"
                >
                  <Italic size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFormatting("list")}
                  title="Lista"
                >
                  <List size={18} />
                </Button>
                <div className="ml-auto text-xs text-gray-500 self-center">
                  Formatação Markdown suportada
                </div>
              </div>

              <Textarea
                id="comment-textarea"
                placeholder="Escreva seu comentário aqui..."
                value={newComment}
                onChange={handleCommentChange}
                rows={4}
                className="w-full p-3"
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleSubmitComment}
                  disabled={loading || !newComment.trim()}
                  className="bg-vfs-blue hover:bg-vfs-blue/80"
                >
                  <MessageSquare size={18} className="mr-2" />
                  {loading ? "Publicando..." : "Publicar Comentário"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-600 mb-4">
              Faça login para deixar seu comentário
            </p>
            <Button
              onClick={() => (window.location.href = "/login")}
              className="bg-vfs-blue hover:bg-vfs-blue/80"
              disabled={loading}
            >
              <User size={18} className="mr-2" /> Entrar para comentar
            </Button>
          </div>
        )}

        {/* Comments List */}
        <div className="max-w-3xl mx-auto">
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar>
                      <AvatarImage
                        src={comment.userAvatar}
                        alt={comment.userName}
                      />
                      <AvatarFallback className="bg-vfs-blue text-white">
                        {comment.userName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{comment.userName}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(comment.content),
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Seja o primeiro a comentar!
            </div>
          )}
        </div>

        <div>
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Comentários ficticios, essa seção é apenas para fins de
              demonstração. Os comentários publicados não são persistidos e
              serão perdidos ao atualizar a página.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
};

export default Comments;
