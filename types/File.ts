export interface File {
  fullPath?: string;
  publicUrl?: string;
}

export interface ImagePickerResult {
  uri: string;
  type?: string;
  fileName?: string;
}