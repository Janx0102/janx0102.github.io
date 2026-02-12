
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  // Use property access for response.text and initialize ai right before calls to ensure latest API key usage.

  async summarizePost(content: string): Promise<string> {
    try {
      // Always initialize right before use with the environment key.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Please provide a concise, single-paragraph summary of the following blog post content. Focus on the key takeaway: \n\n${content}`,
        config: {
          temperature: 0.7,
        }
      });
      // response.text is a property, not a method.
      return response.text || "Could not generate summary.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while generating the summary.";
    }
  }

  async generateCatArt(): Promise<string | null> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: "A single, continuous line drawing of a minimalist cat, high contrast black ink on pure white background, elegant, sophisticated, fine art style, monochrome, centered, studio lighting effect." }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      // Iterate through parts to find the image part as recommended for nano banana series.
      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Image Gen Error:", error);
      return null;
    }
  }

  async getAISentiment(content: string): Promise<{ sentiment: string; score: number }> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the sentiment of this text and return it in JSON format: \n\n${content}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sentiment: { type: Type.STRING, description: "Positive, Negative, or Neutral" },
              score: { type: Type.NUMBER, description: "Score from 0 to 1" }
            },
            required: ["sentiment", "score"],
            propertyOrdering: ["sentiment", "score"]
          }
        }
      });
      // response.text is a property.
      const text = response.text?.trim();
      return JSON.parse(text || '{"sentiment": "Unknown", "score": 0}');
    } catch (error) {
      console.error("Sentiment Analysis Error:", error);
      return { sentiment: "Error", score: 0 };
    }
  }
}

export const geminiService = new GeminiService();
