import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Heart, Palette, User, MessageSquare, Image, Quote, Check } from 'lucide-react';
import { CardData, ThemePresetId } from '../types';
import { THEME_PRESETS, FRIENDSHIP_QUOTES } from '../data/themes';

interface CustomizeModalProps {
  isOpen: boolean;
  cardData: CardData;
  onClose: () => void;
  onSave: (newData: CardData) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  cardData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CardData>(cardData);

  const samplePhotos = [
    { label: 'Happy Friends', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80' },
    { label: 'Group Hug', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80' },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-slate-900/95 text-white border border-white/20 shadow-2xl p-5 sm:p-6 my-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Customize Your Card</h3>
                <p className="text-xs text-white/60">Personalize names, messages & themes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs sm:text-sm">
            {/* Theme Selector */}
            <div>
              <label className="block font-semibold mb-2 text-pink-200 flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> Choose Card Theme Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(THEME_PRESETS).map((t) => {
                  const isSelected = formData.themeId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, themeId: t.id })}
                      className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-pink-400 bg-white/15 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-medium text-xs text-white">{t.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-pink-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipient & Sender Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-white/80 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-pink-400" /> To (Friend's Name)
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  placeholder="e.g. Sarah, Alex, Bestie"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-white/80 mb-1 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-pink-400" /> From (Your Name)
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  placeholder="e.g. Chris, Forever Friend"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
                  required
                />
              </div>
            </div>

            {/* Personal Message */}
            <div>
              <label className="block font-medium text-white/80 mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-pink-400" /> Heartfelt Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your custom message..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pink-400 resize-none"
                required
              />
            </div>

            {/* Quote Selector */}
            <div>
              <label className="block font-medium text-white/80 mb-1 flex items-center gap-1">
                <Quote className="w-3.5 h-3.5 text-pink-400" /> Friendship Quote
              </label>
              <select
                value={formData.quoteIndex}
                onChange={(e) => setFormData({ ...formData, quoteIndex: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/20 text-white focus:outline-none focus:border-pink-400"
              >
                {FRIENDSHIP_QUOTES.map((q, idx) => (
                  <option key={idx} value={idx}>
                    "{q.substring(0, 50)}..."
                  </option>
                ))}
              </select>
            </div>

            {/* Photo Memory */}
            <div>
              <label className="block font-medium text-white/80 mb-1 flex items-center gap-1">
                <Image className="w-3.5 h-3.5 text-pink-400" /> Memory Photo (Optional)
              </label>
              <input
                type="text"
                value={formData.photoUrl || ''}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value || null })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-pink-400 text-xs mb-2"
              />
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[11px] text-white/50 shrink-0">Preset Photos:</span>
                {samplePhotos.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, photoUrl: p.url })}
                    className="shrink-0 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-pink-200 border border-white/10"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 font-semibold shadow-lg text-white transition-all active:scale-95"
              >
                Save & Update Card
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
