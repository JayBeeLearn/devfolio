import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PortfolioService } from './types';
import { PortfolioData } from '../types';
import { INITIAL_DATA } from '../constants';

const COLLECTION_NAME = "portfolios";
const DOC_ID = "main"; // Single User Mode

export class FirebasePortfolioService implements PortfolioService {
  private db: any;
  private storage: any;

  constructor(config: any) { // Config passed from factory.ts
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }

  async getProfile(): Promise<PortfolioData> {
    const docRef = doc(this.db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    } else {
      // Initialize if not exists
      const sanitized = this.sanitizeData(INITIAL_DATA);
      await setDoc(docRef, sanitized);
      return INITIAL_DATA;
    }
  }

  async updateProfile(data: PortfolioData): Promise<void> {
    const docRef = doc(this.db, COLLECTION_NAME, DOC_ID);
    const sanitized = this.sanitizeData(data);
    await updateDoc(docRef, sanitized as any);
  }

  async uploadImage(file: File): Promise<string> {
    const storageRef = ref(this.storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  async resetData(): Promise<void> {
    const docRef = doc(this.db, COLLECTION_NAME, DOC_ID);
    const sanitized = this.sanitizeData(INITIAL_DATA);
    await setDoc(docRef, sanitized);
  }

  private sanitizeData(data: any): any {
    // Firestore doesn't like undefined. Recursively remove undefined fields.
    return JSON.parse(JSON.stringify(data, (key, value) => {
      return value === undefined ? null : value;
    }));
  }
}
