//import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
/*TODO
Refactor all this code into functions and have 3 main functions as posssible outcomes : Rainy - Cloudy - Clear(Sunny)
*/
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const gtlfLoader = new GLTFLoader()

gtlfLoader.load(
    "3d_models/SideCloud_exp.glb", (gtlf) => {
        gtlf.scene.scale.set(0.3, 0.3, 0.3)
        gtlf.scene.position.set(0, 1, -1)
        gtlf.scene.rotation.set(-3, .5, 0)

        scene.add(gtlf.scene)
    }
)

gtlfLoader.load(
    "3d_models/SideCloud_exp.glb", (gtlf) => {
        gtlf.scene.scale.set(0.3, 0.3, 0.3)
        gtlf.scene.position.set(3, 1, .5)
        gtlf.scene.rotation.set(-3, .5, 0)
        scene.add(gtlf.scene)
    }
)

gtlfLoader.load(
    "3d_models/SideCloud_exp.glb", (gtlf) => {
        gtlf.scene.scale.set(0.2, 0.2, 0.2)
        gtlf.scene.position.set(5, 0, -1)
        gtlf.scene.rotation.set(-3, .5, 0)
        scene.add(gtlf.scene)
    }
)

gtlfLoader.load(
    "3d_models/SideCloud_exp.glb", (gtlf) => {
        gtlf.scene.scale.set(0.2, 0.2, 0.2)
        gtlf.scene.position.set(2, 1, -1)
        gtlf.scene.rotation.set(-3, .5, 0)
        scene.add(gtlf.scene)
    }
)
//min x : -1.3
//max x : 5.5
function randomDoubleFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min
}


const radius = 0.02;  // ui: radius
const widthSegments = 12;  // ui: widthSegments
const heightSegments = 8;  // ui: heightSegments
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
var material = new THREE.MeshPhongMaterial({ color: 0x5ec6f2 });

let meshes = Array()
let positionX
let positionY
let positionZ

const generateRain = () => {
    let frameMeshes = Array.from({length: 15}, (mesh, index) => {
        mesh = new THREE.Mesh(geometry, material)
        positionX = randomDoubleFromInterval(-1, 5)
        positionY = randomDoubleFromInterval(-.5, 0)
        positionZ = randomDoubleFromInterval(0, -2)
        mesh.position.set(positionX, positionY, positionZ)
        return mesh
    })
    meshes = meshes.concat(frameMeshes)
}


//generateRain()





// Lights
const UppointLight = new THREE.PointLight(0xffffff, .5)
const DownpointLight = new THREE.PointLight(0xffffff, .5)
const ClosepointLight = new THREE.PointLight(0xffffff, .5)
const FarpointLight = new THREE.PointLight(0xffffff, .5)

ClosepointLight.position.x = 1
ClosepointLight.position.y = 0
ClosepointLight.position.z = 10

FarpointLight.position.x = -1
FarpointLight.position.y = 0
FarpointLight.position.z = -10

UppointLight.position.x = -10
UppointLight.position.y = 10
UppointLight.position.z = 0

DownpointLight.position.x = 10
DownpointLight.position.y = -10
DownpointLight.position.z = 0


scene.add(ClosepointLight)
scene.add(FarpointLight)
scene.add(UppointLight)
scene.add(DownpointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -2
camera.position.y = 1
camera.position.z = 3
/* gui.add(camera.position, 'x').min(-10).max(10)
gui.add(camera.position, 'y').min(-10).max(10)
gui.add(camera.position, 'z').min(-10).max(10) */

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true
})
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */    
let positionT = 0.01


//const clock = new THREE.Clock()
setInterval(() => {
    generateRain();
    meshes.forEach((mesh) => {
        scene.add(mesh)
    })

    
}, 500)



export default function tick()  {

    //const elapsedTime = clock.getElapsedTime()

    // Update objects
    meshes.forEach((mesh, index) =>  {
        mesh.position.y += -positionT
        if(mesh.position.y < -1){
            meshes.splice(index, 1)
            scene.remove(mesh)
            positionT = 0.01
        }
    })
    


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
