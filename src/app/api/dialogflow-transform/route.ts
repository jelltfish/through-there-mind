import { NextRequest, NextResponse } from 'next/server';

// 使用 Dialogflow REST API 進行文本轉換
const DIALOGFLOW_PROJECT_ID = 'devjem';
const DIALOGFLOW_LOCATION = 'us-central1';
const DIALOGFLOW_AGENT_ID = '696971cd-ee1f-45c1-a07b-683b0ef743d9';

// Google Cloud 服務帳戶金鑰（需要在環境變數中設置）
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY;

export async function POST(request: NextRequest) {
  try {
    const { text, disorder } = await request.json();

    // 驗證輸入
    if (!text || !disorder) {
      return NextResponse.json(
        { error: '缺少必要的參數：text 或 disorder' },
        { status: 400 }
      );
    }

    // 如果沒有 Google Cloud 配置，返回模擬結果
    if (!GOOGLE_SERVICE_ACCOUNT_KEY || GOOGLE_SERVICE_ACCOUNT_KEY === 'your_google_service_account_key_here') {
      console.log('未配置 Google Cloud 服務帳戶，使用模擬結果');
      
      const mockTransformations = {
        depression: `「他們一定是在嘲笑我...我做什麼都不對...沒有人真的關心我...」`,
        gad: `「這會不會發生什麼可怕的事？一定會出事的...我控制不了...」`,
        schizophrenia: `「他們在說我的壞話...這是個陰謀...有人在監視我...」`,
        bipolar: `「他們根本不了解我！為什麼要這樣對我？我受夠了！」`
      };

      return NextResponse.json({
        transformedText: mockTransformations[disorder as keyof typeof mockTransformations] || '無法轉換此內容',
        source: 'mock'
      });
    }

    // 根據精神疾病類型構建提示
    const prompts = {
      depression: `現在你是憂鬱症患者的內心聲音模擬器。請將「${text}」轉換成憂鬱症患者可能聽到的負面、自我懷疑的內心聲音。只回答轉換後的內心聲音，不要包含任何解釋或判斷依據。`,
      gad: `現在你是廣泛性焦慮症患者的內心聲音模擬器。請將「${text}」轉換成焦慮症患者可能聽到的擔憂、災難化的內心聲音。只回答轉換後的內心聲音，不要包含任何解釋或判斷依據。`,
      schizophrenia: `現在你是思覺失調症患者的內心聲音模擬器。請將「${text}」轉換成思覺失調症患者可能聽到的偏執、被害妄想的內心聲音。只回答轉換後的內心聲音，不要包含任何解釋或判斷依據。`,
      bipolar: `現在你是雙相情緒障礙症患者的內心聲音模擬器。請將「${text}」轉換成雙相情緒障礙症患者可能聽到的情緒極端、激烈的內心聲音。只回答轉換後的內心聲音，不要包含任何解釋或判斷依據。`
    };

    const queryText = prompts[disorder as keyof typeof prompts];
    if (!queryText) {
      return NextResponse.json(
        { error: '不支援的疾病類型' },
        { status: 400 }
      );
    }

    // 嘗試調用 Dialogflow API
    try {
      const accessToken = await getGoogleAccessToken();
      const dialogflowResponse = await callDialogflowAPI(queryText, accessToken);
      
      return NextResponse.json({
        transformedText: dialogflowResponse,
        source: 'dialogflow'
      });
      
    } catch (apiError) {
      console.error('Dialogflow API 調用失敗:', apiError);
      
      // 如果 Dialogflow 失敗，返回備用模擬結果
      const mockTransformations = {
        depression: `「他們一定是在嘲笑我...我做什麼都不對...沒有人真的關心我...」`,
        gad: `「這會不會發生什麼可怕的事？一定會出事的...我控制不了...」`,
        schizophrenia: `「他們在說我的壞話...這是個陰謀...有人在監視我...」`,
        bipolar: `「他們根本不了解我！為什麼要這樣對我？我受夠了！」`
      };

      return NextResponse.json({
        transformedText: mockTransformations[disorder as keyof typeof mockTransformations] || '轉換失敗',
        source: 'fallback'
      });
    }

  } catch (error) {
    console.error('API 處理錯誤:', error);
    
    return NextResponse.json(
      { 
        error: 'AI 轉換服務暫時無法使用',
        details: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    );
  }
}

// 獲取 Google Cloud 訪問令牌
async function getGoogleAccessToken(): Promise<string> {
  try {
    const serviceAccountKey = process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('未找到 Google Cloud 服務帳戶金鑰');
    }

    const credentials = JSON.parse(serviceAccountKey);
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600; // 1 小時過期

    // 構建 JWT header
    const header = {
      alg: 'RS256',
      typ: 'JWT'
    };

    // 構建 JWT payload
    const payload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: 'https://oauth2.googleapis.com/token',
      exp: exp,
      iat: now
    };

    // 使用 Web Crypto API 創建 JWT
    const jwt = await createJWT(header, payload, credentials.private_key);

    // 獲取訪問令牌
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': jwt
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`獲取訪問令牌失敗: ${response.status} ${errorText}`);
    }

    const tokenData = await response.json();
    return tokenData.access_token;
    
  } catch (error) {
    console.error('獲取訪問令牌錯誤:', error);
    throw error;
  }
}

// 創建 JWT
async function createJWT(header: Record<string, string>, payload: Record<string, string | number>, privateKey: string): Promise<string> {
  // Base64URL 編碼
  const base64UrlEncode = (obj: Record<string, string | number>) => {
    return Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // 導入私鑰
  const key = await crypto.subtle.importKey(
    'pkcs8',
    Buffer.from(privateKey.replace(/-----BEGIN PRIVATE KEY-----|\n|-----END PRIVATE KEY-----/g, ''), 'base64'),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // 簽名
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = Buffer.from(signature)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${signingInput}.${encodedSignature}`;
}

// 調用 Dialogflow CX API (v3)
async function callDialogflowAPI(queryText: string, accessToken: string): Promise<string> {
  const sessionId = `transform-session-${Date.now()}`;
  // 使用 Dialogflow CX (v3) API - 正確格式
  const url = `https://${DIALOGFLOW_LOCATION}-dialogflow.googleapis.com/v3/projects/${DIALOGFLOW_PROJECT_ID}/locations/${DIALOGFLOW_LOCATION}/agents/${DIALOGFLOW_AGENT_ID}/sessions/${sessionId}:detectIntent`;

  const requestBody = {
    queryInput: {
      text: {
        text: queryText
      },
      languageCode: 'zh-TW'
    }
  };

  console.log('Dialogflow CX 請求 URL:', url);
  console.log('Dialogflow CX 請求體:', JSON.stringify(requestBody, null, 2));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Dialogflow CX API 詳細錯誤:', errorText);
    throw new Error(`Dialogflow CX API 錯誤: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Dialogflow CX 回應:', JSON.stringify(data, null, 2));
  
  // 提取回應文本 (CX v3 格式)
  let fulfillmentText = data.queryResult?.responseMessages?.[0]?.text?.text?.[0] ||
                       data.queryResult?.fulfillmentText ||
                       '無法獲取回應';

  // 清理回應文本，移除技術說明部分
  fulfillmentText = cleanResponseText(fulfillmentText);

  return fulfillmentText;
}

// 清理回應文本函數
function cleanResponseText(text: string): string {
  if (!text) return text;
  
  // 移除各種技術說明格式 - 終極版
  const patterns = [
    // 移除整行包含"判斷依據"的內容（從行首到行尾或句號）
    /^.*?判斷依據.*?(?:[。！？]|$)/gm,
    // 移除冒號後跟技術說明的內容
    /[：:]\s*[^「」]*?(?:患者|症狀|情緒|擺盪|模擬|情況).*?(?:[。！？]|$)/gm,
    // 移除任何包含"邏輯"的技術說明
    /^.*?邏輯.*?(?:[。！？]|$)/gm,
    // 移除任何包含"文獻資料來源"的說明
    /^.*?文獻資料來源.*?(?:[。！？]|$)/gm,
    // 移除任何包含"資料來源"的說明
    /^.*?資料來源.*?(?:[。！？]|$)/gm,
    // 移除任何包含"依據"的技術說明（包括單獨的冒號開頭）
    /^.*?依據.*?(?:[。！？]|$)/gm,
    // 移除任何包含"參考"的技術說明
    /^.*?參考.*?(?:[。！？]|$)/gm,
    // 移除疾病相關的技術說明
    /^.*?(憂鬱症|廣泛性焦慮症|思覺失調症|雙相情緒障礙症|躁鬱症).*?(?:患者|症狀|情緒|特徵|表現).*?(?:[。！？]|$)/gm,
    // 移除說明性文字
    /^.*?(根據|基於|參照|依照|因此|所以).*?(研究|文獻|資料|臨床|模擬|情況).*?(?:[。！？]|$)/gm,
    // 移除單獨的冒號開頭的解釋
    /^[：:]\s*.*?(?:[。！？]|$)/gm,
    // 移除多餘的空白行
    /\n\s*\n/g,
    // 移除行首行尾空白
    /^\s+|\s+$/gm,
  ];
  
  let cleanedText = text;
  
  // 逐一應用清理規則
  patterns.forEach((pattern, index) => {
    if (index === patterns.length - 2) {
      // 合併多個換行為單個換行
      cleanedText = cleanedText.replace(pattern, '\n');
    } else if (index === patterns.length - 1) {
      // 移除開頭和結尾空白
      cleanedText = cleanedText.replace(pattern, '');
    } else {
      // 移除匹配的內容
      cleanedText = cleanedText.replace(pattern, '');
    }
  });
  
  // 最終清理
  cleanedText = cleanedText
    .replace(/\n+/g, '\n')  // 合併多個換行
    .replace(/^\s*\n|\n\s*$/g, '')  // 移除開頭和結尾的空行
    .trim();
  
  // 如果清理後的文本為空或過短，返回友好的錯誤訊息
  if (!cleanedText || cleanedText.length < 5) {
    return '抱歉，AI 回應格式異常，請重試。';
  }
  
  console.log('原始回應:', text);
  console.log('清理後回應:', cleanedText);
  
  return cleanedText;
} 