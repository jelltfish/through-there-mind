"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from '@/components/Navbar';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 導航欄 */}
      <Navbar theme="light" />

      {/* 主要內容 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 標題和介紹 */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-slate-700 drop-shadow-sm">感受他們的</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                內心世界
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed break-keep">
              透過互動體驗，讓我們走進精神疾病患者的思維困境，<br />
              理解他們的內在語言與互動障礙，培養同理心與理解。
            </p>
          </div>

          {/* 功能卡片 */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 疾病小知識卡片 */}
            <div
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden ${
                hoveredCard === "knowledge" ? "ring-2 ring-blue-400" : ""
              }`}
              onMouseEnter={() => setHoveredCard("knowledge")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  疾病小知識
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed break-keep">
                  探索各種精神疾病的科普知識，
                  了解症狀、成因和治療方式，建立正確的認知基礎。
                </p>
                <Link
                  href="/knowledge"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  開始探索
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
            </div>

            {/* 話語轉換卡片 */}
            <div
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden ${
                hoveredCard === "transform" ? "ring-2 ring-purple-400" : ""
              }`}
              onMouseEnter={() => setHoveredCard("transform")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 opacity-50"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  話語轉換
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed break-keep">
                  輸入一句話，體驗精神疾病患者聽到的「扭曲版本」，
                  感受他們的認知世界。
                </p>
                <Link
                  href="/transform"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  開始體驗
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
            </div>
          </div>

          {/* 底部說明 */}
          <div className="mt-16 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
            <p className="text-gray-800 leading-relaxed break-keep">
              此網站旨在讓一般人能夠「體會」精神疾病患者的視角，<br />
              感受他們的思維困境、內在語言與互動障礙，促進社會對精神疾病的理解與接納。
            </p>
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
