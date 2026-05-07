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

const maxDots = 28;
const trailDots = [];
const trailPoints = [];

if (trail) {
  for (let i = 0; i < maxDots; i++) {
    const dot = document.createElement('span');
    dot.className = 'robot-dot';
    trail.appendChild(dot);
    trailDots.push(dot);
  }
}

let tipX = window.innerWidth * 0.5;
let tipY = window.innerHeight * 0.45;
let prevTipX = tipX;
let prevTipY = tipY;
let lastTrailAt = 0;

function updateTrailFromTip(x, y, t) {
  if (t - lastTrailAt >= 62) {
    const prev = trailPoints[0];
    if (prev) {
      const dx = x - prev.x;
      const dy = y - prev.y;
      if (Math.hypot(dx, dy) > 180) trailPoints.length = 0;
    }
    trailPoints.unshift({ x, y });
    if (trailPoints.length > maxDots) trailPoints.pop();
    lastTrailAt = t;
  }

  for (let i = 0; i < trailDots.length; i++) {
    const p = trailPoints[i];
    const d = trailDots[i];
    if (!p) {
      d.style.opacity = '0';
      continue;
    }
    const fade = 1 - i / maxDots;
    d.style.left = `${p.x}px`;
    d.style.top = `${p.y}px`;
    d.style.opacity = (0.08 + fade * 0.82).toFixed(2);
    d.style.transform = `translate(-50%, -50%) scale(${0.35 + fade * 0.8})`;
  }
}

function frame(t) {
  const time = t / 1000;

  animated.forEach((a, i) => {
    const drift = a.el.classList.contains('spiral') ? 10 : 5;
    const dx = Math.sin(time * a.sx + i) * drift;
    const dy = Math.cos(time * a.sy + i * 0.6) * drift;
    const dr = Math.sin(time * a.sr + i * 0.3) * (a.el.classList.contains('spiral') ? 12 : 3);
    a.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${a.r + dr}deg)`;
  });

  if (robot) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Tail owns the path. Tip is the leading point.
    tipX = w * 0.5 + Math.cos(time * 0.95) * (w * 0.58) + Math.sin(time * 3.6) * 30;
    tipY = h * 0.5 + Math.sin(time * 1.3) * (h * 0.44) + Math.cos(time * 4.8) * 18;

    const angle = Math.atan2(tipY - prevTipY, tipX - prevTipX) * 180 / Math.PI;

    // Robot head mapped directly to trail tip.
    robot.style.transform = `translate(${tipX}px, ${tipY}px) translate(-50%, -50%) rotate(${angle}deg)`;
    if (prop) prop.style.transform = `rotate(${time * 2400}deg)`;

    updateTrailFromTip(tipX, tipY, t);

    prevTipX = tipX;
    prevTipY = tipY;
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
