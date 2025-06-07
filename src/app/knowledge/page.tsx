"use client";

import Link from "next/link";
import { useState } from "react";
import { Disease } from '@/types/disease';
import { useDiseases } from '@/hooks/useDiseases';
import DiseaseCard from '@/components/DiseaseCard';
import DiseaseDetail from '@/components/DiseaseDetail';
import Navbar from '@/components/Navbar';

export default function KnowledgePage() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const { diseases, loading, error, refetch } = useDiseases();

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar currentPage="疾病小知識" theme="light" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">載入疾病資料中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar currentPage="疾病小知識" theme="light" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
            <p className="text-red-800 font-medium mb-4">載入資料時發生錯誤</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              重新載入
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* 導航欄 */}
      <Navbar currentPage="疾病小知識" theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 頁面標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            精神疾病小知識
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            了解不同精神疾病的特徵和症狀，建立正確的認知基礎，促進理解與同理心
          </p>
        </div>

        {!selectedDisease ? (
          /* 疾病卡片網格 */
          <div className="grid md:grid-cols-2 gap-8">
            {diseases.map((disease: Disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                onClick={() => setSelectedDisease(disease)}
              />
            ))}
          </div>
        ) : (
          /* 詳細資訊頁面 */
          <DiseaseDetail
            disease={selectedDisease}
            onBack={() => setSelectedDisease(null)}
          />
        )}

        {/* 底部導航 */}
        {!selectedDisease && (
          <div className="mt-16 text-center">
            <Link
              href="/transform"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              體驗話語轉換
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 