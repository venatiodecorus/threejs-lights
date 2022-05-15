import * as three from "three";
import { CSG } from "three-csg-ts";

const camera = new three.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new three.Scene();

const geometry = new three.BoxGeometry(0.2, 0.2, 0.2);
const material = new three.MeshStandardMaterial();

const mesh = new three.Mesh(geometry, material);
const sphere = new three.Mesh(new three.SphereGeometry(0.15, 8, 8));
const newMesh = CSG.subtract(mesh, sphere);
scene.add(newMesh);

const renderer = new three.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

const light = new three.PointLight(0xffffff, 1, 100);
light.position.set(0.5, 0.5, 0.2);
scene.add(light);

const pgeometry = new three.PlaneGeometry(6, 4);
const pmaterial = new three.MeshStandardMaterial(); //new three.MeshBasicMaterial({
//   color: 0x000000,
//   side: three.DoubleSide,
// });
const plane = new three.Mesh(pgeometry, pmaterial);
plane.position.z = -1;
scene.add(plane);

// animation
function animation(time: number) {
  newMesh.rotation.x = time / 2000;
  newMesh.rotation.y = time / 1000;

  light.position.x = Math.sin(time / 500);
  light.position.y = Math.cos(time / 500);
  light.position.z = Math.sin(time / 500);

  renderer.render(scene, camera);
}
