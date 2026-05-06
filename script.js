const animated = [
  { el: document.querySelector('.tri-outer'), r: 0, sx: 1.6, sy: 1.1, sr: 0.35 },
  { el: document.querySelector('.tri-mid'), r: 0, sx: 1.4, sy: 1.5, sr: -0.45 },
  { el: document.querySelector('.tri-inner'), r: 0, sx: 1.9, sy: 1.2, sr: 0.55 },
  { el: document.querySelector('.circle-big'), r: 0, sx: 1.1, sy: 1.4, sr: 0.3 },
  { el: document.querySelector('.circle-inner'), r: 0, sx: 1.5, sy: 1.0, sr: -0.38 },
  { el: document.querySelector('.zig-left'), r: -25, sx: 1.7, sy: 1.2, sr: 0.8 },
  { el: document.querySelector('.zig-right'), r: -25, sx: 1.3, sy: 1.6, sr: -0.9 },
  { el: document.querySelector('.s1'), r: 0, sx: 1.8, sy: 1.4, sr: 1.0 },
  { el: document.querySelector('.s2'), r: 0, sx: 1.0, sy: 1.5, sr: -0.8 },
  { el: document.querySelector('.s3'), r: 0, sx: 1.5, sy: 1.1, sr: 0.9 },
  { el: document.querySelector('.s4'), r: 0, sx: 1.2, sy: 1.7, sr: -1.1 },
  { el: document.querySelector('.s5'), r: 0, sx: 1.9, sy: 1.3, sr: 1.2 }
].filter(a => a.el);

const artboard = document.querySelector('.artboard');
const robot = document.querySelector('.flying-robot');
const trail = document.querySelector('.robot-trail');
const prop = document.querySelector('.prop');
const dots = [];
const maxDots = 42;

function dropDot(x, y) {
  if (!trail) return;
  const dot = document.createElement('span');
  dot.className = 'robot-dot';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  trail.appendChild(dot);
  dots.push(dot);

  while (dots.length > maxDots) {
    dots.shift().remove();
  }

  dots.forEach((d, i) => {
    const p = (i + 1) / dots.length;
    d.style.opacity = (p * 0.85).toFixed(2);
    d.style.transform = `translate(-50%, -50%) scale(${0.45 + p * 0.9})`;
  });
}

let lastDotAt = 0;

function frame(t) {
  const time = t / 1000;

  animated.forEach((a, i) => {
    const dx = Math.sin(time * a.sx + i) * 6;
    const dy = Math.cos(time * a.sy + i * 0.6) * 6;
    const dr = Math.sin(time * a.sr + i * 0.3) * 4;
    a.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${a.r + dr}deg)`;
  });

  if (artboard && robot) {
    const w = artboard.clientWidth;
    const h = artboard.clientHeight;

    const padX = 64;
    const padY = 58;
    const rx = Math.max(40, w * 0.35 - padX);
    const ry = Math.max(30, h * 0.3 - padY);

    const x = w * 0.5 + Math.cos(time * 1.2) * rx + Math.sin(time * 5.3) * 18;
    const y = h * 0.53 + Math.sin(time * 1.7) * ry + Math.cos(time * 6.7) * 14;

    const xNext = w * 0.5 + Math.cos((time + 0.016) * 1.2) * rx + Math.sin((time + 0.016) * 5.3) * 18;
    const yNext = h * 0.53 + Math.sin((time + 0.016) * 1.7) * ry + Math.cos((time + 0.016) * 6.7) * 14;
    const angle = Math.atan2(yNext - y, xNext - x) * 180 / Math.PI;

    robot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;

    if (prop) prop.style.transform = `rotate(${time * 2200}deg)`;

    if (t - lastDotAt > 45) {
      dropDot(x - 14, y + 10);
      lastDotAt = t;
    }
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
