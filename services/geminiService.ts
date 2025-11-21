import { GoogleGenAI, Type } from "@google/genai";
import { ThumbnailIdea } from "../types";

const apiKey = process.env.API_KEY;

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
        responseJsonSchema: {
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

export const generateComposition = async (
  hookText: string,
  imageDataUrls: string[]
): Promise<{
  layout: 'center' | 'left' | 'right' | 'split';
  textPosition: { x: number; y: number };
  textSize: number;
  imagePositions: Array<{ x: number; y: number; scale: number; zIndex: number }>;
  reasoning: string;
}> => {
  if (!ai) {
    throw new Error("API Key not configured");
  }

  const prompt = `You are a professional thumbnail designer. Given this hook text and ${imageDataUrls.length} image(s), create an optimal composition for a 1920x1080 YouTube thumbnail.

Hook Text: "${hookText}"

Provide a composition layout with:
1. Overall layout strategy (center, left, right, or split)
2. Text position (x, y coordinates where 0,0 is top-left)
3. Text size (60-180 recommended)
4. For each of the ${imageDataUrls.length} image(s), provide position (x, y), scale (0.5-1.5), and zIndex (1-10, higher is front)

Consider:
- Text should be highly readable
- Main subject should be prominent
- Follow rule of thirds when possible
- Text should contrast with background
- Leave breathing room

Return JSON format with: layout, textPosition {x, y}, textSize, imagePositions [{x, y, scale, zIndex}], reasoning`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: {
          type: Type.OBJECT,
          properties: {
            layout: { type: Type.STRING },
            textPosition: {
              type: Type.OBJECT,
              properties: {
                x: { type: Type.NUMBER },
                y: { type: Type.NUMBER }
              }
            },
            textSize: { type: Type.NUMBER },
            imagePositions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  scale: { type: Type.NUMBER },
                  zIndex: { type: Type.NUMBER }
                }
              }
            },
            reasoning: { type: Type.STRING }
          },
          required: ["layout", "textPosition", "textSize", "imagePositions", "reasoning"]
        }
      }
    });

    const jsonString = response.text;
    if (!jsonString) throw new Error("No response from AI");
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Composition Error:", error);
    throw error;
  }
};

export const critiqueThumbnail = async (imageDataUrl: string): Promise<{critique: string; suggestions: string[]}> => {
  if (!ai) {
    throw new Error("API Key not configured");
  }

  const matches = imageDataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid image format");
  
  const mimeType = matches[1];
  const data = matches[2];

  const prompt = `You are a YouTube thumbnail expert. Analyze this thumbnail and provide:
1. A brief critique (2-3 sentences) covering composition, text readability, color contrast, and emotional impact.
2. Three specific, actionable suggestions for improvement (text variations, layout changes, or visual tweaks).

Return your response in JSON format with keys: "critique" (string) and "suggestions" (array of 3 strings).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: {
          type: Type.OBJECT,
          properties: {
            critique: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["critique", "suggestions"]
        }
      }
    });

    const jsonString = response.text;
    if (!jsonString) throw new Error("No response from AI");
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Critique Error:", error);
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

  // IF Reference Image exists -> Use Gemini 3 Pro Image (High-Quality Image Editing/Variation)
  if (referenceImageBase64) {
    const matches = referenceImageBase64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid image format");

    const mimeType = matches[1];
    const data = matches[2];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
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

        // Gemini 3 Pro Image returns the image in the inlineData of the parts
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

  // IF NO Reference Image -> Use Gemini 3 Pro Image (High Quality Text-to-Image)
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: aspectRatio
        }
      }
    });

    // Gemini 3 Pro Image returns the image in the inlineData of the parts
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
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};