import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Quote, Award } from 'lucide-react';
import { CardData, ThemePreset } from '../types';
import { FRIENDSHIP_QUOTES } from '../data/themes';

interface CardContentProps {
  cardData: CardData;
  theme: ThemePreset;
  activeScene: string;
  onHeartClick?: (e: React.MouseEvent) => void;
  onSendWithLove?: () => void;
}

export const CardContent: React.FC<CardContentProps> = ({
  cardData,
  theme,
  activeScene,
  onHeartClick,
  onSendWithLove,
}) => {
  const isTextRevealed = activeScene === 'textReveal' || activeScene === 'celebration';
  const isCelebration = activeScene === 'celebration';

  const currentQuote = FRIENDSHIP_QUOTES[cardData.quoteIndex % FRIENDSHIP_QUOTES.length];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 text-white z-10 select-none overflow-y-auto custom-scrollbar">
      {/* Decorative Top Banner Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isTextRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-between border-b border-white/10 pb-3"
      >
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-pink-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">
            Special Friendship Delivery
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/20 text-pink-200">
          <Award className="w-3.5 h-3.5 text-yellow-300" />
          <span>Best Friends Forever</span>
        </div>
      </motion.div>

      {/* Main Card Body */}
      <div className="my-auto py-2 flex flex-col items-center text-center space-y-4 sm:space-y-5">
        {/* Recipient Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isTextRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-medium text-pink-200 shadow-inner"
        >
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-bounce" />
          <span>For {cardData.recipientName}</span>
        </motion.div>

        {/* Header: Happy Friendship Day! */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isTextRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative group"
        >
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r ${theme.accentText} bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]`}>
            Happy Friendship Day!
          </h1>
          <motion.div
            animate={isCelebration ? { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 -right-4 sm:-right-6 text-yellow-300 pointer-events-none"
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
        </motion.div>

        {/* Photo Memory / Polaroid Frame (if image present) */}
        {cardData.photoUrl && (
          <motion.div
            initial={{ opacity: 0, rotate: -3, scale: 0.8 }}
            animate={isTextRevealed ? { opacity: 1, rotate: -2, scale: 1 } : { opacity: 0, rotate: -3, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="relative my-1 group cursor-pointer"
            onClick={onHeartClick}
          >
            <div className="bg-white/95 text-slate-900 p-2 sm:p-2.5 rounded-xl shadow-2xl border border-white/40 transform group-hover:rotate-0 transition-transform duration-300">
              <div className="relative overflow-hidden rounded-lg w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-slate-200">
                <img
                  src={cardData.photoUrl}
                  alt="Friendship Memory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-[10px] text-white font-medium bg-black/60 px-2 py-0.5 rounded-full">
                    Click for Sparkles ✨
                  </span>
                </div>
              </div>
              <p className="text-[11px] sm:text-xs font-serif font-bold text-slate-700 text-center mt-1.5 italic">
                Best Memories Together 💕
              </p>
            </div>
            {/* Cute tape effect */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/40 backdrop-blur-sm rounded-sm border border-white/60 rotate-2" />
          </motion.div>
        )}

        {/* Personalized Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isTextRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm sm:text-base md:text-lg text-slate-100 max-w-lg font-normal leading-relaxed px-2 sm:px-4 drop-shadow"
        >
          {cardData.message}
        </motion.p>

        {/* Inspiring Friendship Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isTextRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="relative max-w-md w-full bg-black/20 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 text-left shadow-lg"
        >
          <Quote className="w-5 h-5 text-pink-300 opacity-60 absolute top-2.5 left-2.5" />
          <p className="text-xs sm:text-sm italic text-pink-100/90 pl-6 pr-2 leading-snug">
            "{currentQuote}"
          </p>
        </motion.div>

        {/* EST. Divider Line & Sent With Love Badge matching Frosted Glass theme */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isTextRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="flex flex-col items-center gap-2 pt-1"
        >
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 sm:w-16 bg-white/20" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-white/60">
              EST. FOREVER &bull; REAL BONDS
            </span>
            <div className="h-[1px] w-10 sm:w-16 bg-white/20" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onSendWithLove) {
                onSendWithLove();
              } else if (onHeartClick) {
                onHeartClick(e);
              }
            }}
            className="px-6 py-2 bg-white text-indigo-950 hover:bg-pink-50 hover:text-indigo-900 rounded-full font-bold text-xs sm:text-sm shadow-xl shadow-indigo-950/20 backdrop-blur-md flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/60 hover:ring-pink-300"
            title="Click to send & share card with love"
          >
            <Heart className="w-4 h-4 fill-pink-600 text-pink-600 animate-pulse" />
            <span>Sent with Love</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </button>
        </motion.div>
      </div>

      {/* Footer / Sender Signature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isTextRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-white/80"
      >
        <span className="italic font-light">Forever grateful for you</span>
        <div className="flex items-center space-x-1 font-semibold text-pink-200">
          <span>With love,</span>
          <span className="underline decoration-pink-400 decoration-2 underline-offset-4">
            {cardData.senderName}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
