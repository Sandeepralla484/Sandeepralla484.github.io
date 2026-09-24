/* Cursor-driven color flow. No external libraries, tracking, or WebGL required. */
(() => {
  'use strict';
  const canvas = document.getElementById('cursor-flow');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!context) return;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['79,137,255', '114,94,243', '159,92,230', '211,102,181', '100,159,247'];
  const brushes = colors.map(color => {
    const brush = document.createElement('canvas');
    brush.width = brush.height = 128;
    const ctx = brush.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, `rgba(${color},0.34)`);
    gradient.addColorStop(0.24, `rgba(${color},0.26)`);
    gradient.addColorStop(0.6, `rgba(${color},0.09)`);
    gradient.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return brush;
  });
  let width = 0, height = 0, ratio = 1;
  let frame = 0, lastTime = 0, fadeUntil = 0, hue = 0;
  let particles = [];
  let pointer = null;
  let lastMove = 0;
  const enabled = () => finePointer.matches && !reduced.matches &&
    !document.documentElement.classList.contains('motion-off') && !document.hidden;
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    particles.length = 0;
    pointer = null;
    context.clearRect(0, 0, width, height);
  }
  function resize() {
    ratio = Math.min(devicePixelRatio || 1, 1.5);
    width = innerWidth;
    height = innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    reset();
  }
  function addParticle(x, y, dx, dy, now) {
    const speed = Math.min(Math.hypot(dx, dy), 45);
    hue += 0.026;
    particles.push({
      x, y, vx: dx * 0.065, vy: dy * 0.065,
      age: 0, life: 850 + Math.random() * 500,
      radius: 23 + speed * 0.85 + Math.random() * 13,
      phase: Math.random() * Math.PI * 2,
      color: Math.floor(hue) % brushes.length,
      spin: Math.random() > 0.5 ? 1 : -1
    });
    if (particles.length > 150) particles.shift();
    fadeUntil = now + 2300;
  }
  function draw(now) {
    frame = 0;
    if (!enabled()) { reset(); return; }
    const step = lastTime ? Math.min((now - lastTime) / 16.667, 2) : 1;
    lastTime = now;
    context.globalCompositeOperation = 'destination-out';
    context.globalAlpha = 1;
    context.fillStyle = `rgba(0,0,0,${1 - Math.pow(0.86, step)})`;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'source-over';
    particles = particles.filter(p => p.age < p.life);
    for (const p of particles) {
      p.age += step * 16.667;
      const progress = Math.min(p.age / p.life, 1);
      const swirl = Math.sin(p.phase + progress * 4) * p.spin;
      p.vx *= Math.pow(0.97, step);
      p.vy *= Math.pow(0.97, step);
      p.x += (p.vx + swirl * 0.65) * step;
      p.y += (p.vy - Math.cos(p.phase + progress * 3) * 0.6) * step;
      const radius = p.radius * (1 + progress * 0.8);
      context.globalAlpha = Math.pow(1 - progress, 1.9) * 0.26;
      context.save();
      context.translate(p.x, p.y);
      context.rotate(Math.atan2(p.vy, p.vx) + swirl * 0.3);
      context.scale(1.4, 0.82);
      context.drawImage(brushes[p.color], -radius, -radius, radius * 2, radius * 2);
      context.restore();
    }
    context.globalAlpha = 1;
    if (particles.length || now < fadeUntil) frame = requestAnimationFrame(draw);
    else reset();
  }
  function move(event) {
    if (!enabled() || event.pointerType === 'touch') return;
    const now = performance.now();
    const x = event.clientX, y = event.clientY;
    if (!pointer || now - lastMove > 180) pointer = { x, y };
    const dx = x - pointer.x, dy = y - pointer.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 2) { lastMove = now; return; }
    const count = Math.min(9, Math.max(1, Math.ceil(distance / 12)));
    for (let i = 1; i <= count; i++) {
      const t = i / count;
      addParticle(pointer.x + dx * t, pointer.y + dy * t,
        Math.max(-45, Math.min(45, dx)), Math.max(-45, Math.min(45, dy)), now);
    }
    pointer = { x, y };
    lastMove = now;
    if (!frame) { lastTime = 0; frame = requestAnimationFrame(draw); }
  }
  window.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer = null; });
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', reset);
  window.addEventListener('resize', resize, { passive: true });
  finePointer.addEventListener('change', reset);
  reduced.addEventListener('change', reset);
  new MutationObserver(() => { if (!enabled()) reset(); }).observe(
    document.documentElement, { attributes: true, attributeFilter: ['class'] }
  );
  resize();
})();
