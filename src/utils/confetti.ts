import confetti from 'canvas-confetti';

export function fireConfettiBurst() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-stage confetti cannon burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff', '#fffb96'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ff007f', '#7928ca', '#ff4d4d', '#ff0080', '#0070f3'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffd700', '#ff69b4', '#00ffff', '#ffffff'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['star'],
    colors: ['#ffd700', '#ffb6c1', '#a855f7'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    shapes: ['circle'],
  });
}

export function fireSideCannons() {
  const end = Date.now() + 1.5 * 1000;
  const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireHeartSparkle(x: number, y: number) {
  confetti({
    particleCount: 20,
    spread: 70,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: ['#ff1493', '#ff69b4', '#ffb6c1', '#ffd700'],
    shapes: ['star', 'circle'],
    scalar: 0.9,
    zIndex: 9999,
  });
}
