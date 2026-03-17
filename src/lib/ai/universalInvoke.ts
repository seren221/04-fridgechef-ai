export interface InvokeOptions {
  prompt: string;
  imageUrl?: string;
  imageBuffer?: Uint8Array | Buffer;
  systemPrompt?: string;
  projectSlug?: string;
  projectConfig?: {
    expert_identity?: string;
    name?: string;
  };
  locale?: string;
}

export interface InvokeResponse {
  success: boolean;
  content?: string;
  error?: string;
  model?: string;
}

const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'google/gemini-flash-1.5-8b:free';
const FALLBACK_MODEL = process.env.FALLBACK_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';
const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY;
const SILICONFLOW_BASE_URL = 'https://api.siliconflow.cn/v1';

function bufferToBase64(buffer: Uint8Array | Buffer): string {
  if (Buffer.isBuffer(buffer)) {
    return buffer.toString('base64');
  }
  return Buffer.from(buffer).toString('base64');
}

async function callSiliconFlow(
  prompt: string,
  model: string,
  imageData?: { url?: string; base64?: string },
  systemPrompt?: string
): Promise<InvokeResponse> {
  if (!SILICONFLOW_API_KEY) {
    return { success: false, error: 'SILICONFLOW_API_KEY not configured' };
  }

  const messages: Array<{
    role: string;
    content: Array<{ type: string; text?: string; image_url?: { url: string } }>;
  }> = [];

  if (systemPrompt) {
    messages.push({ role: 'system', content: [{ type: 'text', text: systemPrompt }] });
  }

  const userContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];

  if (imageData?.url || imageData?.base64) {
    userContent.push({
      type: 'image_url',
      image_url: { url: imageData.base64 ? `data:image/jpeg;base64,${imageData.base64}` : imageData.url! }
    });
  }

  userContent.push({ type: 'text', text: prompt });
  messages.push({ role: 'user', content: userContent });

  try {
    const response = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 2048,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      if (response.status === 429 || errorText.includes('rate_limit')) {
        return { success: false, error: 'Rate limit exceeded', model };
      }
      
      return { success: false, error: `API error: ${response.status} - ${errorText}`, model };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return { success: false, error: 'No content in response', model };
    }

    return { success: true, content, model };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMessage, model };
  }
}

export async function universalInvoke(options: InvokeOptions): Promise<InvokeResponse> {
  const {
    prompt,
    imageUrl,
    imageBuffer,
    projectConfig,
    locale = 'en'
  } = options;

  const systemPrompt = projectConfig?.expert_identity || getDefaultSystemPrompt(projectConfig?.name, locale);
  const currentModel = DEFAULT_MODEL;

  const imageData = imageBuffer
    ? { base64: bufferToBase64(imageBuffer) }
    : imageUrl
    ? { url: imageUrl }
    : undefined;

  const result = await callSiliconFlow(prompt, currentModel, imageData, systemPrompt);

  if (!result.success && (result.error?.includes('Rate limit') || result.error?.includes('429'))) {
    console.warn(`⚠️ Rate limit on ${currentModel}, trying fallback model ${FALLBACK_MODEL}...`);
    
    const fallbackResult = await callSiliconFlow(prompt, FALLBACK_MODEL, imageData, systemPrompt);
    
    if (fallbackResult.success) {
      return { ...fallbackResult, model: FALLBACK_MODEL };
    }
    
    return {
      success: false,
      error: `Both models failed. Primary: ${result.error}, Fallback: ${fallbackResult.error}`,
      model: FALLBACK_MODEL
    };
  }

  return result;
}

function getDefaultSystemPrompt(projectName?: string, locale: string = 'en'): string {
  const isZh = locale === 'zh';
  
  if (projectName?.toLowerCase().includes('fridge') || projectName?.toLowerCase().includes('厨神')) {
    return isZh 
      ? '你是一位米其林星级厨师，拥有20年经验。你擅长将剩余食材变成美味佳肴。你的风格是创意、实用，专注于利用用户冰箱里的食材做出美食。'
      : 'You are a Michelin-starred chef with 20 years of experience. You specialize in turning leftover ingredients into gourmet dishes. Your style is creative, practical, and focuses on making the most of what the user has in their fridge.';
  }
  
  return isZh
    ? '你是一个有用的AI助手。'
    : 'You are a helpful AI assistant.';
}
