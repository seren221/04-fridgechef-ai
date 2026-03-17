import { NextResponse } from 'next/server';
import { universalInvoke } from '@/lib/ai/universalInvoke';

export async function POST(request: Request) {
  try {
    const { imageUrl, prompt, locale = 'zh' } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: '图片不能为空' }, { status: 400 });
    }

    // 调用统一 AI 接口
    const result = await universalInvoke({
      prompt: prompt || '请分析这些食材并生成一份美味的食谱',
      imageUrl,
      locale,
      projectConfig: {
        name: 'FridgeChef AI',
        expert_identity: '你是一位专业的 AI 厨师，擅长根据冰箱里的食材生成美味、可行的食谱。请用中文回复，包含食材清单、详细步骤和烹饪小贴士。',
      },
    });

    if (!result.success) {
      console.error('AI 调用失败:', result.error);
      return NextResponse.json({ error: 'AI 分析失败，请重试' }, { status: 500 });
    }

    // 解析 AI 返回的食谱内容
    const recipeContent = result.content || '';
    
    // 简单的解析逻辑，假设 AI 返回结构化文本
    const ingredients: string[] = [];
    let instructions = '';
    let tips = '';

    const lines = recipeContent.split('\n');
    let currentSection = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.includes('食材') || trimmed.includes('配料') || trimmed.toLowerCase().includes('ingredient')) {
        currentSection = 'ingredients';
      } else if (trimmed.includes('步骤') || trimmed.includes('做法') || trimmed.toLowerCase().includes('instruction') || trimmed.toLowerCase().includes('step')) {
        currentSection = 'instructions';
      } else if (trimmed.includes('小贴士') || trimmed.includes('提示') || trimmed.toLowerCase().includes('tip')) {
        currentSection = 'tips';
      } else {
        if (currentSection === 'ingredients' && (trimmed.startsWith('-') || trimmed.startsWith('•'))) {
          ingredients.push(trimmed.replace(/^[-•]\s*/, ''));
        } else if (currentSection === 'instructions') {
          instructions += trimmed + '\n';
        } else if (currentSection === 'tips') {
          tips += trimmed + '\n';
        }
      }
    }

    // 如果没有解析出食材，使用默认值
    if (ingredients.length === 0) {
      ingredients.push('根据图片识别的食材');
    }

    return NextResponse.json({
      ingredients,
      instructions: instructions || recipeContent,
      tips: tips || '享受您的美食！',
      model: result.model,
    });

  } catch (error) {
    console.error('生成食谱时出错:', error);
    return NextResponse.json({ error: '服务器错误，请稍后重试' }, { status: 500 });
  }
}
