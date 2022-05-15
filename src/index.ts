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
mesh.castShadow = true;
const sphere = new three.Mesh(new three.SphereGeometry(0.15, 8, 8));
sphere.castShadow = true;
const newMesh = CSG.subtract(mesh, sphere);
newMesh.castShadow = true;
newMesh.receiveShadow = false;
newMesh.position.z = 0.5;
scene.add(newMesh);

const renderer = new three.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = three.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);

document.body.appendChild(renderer.domElement);

// const light = new three.PointLight(0xffffff, 1, 100);
// const light = new three.SpotLight(0xffffff, 1, 100);
// light.position.set(0.0, 0.0, 2);
// light.castShadow = true;
// // light.shadow.
// scene.add(light);
const spotLight = new three.SpotLight(0xffffff);
spotLight.position.set(0.0, 0.0, 1.6);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add(spotLight);

const pgeometry = new three.PlaneGeometry(6, 4);
const pmaterial = new three.MeshPhongMaterial(); //new three.MeshBasicMaterial({
//   color: 0x000000,
//   side: three.DoubleSide,
// });
const plane = new three.Mesh(pgeometry, pmaterial);
plane.position.z = 0;
plane.castShadow = false;
plane.receiveShadow = true;
scene.add(plane);

const curve = new three.EllipseCurve(
  0,
  0, // ax, aY
  0.3,
  0.3, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0 // aRotation
);

const points = curve.getPoints(50);
const lgeometry = new three.BufferGeometry().setFromPoints(points);

// const lmaterial = new three.MeshStandardMaterial();
// LineBasicMaterial({
//   color: 0xff0000,
//   vertexColors: true,
// });

const extrudeSettings = {
  steps: 2,
  depth: 0.2,
  bevelEnabled: false,
  //   bevelThickness: 1,
  //   bevelSize: 1,
  //   bevelOffset: 0,
  //   bevelSegments: 1,
};

const shape = new three.Shape(points);
const geo = new three.ExtrudeGeometry(shape, extrudeSettings);
// const geo = new three.ShapeGeometry(shape);
const eMesh = new three.Mesh(geo, new three.MeshStandardMaterial());
eMesh.position.set(0.0, 0.0, 0.2);
// scene.add(eMesh);

// Create the final object to add to the scene
const ellipse = new three.Line(lgeometry, new three.MeshStandardMaterial());
ellipse.position.set(0.0, 0.0, 0.0);
// scene.add(ellipse);

const cgeometry = new three.CylinderGeometry(0.2, 0.2, 0.5, 32, 32, true);
const cmaterial = new three.MeshStandardMaterial({ color: 0xffff00 });
const cylinder = new three.Mesh(cgeometry, cmaterial);
cylinder.position.set(0, 0, 0.1);
cylinder.rotateX(1.4);
cylinder.castShadow = true;
cylinder.receiveShadow = false;
scene.add(cylinder);

// animation
function animation(time: number) {
  newMesh.rotation.x = time / 2000;
  newMesh.rotation.y = time / 1000;

  //   light.position.x = Math.sin(time / 500);
  //   light.position.y = Math.cos(time / 500);
  //   light.position.z = Math.sin(time / 500);

  renderer.render(scene, camera);
}
