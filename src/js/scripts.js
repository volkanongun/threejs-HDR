import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.shadowMap.enabled = true

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth/window.innerHeight,
  1,
  1000
)
camera.position.set(-10,30,30)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// const planeGeometry = new THREE.PlaneGeometry(30,30)
// const planeMaterial = new THREE.MeshStandardMaterial({ color : 0xFFFFFF, side: THREE.DoubleSide })
// const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// scene.add(plane)
// plane.rotation.x = -.5 * Math.PI
// plane.receiveShadow = true

// const gridHelper = new THREE.GridHelper(30)
// scene.add(gridHelper)

renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 2

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/MR_INT-003_Kitchen_Pierre.hdr', function(texture){
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.environment = texture
  scene.background = texture

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: .5,
      color: 0xFFEA00
    })
  )
  scene.add(sphere)
  sphere.position.x = 1.5

  const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: .5,
      color: 0x00FF00
    })
  )
  scene.add(sphere2)
  sphere2.position.x = -1.5

}, (progress)=>{
  console.log(Math.round(progress.loaded / progress.total * 100), " onHDR Progess")
})

function animate(time){
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const mousePosition = new THREE.Vector2()
window.addEventListener('mousemove', function(e){
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1
})