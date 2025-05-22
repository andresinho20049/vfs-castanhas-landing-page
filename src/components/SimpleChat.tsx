import { useChatBot } from "@/context/ChatBotContext";
import { handleAiModelInvoke } from "@/lib/ai";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ChatMessageType } from "@/models/ChatBot";
import { useLoading } from "@/context/LoadingContext";
import { Placeholder } from "@aws-amplify/ui-react";

export const SimpleAiChatComponent = () => {
  const [newMessage, setNewMessage] = useState("");

  const { messages, handleSendChatBotMessage } = useChatBot();
  const { loading } = useLoading();

  const { setIsOpen } = useChatBot();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    handleSendChatBotMessage(newMessage);
    setNewMessage("");
  };

  return (
    <Card title="Chat AI" className="fixed bottom-10 right-10 z-50 ">
      <div className="flex flex-col h-full w-full p-4 space-y-2">
        <CardTitle className="flex text-sm font-semibold justify-between items-center border-b-2 border-gray-300 ">
          <h2 className="text-xl text-vfs-brown">Chat AI</h2>
          <Button
            variant="link"
            className="hover:text-red-600 text-xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            X
          </Button>
        </CardTitle>
        <div className="flex flex-col gap-2 py-2 h-72 w-80 scroll-y overflow-y-auto rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex max-w-64 p-2 rounded-lg ${
                message.type === "user"
                  ? "bg-green-100 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          ))}
          <Placeholder isLoaded={!loading} className="max-w-64 self-start" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-4 gap-2"
        >
          <Textarea
            // type="text"
            className="resize-none rounded-md w-full h-24"
            title="Mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
          />

          <Button
            disabled={!newMessage.trim()}
            type="submit"
            className="bg-vfs-green text-white w-full"
          >
            Enviar
          </Button>
        </form>
      </div>
    </Card>
  );
};
