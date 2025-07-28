// Detect mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const nav = document.getElementById("nav3d");

// Mobile Nav Toggle
const toggleButton = document.getElementById("navToggle");
const mobileMenu = document.getElementById("navLinks");

if (toggleButton && mobileMenu) {
  toggleButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    console.log("Toggle menu clicked");
  });
}

// Particle Canvas Setup
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1,
      opacity: Math.random(),
      shape: Math.random() > 0.7 ? 'alien' : 'circle'
    });
  }
}

function drawAlien(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 5, size / 5);
  ctx.beginPath();
  ctx.moveTo(0, -5);
  ctx.bezierCurveTo(3, -5, 3, 3, 0, 5);
  ctx.bezierCurveTo(-3, 3, -3, -5, 0, -5);
  ctx.fillStyle = `rgba(192, 125, 255, ${opacity})`;
  ctx.fill();
  ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach((p) => {
    if (p.shape === 'alien') {
      drawAlien(p.x, p.y, p.r, p.opacity);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192, 125, 255, ${p.opacity})`;
      ctx.fill();
    }

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

createParticles(120);
animateParticles();

// Typing Effect for Hero Paragraph
const messages = [
  "We came not from Earth, but from code.",
  "Building galaxies of software with alien logic.",
  "Mebucorp — Engineering beyond the edge.",
  "Redefining technology from a higher plane."
];

const heroParagraph = document.getElementById("heroTextParagraph");
let msgIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeText() {
  if (!heroParagraph) return;
  if (typingForward) {
    if (charIndex <= messages[msgIndex].length) {
      heroParagraph.textContent = messages[msgIndex].substring(0, charIndex++);
      setTimeout(typeText, 100);
    } else {
      typingForward = false;
      setTimeout(typeText, 1500);
    }
  } else {
    if (charIndex >= 0) {
      heroParagraph.textContent = messages[msgIndex].substring(0, charIndex--);
      setTimeout(typeText, 50);
    } else {
      typingForward = true;
      msgIndex = (msgIndex + 1) % messages.length;
      setTimeout(typeText, 1000);
    }
  }
}

setTimeout(typeText, 1000);
