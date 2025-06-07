import { useState, useEffect } from "react";
import { Disease } from "@/types/disease";
import { getAllDiseases } from "@/services/diseaseService";

interface UseDiseasesReturn {
  diseases: Disease[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDiseases = (): UseDiseasesReturn => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiseases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllDiseases();
      setDiseases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入疾病資料時發生錯誤");
      console.error("Failed to fetch diseases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  return {
    diseases,
    loading,
    error,
    refetch: fetchDiseases
  };
}; 