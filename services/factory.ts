import { PortfolioService } from './types';
import { LocalPortfolioService } from './localService';
import { FirebasePortfolioService } from './firebaseService';
import { SupabasePortfolioService } from './supabaseService';

export type BackendType = 'local' | 'firebase' | 'supabase';

export class ServiceFactory {
  static createService(type: BackendType): PortfolioService {

    switch (type) {
      case 'firebase':
        return new FirebasePortfolioService();
      case 'supabase':
         return new SupabasePortfolioService();
      case 'local':
      default:
        return new LocalPortfolioService();
    }
  }
}
