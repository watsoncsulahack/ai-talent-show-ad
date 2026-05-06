const animated = [
  { el: document.querySelector('.tri-outer'), x: 0, y: 0, r: 0, sx: 1.6, sy: 1.1, sr: 0.35 },
  { el: document.querySelector('.tri-mid'), x: 0, y: 0, r: 0, sx: 1.4, sy: 1.5, sr: -0.45 },
  { el: document.querySelector('.tri-inner'), x: 0, y: 0, r: 0, sx: 1.9, sy: 1.2, sr: 0.55 },
  { el: document.querySelector('.circle-big'), x: 0, y: 0, r: 0, sx: 1.1, sy: 1.4, sr: 0.3 },
  { el: document.querySelector('.circle-inner'), x: 0, y: 0, r: 0, sx: 1.5, sy: 1.0, sr: -0.38 },
  { el: document.querySelector('.zig-left'), x: 0, y: 0, r: -25, sx: 1.7, sy: 1.2, sr: 0.8 },
  { el: document.querySelector('.zig-right'), x: 0, y: 0, r: -25, sx: 1.3, sy: 1.6, sr: -0.9 },
  { el: document.querySelector('.s1'), x: 0, y: 0, r: 0, sx: 1.8, sy: 1.4, sr: 1.0 },
  { el: document.querySelector('.s2'), x: 0, y: 0, r: 0, sx: 1.0, sy: 1.5, sr: -0.8 },
  { el: document.querySelector('.s3'), x: 0, y: 0, r: 0, sx: 1.5, sy: 1.1, sr: 0.9 },
  { el: document.querySelector('.s4'), x: 0, y: 0, r: 0, sx: 1.2, sy: 1.7, sr: -1.1 },
  { el: document.querySelector('.s5'), x: 0, y: 0, r: 0, sx: 1.9, sy: 1.3, sr: 1.2 }
].filter(a => a.el);

function frame(t) {
  const time = t / 1000;

  animated.forEach((a, i) => {
    const dx = Math.sin(time * a.sx + i) * 6;
    const dy = Math.cos(time * a.sy + i * 0.6) * 6;
    const dr = Math.sin(time * a.sr + i * 0.3) * 4;
    a.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${a.r + dr}deg)`;
  });

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
