const ANTI_ALIASING_ENABLED = true;

function createScene(engine, canvas) {
	const scene = new BABYLON.Scene(engine);
	const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
	camera.attachControl(canvas, true);
	const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
	const box = BABYLON.MeshBuilder.CreateBox("box", {});
	return scene;
}

function main() {
	const screen = document.getElementById("screen");
	const engine = new BABYLON.Engine(screen, ANTI_ALIASING_ENABLED);
	const scene = createScene(engine, screen);
	engine.runRenderLoop(() => {
		scene.render();
	});

	window.addEventListener("resize", () => {
		engine.resize();
	});
}

document.addEventListener("DOMContentLoaded", main);