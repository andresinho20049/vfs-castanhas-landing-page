import { ChatBotType } from "@/models/ChatBot";
import { ResponseAiType } from "@/models/ResponseAi";
import { get, post } from "aws-amplify/api";

export const handleAiModelInvoke = async (prompt: string): Promise<ResponseAiType> => {
    const postAi = post({
        apiName: "vfscastanhasapi01",
        path: "/ai",
        options: {
            body: {
                prompt: prompt,
            },
            headers: {
                "Content-Type": "application/json",
            },
        }
    });

    const response = await postAi.response;
    const statusCode = response.statusCode;
    if (statusCode !== 200) {
        throw new Error("Error invoking AI model");
    }
    
    const data = await response.body.json();
    return data as unknown as ResponseAiType;
}

export const getAiMessages = async (userId: string) => {
  const response = await get({
    apiName: "vfscastanhasapi01",
    path: `/chat/${userId}`,
  }).response;

  const statusCode = response.statusCode;
  if (statusCode !== 200) {
    throw new Error("Error fetching AI messages");
  }
  const data = await response.body.json();
  return data as unknown as ChatBotType[];
}