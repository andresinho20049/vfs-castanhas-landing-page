import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { handleAiModelInvoke } from "@/lib/ai";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardTitle } from "./ui/card";

export const SimpleAiChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      type: "user", // ou 'system'
    };

    setMessages((prevMessages) => [...prevMessages, message]);

    handleAiModelInvoke(newMessage).then((res) => {
      if (res.statusCode !== 200) {
        throw new Error("Error invoking AI model");
      }
      const response = res.body;
      const aiMessage = {
        text: response,
        type: "system",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    });

    setNewMessage("");
  };

  return (
    <Card title="Chat AI" className="fixed bottom-10 right-10 bg-rose-50">
      <div className="flex flex-col h-full w-full p-4">
        <CardTitle className="text-lg font-semibold">Chat com AI</CardTitle>
        <div className="flex h-72 w-64 scroll-y overflow-y-auto flex-col gap-2 bg-white rounded-lg">
          {messages.map((message, index) => (
            <p
              key={index}
              className={`message ${
                message.type === "user" ? "bg-green right" : "bg-gray left"
              }`}
            >
              {message.text}
            </p>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-4 gap-2"
        >
          <Textarea
            // type="text"
            title="Mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
          />

          <Button
            disabled={!newMessage.trim()}
            type="submit"
            className="bg-green-500 text-white w-full"
          >
            Enviar
          </Button>
        </form>
      </div>
    </Card>
  );
};
