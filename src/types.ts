/**
 * Type definitions for BLOCO FORTE - Block Materials & Manufacturing
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'structural' | 'delivery' | 'wholesale' | 'testing' | 'leak' | 'drain' | 'heater' | 'pipe';
  startingPrice?: string;
  badge?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  note: string;
  code: string;
  iconName: string;
}

export interface BlockMaterial {
  id: string;
  name: string;
  category: string;
  dimensions?: string;
  resistance?: string;
  description: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  altText: string;
  stockStatus?: string;
}

// Keep alias for backward compatibility
export type PlumbingMaterial = BlockMaterial;

export interface ServiceRequestFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  serviceNeeded: string;
  preferredTime?: string;
  notes?: string;
  estimatedQuantity?: string;
  deliveryType?: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  hours: string;
  address: string;
  deliveryCoverage: string;
  emergencyService: string;
  experienceYears: number;
  completedProjects: number;
}
