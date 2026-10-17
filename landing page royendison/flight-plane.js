/**
 * ROYENDISON AVIATION — 2D LUXURY AIRPLANE FLIGHT ENGINE
 * Real-time aerodynamic floating & smooth Left-to-Right scroll flight corridor
 */

(function () {
  'use strict';

  // Create flight track canvas & plane element
  const planeContainer = document.getElementById('flight-plane-container');
  const planeEl = document.getElementById('flight-plane-2d');
  const contrailCanvas = document.getElementById('flight-contrail-canvas');

  if (!planeContainer || !planeEl) return;

  const ctx = contrailCanvas ? contrailCanvas.getContext('2d') : null;

  function resizeCanvas() {
    if (contrailCanvas) {
      contrailCanvas.width = window.innerWidth;
      contrailCanvas.height = window.innerHeight;
    }
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Flight Physics & State
  let targetX = 0;
  let currentX = -120;
  let targetY = window.innerHeight * 0.35;
  let currentY = window.innerHeight * 0.35;
  let currentAngle = 0;
  let targetAngle = 0;

  // Trail history for smooth sky-blue contrail
  const trailPoints = [];
  const maxTrailPoints = 35;

  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollY / maxScroll : 0));

    scrollVelocity = (scrollY - lastScrollY);
    lastScrollY = scrollY;

    // Map scroll progress to screen position (Left to Right)
    // p = 0 -> X: 8% (Left)
    // p = 1 -> X: 92% (Right)
    const margin = 100;
    targetX = margin + progress * (window.innerWidth - margin * 2.2);

    // Sine wave altitude path as user scrolls
    const verticalWave = Math.sin(progress * Math.PI * 3.5) * 70;
    targetY = window.innerHeight * 0.28 + verticalWave;

    // Bank angle based on scroll direction & vertical curve
    const slope = Math.cos(progress * Math.PI * 3.5) * 12;
    const velocityTilt = Math.max(-18, Math.min(18, scrollVelocity * 0.4));
    targetAngle = slope + velocityTilt;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animation Loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.035;

    // Aerodynamic floating bobbing (real-time idle flight)
    const bobbingY = Math.sin(time * 2) * 8 + Math.cos(time * 1.2) * 4;
    const bobbingTilt = Math.sin(time * 1.8) * 1.8;

    // Smooth Lerp
    currentX += (targetX - currentX) * 0.08;
    currentY += ((targetY + bobbingY) - currentY) * 0.08;
    currentAngle += ((targetAngle + bobbingTilt) - currentAngle) * 0.1;

    // Update Plane transform (Face right with pitch angle)
    planeEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentAngle}deg)`;

    // Contrail drawing
    if (ctx && contrailCanvas) {
      ctx.clearRect(0, 0, contrailCanvas.width, contrailCanvas.height);

      // Add jet engine tail emission point
      // Angle in radians
      const rad = (currentAngle * Math.PI) / 180;
      // Tail is roughly 65px behind plane center
      const tailX = currentX - Math.cos(rad) * 60;
      const tailY = currentY - Math.sin(rad) * 60;

      trailPoints.push({ x: tailX, y: tailY, alpha: 0.65, size: 4 });
      if (trailPoints.length > maxTrailPoints) {
        trailPoints.shift();
      }

      // Draw dual sky-blue vapor contrails
      if (trailPoints.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < trailPoints.length; i++) {
          const pt = trailPoints[i];
          pt.alpha *= 0.94; // fade
          pt.size += 0.25; // expand as it dissipates

          if (i === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = trailPoints[i - 1];
            const xc = (prev.x + pt.x) / 2;
            const yc = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
          }
        }
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.45)';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        for (let i = 0; i < trailPoints.length; i++) {
          const pt = trailPoints[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else {
            const prev = trailPoints[i - 1];
            ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + pt.x) / 2, (prev.y + pt.y) / 2);
          }
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  }

  animate();
})();
