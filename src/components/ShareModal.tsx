import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Send, Heart, Sparkles } from 'lucide-react';
import { CardData } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  cardData: CardData;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, cardData, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = ` Happy Friendship Day, ${cardData.recipientName}! 

"${cardData.message}"

With love, ${cardData.senderName} ❤️
Check out this animated Friendship Day Card!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Friendship Day for ${cardData.recipientName}`,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md rounded-3xl bg-slate-900/95 text-white border border-white/20 shadow-2xl p-6 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Share Your Card</h3>
                <p className="text-xs text-white/60">Send this magic greeting to your friend</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Card Message Preview Box */}
          <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-slate-200 space-y-2 relative">
            <div className="flex items-center space-x-1 text-pink-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Card Message Preview:</span>
            </div>
            <p className="whitespace-pre-line italic leading-relaxed text-pink-100/90">
              {shareText}
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="mt-5 space-y-3">
            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors text-white"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-300" />
                  <span>Copy Greeting Message</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-400/30 font-medium text-xs flex items-center justify-center space-x-2 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-sky-600/80 hover:bg-sky-600 border border-sky-400/30 font-medium text-xs flex items-center justify-center space-x-2 text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>X / Twitter</span>
              </a>
            </div>

            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 font-semibold text-sm flex items-center justify-center space-x-2 text-white shadow-lg transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Share via Device Apps</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
