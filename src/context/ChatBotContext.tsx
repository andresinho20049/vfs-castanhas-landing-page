import { FloatButton } from "@/components/FloatButton";
import { SimpleAiChatComponent } from "@/components/SimpleChat";
import { getAiMessages, handleAiModelInvoke } from "@/lib/ai";
import { ChatMessageType } from "@/models/ChatBot";
import { Link } from "@aws-amplify/ui-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { useLoading } from "./LoadingContext";
import { set } from "date-fns";

type ChatBotContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  messages: ChatMessageType[];
  setMessages: (messages: ChatMessageType[]) => void;

  handleSendChatBotMessage: (prompt: string) => void;
};

const ChatBotContext = createContext<ChatBotContextType>(
  {} as ChatBotContextType
);

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error("useChatBot must be used within a ChatBotProvider");
  }
  return context;
};

export const ChatBotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const { setLoading } = useLoading();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    getAiMessages()
      .then((response) => {
        response.forEach((item) => {
          const chatMessages = item.messages.map((message) => ({
            text: message.text,
            type: message.type,
          }));
          setMessages(chatMessages);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated]);

  const handleSendChatBotMessage = (message: string) => {
    const newMessage: ChatMessageType = {
      text: message,
      type: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    handleAiModelInvoke(message)
      .then((response) => {
        response.output.message.content.forEach((content) => {
          const assistantMessage: ChatMessageType = {
            text: content.text,
            type: "assistant",
          };
          setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorMessage: ChatMessageType = {
          text: "Desculpe, não consegui entender sua mensagem.",
          type: "assistant",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.message("Você precisa estar logado para usar o chat!", {
        description: (
          <Link
            href="/login"
            className="text-vfs-light-blue hover:text-vfs-brown"
          >
            Clique aqui para fazer login
          </Link>
        ),
      });
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <ChatBotContext.Provider
      value={{
        isOpen,
        setIsOpen,
        messages,
        setMessages,
        handleSendChatBotMessage,
      }}
    >
      <div className="hidden lg:block">
        {isOpen ? (
          <SimpleAiChatComponent />
        ) : (
          <FloatButton onClick={handleClick} />
        )}
      </div>
      {children}
    </ChatBotContext.Provider>
  );
};
