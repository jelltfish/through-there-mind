import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc,
  query,
  orderBy 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Disease } from "@/types/disease";

const COLLECTION_NAME = "diseases";

// 取得所有疾病資料
export const getAllDiseases = async (): Promise<Disease[]> => {
  try {
    const diseaseCollection = collection(db, COLLECTION_NAME);
    const q = query(diseaseCollection, orderBy("name"));
    const querySnapshot = await getDocs(q);
    
    const diseases: Disease[] = [];
    querySnapshot.forEach((doc) => {
      diseases.push({ ...doc.data() } as Disease);
    });
    
    return diseases;
  } catch (error) {
    console.error("Error fetching diseases:", error);
    throw error;
  }
};

// 根據 ID 取得特定疾病資料
export const getDiseaseById = async (id: string): Promise<Disease | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { ...docSnap.data() } as Disease;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching disease by ID:", error);
    throw error;
  }
};

// 新增疾病資料
export const addDisease = async (disease: Disease): Promise<void> => {
  try {
    // 使用疾病的 id 作為文檔 ID
    const docRef = doc(db, COLLECTION_NAME, disease.id);
    await setDoc(docRef, disease);
  } catch (error) {
    console.error("Error adding disease:", error);
    throw error;
  }
};

// 批次同步疾病資料
export const uploadDiseasesToFirebase = async (diseases: Disease[]): Promise<void> => {
  try {
    const promises = diseases.map(disease => addDisease(disease));
    await Promise.all(promises);
    console.log("All diseases synced successfully!");
  } catch (error) {
    console.error("Error syncing diseases:", error);
    throw error;
  }
}; 