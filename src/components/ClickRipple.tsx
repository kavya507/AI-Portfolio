import { useEffect, useRef } from 'react';

const MAX_RIPPLES = 16;
const MOVE_RIPPLE_COOLDOWN = 32; // ms
// Revert: no initial radius, start from 0

const ClickRipple = () => {
  const ripples = useRef<{
    x: number;
    y: number;
    start: number;
    color: string;
    size: number;
  }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastMove = useRef(0);

  useEffect(() => {
    const colors = [
      'rgba(14, 165, 233, 0.5)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(16, 185, 129, 0.4)',
      'rgba(251, 191, 36, 0.3)',
    ];
    const handleClick = (e: MouseEvent) => {
      if (ripples.current.length > MAX_RIPPLES) ripples.current.shift();
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        start: performance.now(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.0,
      });
    };
    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove.current < MOVE_RIPPLE_COOLDOWN) return;
      lastMove.current = now;
      if (ripples.current.length > MAX_RIPPLES) ripples.current.shift();
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        start: now,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.5,
      });
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      ripples.current = ripples.current.filter(r => now - r.start < 700);
      ripples.current.forEach(r => {
        const t = (now - r.start) / 700;
        // Revert: start from radius 0
        const radius = 0 + t * 120 * r.size;
        ctx.save();
        ctx.globalAlpha = 1 - t;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = (3 + 8 * (1 - t)) * r.size;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 24;
        ctx.stroke();
        ctx.restore();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[101]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default ClickRipple; 