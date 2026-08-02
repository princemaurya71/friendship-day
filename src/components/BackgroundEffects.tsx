import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Sparkles } from 'lucide-react';
import { ThemePreset } from '../types';

interface BackgroundEffectsProps {
  theme: ThemePreset;
  activeScene: string;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ theme, activeScene }) => {
  // Generate random particles for floating ambient animation
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
      color: theme.particleColors[i % theme.particleColors.length],
      iconType: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'star' : 'sparkle',
    }));
  }, [theme]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Frosted Mesh Orbs matching design spec */}
      <div className="absolute -top-[10%] -left-[10%] w-[450px] h-[450px] bg-indigo-500/30 rounded-full blur-[100px]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[550px] h-[550px] bg-rose-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-purple-400/20 rounded-full blur-[90px]" />

      {/* Dynamic animated theme light */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: activeScene === 'envelope' ? [0.4, 0.7, 0.4] : [0.5, 0.85, 0.5],
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '10%', '-10%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/3 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px]"
        style={{ background: theme.glowColor }}
      />

      {/* Subtle grid pattern for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

      {/* Floating hearts, stars, and sparkles */}
      {particles.map((p) => {
        return (
          <motion.div
            key={p.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ['0%', '-120%', '0%'],
              x: ['0%', `${(p.id % 2 === 0 ? 1 : -1) * 30}px`, '0%'],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          >
            {p.iconType === 'heart' && (
              <Heart
                size={p.size}
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{ color: p.color, fill: `${p.color}40` }}
              />
            )}
            {p.iconType === 'star' && (
              <Star
                size={p.size * 0.9}
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{ color: p.color, fill: `${p.color}40` }}
              />
            )}
            {p.iconType === 'sparkle' && (
              <Sparkles
                size={p.size * 0.85}
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{ color: p.color }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
