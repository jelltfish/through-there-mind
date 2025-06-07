import Link from "next/link";

interface NavbarProps {
  currentPage?: string;
  theme?: 'light' | 'dark';
}

export default function Navbar({ currentPage, theme = 'light' }: NavbarProps) {
  const isDark = theme === 'dark';
  
  return (
    <nav className={`${
      isDark 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-sm border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className={`text-xl font-bold ${
                isDark 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:text-blue-600'
              } transition-colors`}
            >
              進入他們的心靈世界
            </Link>
            {currentPage && (
              <span className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              } hidden sm:inline`}>
                / {currentPage}
              </span>
            )}
            {!currentPage && (
              <span className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              } hidden sm:inline`}>
                Through Their Mind
              </span>
            )}
          </div>
          
          {currentPage && (
            <Link
              href="/"
              className={`${
                isDark 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              } transition-colors font-medium`}
            >
              返回首頁
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 