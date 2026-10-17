/**
 * ROYENDISON AVIATION — 3D AIRPLANE SCROLLING ENGINE
 * Built with Three.js (Procedural Luxury Business Jet & Dynamic Flight Path)
 */

(function () {
  'use strict';

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('Three.js is required for 3D Airplane animation.');
    return;
  }

  const container = document.getElementById('webgl-canvas-container');
  if (!container) return;

  // 1. SCENE, CAMERA, RENDERER
  const scene = new THREE.Scene();
  
  // Subtle atmospheric fog for luxury depth
  scene.fog = new THREE.FogExp2(0x060b08, 0.016);

  const camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2.5, 20);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  // 2. LIGHTING SYSTEM
  const ambientLight = new THREE.AmbientLight(0xdff0e8, 0.9);
  scene.add(ambientLight);

  // Warm Sun / High-Altitude Skylight
  const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.8);
  sunLight.position.set(25, 45, 20);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  scene.add(sunLight);

  // Luxury Emerald Atmospheric Rim Light
  const emeraldRim = new THREE.DirectionalLight(0x19df82, 1.4);
  emeraldRim.position.set(-25, -12, -20);
  scene.add(emeraldRim);

  // Champagne Gold Accent Under-Glow
  const goldLight = new THREE.PointLight(0xd4af37, 2.0, 45);
  goldLight.position.set(0, -2, 5);
  scene.add(goldLight);

  // 3. JET MODEL CONSTRUCTION (PROCEDURAL HIGH-FIDELITY BUSINESS JET)
  const jetGroup = new THREE.Group();
  scene.add(jetGroup);

  // Premium Materials
  const fuselageMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7f5,
    metalness: 0.88,
    roughness: 0.18,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9
  });

  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xc8a251,
    metalness: 0.92,
    roughness: 0.22
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0x1f2e26,
    metalness: 0.98,
    roughness: 0.08
  });

  const cockpitGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x071e15,
    transmission: 0.85,
    opacity: 0.95,
    transparent: true,
    roughness: 0.05,
    ior: 1.6
  });

  const emissiveGreenMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
  const emissiveRedMat = new THREE.MeshBasicMaterial({ color: 0xff2244 });
  const emissiveWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const thrusterFlameMat = new THREE.MeshBasicMaterial({
    color: 0x4dd4ff,
    transparent: true,
    opacity: 0.75
  });

  // A. Fuselage Main Body
  const fuselageGeo = new THREE.CylinderGeometry(1.4, 1.3, 17, 36);
  fuselageGeo.rotateZ(Math.PI / 2);
  const fuselage = new THREE.Mesh(fuselageGeo, fuselageMat);
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  jetGroup.add(fuselage);

  // B. Sleek Aerodynamic Nose Cone
  const noseGeo = new THREE.ConeGeometry(1.4, 5.8, 36);
  noseGeo.rotateZ(-Math.PI / 2);
  const nose = new THREE.Mesh(noseGeo, fuselageMat);
  nose.position.x = 11.4;
  nose.castShadow = true;
  jetGroup.add(nose);

  // C. Cockpit Glass Canopy
  const cockpitGeo = new THREE.CylinderGeometry(1.38, 1.38, 2.8, 20, 1, false, 0, Math.PI);
  cockpitGeo.rotateZ(Math.PI / 2);
  const cockpit = new THREE.Mesh(cockpitGeo, cockpitGlassMat);
  cockpit.position.set(9.2, 0.35, 0);
  jetGroup.add(cockpit);

  // D. Heritage Gold Livery Swoop Stripe
  const stripeGeo = new THREE.CylinderGeometry(1.42, 1.32, 15.5, 36, 1, true, 0, Math.PI / 2.8);
  stripeGeo.rotateZ(Math.PI / 2);
  const stripe = new THREE.Mesh(stripeGeo, goldTrimMat);
  stripe.position.set(0.5, -0.15, 0);
  jetGroup.add(stripe);

  // E. Main Swept Wings
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.lineTo(-6.8, 17.5);
  wingShape.lineTo(-8.4, 17.5);
  wingShape.lineTo(-4.2, 0);
  wingShape.closePath();

  const wingExtrude = {
    depth: 0.16,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.06
  };
  const wingGeo = new THREE.ExtrudeGeometry(wingShape, wingExtrude);
  wingGeo.rotateX(Math.PI / 2);

  // Starboard (Right) Wing
  const rightWing = new THREE.Mesh(wingGeo, fuselageMat);
  rightWing.position.set(2.8, -0.35, 0);
  rightWing.rotation.z = -0.04; // Anhedral/dihedral angle
  rightWing.castShadow = true;
  jetGroup.add(rightWing);

  // Port (Left) Wing
  const leftWing = rightWing.clone();
  leftWing.scale.z = -1;
  jetGroup.add(leftWing);

  // F. Winglets (Aerodynamic Upswept Tips)
  const wingletGeo = new THREE.BoxGeometry(1.1, 2.4, 0.1);

  // Right Winglet
  const rightWinglet = new THREE.Mesh(wingletGeo, goldTrimMat);
  rightWinglet.position.set(-4.5, 0.85, 17.5);
  rightWinglet.rotation.y = -0.22;
  rightWinglet.rotation.x = 0.2;
  jetGroup.add(rightWinglet);

  // Left Winglet
  const leftWinglet = rightWinglet.clone();
  leftWinglet.position.z = -17.5;
  leftWinglet.rotation.x = -0.2;
  jetGroup.add(leftWinglet);

  // G. Navigation & Strobe Lights
  const navLightGeo = new THREE.SphereGeometry(0.18, 12, 12);

  // Right Wingtip Green
  const rightNavLight = new THREE.Mesh(navLightGeo, emissiveGreenMat);
  rightNavLight.position.set(-4.4, 2.0, 17.5);
  jetGroup.add(rightNavLight);

  // Left Wingtip Red
  const leftNavLight = new THREE.Mesh(navLightGeo, emissiveRedMat);
  leftNavLight.position.set(-4.4, 2.0, -17.5);
  jetGroup.add(leftNavLight);

  // Tail Beacon White Strobe
  const tailBeacon = new THREE.Mesh(navLightGeo, emissiveWhiteMat);
  tailBeacon.position.set(-9.2, 7.6, 0);
  jetGroup.add(tailBeacon);

  // H. Twin Rear Turbofan Engines
  const engineBodyGeo = new THREE.CylinderGeometry(0.82, 0.72, 4.6, 28);
  engineBodyGeo.rotateZ(Math.PI / 2);

  const nacelleLipGeo = new THREE.CylinderGeometry(0.74, 0.74, 0.35, 28);
  nacelleLipGeo.rotateZ(Math.PI / 2);

  // Right Engine
  const rightEngine = new THREE.Mesh(engineBodyGeo, chromeMat);
  rightEngine.position.set(-6.2, 1.15, 2.45);
  const rightLip = new THREE.Mesh(nacelleLipGeo, goldTrimMat);
  rightLip.position.set(-3.9, 1.15, 2.45);
  jetGroup.add(rightEngine);
  jetGroup.add(rightLip);

  // Left Engine
  const leftEngine = new THREE.Mesh(engineBodyGeo, chromeMat);
  leftEngine.position.set(-6.2, 1.15, -2.45);
  const leftLip = new THREE.Mesh(nacelleLipGeo, goldTrimMat);
  leftLip.position.set(-3.9, 1.15, -2.45);
  jetGroup.add(leftEngine);
  jetGroup.add(leftLip);

  // Exhaust Glow Plumes (Cyan/Gold high-speed plasma thrust)
  const plumeGeo = new THREE.ConeGeometry(0.5, 3.2, 18);
  plumeGeo.rotateZ(Math.PI / 2);

  const rightPlume = new THREE.Mesh(plumeGeo, thrusterFlameMat);
  rightPlume.position.set(-9.5, 1.15, 2.45);
  jetGroup.add(rightPlume);

  const leftPlume = new THREE.Mesh(plumeGeo, thrusterFlameMat);
  leftPlume.position.set(-9.5, 1.15, -2.45);
  jetGroup.add(leftPlume);

  // I. T-Tail Vertical Stabilizer
  const vTailShape = new THREE.Shape();
  vTailShape.moveTo(0, 0);
  vTailShape.lineTo(-4.2, 6.8);
  vTailShape.lineTo(-6.4, 6.8);
  vTailShape.lineTo(-4.6, 0);
  vTailShape.closePath();

  const vTailGeo = new THREE.ExtrudeGeometry(vTailShape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.05
  });
  const vTail = new THREE.Mesh(vTailGeo, fuselageMat);
  vTail.position.set(-5.2, 1.1, -0.09);
  vTail.castShadow = true;
  jetGroup.add(vTail);

  // J. T-Tail Horizontal Stabilizer
  const hTailShape = new THREE.Shape();
  hTailShape.moveTo(0, 0);
  hTailShape.lineTo(-2.2, 6.2);
  hTailShape.lineTo(-3.2, 6.2);
  hTailShape.lineTo(-1.8, 0);
  hTailShape.closePath();

  const hTailGeo = new THREE.ExtrudeGeometry(hTailShape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSize: 0.04,
    bevelThickness: 0.04
  });
  hTailGeo.rotateX(Math.PI / 2);

  const rightHTail = new THREE.Mesh(hTailGeo, fuselageMat);
  rightHTail.position.set(-9.4, 7.8, 0);
  jetGroup.add(rightHTail);

  const leftHTail = rightHTail.clone();
  leftHTail.scale.z = -1;
  jetGroup.add(leftHTail);

  // 4. ATMOSPHERIC PARTICLES & CLOUDS
  const particleCount = 280;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleScales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 80;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    particleScales[i] = Math.random() * 2 + 1;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

  const particleMat = new THREE.PointsMaterial({
    color: 0x8be4b5,
    size: 0.35,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 5. RUNWAY GRID FOR DESCENT AT APPROACH (Visible near bottom)
  const runwayGrid = new THREE.GridHelper(100, 50, 0xc8a251, 0x143b2a);
  runwayGrid.position.set(0, -6.5, -10);
  runwayGrid.material.transparent = true;
  runwayGrid.material.opacity = 0;
  scene.add(runwayGrid);

  // 6. SCROLL INTERPOLATION & FLIGHT PATH KEYFRAMES
  let currentScroll = 0;
  let targetScroll = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // Window scroll handler
  function onScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      targetScroll = Math.max(0, Math.min(1, window.scrollY / docHeight));
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mouse move parallax handler
  window.addEventListener('mousemove', function (e) {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Touch move handler
  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    }
  }, { passive: true });

  // 7. KEYFRAME WAYPOINTS ALONG THE FLIGHT CORRIDOR
  // Waypoint 0: Hero Takeoff / Forward Climb (0.00)
  // Waypoint 1: Jet Services Profile Bank (0.22)
  // Waypoint 2: Helicopter High Altitude Overview (0.42)
  // Waypoint 3: Events & B2B Executive Cruise (0.65)
  // Waypoint 4: Aircraft Sales Technical View (0.82)
  // Waypoint 5: Runway Descent & Final Approach (1.00)

  const waypoints = [
    {
      p: 0.00,
      jetPos: { x: 2.2, y: 0.2, z: 0 },
      jetRot: { x: 0.06, y: -0.35, z: -0.08 },
      camPos: { x: 0, y: 2.2, z: 18 },
      runwayAlpha: 0.0
    },
    {
      p: 0.20,
      jetPos: { x: -3.8, y: 0.8, z: 2 },
      jetRot: { x: 0.04, y: 0.45, z: 0.22 },
      camPos: { x: 1.5, y: 3.0, z: 19 },
      runwayAlpha: 0.0
    },
    {
      p: 0.42,
      jetPos: { x: 4.2, y: 2.6, z: -1 },
      jetRot: { x: 0.22, y: -0.55, z: -0.25 },
      camPos: { x: -1.2, y: 5.5, z: 20 },
      runwayAlpha: 0.0
    },
    {
      p: 0.65,
      jetPos: { x: -2.5, y: -0.4, z: 1.5 },
      jetRot: { x: -0.02, y: 0.2, z: 0.09 },
      camPos: { x: 0.5, y: 2.0, z: 17 },
      runwayAlpha: 0.05
    },
    {
      p: 0.84,
      jetPos: { x: 3.4, y: 0.5, z: -0.5 },
      jetRot: { x: 0.08, y: -0.48, z: -0.15 },
      camPos: { x: -0.8, y: 2.6, z: 18 },
      runwayAlpha: 0.25
    },
    {
      p: 1.00,
      jetPos: { x: 0.0, y: 1.2, z: -2.5 },
      jetRot: { x: -0.05, y: 0.0, z: 0.0 },
      camPos: { x: 0.0, y: 3.5, z: 16 },
      runwayAlpha: 0.85
    }
  ];

  function getInterpolatedState(progress) {
    // Find segment
    let i = 0;
    while (i < waypoints.length - 1 && waypoints[i + 1].p < progress) {
      i++;
    }
    const w0 = waypoints[i];
    const w1 = waypoints[Math.min(i + 1, waypoints.length - 1)];

    const span = (w1.p - w0.p) || 0.0001;
    const factor = Math.max(0, Math.min(1, (progress - w0.p) / span));

    // Smooth cubic ease-in-out
    const t = factor < 0.5 ? 4 * factor * factor * factor : 1 - Math.pow(-2 * factor + 2, 3) / 2;

    return {
      jetPos: {
        x: w0.jetPos.x + (w1.jetPos.x - w0.jetPos.x) * t,
        y: w0.jetPos.y + (w1.jetPos.y - w0.jetPos.y) * t,
        z: w0.jetPos.z + (w1.jetPos.z - w0.jetPos.z) * t
      },
      jetRot: {
        x: w0.jetRot.x + (w1.jetRot.x - w0.jetRot.x) * t,
        y: w0.jetRot.y + (w1.jetRot.y - w0.jetRot.y) * t,
        z: w0.jetRot.z + (w1.jetRot.z - w0.jetRot.z) * t
      },
      camPos: {
        x: w0.camPos.x + (w1.camPos.x - w0.camPos.x) * t,
        y: w0.camPos.y + (w1.camPos.y - w0.camPos.y) * t,
        z: w0.camPos.z + (w1.camPos.z - w0.camPos.z) * t
      },
      runwayAlpha: w0.runwayAlpha + (w1.runwayAlpha - w0.runwayAlpha) * t
    };
  }

  // 8. ANIMATION LOOP
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Lerp smooth scroll & mouse
    currentScroll += (targetScroll - currentScroll) * 0.055;
    mouseX += (targetMouseX - mouseX) * 0.045;
    mouseY += (targetMouseY - mouseY) * 0.045;

    // Evaluate interpolated flight trajectory
    const state = getInterpolatedState(currentScroll);

    // Subtle natural aerodynamic turbulence oscillation
    const turbulenceY = Math.sin(elapsedTime * 2.2) * 0.12 + Math.cos(elapsedTime * 1.1) * 0.06;
    const turbulenceRoll = Math.sin(elapsedTime * 1.6) * 0.025;

    // Update Jet Position with mouse parallax
    jetGroup.position.x = state.jetPos.x + mouseX * 0.8;
    jetGroup.position.y = state.jetPos.y + turbulenceY - mouseY * 0.4;
    jetGroup.position.z = state.jetPos.z;

    // Update Jet Rotation (combining trajectory + mouse bank + turbulence)
    jetGroup.rotation.x = state.jetRot.x + mouseY * 0.15;
    jetGroup.rotation.y = state.jetRot.y + mouseX * 0.25;
    jetGroup.rotation.z = state.jetRot.z + turbulenceRoll - mouseX * 0.22;

    // Update Camera
    camera.position.x = state.camPos.x + mouseX * 0.3;
    camera.position.y = state.camPos.y - mouseY * 0.2;
    camera.position.z = state.camPos.z;
    camera.lookAt(jetGroup.position.x * 0.3, jetGroup.position.y * 0.3, 0);

    // Pulsing Strobe Lights
    const strobeFreq = Math.floor(elapsedTime * 3) % 2 === 0;
    tailBeacon.material.opacity = strobeFreq ? 1.0 : 0.15;
    tailBeacon.material.transparent = true;

    // Thruster Plume Flame Vibration
    const flameScale = 1.0 + Math.sin(elapsedTime * 18.0) * 0.18;
    rightPlume.scale.set(flameScale, flameScale, flameScale);
    leftPlume.scale.set(flameScale, flameScale, flameScale);

    // Runway visibility
    runwayGrid.material.opacity = state.runwayAlpha;

    // Particles drifting back past aircraft
    const positions = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] -= 0.18; // drift backward along airspeed
      if (positions[i * 3 + 0] < -40) {
        positions[i * 3 + 0] = 40;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Update flight telemetry HUD on UI if element exists
    const hudAltitude = document.getElementById('hud-altitude');
    const hudSpeed = document.getElementById('hud-speed');
    const hudWaypoint = document.getElementById('hud-waypoint');

    if (hudAltitude) {
      const alt = Math.round(15000 + currentScroll * 36000);
      hudAltitude.textContent = `FL${Math.round(alt / 100)} (${alt.toLocaleString()} FT)`;
    }
    if (hudSpeed) {
      const mach = (0.78 + currentScroll * 0.14).toFixed(2);
      hudSpeed.textContent = `M${mach} / 512 KTAS`;
    }
    if (hudWaypoint) {
      let stage = 'CLIMB PHASE';
      if (currentScroll > 0.18 && currentScroll <= 0.40) stage = 'SECTOR CRUISE';
      if (currentScroll > 0.40 && currentScroll <= 0.65) stage = 'STRATOSPHERE FL510';
      if (currentScroll > 0.65 && currentScroll <= 0.85) stage = 'EXECUTIVE DESCENT';
      if (currentScroll > 0.85) stage = 'FINAL RUNWAY APPROACH';
      hudWaypoint.textContent = stage;
    }

    renderer.render(scene, camera);
  }

  animate();

  // 9. WINDOW RESIZE HANDLER
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    onScroll();
  });

  // Expose global controller if needed
  window.RoyEdisonAviation3D = {
    setScrollTarget: function (pct) {
      targetScroll = Math.max(0, Math.min(1, pct));
    }
  };
})();
