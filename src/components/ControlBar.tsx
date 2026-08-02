import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sliders,
  Share2,
  Sparkles,
  Gauge,
  FastForward,
} from "lucide-react";
import { SceneStage } from "../types";
import { soundEngine } from "../utils/audio";

interface ControlBarProps {
  isPlaying: boolean;
  activeScene: SceneStage;
  progressPercent: number;
  playbackSpeed: number;
  onTogglePlay: () => void;
  onReplay: () => void;
  onSkipToEnd: () => void;
  onToggleMute: () => void;
  onChangeSpeed: () => void;
  onOpenCustomize: () => void;
  onOpenShare: () => void;
  onTriggerConfetti: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  isPlaying,
  activeScene,
  progressPercent,
  playbackSpeed,
  onTogglePlay,
  onReplay,
  onSkipToEnd,
  onToggleMute,
  onChangeSpeed,
  onOpenCustomize,
  onOpenShare,
  onTriggerConfetti,
}) => {
  const scenes: { id: SceneStage; label: string }[] = [
    { id: "envelope", label: "1. Envelope" },
    { id: "opening", label: "2. Unfolding" },
    { id: "textReveal", label: "3. Reveal" },
    { id: "celebration", label: "4. Celebrate" },
  ];

  const [isMuted, setIsMuted] = useState(false);
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-3 w-auto sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl px-5 py-2.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-center"
    >
      {/* Top Progress Bar & Scene Stage Indicators */}
      {/* <div className="w-full space-y-1">
        <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full"
            style={{ width: `${progressPercent}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] sm:text-xs text-white/70 px-1 font-medium">
          {scenes.map((s) => {
            const isActive = activeScene === s.id;
            return (
              <span
                key={s.id}
                className={`transition-colors duration-300 ${
                  isActive ? 'text-pink-300 font-bold drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]' : 'text-white/50'
                }`}
              >
                {s.label}
              </span>
            );
          })}
        </div>
      </div> */}

      {/* Main Buttons Toolbar */}
      <div className="flex items-center justify-between text-white pt-1">
        {/* Play / Pause / Replay Group */}
        <div className="flex items-center space-x-2">
          {/* Play / Pause Music */}
          <button
            onClick={() => {
              if (isPlaying) {
                soundEngine.pauseSong();
              } else {
                soundEngine.resumeSong();
              }
              onTogglePlay();
            }}
            title={isPlaying ? "Pause Music" : "Play Music"}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center text-pink-300"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 fill-pink-300" />
            )}
          </button>

          {/* Replay Song */}
          <button
            onClick={() => {
              soundEngine.stopSong();
              soundEngine.playSong();
              onReplay();
            }}
            title="Replay Music"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center text-white/80"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={() => {
              soundEngine.setMuted(!isMuted);
              setIsMuted(!isMuted);
            }}
            title={isMuted ? "Unmute Music" : "Mute Music"}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center text-white/80"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Animation Speed */}
          <button
            onClick={onChangeSpeed}
            title={`Speed: ${playbackSpeed}x`}
            className="px-2 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[11px] font-bold text-cyan-300 flex items-center gap-1"
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{playbackSpeed}x</span>
          </button>
        </div>

        {/* Action FX Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={onTriggerConfetti}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-xs font-semibold shadow-md flex items-center space-x-1 transition-all active:scale-95"
            title="Shoot Confetti"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span className="hidden xs:inline">Confetti</span>
          </button>

          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute Chime Sound" : "Mute Sound"}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center text-white/80"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          <button
            onClick={onOpenCustomize}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center text-yellow-300"
            title="Customize Card & Message"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center text-cyan-300"
            title="Share or Save Card"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
    
  );
};
