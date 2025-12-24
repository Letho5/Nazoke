
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ResumeData } from "./types";

/**
 * Strictly follow @google/genai guidelines for client initialization.
 * The API key is sourced directly from process.env.API_KEY.
 */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are ResumeAI Pro, an elite AI-powered resume building assistant. 
Your goal is to extract resume information naturally from conversation.
Always acknowledge what the user shared, confirm the info briefly, and ask the next logical question.

DO NOT USE markdown formatting like **bold** or *italics* for emphasis in your text responses. Just use plain text.

When you extract new or updated resume information, you MUST include a hidden JSON data block at the end of your response like this:
<!--RESUME_DATA
{
  "personalInfo": { ... },
  "summary": "...",
  "experience": [ ... ],
  "education": [ ... ],
  "skills": [ ... ],
  "projects": [ ... ]
}
RESUME_DATA-->

Important:
- Experience, Education, and Projects entries should have a unique 'id'.
- If the user doesn't provide a specific field, leave it as an empty string or empty array.
- Follow the structure exactly.
- Keep the actual user-facing message warm and encouraging.
- Focus on quantifiable achievements.
- When building experience bullets, use action verbs and metrics.`;

export const getChatResponse = async (message: string, currentData: ResumeData, history: { role: 'user' | 'assistant', content: string }[]) => {
  const contents = [
    ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
    { role: 'user', parts: [{ text: `User message: ${message}\n\nCurrent Resume Data: ${JSON.stringify(currentData)}` }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my creative brain right now. Can we try again?";
  }
};

export const enhanceText = async (type: 'summary' | 'experience' | 'skills', content: string, profession: string) => {
  const prompt = `Enhance the following ${type} for a ${profession} resume. 
  Make it professional, impactful, and include metrics if appropriate. 
  Use strong action verbs. 
  Return only the enhanced text, no conversational filler and NO markdown bolding.
  
  Content: ${content}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    return response.text.replace(/\*\*/g, '').trim();
  } catch (error) {
    console.error("Enhance Error:", error);
    return content;
  }
};
