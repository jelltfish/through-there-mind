export interface Disease {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  celebrityExample?: {
    name: string;
    description: string;
  };
  color: {
    primary: string;
    secondary: string;
    bg: string;
  };
} 