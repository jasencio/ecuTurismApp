import { Organization } from '@/types/Organization';
import { File, ImagePickerResult } from "./File";

export enum Hardness {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface Route {
  id: string;
  organization: Organization;
  name: string | null;
  description: string | null;
  minutes: string | null;
  hardness: Hardness | null;
  distance: string | null;
  mainImage: File;
  isActive: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export type RouteCreate = Omit<Route, 'id' | 'organization' | 'mainImage' | 'createdAt' | 'updatedAt'> & {
  imageBase64: string | null;
  image: ImagePickerResult | null;
};

export type RouteUpdate = Omit<Route, 'organization' | 'mainImage' | 'createdAt' | 'updatedAt'> & {
  imageBase64: string | null;
  image: ImagePickerResult | null;
};

export interface RouteListResponse extends Array<Route> {} 

export const getDifficultyColor = (level?: string) => {
  switch (level) {
    case Hardness.LOW: return '#4CAF50';
    case Hardness.MEDIUM: return '#f5b216';
    case Hardness.HIGH: return '#F44336';
    default: return '#666666';
  }
};

export const getDifficultyTranslation = (level?: string) => {
  switch (level) {
    case Hardness.LOW: return 'Fácil';
    case Hardness.MEDIUM: return 'Medio';
    case Hardness.HIGH: return 'Alto';
    default: return 'No especificado';
  }
};