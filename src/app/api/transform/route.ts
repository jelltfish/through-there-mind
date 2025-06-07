import { NextRequest, NextResponse } from 'next/server';

// 在後端使用環境變數 (不需要 NEXT_PUBLIC_ 前綴)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { text, disorder } = await request.json();

    // 驗證輸入
    if (!text || !disorder) {
      return NextResponse.json(
        { error: '缺少必要的參數' },
        { status: 400 }
      );
    }

    // 檢查是否有 API key
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      // 如果沒有 API key，返回模擬結果
      const mockTransformations = {
        depression: `「他們一定是在嘲笑我...我做什麼都不對...沒有人真的關心我...」`,
        gad: `「這會不會發生什麼可怕的事？一定會出事的...我控制不了...」`,
        schizophrenia: `「他們在說我的壞話...這是個陰謀...有人在監視我...」`,
        bipolar: `「他們根本不了解我！為什麼要這樣對我？我受夠了！」`
      };

      return NextResponse.json({
        transformedText: mockTransformations[disorder as keyof typeof mockTransformations] || '無法轉換此內容'
      });
    }

    // 定義不同疾病的提示詞
    const prompts = {
      depression: `你是一個憂鬱症患者的內心聲音模擬器。將以下正常的話語轉換成憂鬱症患者可能聽到的負面、自我貶低的內心聲音。特徵：自我懷疑、絕望感、認為別人在嘲笑自己。

原始話語：「${text}」

請只回應轉換後的內心聲音（用「」包圍），不要包含其他說明：`,

      gad: `你是一個廣泛性焦慮症患者的內心聲音模擬器。將以下正常的話語轉換成焦慮症患者可能聽到的災難化、擔憂的內心聲音。特徵：過度擔憂、預期最壞情況、失控感。

原始話語：「${text}」

請只回應轉換後的內心聲音（用「」包圍），不要包含其他說明：`,

      schizophrenia: `你是一個思覺失調症患者的內心聲音模擬器。將以下正常的話語轉換成思覺失調症患者可能聽到的被害妄想、現實扭曲的內心聲音。特徵：被害妄想、認為有陰謀、現實感失真。

原始話語：「${text}」

請只回應轉換後的內心聲音（用「」包圍），不要包含其他說明：`,

      bipolar: `你是一個雙相情緒障礙症患者的內心聲音模擬器。將以下正常的話語轉換成雙相情緒障礙症患者可能聽到的情緒極端、激烈的內心聲音。特徵：情緒波動劇烈、容易激怒、感覺被誤解。

原始話語：「${text}」

請只回應轉換後的內心聲音（用「」包圍），不要包含其他說明：`
    };

    const prompt = prompts[disorder as keyof typeof prompts];
    if (!prompt) {
      return NextResponse.json(
        { error: '不支援的疾病類型' },
        { status: 400 }
      );
    }

    // 調用 OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API 錯誤: ${response.status}`);
    }

    const data = await response.json();
    const transformedText = data.choices[0]?.message?.content?.trim() || '無法轉換此內容';

    return NextResponse.json({ transformedText });

  } catch (error) {
    console.error('API 錯誤:', error);
    
    // 發生錯誤時返回備用的模擬結果
    const mockTransformations = {
      depression: `「他們一定是在嘲笑我...我做什麼都不對...沒有人真的關心我...」`,
      gad: `「這會不會發生什麼可怕的事？一定會出事的...我控制不了...」`,
      schizophrenia: `「他們在說我的壞話...這是個陰謀...有人在監視我...」`,
      bipolar: `「他們根本不了解我！為什麼要這樣對我？我受夠了！」`
    };

    const { disorder } = await request.json().catch(() => ({ disorder: 'depression' }));
    
    return NextResponse.json({
      transformedText: mockTransformations[disorder as keyof typeof mockTransformations] || '轉換過程中發生錯誤'
    });
  }
} 