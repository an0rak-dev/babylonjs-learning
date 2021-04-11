import { AbstractScene } from "../scene";

export class SimpleCube extends AbstractScene {
	constructor(engine : BABYLON.Engine, canvas : HTMLCanvasElement) {
		super(engine, canvas);
	}

	protected init() : void {
		const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), this.scene);
		camera.attachControl(this.canvas, true);
		const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
		const box = BABYLON.MeshBuilder.CreateBox("box", {}, this.scene);
	}
}