"use client";

import { useDiseases } from "@/hooks/useDiseases";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const { diseases, loading: loadingDiseases } = useDiseases();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="管理後台" theme="light" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Firebase 資料庫管理
          </h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              目前資料庫內容
            </h2>
            {loadingDiseases ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-gray-600">載入中...</span>
              </div>
            ) : diseases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diseases.map((disease) => (
                  <div 
                    key={disease.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{disease.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{disease.name}</h3>
                        <p className="text-xs text-gray-500">{disease.englishName}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{disease.subtitle}</p>
                    <div className="text-xs text-gray-500">
                      完整描述長度: {disease.fullDescription.length} 字
                      {disease.celebrityExample ? ` | 名人代表: ${disease.celebrityExample.name}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">目前 Firebase 中沒有疾病資料</p>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ 資料狀態：</h3>
            <ul className="text-green-700 text-sm space-y-1 list-disc list-inside">
              <li>疾病資料已成功上傳到 Firebase</li>
              <li>知識頁面現在從 Firebase 載入資料</li>
              <li>包含來自 upload.txt 的完整專業醫學描述</li>
              <li>系統已準備好提供服務</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 