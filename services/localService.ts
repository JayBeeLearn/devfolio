import { PortfolioService } from './types';
import { PortfolioData } from '../types';
import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'dev_portfolio_v1_data';

export class LocalPortfolioService implements PortfolioService {
  async getProfile(): Promise<PortfolioData> {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Initialize if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(saved);
  }

  async updateProfile(data: PortfolioData): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async resetData(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  }
}
