//import './style.css'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GUI } from 'dat.gui'
import * as THREE from 'three'
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

//Cloud model data
const CloudData = [
    [
        [.3, .3, .3], //scale
        [1.5, 0, 0], //position
        [-3, 0, 0] //rotation
    ],
    //repeat
    [
        [.3, .3, .3], [3.5, -.5, .5], [-3, 0, 0]
    ],
    [
        [.3, .3, .3], [5, 0, -1], [-3, 0, 0]
    ],
    [
        [.3, .3, .3], [4, 1, -1], [-3, 0, 0]
    ]
]

//Sun model data
const SunData = [
    [
        [1.5, 1.5, 1.5], //scale
        [0, 8, -1], //position
        [-3, 0, 0] //rotation 
    ] 
]

let loadModel = (modelLocation, scale, position, rotation) => {
    gtlfLoader.load(
        modelLocation, (gtlf) => {
            gtlf.scene.scale.set(...scale)
            gtlf.scene.position.set(...position)
            gtlf.scene.rotation.set(...rotation)
            scene.add(gtlf.scene)
        }
    )
}

//cloud filename : SideCloud_exp.glb
let populateModel = (modelData, modelName) => modelData.map((element, index) => loadModel(modelName, ...element))



const randomDoubleFromInterval = (min, max) => Math.random() * (max - min + 1) + min


const radius = 0.02;  // ui: radius
const widthSegments = 12;  // ui: widthSegments
const heightSegments = 8;  // ui: heightSegments
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
const material = new THREE.MeshPhongMaterial({ color: 0x5ec6f2 });

let meshes = []
let positionX
let positionY
let positionZ

// generating rain particules : Tweak the length to change the number of rain drops
const generateRain = () => {
    let frameMeshes = Array.from({ length: 15 }, (mesh, index) => {
        mesh = new THREE.Mesh(geometry, material)
        positionX = randomDoubleFromInterval(-1, 5)
        positionY = randomDoubleFromInterval(-2, 0)
        positionZ = randomDoubleFromInterval(0, -2)
        mesh.position.set(positionX, positionY, positionZ)
        return mesh
    })
    meshes = meshes.concat(frameMeshes)
}


// Lights
let UppointLight
let DownpointLight
let ClosepointLight
let FarpointLight


const lightPositions = [
    [1, 0, 10], //1st source
    [-1, 0, -10], //2nd source
    [-10, 10, 0], //3rd source
    [10, -10, -10], //4th source
]

const generateLight = (light, coordinates, intensity) => {
    light = new THREE.PointLight(0xffffff, intensity)
    light.position.set(...coordinates)
    scene.add(light)
}

const populateLight = (intensity) => {
    const lights = new Array(UppointLight, DownpointLight, ClosepointLight, FarpointLight);
    lights.map((element, index) => generateLight(element, lightPositions.at(index), intensity))
}

//Additional light for sunny and cloudy weather only 
let additionalLight = () => {
    const generatedLight = new THREE.PointLight(0xffffff, 2)
    generatedLight.position.set(...[5, 5, 4])
    scene.add(generatedLight)
} 

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100)
camera.position.x = 7.7
camera.position.y = -.3
camera.position.z = 5
 gui.add(camera.position, 'x').min(-10).max(10)
gui.add(camera.position, 'y').min(-10).max(10)
gui.add(camera.position, 'z').min(-10).max(10) 

scene.add(camera)

// Controls
//const controls = new OrbitControls(camera, canvas)
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
renderer.toneMappingExposure = 1.5

/**
 * Animate
 */
//const clock = new THREE.Clock()

let positionT = 0.01

let handleSunnyWeather = () => {
    additionalLight()    
    populateModel(CloudData.slice(1, 2), "3d_models/SideCloud_exp.glb")
    populateModel(SunData, "3d_models/Sun.glb")
    populateLight(6)
    return;
}

let handleCloudyWeather = () => {
    additionalLight()
    populateModel(SunData, "3d_models/Sun.glb")
    populateModel(CloudData, "3d_models/SideCloud_exp.glb")
    populateLight(4)
    return;
}

let handleRainyWeather = () => {
    setInterval(() => {
        generateRain()
        meshes.forEach((mesh) => {
            scene.add(mesh)
        })
    }, 500)
    populateModel(CloudData, "3d_models/SideCloud_exp.glb")
    populateLight(0.5)
    return;
}

export default function executeOnce(weatherString) {
    if (weatherString.toUpperCase() === "CLEAR")
        handleSunnyWeather()
    if (weatherString.toUpperCase()=== "CLOUDS")
        handleCloudyWeather()
    if (weatherString.toUpperCase() === "RAIN")
        handleRainyWeather()

    return tick()
};



function tick() {
    //const elapsedTime = clock.getElapsedTime()
    // Update objects
    meshes.forEach((mesh, index) => {
        mesh.position.y += -positionT
        if (mesh.position.y < -4) {
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
