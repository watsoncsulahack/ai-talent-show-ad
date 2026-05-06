const animated = [
  { el: document.querySelector('.tri-outer'), r: 0, sx: 1.6, sy: 1.1, sr: 0.35 },
  { el: document.querySelector('.tri-mid'), r: 0, sx: 1.4, sy: 1.5, sr: -0.45 },
  { el: document.querySelector('.tri-inner'), r: 0, sx: 1.9, sy: 1.2, sr: 0.55 },
  { el: document.querySelector('.circle-big'), r: 0, sx: 1.1, sy: 1.4, sr: 0.3 },
  { el: document.querySelector('.circle-inner'), r: 0, sx: 1.5, sy: 1.0, sr: -0.38 },
  { el: document.querySelector('.zig-left'), r: -25, sx: 1.7, sy: 1.2, sr: 0.8 },
  { el: document.querySelector('.zig-right'), r: -25, sx: 1.3, sy: 1.6, sr: -0.9 },
  { el: document.querySelector('.s1'), r: 0, sx: 0.5, sy: 0.7, sr: 1.2 },
  { el: document.querySelector('.s2'), r: 0, sx: 0.6, sy: 0.8, sr: -1.0 },
  { el: document.querySelector('.s3'), r: 0, sx: 0.4, sy: 0.6, sr: 0.9 },
  { el: document.querySelector('.s4'), r: 0, sx: 0.7, sy: 0.5, sr: -1.1 },
  { el: document.querySelector('.s5'), r: 0, sx: 0.55, sy: 0.75, sr: 1.15 }
].filter(a => a.el);

const robot = document.querySelector('.flying-robot');
const trail = document.querySelector('.robot-trail');
const prop = document.querySelector('.prop');
const dots = [];
const maxDots = 46;

function dropDot(x, y) {
  if (!trail) return;
  const dot = document.createElement('span');
  dot.className = 'robot-dot';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  trail.appendChild(dot);
  dots.push(dot);
  while (dots.length > maxDots) dots.shift().remove();
  dots.forEach((d, i) => {
    const p = (i + 1) / dots.length;
    d.style.opacity = (p * 0.85).toFixed(2);
    d.style.transform = `translate(-50%, -50%) scale(${0.45 + p * 0.9})`;
  });
}

let lastX = window.innerWidth * 0.5;
let lastY = window.innerHeight * 0.45;
let lastDotAt = 0;

function frame(t) {
  const time = t / 1000;

  animated.forEach((a, i) => {
    const drift = a.el.classList.contains('spiral') ? 12 : 6;
    const dx = Math.sin(time * a.sx + i) * drift;
    const dy = Math.cos(time * a.sy + i * 0.6) * drift;
    const dr = Math.sin(time * a.sr + i * 0.3) * (a.el.classList.contains('spiral') ? 14 : 4);
    a.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${a.r + dr}deg)`;
  });

  if (robot) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const x = w * 0.5 + Math.cos(time * 0.95) * (w * 0.58) + Math.sin(time * 3.6) * 36;
    const y = h * 0.5 + Math.sin(time * 1.3) * (h * 0.44) + Math.cos(time * 4.8) * 22;

    const angle = Math.atan2(y - lastY, x - lastX) * 180 / Math.PI;
    robot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;

    if (prop) prop.style.transform = `rotate(${time * 2400}deg)`;

    if (t - lastDotAt > 42) {
      const tx = x - Math.cos(angle * Math.PI / 180) * 18;
      const ty = y - Math.sin(angle * Math.PI / 180) * 18 + 6;
      dropDot(tx, ty);
      lastDotAt = t;
    }

    lastX = x;
    lastY = y;
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
