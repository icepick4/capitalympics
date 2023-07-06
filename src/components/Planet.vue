<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted, ref } from 'vue';

onMounted(() => {
    initThreeScene();
});

const emit = defineEmits(['finishedLoading']);

const userClicking = ref(false);

const handleUserClicking = () => {
    userClicking.value = true;
};

const handleUserStopClicking = () => {
    userClicking.value = false;
};

let now = new Date();
let hours = now.getHours();
let textureMap =
    hours > 18 || hours < 6
        ? '/planet/earth_texture_night.jpg'
        : '/planet/earth_texture_day.jpg';
let camera: THREE.PerspectiveCamera;
const geometry = new THREE.SphereGeometry(1, 64, 64);
const earthTexture: THREE.Texture = new THREE.TextureLoader().load(
    textureMap,
    () => {
        emit('finishedLoading');
    }
);
earthTexture.minFilter = THREE.LinearFilter;
const material = new THREE.MeshBasicMaterial({
    map: earthTexture
});
material.map!.colorSpace = THREE.SRGBColorSpace;
material.map!.anisotropy = 16;
const planet = new THREE.Mesh(geometry, material);

const setParisCameraView = () => {
    camera.position.set(0, 0, 2.25);
    camera.lookAt(0, 0, 0);
    planet.rotation.y = -1.5;
    planet.rotation.x = 0.5;
};

const initThreeScene = () => {
    let renderer: THREE.WebGLRenderer,
        scene: THREE.Scene,
        controls: OrbitControls;

    const render = () => {
        animateSphere();
        renderer.render(scene, camera);
        window.requestAnimationFrame(render);
    };

    const animateSphere = () => {
        if (!userClicking.value) {
            planet.rotation.y -= 0.001;
        }
    };

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 2.25;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    // restrict camera movement
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.rotateSpeed = 0.3;

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.setClearColor(0x000000, 0);

    function calculatePosition(latitude: number, longitude: number) {
        let phi = (90 - latitude) * (Math.PI / 180);
        let theta = (longitude + 180) * (Math.PI / 180);
        let x = -(Math.sin(phi) * Math.cos(theta));
        let z = Math.sin(phi) * Math.sin(theta);
        let y = Math.cos(phi);
        return { x, y, z };
    }

    let { x, y, z } = calculatePosition(48.864716, 2.349014);

    let parisPin = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 30, 30),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );

    parisPin.position.set(x, y, z);
    planet.rotation.y = -1.5;
    planet.rotation.x = 0.5;
    planet.add(parisPin);
    scene.add(planet);
    scene.add(camera);

    render();
    animateSphere();

    window.addEventListener(
        'resize',
        () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            camera.updateProjectionMatrix();
        },
        false
    );
    const canvasContainer = document.getElementById('canvasContainer')!;
    canvasContainer.appendChild(renderer.domElement);
};
</script>

<template>
    <div
        class="relative"
        id="canvasContainer"
        @mousedown="handleUserClicking"
        @mouseup="handleUserStopClicking"
    >
        <p
            class="text-2xl absolute right-0 bottom-0 select-none hover:underline cursor-pointer"
            @click="setParisCameraView"
        >
            Paris, France
        </p>
    </div>
</template>
