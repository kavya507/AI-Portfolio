import { useEffect, useRef } from 'react';

// Use RGB colors for smooth interpolation
const COLORS = [
  [14, 165, 233],   // primary-500
  [236, 72, 153],   // pink-500
  [251, 191, 36],   // yellow-400
  [16, 185, 129],   // teal-500
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(a: number[], b: number[], t: number) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

const CursorParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const blob = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, r: 36, colorIdx: 0, t: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      // Smoothly move the blob toward the mouse
      blob.current.x = lerp(blob.current.x, mouse.current.x, 0.18);
      blob.current.y = lerp(blob.current.y, mouse.current.y, 0.18);
      // Animate color: 1 second per color (assuming 60fps, t += 1/60)
      blob.current.t += 0.0167;
      if (blob.current.t > 1) {
        blob.current.t = 0;
        blob.current.colorIdx = (blob.current.colorIdx + 1) % COLORS.length;
      }
      const colorA = COLORS[blob.current.colorIdx];
      const colorB = COLORS[(blob.current.colorIdx + 1) % COLORS.length];
      const rgb = lerpColor(colorA, colorB, blob.current.t);
      const colorStr = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.85)`;
      // Draw glowing blob
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.shadowColor = colorStr;
      ctx.shadowBlur = 48;
      ctx.beginPath();
      ctx.ellipse(blob.current.x, blob.current.y, blob.current.r * (1 + 0.1 * Math.sin(blob.current.t * Math.PI * 2)), blob.current.r * (1 + 0.1 * Math.cos(blob.current.t * Math.PI * 2)), 0, 0, Math.PI * 2);
      ctx.fillStyle = colorStr;
      ctx.fill();
      ctx.restore();
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
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default CursorParticles; 