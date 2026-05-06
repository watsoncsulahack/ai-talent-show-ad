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
const maxDots = 30;

function dropDot(x, y) {
  if (!trail) return;
  const dot = document.createElement('span');
  dot.className = 'robot-dot';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  trail.appendChild(dot);
  dots.push(dot);
  if (dots.length > maxDots) {
    const old = dots.shift();
    old.remove();
  }
  dots.forEach((d, i) => {
    d.style.opacity = ((i + 1) / dots.length * 0.7).toFixed(2);
    const s = 0.6 + (i / dots.length) * 0.7;
    d.style.transform = `translate(-50%, -50%) scale(${s})`;
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

    const x = w * 0.5 + Math.cos(time * 1.35) * (w * 0.33) + Math.sin(time * 4.3) * 18;
    const y = h * 0.52 + Math.sin(time * 1.9) * (h * 0.28) + Math.cos(time * 5.1) * 14;

    const x2 = w * 0.5 + Math.cos((time + 0.02) * 1.35) * (w * 0.33) + Math.sin((time + 0.02) * 4.3) * 18;
    const y2 = h * 0.52 + Math.sin((time + 0.02) * 1.9) * (h * 0.28) + Math.cos((time + 0.02) * 5.1) * 14;
    const angle = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI;

    robot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;

    if (prop) {
      prop.style.transform = `rotate(${time * 1800}deg)`;
    }

    if (t - lastDotAt > 55) {
      dropDot(x - 8, y + 8);
      lastDotAt = t;
    }
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
