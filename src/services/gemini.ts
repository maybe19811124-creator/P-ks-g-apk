import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getBakingAdvice(recipeName: string, question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `You are an expert baker assistant. The user is currently looking at a recipe for "${recipeName}". 
      Answer their question concisely and professionally in Hungarian.
      
      User Question: ${question}`,
      config: {
        systemInstruction: "You are a professional Hungarian baker assistant. Keep answers practical and helpful.",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sajnálom, hiba történt a válaszadás során. Kérlek próbáld újra később.";
  }
}
