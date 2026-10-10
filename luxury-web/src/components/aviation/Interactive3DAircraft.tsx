'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, RotateCw, ZoomIn, Eye, Activity, ShieldCheck, Zap } from 'lucide-react';

interface Interactive3DAircraftProps {
  aircraftName?: string;
  tailNumber?: string;
}

export default function Interactive3DAircraft({
  aircraftName = 'Gulfstream G700 Intercontinental',
  tailNumber = 'VT-ROY / N700ED',
}: Interactive3DAircraftProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [viewPreset, setViewPreset] = useState<'orbit' | 'cockpit' | 'cabin' | 'wing'>('orbit');
  const [telemetry, setTelemetry] = useState({
    altitude: 'FL450 (45,000 FT)',
    mach: 'Mach 0.90 (516 KTAS)',
    fuelBurn: '3,200 LBS/HR',
    rangeRemaining: '7,450 NM',
    cabinAltitude: '4,100 FT (LOW PRESSURE)',
  });
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, Renderer
    const width = currentMount.clientWidth || 800;
    const height = currentMount.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061c14); // Deep Heritage Forest Green background

    // Atmospheric subtle fog
    scene.fog = new THREE.FogExp2(0x061c14, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(18, 8, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff4db, 2.2); // Warm sunlight
    sunLight.position.set(20, 40, 20);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const emeraldRimLight = new THREE.DirectionalLight(0x25d366, 1.2); // Luxury Emerald rim
    emeraldRimLight.position.set(-20, -10, -20);
    scene.add(emeraldRimLight);

    const goldAccentLight = new THREE.PointLight(0xc6a15b, 1.5, 50); // Champagne gold glow
    goldAccentLight.position.set(0, 10, 0);
    scene.add(goldAccentLight);

    // 3. Grid Runway Ground Plane
    const gridHelper = new THREE.GridHelper(60, 40, 0xc6a15b, 0x113a29);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);

    // 4. Procedural High-Detail Business Jet Model
    const jetGroup = new THREE.Group();

    // Material definitions
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: wireframe,
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: wireframe,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x072a1d,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
    });

    const chromeEngineMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2e24,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: wireframe,
    });

    // Fuselage (Cylinder + Nose Cone + Tail Taper)
    const fuselageGeo = new THREE.CylinderGeometry(1.5, 1.4, 18, 32);
    fuselageGeo.rotateZ(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeo, bodyMaterial);
    fuselage.castShadow = true;
    jetGroup.add(fuselage);

    // Aerodynamic Nose
    const noseGeo = new THREE.ConeGeometry(1.5, 6, 32);
    noseGeo.rotateZ(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, bodyMaterial);
    nose.position.x = 12;
    jetGroup.add(nose);

    // Cockpit Windshield Visor
    const windshieldGeo = new THREE.CylinderGeometry(1.48, 1.48, 2.5, 16, 1, false, 0, Math.PI);
    windshieldGeo.rotateZ(Math.PI / 2);
    const windshield = new THREE.Mesh(windshieldGeo, glassMaterial);
    windshield.position.set(9.5, 0.4, 0);
    jetGroup.add(windshield);

    // Gold Luxury Livery Swoop Stripe
    const stripeGeo = new THREE.CylinderGeometry(1.52, 1.42, 16, 32, 1, true, 0, Math.PI / 3);
    stripeGeo.rotateZ(Math.PI / 2);
    const stripe = new THREE.Mesh(stripeGeo, goldTrimMaterial);
    stripe.position.set(0, -0.2, 0);
    jetGroup.add(stripe);

    // Swept-Back Main Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(-7, 18);
    wingShape.lineTo(-8.5, 18);
    wingShape.lineTo(-4, 0);
    wingShape.closePath();

    const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const wingGeometry = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
    wingGeometry.rotateX(Math.PI / 2);

    // Right Wing
    const rightWing = new THREE.Mesh(wingGeometry, bodyMaterial);
    rightWing.position.set(3, -0.4, 0);
    rightWing.rotation.z = -0.05; // slight dihedral
    jetGroup.add(rightWing);

    // Left Wing (Mirror)
    const leftWing = rightWing.clone();
    leftWing.scale.z = -1;
    jetGroup.add(leftWing);

    // Winglet tips (Champagne Gold)
    const wingletGeo = new THREE.BoxGeometry(1.2, 2.4, 0.1);
    const rightWinglet = new THREE.Mesh(wingletGeo, goldTrimMaterial);
    rightWinglet.position.set(-4, 0.8, 18);
    rightWinglet.rotation.y = -0.2;
    rightWinglet.rotation.x = 0.15;
    jetGroup.add(rightWinglet);

    const leftWinglet = rightWinglet.clone();
    leftWinglet.position.z = -18;
    leftWinglet.rotation.x = -0.15;
    jetGroup.add(leftWinglet);

    // Twin High-Bypass Rear Turbofan Engines
    const engineGeo = new THREE.CylinderGeometry(0.85, 0.75, 4.5, 24);
    engineGeo.rotateZ(Math.PI / 2);

    const engineIntakeGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.3, 24);
    engineIntakeGeo.rotateZ(Math.PI / 2);

    // Right Engine
    const rightEngine = new THREE.Mesh(engineGeo, chromeEngineMaterial);
    rightEngine.position.set(-6.5, 1.2, 2.4);
    const rightIntake = new THREE.Mesh(engineIntakeGeo, goldTrimMaterial);
    rightIntake.position.set(-4.2, 1.2, 2.4);
    jetGroup.add(rightEngine);
    jetGroup.add(rightIntake);

    // Left Engine
    const leftEngine = new THREE.Mesh(engineGeo, chromeEngineMaterial);
    leftEngine.position.set(-6.5, 1.2, -2.4);
    const leftIntake = new THREE.Mesh(engineIntakeGeo, goldTrimMaterial);
    leftIntake.position.set(-4.2, 1.2, -2.4);
    jetGroup.add(leftEngine);
    jetGroup.add(leftIntake);

    // T-Tail Vertical Stabilizer
    const vTailShape = new THREE.Shape();
    vTailShape.moveTo(0, 0);
    vTailShape.lineTo(-4.5, 6.5);
    vTailShape.lineTo(-6.5, 6.5);
    vTailShape.lineTo(-4.5, 0);
    vTailShape.closePath();

    const vTailGeo = new THREE.ExtrudeGeometry(vTailShape, { depth: 0.2, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 });
    const verticalTail = new THREE.Mesh(vTailGeo, bodyMaterial);
    verticalTail.position.set(-5.5, 1.2, -0.1);
    jetGroup.add(verticalTail);

    // Horizontal T-Tailplane
    const hTailShape = new THREE.Shape();
    hTailShape.moveTo(0, 0);
    hTailShape.lineTo(-2.2, 6.5);
    hTailShape.lineTo(-3.2, 6.5);
    hTailShape.lineTo(-1.8, 0);
    hTailShape.closePath();

    const hTailGeo = new THREE.ExtrudeGeometry(hTailShape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04 });
    hTailGeo.rotateX(Math.PI / 2);

    const rightHTail = new THREE.Mesh(hTailGeo, bodyMaterial);
    rightHTail.position.set(-9.5, 7.5, 0);
    jetGroup.add(rightHTail);

    const leftHTail = rightHTail.clone();
    leftHTail.scale.z = -1;
    jetGroup.add(leftHTail);

    scene.add(jetGroup);

    // 5. Mouse Drag Orbit Logic
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      jetGroup.rotation.y += deltaX * 0.008;
      jetGroup.rotation.x += deltaY * 0.005;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      camera.position.z = Math.max(8, Math.min(45, camera.position.z + e.deltaY * 0.02));
      camera.position.y = Math.max(3, Math.min(25, camera.position.y + e.deltaY * 0.01));
    };

    currentMount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    currentMount.addEventListener('wheel', onWheel);

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        jetGroup.rotation.y += 0.0035;
        // Subtle flight oscillation
        jetGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.25;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      currentMount.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [wireframe, isRotating]);

  return (
    <div className="relative w-full h-[540px] rounded-xl overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-[#061C14]">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Overlay Header */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-3 bg-[#062B1B]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-[#C6A15B]/40 pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
          <div>
            <h4 className="text-white text-xs font-serif tracking-widest uppercase font-bold">{aircraftName}</h4>
            <span className="text-[10px] text-[#C6A15B] font-mono tracking-wider">3D TELEMETRY · {tailNumber}</span>
          </div>
        </div>

        {/* View Controls & Toggles */}
        <div className="flex items-center gap-2 bg-[#062B1B]/90 backdrop-blur-md p-1.5 rounded-lg border border-[#C6A15B]/30 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider rounded transition-colors flex items-center gap-1.5 ${
              isRotating ? 'bg-[#C6A15B] text-[#061C14]' : 'text-white/80 hover:text-white'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>{isRotating ? 'Auto-Rotate ON' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider rounded transition-colors flex items-center gap-1.5 ${
              wireframe ? 'bg-[#25D366] text-[#061C14]' : 'text-white/80 hover:text-white'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>{wireframe ? 'CAD Wireframe' : 'Solid Shell'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-4 left-4 right-4 bg-[#03180F]/90 backdrop-blur-md rounded-lg p-3.5 border border-[#C6A15B]/25 flex flex-wrap items-center justify-between gap-4 pointer-events-auto text-white">
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block">Service Ceiling</span>
            <span className="font-mono font-bold text-white">{telemetry.altitude}</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block">Max Cruise Velocity</span>
            <span className="font-mono font-bold text-white">{telemetry.mach}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block">Average Fuel Burn</span>
            <span className="font-mono font-bold text-white">{telemetry.fuelBurn}</span>
          </div>
          <div className="hidden md:block">
            <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block">Non-Stop Range</span>
            <span className="font-mono font-bold text-white">{telemetry.rangeRemaining}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/917981994870?text=Hello%20Royendison,%20I%20wish%20to%20enquire%20about%20the%20Gulfstream%20G700%20Acquisition%20Dossier."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/50 text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
          >
            <Zap className="w-3.5 h-3.5 text-[#25D366]" />
            Request Pre-Buy Audit
          </a>
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden xl:flex flex-col gap-1.5 text-[9px] font-mono text-white/40 pointer-events-none">
        <span>DRAG TO ROTATE 360°</span>
        <span>SCROLL TO ZOOM AIRFRAME</span>
        <span>INTERACTIVE THREE.JS ENGINE</span>
      </div>
    </div>
  );
}
