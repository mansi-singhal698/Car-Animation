const hero = document.querySelector(".hero");
const visual = document.querySelector(".visual-wrap");
const headline = document.querySelector(".headline");
const stats = document.querySelector(".stats");
const cue = document.querySelector(".scroll-cue");

let target = 0;
let current = 0;
let ticking = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, amount) => start + (end - start) * amount;

function readScroll() {
  const rect = hero.getBoundingClientRect();
  const scrollable = hero.offsetHeight - window.innerHeight;
  target = clamp(-rect.top / scrollable, 0, 1);

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(render);
  }
}

function render() {
  current = lerp(current, target, 0.075);

  // Scroll progress drives the visual instead of a time-based autoplay.
  const x = lerp(-window.innerWidth * 0.17, window.innerWidth * 0.19, current);
  const y = Math.sin(current * Math.PI) * -28;
  const scale = lerp(0.86, 1.08, current);
  const rotate = lerp(-2.2, 1.5, current);

  visual.style.setProperty("--x", `${x}px`);
  visual.style.setProperty("--y", `${y}px`);
  visual.style.setProperty("--scale", scale.toFixed(3));
  visual.style.setProperty("--rotate", `${rotate.toFixed(2)}deg`);

  headline.style.transform = `translateY(${current * -38}px)`;
  headline.style.opacity = String(1 - current * 0.62);
  stats.style.transform = `translateY(${current * 32}px)`;
  stats.style.opacity = String(1 - current * 0.75);
  cue.style.opacity = String(1 - current * 4);

  if (Math.abs(target - current) > 0.001) {
    requestAnimationFrame(render);
  } else {
    current = target;
    ticking = false;
  }
}

window.addEventListener("scroll", readScroll, { passive: true });
window.addEventListener("resize", readScroll);
readScroll();
