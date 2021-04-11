import { SimpleCube } from "./demo/cube.scene";

const CANVAS_ID = "screen";
const ANTI_ALIASING_ENABLED = true;

function main() {
	const screen = getScreen();
	if (!screen) { return; }
	const engine = new BABYLON.Engine(screen, ANTI_ALIASING_ENABLED);
	const scene = new SimpleCube(engine, screen);
	engine.runRenderLoop(() => {
		scene.render();
	});

	window.addEventListener("resize", () => {
		engine.resize();
	});
}

function getScreen() : HTMLCanvasElement | undefined {
	const screen = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
	if (!screen) {
		alert("Unable to start the simulation. Check logs for more details.");
		console.error(`Unable to find the canvas with id "${CANVAS_ID}".`);
		return undefined;
	}
	return screen;
}

document.addEventListener("DOMContentLoaded", main);