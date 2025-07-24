import { Component, AfterViewInit, OnDestroy } from '@angular/core';

declare const THREE: any; // Declare THREE to avoid TypeScript errors

@Component({
  selector: 'app-donar',
  imports: [],
  templateUrl: './donar.html',
  styleUrl: './donar.css'
})
export class DonarComponent implements AfterViewInit, OnDestroy {

  private scene: any;
  private camera: any;
  private renderer: any;
  private particlesMesh: any;
  private clock = new THREE.Clock();
  private mouseX = 0;
  private mouseY = 0;

  ngAfterViewInit(): void {
    this.initThreeJs();
    this.animate();
    this.addMouseListener();
    this.addResizeListener();
    // No animations like the home page, so no addAnimationClasses()
  }

  ngOnDestroy(): void {
    this.removeMouseListener();
    this.removeResizeListener();
    // Dispose Three.js resources to prevent memory leaks
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }
    if (this.particlesMesh) {
      this.particlesMesh.geometry.dispose();
      this.particlesMesh.material.dispose();
    }
  }

  initThreeJs(): void {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a192f); // Set background color to blue
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.querySelector('#bg-canvas');
    if (canvas) {
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true // Make canvas transparent
      });

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.position.z = 5;

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 5000;

      const posArray = new Float32Array(particlesCount * 3); // x, y, z for each particle

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10; // Random positions
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      // Material for the particles
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xcccccc // Light gray particles for contrast
      });

      this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      this.scene.add(this.particlesMesh);
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();

    // Animate particles
    if (this.particlesMesh) {
        this.particlesMesh.rotation.y = -0.1 * elapsedTime;

        // Make particles react to mouse movement
        if (this.mouseX > 0) {
            this.particlesMesh.rotation.x = -this.mouseY * (elapsedTime * 0.00008);
            this.particlesMesh.rotation.y = -this.mouseX * (elapsedTime * 0.00008);
        }
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  addMouseListener(): void {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  removeMouseListener(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  addResizeListener(): void {
    window.addEventListener('resize', this.onWindowResize);
  }

  removeResizeListener(): void {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    if (this.renderer && this.camera) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  };

}
