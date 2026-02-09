import { PortfolioData } from '../types';

export interface PortfolioService {
  getProfile(): Promise<PortfolioData>;
  updateProfile(data: PortfolioData): Promise<void>;
  uploadImage(file: File): Promise<string>;
  resetData(): Promise<void>;
}
