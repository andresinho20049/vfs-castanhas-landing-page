import { post } from "aws-amplify/api";


export const handleAiModelInvoke = async (prompt: string) => {
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

    return await postAi.response;
}