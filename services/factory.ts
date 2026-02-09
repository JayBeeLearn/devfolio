import { PortfolioService } from './types';
import { LocalPortfolioService } from './localService';
import { FirebasePortfolioService } from './firebaseService';
import { SupabasePortfolioService } from './supabaseService';

export type BackendType = 'local' | 'firebase' | 'supabase';

export class ServiceFactory {
  static createService(type: BackendType): PortfolioService {
    // In a real app, we might pass config from env vars here
    const config = {}; 

    switch (type) {
      case 'firebase':
        return new FirebasePortfolioService(config);
      case 'supabase':
         return new SupabasePortfolioService(config);
      case 'local':
      default:
        return new LocalPortfolioService();
    }
  }
}
