import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

//Stars Particles
import starImageSource from './assets/images/particles/12.png';

//Asteroid
import asteroidColorImageSource from './assets/images/meteor/color.jpg';
import asteroidNormalImageSource from './assets/images/meteor/normal.jpg';

//Sun
import sunColorImageSource from './assets/images/sun/color.jpg'
import sunNormalImageSource from './assets/images/sun/normal.jpg'
import { VertexColors } from 'three';


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const starTexture = textureLoader.load(starImageSource);

const asteroidColorTexture = textureLoader.load(asteroidColorImageSource);
const asteroidNormalTexture = textureLoader.load(asteroidNormalImageSource);

const sunColorTexture = textureLoader.load(sunColorImageSource);
const sunNormalTexture = textureLoader.load(sunNormalImageSource);




/**
 * Repeat asteroids texture
 */
asteroidColorTexture.wrapS = THREE.RepeatWrapping;
asteroidColorTexture.wrapT = THREE.RepeatWrapping;
asteroidColorTexture.repeat.x = 3;
asteroidColorTexture.repeat.y = 3;

/**
 * Scene
 */
const scene = new THREE.Scene();


/**
 * Sizes
 */
const sizes = {};
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

window.addEventListener('resize', () => {
    // Save sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
})


/**
 * Cursor
 */
const cursor = {};
    cursor.x = 0;
    cursor.y = 0;

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5;
    cursor.y = _event.clientY / sizes.height - 0.5;
});


//Keyboard

const keyboard = {};
    keyboard.up = false;
    keyboard.right = false;
    keyboard.down = false;
    keyboard.left = false;
    keyboard.speed = false

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = true;
            break;

        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = true;
            break;

        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = true;
            break;

        case 'KeyA':
        case 'ArrowLeft':
            keyboard.left = true;
            break;

        case 'KeyQ':
            keyboard.speed = true;
            break;
    };
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = false
            break;

        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = false
            break;

        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = false
            break;

        case 'KeyA':
        case 'ArrowLeft':
            keyboard.left = false
            break;

        case 'KeyQ':
            keyboard.speed = false;
            break;
    };
});


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200);
    camera.position.z = 56;
    camera.position.y = 20;
scene.add(camera);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(sizes.width, sizes.height);
    document.body.appendChild(renderer.domElement);

/**
 Orbit controls*/

    /*const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.zoomSpeed = 0.3*/

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2);
scene.add(ambientLight);

const sunRectAreaLight = new THREE.RectAreaLight(0xffcccc, 100, 200, 1, 0, 30);
sunRectAreaLight.position.z = -60
scene.add(sunRectAreaLight);



// Sun
const sunLight = new THREE.DirectionalLight(0xffcccc, 1);
    sunLight.position.x = 10;
    sunLight.position.y = 0;
    sunLight.position.z = 0;
scene.add(sunLight);


/**
 * Material
 */

// MaterialFloor
/*const materialFloor = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    opacity: 0.2,
});*/


// MaterialStars
const starMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: starTexture,
    transparent: true,
    depthWrite: false,
});

// MaterialReactors
const reactorMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: starTexture,
    transparent: true,
    depthWrite: false,
    color: new THREE.Color(0xff0000),
});

// MaterialAsteroids
const asteroidMaterial = new THREE.MeshStandardMaterial({
    map: asteroidColorTexture,
    normalMap: asteroidNormalTexture
});



/**
 * Building Geometry
 */


//Build Star
const starGeometry = new THREE.Geometry();

//Build Reactor
const reactorGeometry = new THREE.Geometry();

// Build floorPlane
/*const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1000, 1), materialFloor);
    floor.rotation.x = - Math.PI * 0.5;
scene.add(floor);*/


// Build Life

const lifeGroup = new THREE.Group()

const life = new THREE.Mesh(new THREE.BoxGeometry(1, 0.3, 0.2))
    life.position.y = 3.33;
    life.position.z = 45;
    life.position.x = 1.5;
    scene.add(life)

const life1 = new THREE.Mesh(new THREE.BoxGeometry(1, 0.3, 0.2))
    life1.position.y = 3.33;
    life1.position.z = 45;
    life1.position.x = 2.5;
    scene.add(life1);

const life3 = new THREE.Mesh(new THREE.BoxGeometry(1, 0.3, 0.2))
    life3.position.y = 3.33;
    life3.position.z = 45;
    life3.position.x = 1.5;
    scene.add(life3);




// Sun
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshStandardMaterial({
        map: sunColorTexture,
        normalMap: sunNormalTexture,
    })
)
    sun.position.z = -100;
    sun.position.y = 15;
    sun.position.x = -10
scene.add(sun);

const sunGeometry = new THREE.Geometry();

for (let i = 0; i < 30000; i++) {
    
    //let angle = Math.random() * Math.PI *2;
    let radius = Math.random() * 5 + 0.5;

    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;
    const z = Math.random() - 0.5;
    
    const vertice = new THREE.Vector3(x,y,z).normalize()
    let randomParticle = vertice.multiplyScalar(radius)
        sunGeometry.vertices.push(vertice);
}

const sunMaterial = new THREE.PointsMaterial({
    size: 0.02,
    VertexColors: true,
    transparent: true,
    color: new THREE.Color(0xFDB813)
})

const sunParticle = new THREE.Points(sunGeometry, sunMaterial);
sunParticle.position.z = -100
sunParticle.position.y = 15
sunParticle.position.x = -10
scene.add(sunParticle);



// GeometryStars
for (let i = 0; i < 30000; i++) {
    const vertice = new THREE.Vector3(
        Math.random() * 100 - 50,
        Math.random() * 20,
        (Math.random() - 0.5) * 100,
    );
    starGeometry.vertices.push(vertice);
};

// Points
const star = new THREE.Points(starGeometry, starMaterial);
scene.add(star);




/**
 * GeometryReactor
 */

for (let i = 0; i < 100; i++) {
    let angle = (Math.PI * 2) * i / 100;

    const x = Math.cos(angle) * 0.03;
    const z = Math.sin(angle) * 0.03;
    const vertice = new THREE.Vector3(
        x,
        Math.random() * 1.4,
        z,
    );
    reactorGeometry.vertices.push(vertice);
};

// Points
const reactor = new THREE.Points(reactorGeometry, reactorMaterial);
    reactor.position.y = 3.33;
    reactor.position.z = 45;
    reactor.rotation.z = Math.PI / 2;
    reactor.rotation.y = Math.PI / 2;
scene.add(reactor);



/**
 * GeometryAsteroids
 */

// Spawn in map
let asteroidPosition = (Math.random() - 0.5) * 20;

//Aray for moove in loop
let asteroidArray = [];

for (let i = 0; i < 80; i++) {

    const asteroid = {}
        asteroid.radius = Math.random() * 1.5

    //Build Asteroids
    const asteroidsGeometry = new THREE.SphereGeometry(asteroid.radius, 0.30, 0.30);

        asteroid.mesh = new THREE.Mesh(asteroidsGeometry, asteroidMaterial);
        asteroid.mesh.position.x = asteroidPosition;
        asteroid.mesh.position.y = (Math.random() + 0.5) * 10;
        asteroid.mesh.position.z = -20 * (Math.random() + 0.5) * 10;
        asteroidPosition = (Math.random() - 0.5) * 30;
        asteroidArray.push(asteroid);
    scene.add(asteroid.mesh);
}












//Load model
const spaceshipGroup = new THREE.Group();
    spaceshipGroup.scale.set(0.004, 0.004, 0.004);
    spaceshipGroup.position.z = 30

scene.add(spaceshipGroup);

gltfLoader.load(
    'models/xwing/x_wing.glb',
    (gltf) => {
        console.log('sucess')
        console.log(gltf)
        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0];
            spaceshipGroup.add(child);
        }
    },

    undefined,

    (error) => {
        console.log('erreur');
        console.log(error);
    }
)

window.setTimeout(() => {
    document.querySelector(".control").style.display = "none";
}, 4000);

/**
 * Loop
 */

let speedAsteroid = 1

const startTime = Date.now()

const loop = () => {

/**
 * Timer
 */
//Time declared
let elapsedTime = Date.now() - startTime
let ms = elapsedTime
let s = 0
let m = 0

for (let i = 0; i < elapsedTime; i++) {
    
    if (ms >= 1000) {
        s +=1
        ms -= 1000 
    }

    if (s >= 59) {
        m += 1
        s = 0
        ms -= 1000
    }
}



// Write Time
let time = document.querySelector(".timer")
time.textContent = m + ' minutes et ' + s + ' sec'

    // Moove SpaceShip
    if (spaceshipGroup.position.z < 41) {
        camera.position.z + 1
    }


//Control Mooves


//Up
if (keyboard.up) {
    spaceshipGroup.position.y += 0.1;
    spaceshipGroup.rotation.x += 0.02

    //Rotation Up
    if (spaceshipGroup.rotation.x > + 0.4) {
        spaceshipGroup.rotation.x = + 0.4
    }
}

//Right
if (keyboard.right) {
    spaceshipGroup.position.x += 0.1;
    spaceshipGroup.rotation.z -= 0.03;

    //Rotation right
    if (spaceshipGroup.rotation.z < - 0.4) {
        spaceshipGroup.rotation.z = - 0.4
    }
}

//Down
if (keyboard.down) {
    spaceshipGroup.position.y -= 0.1;
    spaceshipGroup.rotation.x -= 0.03;

    //Rotation Down
    if (spaceshipGroup.rotation.x < - 0.4) {
        spaceshipGroup.rotation.x = - 0.4
    }
}

//Left
if (keyboard.left) {
    spaceshipGroup.position.x -= 0.1;
    spaceshipGroup.rotation.z += 0.03;

    //Rotation left
    if (spaceshipGroup.rotation.z > + 0.4) {
        spaceshipGroup.rotation.z = + 0.4;
    }
}

// SpaceShip come back
spaceshipGroup.position.z += 0.1


/**
 * Block
 */

//Block froward bug a résoudre
/*if (spaceshipGroup.position.z > 95) {
    spaceshipGroup.position.z = 95
}*/

//Block forward
if (spaceshipGroup.position.z > 46) {
    spaceshipGroup.position.z = 46
}

//Block Right
if (spaceshipGroup.position.x > 14) {
    spaceshipGroup.position.x = 14
}

//Block left
if (spaceshipGroup.position.x < -14) {
    spaceshipGroup.position.x = -14
}

//Block Up
if (spaceshipGroup.position.y > 17) {
    spaceshipGroup.position.y = 17
}

//Block backward
if (spaceshipGroup.position.y < 2) {
    spaceshipGroup.position.y = 2
}


//Update Sun
for(const vertice of sunGeometry.vertices){
    vertice.y += Math.sin(Date.now() * 0.001 + vertice.x*1000 ) * 0.01
}
sunGeometry.verticesNeedUpdate = true

// Update star
for (const _vertice of starGeometry.vertices) {
    _vertice.z += 0.3;

    if (_vertice.z > 60) {
        _vertice.z = -50;
    }
}
starGeometry.verticesNeedUpdate = true;

// Update reactor
for (const vertice of reactorGeometry.vertices) {
    vertice.y -= 0.02;
    reactorGeometry.x -= 1;
    reactorGeometry.z -= 1;

    if (vertice.y < -0.3) {
        vertice.y = 0.2;
    }
}
reactorGeometry.verticesNeedUpdate = true;

// Update Asteroids
for (let i = 0; i < asteroidArray.length; i++) {
    asteroidArray[i].mesh.position.z += speedAsteroid;

    if (asteroidArray[i].mesh.position.z > 60) {
        asteroidArray[i].mesh.position.z = -50;
    }

    if (asteroidArray[i].mesh.position.distanceTo(spaceshipGroup.position) < 2.3) {
        scene.remove(asteroidArray[i].mesh)
        scene.remove(life3)
    }

    if (asteroidArray[i].mesh.position.distanceTo(spaceshipGroup.position) < 2.3) {
        scene.remove(asteroidArray[i].mesh)
        scene.remove(life1)
    }

    /*
    // speed asteroid
    let speed = 1 / 10
    if (keyboard.speed) {
        asteroidArray[i].mesh.position.z += speed * 1
    }*/
}

speedAsteroid *= 1.00000000002

window.requestAnimationFrame(loop);

// Update controls
//controls.update()

/**
 * Camera follow spaceShip
 */
camera.position.x += (spaceshipGroup.position.x - camera.position.x) / 10
camera.position.y += (spaceshipGroup.position.y - camera.position.y) / 10
camera.position.z += (spaceshipGroup.position.z  + 10 - camera.position.z) / 10


life.position.x += (spaceshipGroup.position.x - 6.5 - life.position.x) / 10
life.position.y += (spaceshipGroup.position.y - 3 - life.position.y) / 10
life.position.z += (spaceshipGroup.position.z  + 5 - life.position.z) / 10

life1.position.x += (spaceshipGroup.position.x - 5 - life1.position.x) / 10
life1.position.y += (spaceshipGroup.position.y - 3 - life1.position.y) / 10
life1.position.z += (spaceshipGroup.position.z  + 5 - life1.position.z) / 10

life3.position.x += (spaceshipGroup.position.x - 3.5 - life3.position.x) / 10
life3.position.y += (spaceshipGroup.position.y - 3 - life3.position.y) / 10
life3.position.z += (spaceshipGroup.position.z  + 5 - life3.position.z) / 10

// Render
renderer.render(scene, camera);
};

loop();