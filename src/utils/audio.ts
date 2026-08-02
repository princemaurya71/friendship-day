import friendshipSong from "../assets/audio/friendship-song.mp3";

class SoundEngine {
  private audio: HTMLAudioElement | null = null;
  private isMuted = false;

  // ============================
  // YOUR SETTINGS
  // ============================

  // Replace with your song
  private songUrl = {friendshipSong};

  // Song play start time (seconds)
  private startTime = 30;

  // Song stop time (seconds)
  private endTime = 140;

  // Volume (0 - 1)
  private volume = 0.7;

  // Loop selected section
  private loopSection = false;

  // ============================

  constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio(friendshipSong);
      this.audio.preload = "auto";
      this.audio.volume = this.volume;

      this.audio.addEventListener("timeupdate", () => {
        if (!this.audio) return;

        if (this.audio.currentTime >= this.endTime) {
          if (this.loopSection) {
            this.audio.currentTime = this.startTime;
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }
      });
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;

    if (this.audio) {
      this.audio.muted = muted;
    }
  }

  public async playSong() {
    if (this.isMuted || !this.audio) return;

    try {
      this.audio.currentTime = this.startTime;
      await this.audio.play();
    } catch (err) {
      console.log("Autoplay blocked by browser.");
    }
  }

  public pauseSong() {
    this.audio?.pause();
  }

  public stopSong() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = this.startTime;
  }

  public resumeSong() {
    this.audio?.play();
  }

  public setPlaySection(start: number, end: number) {
    this.startTime = start;
    this.endTime = end;
  }

  public setVolume(volume: number) {
    this.volume = volume;

    if (this.audio) {
      this.audio.volume = volume;
    }
  }
}

export const soundEngine = new SoundEngine();

