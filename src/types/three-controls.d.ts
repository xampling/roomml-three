declare module 'three/examples/jsm/controls/FirstPersonControls.js' {
  import { Camera, EventDispatcher } from 'three';

  export class FirstPersonControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    lookSpeed: number;
    movementSpeed: number;
    lookVertical: boolean;
    activeLook: boolean;
    update(delta: number): void;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/controls/PointerLockControls.js' {
  import { Camera, EventDispatcher, Vector3 } from 'three';

  export class PointerLockControls extends EventDispatcher {
    constructor(camera: Camera, domElement?: HTMLElement);
    isLocked: boolean;
    minPolarAngle: number;
    maxPolarAngle: number;
    pointerSpeed: number;
    lock(): void;
    unlock(): void;
    getObject(): Camera;
    getDirection(v: Vector3): Vector3;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls.js' {
  import { Camera, EventDispatcher, Vector3 } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    target: Vector3;
    enableDamping: boolean;
    update(): void;
    dispose(): void;
  }
}
