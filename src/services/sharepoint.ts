import { supabase } from '../lib/supabase';

interface SharePointFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  lastModified: string;
}

export const SHAREPOINT_ROOT_URL = 'https://netorgft10740913-my.sharepoint.com/:f:/g/personal/m_alsaadi_shcqms_com/EnBDDa_Znv5HlNZZPvvEOpEBq4vNOXdVHdDSZw78Xq-rlg';

export async function fetchSharePointFiles(): Promise<SharePointFile[]> {
  try {
    // In a real implementation, this would use Microsoft Graph API
    // For now, we'll store the mapping in Supabase
    const { data, error } = await supabase
      .from('sharepoint_files')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching SharePoint files:', error);
    return [];
  }
}

export async function linkSharePointFile(fileData: Partial<SharePointFile>) {
  try {
    const { data, error } = await supabase
      .from('sharepoint_files')
      .insert([fileData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error linking SharePoint file:', error);
    throw error;
  }
}