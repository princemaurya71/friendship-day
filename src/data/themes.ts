import { ThemePreset, ThemePresetId } from '../types';

export const THEME_PRESETS: Record<ThemePresetId, ThemePreset> = {
  cosmic: {
    id: 'cosmic',
    name: 'Frosted Indigo',
    bgGradient: 'from-indigo-950 via-purple-900 to-rose-900',
    cardBg: 'bg-white/10 backdrop-blur-2xl',
    cardBorder: 'border-white/20 shadow-2xl ring-1 ring-white/10',
    accentText: 'from-pink-300 via-white to-indigo-300',
    glowColor: 'rgba(129, 140, 248, 0.35)',
    particleColors: ['#f472b6', '#818cf8', '#fde047', '#e0e7ff'],
    ribbonGradient: 'from-pink-500 via-purple-500 to-indigo-500',
  },
  sunset: {
    id: 'sunset',
    name: 'Frosted Rose',
    bgGradient: 'from-rose-950 via-pink-900 to-amber-950',
    cardBg: 'bg-white/10 backdrop-blur-2xl',
    cardBorder: 'border-white/20 shadow-2xl ring-1 ring-white/10',
    accentText: 'from-amber-200 via-rose-200 to-pink-300',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    particleColors: ['#fb7185', '#f43f5e', '#fbbf24', '#f472b6'],
    ribbonGradient: 'from-rose-500 via-pink-500 to-amber-500',
  },
  cyber: {
    id: 'cyber',
    name: 'Frosted Cyber',
    bgGradient: 'from-slate-950 via-teal-900 to-indigo-950',
    cardBg: 'bg-white/10 backdrop-blur-2xl',
    cardBorder: 'border-white/20 shadow-2xl ring-1 ring-white/10',
    accentText: 'from-emerald-200 via-cyan-200 to-purple-300',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    particleColors: ['#2dd4bf', '#38bdf8', '#a855f7', '#34d399'],
    ribbonGradient: 'from-teal-400 via-cyan-500 to-indigo-500',
  },
  ethereal: {
    id: 'ethereal',
    name: 'Frosted Ethereal',
    bgGradient: 'from-slate-900 via-sky-950 to-purple-950',
    cardBg: 'bg-white/10 backdrop-blur-2xl',
    cardBorder: 'border-white/20 shadow-2xl ring-1 ring-white/10',
    accentText: 'from-sky-200 via-pink-200 to-purple-200',
    glowColor: 'rgba(125, 211, 252, 0.35)',
    particleColors: ['#7dd3fc', '#f472b6', '#fde047', '#c084fc'],
    ribbonGradient: 'from-sky-400 via-indigo-400 to-pink-400',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Frosted Obsidian',
    bgGradient: 'from-neutral-950 via-stone-900 to-zinc-950',
    cardBg: 'bg-white/10 backdrop-blur-2xl',
    cardBorder: 'border-amber-500/30 shadow-2xl ring-1 ring-amber-500/20',
    accentText: 'from-amber-200 via-yellow-200 to-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    particleColors: ['#fbbf24', '#f59e0b', '#d97706', '#fef08a'],
    ribbonGradient: 'from-amber-400 via-yellow-500 to-amber-600',
  },
};

export const FRIENDSHIP_QUOTES = [
  "A real friend is one who walks in when the rest of the world walks out.",
  "Side by side or miles apart, real friends are always close to the heart.",
  "Friendship isn't about whom you have known the longest. It's about who came and never left your side.",
  "There is nothing on this earth more to be prized than true friendship.",
  "Good friends are like stars. You don't always see them, but you know they're always there.",
  "A journey is best measured in friends rather than miles.",
];

export const DEFAULT_CARD_DATA = {
  recipientName: "Dearest Bestie",
  senderName: "Your Forever Friend",
  message: "Thank you for bringing endless laughter, unwavering support, and unforgettable memories into my life. Here's to celebrating our unbreakable bond today and always!",
  quoteIndex: 0,
  photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  themeId: 'cosmic' as ThemePresetId,
};
