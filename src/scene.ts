export abstract class AbstractScene {
	protected readonly scene : BABYLON.Scene;
	protected readonly canvas : HTMLCanvasElement;

	constructor(engine : BABYLON.Engine, canvas : HTMLCanvasElement) {
		this.scene = new BABYLON.Scene(engine);
		this.canvas = canvas;
		this.init();
	}

	public render() : void {
		this.scene.render();
	}

	protected abstract init() : void;
}