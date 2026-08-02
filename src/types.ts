export type SceneStage = 'envelope' | 'opening' | 'textReveal' | 'celebration';

export type ThemePresetId = 'cosmic' | 'sunset' | 'cyber' | 'ethereal' | 'obsidian';

export interface ThemePreset {
  id: ThemePresetId;
  name: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  accentText: string;
  glowColor: string;
  particleColors: string[];
  ribbonGradient: string;
}

export interface CardData {
  recipientName: string;
  senderName: string;
  message: string;
  quoteIndex: number;
  photoUrl: string | null;
  themeId: ThemePresetId;
}

export interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  iconType: 'heart' | 'star' | 'sparkle';
  color: string;
  speed: number;
  opacity: number;
}
