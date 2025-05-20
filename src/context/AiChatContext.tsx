import { SimpleAiChatComponent } from "@/components/SimpleChat";
import { createContext, useContext, useState } from "react";

type AiChatContextType = {
  aiChat: boolean;
  setAiChat: (aiChat: boolean) => void;
};

const AiChatContext = createContext<AiChatContextType>({} as AiChatContextType);

export const useAiChat = () => {
  const context = useContext(AiChatContext);
  if (!context) {
    throw new Error("useAiChat must be used within a AiChatProvider");
  }
  return context;
};

export const AiChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [aiChat, setAiChat] = useState(false);

  return (
    <AiChatContext.Provider value={{ aiChat, setAiChat }}>
      <SimpleAiChatComponent />
      {children}
    </AiChatContext.Provider>
  );
};
