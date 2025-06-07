"use client";

import { useState } from "react";
import Navbar from '@/components/Navbar';

export default function TransformPage() {
  const [inputText, setInputText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [selectedDisorder, setSelectedDisorder] = useState("depression");
  const [isTransforming, setIsTransforming] = useState(false);

  const disorders = [
    { 
      id: "depression", 
      name: "憂鬱症", 
      color: "from-blue-500 to-indigo-600"
    },
    { 
      id: "gad", 
      name: "廣泛性焦慮症", 
      color: "from-green-500 to-teal-600"
    },
    { 
      id: "schizophrenia", 
      name: "思覺失調症", 
      color: "from-red-500 to-pink-600"
    },
    { 
      id: "bipolar", 
      name: "雙相情緒障礙症", 
      color: "from-purple-500 to-violet-600"
    }
  ];

  const handleTransform = async () => {
    if (!inputText.trim()) return;
    
    setIsTransforming(true);
    
    // 模擬 API 調用延遲
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 這裡將來會接入真實的轉換邏輯
    const mockTransformations = {
      depression: `「他們一定是在嘲笑我...我做什麼都不對...沒有人真的關心我...」`,
      gad: `「這會不會發生什麼可怕的事？一定會出事的...我控制不了...」`,
      schizophrenia: `「他們在說我的壞話...這是個陰謀...有人在監視我...」`,
      bipolar: `「他們根本不了解我！為什麼要這樣對我？我受夠了！」`
    };
    
    setTransformedText(mockTransformations[selectedDisorder as keyof typeof mockTransformations]);
    setIsTransforming(false);
  };

  const handleReset = () => {
    setInputText("");
    setTransformedText("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* 導航欄 */}
      <Navbar currentPage="話語轉換" theme="light" />

      {/* 主要內容 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* 標題區域 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-slate-700">話語</span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                轉換體驗
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed break-keep">
              輸入一句日常對話，選擇精神疾病類型，<br />
              體驗患者可能聽到的「內心聲音」
            </p>
          </div>

          {/* 疾病類型選擇 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              選擇體驗類型
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {disorders.map((disorder) => (
                <button
                  key={disorder.id}
                  onClick={() => setSelectedDisorder(disorder.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedDisorder === disorder.id
                      ? "border-purple-400 bg-purple-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${disorder.color} mx-auto mb-2`}></div>
                  <div className="text-sm font-medium text-gray-900">
                    {disorder.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 翻譯器風格的轉換區域 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 轉換控制列 */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    話語轉換器
                  </h3>
                  <span className="text-sm text-gray-500">
                    {disorders.find(d => d.id === selectedDisorder)?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleReset}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    title="清除內容"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button
                    onClick={handleTransform}
                    disabled={!inputText.trim() || isTransforming}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isTransforming ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>轉換中</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span>轉換</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 雙欄布局 */}
            <div className="grid md:grid-cols-2 divide-x divide-gray-200">
              {/* 左側：輸入區域 */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                    <span>原始話語</span>
                  </h4>
                  <span className="text-sm text-gray-500">
                    {inputText.length}/200
                  </span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="輸入一句日常對話..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-40 text-lg placeholder-gray-400"
                  maxLength={200}
                />
                <div className="mt-3 text-sm text-gray-500">
                  例如：「你今天看起來很不錯」、「這個工作做得很好」
                </div>
              </div>

              {/* 右側：結果區域 */}
              <div className="p-6 bg-gradient-to-br from-purple-50/30 to-pink-50/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                    <span>患者聽到的聲音</span>
                  </h4>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {disorders.find(d => d.id === selectedDisorder)?.name}
                  </span>
                </div>
                
                <div className="min-h-40 p-4 bg-white border border-gray-200 rounded-xl">
                  {!inputText.trim() ? (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <div className="text-center">
                        <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-sm">在左側輸入話語後點擊轉換</p>
                      </div>
                    </div>
                  ) : isTransforming ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-3"></div>
                        <p className="text-gray-600">正在分析語句...</p>
                      </div>
                    </div>
                  ) : transformedText ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-400">
                        <p className="text-purple-900 font-medium text-lg leading-relaxed">
                          {transformedText.split('→')[1]?.trim().replace(/「|」/g, '') || transformedText}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 flex items-start space-x-2">
                        <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p>這是模擬的內心聲音，實際情況可能更複雜</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <p className="text-sm">點擊「轉換」按鈕查看結果</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 底部提醒 */}
            <div className="bg-yellow-50 border-t border-yellow-200 px-6 py-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>重要提醒：</strong> 這只是一個教育性模擬體驗。真實的精神疾病症狀複雜多樣，每個人的體驗都不同。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 說明區域 */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                關於此體驗
              </h3>
              <p className="text-gray-600 leading-relaxed break-keep max-w-3xl mx-auto">
                精神疾病患者常常會在大腦中聽到扭曲的聲音，將中性或正面的話語轉換成負面的內容。
                這個體驗讓我們理解他們面對的挑戰，並學會以更加同理和包容的方式與他們互動。
                <br /><br />
                <strong>請記住：</strong>這只是一個簡化的模擬，真實的精神疾病症狀遠比這更複雜。
                如果您或身邊的人需要協助，請尋求專業的心理健康支持。
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 頁腳 */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              © 2024 Through Their Mind. 致力於建立更具同理心的社會。
            </p>
            <p className="text-sm">
              如果您或您身邊的人需要心理健康支持，請聯繫專業醫療機構。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 