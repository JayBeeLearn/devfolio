import { createClient } from '@supabase/supabase-js';
import { PortfolioService } from './types';
import { PortfolioData } from '../types';
import { INITIAL_DATA } from '../constants';

const TABLE_NAME = "profiles";
const USER_ID = "main"; // Single User Mode default
const BUCKET_NAME = "portfolio-assets";

export class SupabasePortfolioService implements PortfolioService {
  private supabase: any;

  constructor(config: any) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
        this.supabase = createClient(supabaseUrl, supabaseKey);
    } else {
        console.error("Supabase credentials missing");
    }
  }

  async getProfile(): Promise<PortfolioData> {
    // Try to get data with ID 'main', or create if not exists
    const { data, error } = await this.supabase
      .from(TABLE_NAME)
      .select('data')
      .eq('id', USER_ID)
      .single();

    if (error || !data) {
        // Init row
        await this.supabase.from(TABLE_NAME).insert([
            { id: USER_ID, data: INITIAL_DATA }
        ]);
        return INITIAL_DATA;
    }

    return data.data as PortfolioData;
  }

  async updateProfile(data: PortfolioData): Promise<void> {
    const { error } = await this.supabase
      .from(TABLE_NAME)
      .update({ data: data })
      .eq('id', USER_ID);
      
    if (error) throw error;
  }

  async uploadImage(file: File): Promise<string> {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrlData } = this.supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);
      
    return publicUrlData.publicUrl;
  }

  async resetData(): Promise<void> {
    await this.updateProfile(INITIAL_DATA);
  }
}
