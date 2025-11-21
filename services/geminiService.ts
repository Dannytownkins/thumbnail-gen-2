import { GoogleGenAI, Type } from "@google/genai";
import { ThumbnailIdea } from "../types";

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY ||
  process.env.API_KEY;

// Initialize safely - if no key, we handle errors gracefully in the UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateThumbnailHooks = async (videoTitle: string): Promise<ThumbnailIdea[]> => {
  if (!ai) {
    throw new Error("API Key not configured");
  }

  const prompt = `
    You are a YouTube Thumbnail expert implementing "The No-Nonsense YouTube Thumbnail Workflow".
    
    The user has a video title: "${videoTitle}".
    
    Your goal is to generate 4 Thumbnail Text concepts following these rules:
    1. DO NOT repeat the title. Contextualize or amplify it.
    2. Maximum 4 words per text. Ideally 2.
    3. Target specific emotions: Fear, Curiosity, Joy, or Disgust.
    4. If the title is "I Bought a Ferrari", good text is "$250,000 Mistake?". Bad text is "I Bought a Ferrari".
    
    Return the response in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "The text to place on the thumbnail" },
              reasoning: { type: Type.STRING, description: "Why this works (psychological hook)" },
              emotion: { type: Type.STRING, description: "Primary emotion targeted" }
            },
            required: ["text", "reasoning", "emotion"]
          }
        }
      }
    });

    const jsonString = response.text;
    if (!jsonString) return [];
    
    return JSON.parse(jsonString) as ThumbnailIdea[];
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const generateThumbnailImage = async (
  prompt: string, 
  aspectRatio: '16:9' | '1:1' | '9:16' = '16:9',
  referenceImageBase64?: string
): Promise<string> => {
  if (!ai) {
    throw new Error("API Key not configured");
  }

  // IF Reference Image exists -> Use Gemini 2.5 Flash Image (Image Editing/Variation)
  if (referenceImageBase64) {
    const matches = referenceImageBase64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid image format");
    
    const mimeType = matches[1];
    const data = matches[2];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { mimeType, data } },
                    { text: prompt }
                ]
            },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio
                }
            }
        });

        // Gemini 2.5 Flash Image returns the image in the inlineData of the parts
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        
        // Fallback: Check if the model returned text explaining why it couldn't generate
        const textPart = response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
        if (textPart) {
            throw new Error(`Model declined: ${textPart}`);
        }
        
        throw new Error("No image generated in response");
    } catch (error) {
        console.error("Gemini Image Edit Error:", error);
        throw error;
    }
  }

  // IF NO Reference Image -> Use Imagen 3 (High Quality Text-to-Image)
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });
    
    if (!response.generatedImages?.[0]?.image?.imageBytes) {
        throw new Error("No image generated");
    }

    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};