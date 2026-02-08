import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const streamLegalAdvice = async function* (
  userQuery: string
): AsyncGenerator<string, void, unknown> {
  const ai = getClient();
  
  // Using gemini-3-pro-preview for complex reasoning required in legal scenarios
  const modelId = 'gemini-3-pro-preview';

  try {
    const responseStream = await ai.models.generateContentStream({
      model: modelId,
      contents: [
        {
          role: 'user',
          parts: [{ text: userQuery }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // Adding thinking budget for better reasoning on legal principles
        thinkingConfig: { thinkingBudget: 2048 }, 
        temperature: 0.4, // Lower temperature for more consistent/factual responses
      },
    });

    for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            yield c.text;
        }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};