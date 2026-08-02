import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Sparkles, Mail, Lock } from 'lucide-react';
import { CardData, ThemePreset } from '../types';
import { CardContent } from './CardContent';

interface EnvelopeCardProps {
  activeScene: string;
  theme: ThemePreset;
  cardData: CardData;
  onHeartClick?: (e: React.MouseEvent) => void;
  onSendWithLove?: () => void;
  onManualOpen?: () => void;
}

export const EnvelopeCard: React.FC<EnvelopeCardProps> = ({
  activeScene,
  theme,
  cardData,
  onHeartClick,
  onSendWithLove,
  onManualOpen,
}) => {
  const isEnvelopeState = activeScene === 'envelope';
  const isOpeningState = activeScene === 'opening';

  return (
    <div className="relative w-full max-w-xl h-[82vh] max-h-[640px] min-h-[480px] flex items-center justify-center p-2 sm:p-4 z-10 perspective-[1200px]">
      <AnimatePresence mode="wait">
        {isEnvelopeState || isOpeningState ? (
          /* Sealed 3D Envelope Container */
          <motion.div
            key="envelope-container"
            initial={{ scale: 0.6, opacity: 0, rotateX: 20 }}
            animate={{
              scale: isOpeningState ? 0.95 : 1,
              opacity: 1,
              rotateX: 0,
              y: [0, -8, 0],
            }}
            exit={{ scale: 1.05, opacity: 0, transition: { duration: 0.5 } }}
            transition={{
              scale: { duration: 0.8, ease: 'easeOut' },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`relative w-full max-w-md aspect-[4/3] rounded-3xl p-1 ${theme.cardBg} ${theme.cardBorder} border flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer group`}
            onClick={onManualOpen}
          >
            {/* Glowing Ambient Background inside envelope */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />

            {/* Envelope Flap Animation */}
            <motion.div
              animate={{
                rotateX: isOpeningState ? 180 : 0,
              }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md rounded-t-3xl border-b border-white/20 z-20 flex items-center justify-center shadow-lg"
            >
              <div className="flex flex-col items-center justify-center p-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center border border-white/30 text-pink-300">
                    <Heart className="w-6 h-6 fill-pink-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Ribbon Cross */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className={`w-10 h-full bg-gradient-to-r ${theme.ribbonGradient} opacity-70 shadow-lg`} />
              <div className={`h-10 w-full bg-gradient-to-b ${theme.ribbonGradient} opacity-70 shadow-lg absolute`} />
            </div>

            {/* Seal Badge / Prompt to open */}
            <div className="relative z-30 m-auto flex flex-col items-center text-center p-4">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full bg-slate-950/90 backdrop-blur-lg flex flex-col items-center justify-center text-yellow-300 border border-yellow-400/40">
                  <Gift className="w-7 h-7 sm:w-9 sm:h-9" />
                </div>
              </motion.div>

              <h2 className="mt-4 text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                For {cardData.recipientName}
              </h2>
              <p className="text-xs sm:text-sm text-pink-200/80 mt-1 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Happy Friendship Day Gift</span>
              </p>

              <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90">
                <Lock className="w-3 h-3 text-pink-300" />
                <span>Auto-opening magic...</span>
              </div>
            </div>

            {/* Bottom Seal Bar */}
            <div className="relative z-20 p-3 bg-black/30 backdrop-blur-sm flex justify-between items-center text-[11px] text-white/70 border-t border-white/10">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> From {cardData.senderName}
              </span>
              <span>Tap to Open</span>
            </div>
          </motion.div>
        ) : (
          /* Opened & Unfolded Glassmorphism Card */
          <motion.div
            key="opened-card"
            initial={{ scale: 0.85, opacity: 0, y: 30, rotateY: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full h-full rounded-3xl ${theme.cardBg} ${theme.cardBorder} border overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.7)] flex flex-col`}
          >
            {/* Ambient Inner Lighting Shimmer */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            <CardContent
              cardData={cardData}
              theme={theme}
              activeScene={activeScene}
              onHeartClick={onHeartClick}
              onSendWithLove={onSendWithLove}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
