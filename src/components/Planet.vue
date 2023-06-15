<script lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default {
    mounted() {
        this.initThreeScene();
    },
    methods: {
        initThreeScene() {
            const earthTexture: THREE.Texture = new THREE.TextureLoader().load(
                'public/planet/earth_texture.jpg'
            );
            let renderer: THREE.WebGLRenderer,
                camera: THREE.PerspectiveCamera,
                scene: THREE.Scene,
                controls: OrbitControls;

            const render = () => {
                animateSphere();
                renderer.render(scene, camera);
                window.requestAnimationFrame(render);
            };

            const animateSphere = () => {
                sphere.rotation.x += 0.02;
                sphere.rotation.y += 0.02;
            };

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 2;

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

            //sphere geometry
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                map: earthTexture
            });
            material.map!.encoding = THREE.sRGBEncoding;
            material.map!.anisotropy = 16;
            const sphere = new THREE.Mesh(geometry, material);

            scene.add(sphere);
            scene.add(camera);

            render();
            animateSphere();

            window.addEventListener(
                'resize',
                () => {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    renderer.setSize(
                        window.innerWidth / 2,
                        window.innerHeight / 2
                    );
                    camera.updateProjectionMatrix();
                },
                false
            );
            const canvasContainer = this.$refs.canvasContainer as HTMLElement;
            canvasContainer.appendChild(renderer.domElement);
        }
    }
};
</script>

<template>
    <div ref="canvasContainer"></div>
</template>
