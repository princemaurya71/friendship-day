import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { SceneStage, CardData } from '../types';
import { THEME_PRESETS, DEFAULT_CARD_DATA } from '../data/themes';
import { BackgroundEffects } from './BackgroundEffects';
import { EnvelopeCard } from './EnvelopeCard';
import { ControlBar } from './ControlBar';
import { CustomizeModal } from './CustomizeModal';
import { ShareModal } from './ShareModal';
import { fireConfettiBurst, fireHeartSparkle, fireSideCannons } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

export const FriendshipCard: React.FC = () => {
  // Timeline State
  const [activeScene, setActiveScene] = useState<SceneStage>('envelope');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Card & Theme Data State
  const [cardData, setCardData] = useState<CardData>(DEFAULT_CARD_DATA);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  // Animation Timings (in milliseconds for 1x speed)
  // Scene 1: 0 - 1500ms (Envelope scale in)
  // Scene 2: 1500ms - 3000ms (Opening flap & unfold)
  // Scene 3: 3000ms - 5000ms (Text reveal)
  // Scene 4: 5000ms+ (Confetti explosion & continuous loop)
  const TOTAL_TIMELINE_MS = 6000;

  const currentTheme = THEME_PRESETS[cardData.themeId] || THEME_PRESETS.cosmic;

  // Refs for audio trigger tracking
  const hasTriggeredUnfoldAudio = useRef(false);
  const hasTriggeredConfetti = useRef(false);

  // Sound Mute Synchronization
  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  // Main Automated Timeline Engine Loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalStep = 50; // tick every 50ms
    const timer = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + intervalStep * playbackSpeed;

        // Scene Transitions
        if (next < 1500) {
          if (activeScene !== 'envelope') setActiveScene('envelope');
        } else if (next >= 1500 && next < 3000) {
          if (activeScene !== 'opening') {
            setActiveScene('opening');
            if (!hasTriggeredUnfoldAudio.current) {
              soundEngine.playSong();
              hasTriggeredUnfoldAudio.current = true;
            }
          }
        } else if (next >= 3000 && next < 5000) {
          if (activeScene !== 'textReveal') {
            setActiveScene('textReveal');
          }
        } else if (next >= 5000) {
          if (activeScene !== 'celebration') {
            setActiveScene('celebration');
            if (!hasTriggeredConfetti.current) {
              fireConfettiBurst();
              fireSideCannons();
              soundEngine.playSong();
              hasTriggeredConfetti.current = true;
            }
          }
        }

        if (next >= TOTAL_TIMELINE_MS) {
          return TOTAL_TIMELINE_MS;
        }
        return next;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, activeScene]);

  // Manual Controls Handlers
  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handleReplay = useCallback(() => {
    setElapsedMs(0);
    setActiveScene('envelope');
    hasTriggeredUnfoldAudio.current = false;
    hasTriggeredConfetti.current = false;
    setIsPlaying(true);
  }, []);

  const handleSkipToEnd = useCallback(() => {
    setElapsedMs(TOTAL_TIMELINE_MS);
    setActiveScene('celebration');
    fireConfettiBurst();
    soundEngine.playSong();
  }, []);

  const handleChangeSpeed = () => {
    const speeds = [1, 1.5, 0.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  // Interactive Click Anywhere FX (Spawns Hearts & Sparkles)
  const handleViewportClick = (e: React.MouseEvent) => {
    // Prevent triggering particle when clicking on control bar or modal
    const target = e.target as HTMLElement;
    if (target.closest('.z-40') || target.closest('.z-50')) return;

    fireHeartSparkle(e.clientX, e.clientY);
    soundEngine.playSong();
  };

  const progressPercent = Math.min(100, (elapsedMs / TOTAL_TIMELINE_MS) * 100);

  return (
    <div
      onClick={handleViewportClick}
      className={`relative w-screen h-screen h-[100dvh] overflow-hidden bg-gradient-to-br ${currentTheme.bgGradient} flex flex-col items-center justify-between select-none font-sans transition-colors duration-1000`}
    >
      {/* Dynamic Animated Ambient Background Effects */}
      <BackgroundEffects theme={currentTheme} activeScene={activeScene} />

      {/* Frosted Glass Side Accents */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 text-white/40 pointer-events-none z-10">
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <span className="uppercase tracking-[0.3em] text-[10px] font-bold [writing-mode:vertical-lr] rotate-180">
          Frosted Glass Edition
        </span>
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 text-white/40 pointer-events-none z-10">
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <span className="uppercase tracking-[0.3em] text-[10px] font-bold [writing-mode:vertical-lr]">
          Est. Forever &bull; Real Bonds
        </span>
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* Main Center Animated Card Stage */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
        <EnvelopeCard
          activeScene={activeScene}
          theme={currentTheme}
          cardData={cardData}
          onHeartClick={handleViewportClick}
          onSendWithLove={() => {
            fireConfettiBurst();
            soundEngine.playSong();
            setIsShareOpen(true);
          }}
          onManualOpen={() => {
            if (activeScene === 'envelope') {
              setElapsedMs(1500);
              setActiveScene('opening');
            }
          }}
        />
      </main>

      {/* Sleek Floating Control Bar */}
      <ControlBar
        isPlaying={isPlaying}
        activeScene={activeScene}
        progressPercent={progressPercent}
        playbackSpeed={playbackSpeed}
        onTogglePlay={handleTogglePlay}
        onReplay={handleReplay}
        onSkipToEnd={handleSkipToEnd}
        onToggleMute={() => setIsMuted(!isMuted)}
        onChangeSpeed={handleChangeSpeed}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onTriggerConfetti={() => {
          fireConfettiBurst();
          soundEngine.playSong();
        }}
      />

      {/* Modal dialogs */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        cardData={cardData}
        onClose={() => setIsCustomizeOpen(false)}
        onSave={(updated) => {
          setCardData(updated);
        }}
      />

      <ShareModal
        isOpen={isShareOpen}
        cardData={cardData}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
};

export default FriendshipCard;
