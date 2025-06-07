import { Disease } from '@/types/disease';

interface DiseaseDetailProps {
  disease: Disease;
  onBack: () => void;
}

export default function DiseaseDetail({ disease, onBack }: DiseaseDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-300 hover:text-white mb-8 transition-colors font-medium"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回疾病列表
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className={`h-4 bg-gradient-to-r ${disease.color.primary}`}></div>
        <div className="p-8 md:p-12">
          <div className="flex items-center mb-8">
            <div className="text-6xl mr-6">{disease.icon}</div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {disease.name}
              </h2>
              <p className="text-xl text-gray-600">{disease.subtitle}</p>
              <p className="text-sm text-gray-500 mt-1">{disease.englishName}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="text-lg text-gray-700 mb-8 leading-relaxed whitespace-pre-line">
              {disease.fullDescription}
            </div>

            {disease.celebrityExample && (
              <div className={`mb-8 p-6 bg-gradient-to-r ${disease.color.secondary} rounded-xl border border-gray-200`}>
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <h4 className="text-lg font-semibold text-gray-800">名人代表</h4>
                </div>
                <p className="text-gray-700">
                  <strong>{disease.celebrityExample.name}</strong>：{disease.celebrityExample.description}
                </p>
              </div>
            )}

            <div className={`mt-8 p-6 bg-gradient-to-r ${disease.color.secondary} rounded-xl border border-gray-200`}>
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-lg font-semibold text-gray-800">重要提醒</h4>
              </div>
              <p className="text-gray-700">
                如果您或身邊的人出現類似症狀，請及時尋求專業醫療協助。
                精神疾病是可以治療的，早期介入能夠顯著改善患者的生活品質。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 