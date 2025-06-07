import { Disease } from '@/types/disease';

interface DiseaseCardProps {
  disease: Disease;
  onClick: () => void;
}

export default function DiseaseCard({ disease, onClick }: DiseaseCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 hover:border-gray-300 overflow-hidden`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
      <div className={`h-2 bg-gradient-to-r ${disease.color.primary}`}></div>
      <div className="relative p-8">
        <div className="flex items-center mb-6">
          <div className="text-4xl mr-4">{disease.icon}</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {disease.name}
            </h3>
            <p className="text-gray-600">{disease.subtitle}</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          {disease.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className={`px-4 py-2 bg-gradient-to-r ${disease.color.secondary} rounded-lg border border-gray-200`}>
            <span className="text-sm font-medium text-gray-700">
              點擊了解更多
            </span>
          </div>
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 