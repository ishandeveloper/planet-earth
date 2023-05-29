import * as THREE from "three";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

// Styles
import "./style.css";

// Let's create a scene
const scene = new THREE.Scene();

// Let's create earth object
const geometry = new THREE.SphereGeometry(1, 64, 64);
const earthTexture = new THREE.TextureLoader().load("/earth.png");

const material = new THREE.MeshStandardMaterial({
  //   color: 0x0000ff,
  map: earthTexture,
  // wireframe: true
});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;
scene.add(camera);

// Let's add lights!
const light = new THREE.PointLight(0xffffff);
light.position.set(0, 0, 3);
scene.add(light);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
});

renderer.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
  renderer.render(scene, camera);
  earth.rotation.y += 0.001;
  requestAnimationFrame(animate);
};

animate();

// Making our earth cooooooler
earth.position.y = -1.75;

gsap.registerPlugin(ScrollTrigger);

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".details",
    start: "top bottom",
    end: "center center",
    scrub: true,
  },
});

timeline
  .to(earth.position, { y: 0, x: 1 }, 0.25)
  .to(earth.scale, { x: 0.8, y: 0.8, z: 0.8 }, "-=0.25");
