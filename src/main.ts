/*
	Copyright 2021 by Sylvain Nieuwlandt

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		 http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

import { SimpleCube } from "./demo/cube.scene";
import { Houses } from "./demo/house.scene";
import { AbstractScene } from "./scene";

/**
 * The id of the HTMLCanvasElement in the page which will host the BabylonJS scene.
 */
const CANVAS_ID = "screen";

/**
 * A boolean flag to use to enable (or not) the anti-aliasing effect during the rendering.
 */
const ANTI_ALIASING_ENABLED = true;

/**
 * The name of the scene to render.
 *
 * Accepted values are "cube" and "house". If the value is different, an error will
 * be written in the console and the rendering will stop.
 */
const CURRENT_SCENE = "house";

/**
 * Entrypoint of the application.
 *
 * Retrieves the Canvas in the page, then load the wanted Scene in it and render
 * it.
 */
function main() : void {
	const screen = getScreen();
	if (!screen) { return; }
	const engine = new BABYLON.Engine(screen, ANTI_ALIASING_ENABLED);
	const scene = getScene(engine, screen);
	if (!scene) { return; }
	engine.runRenderLoop(() => {
		scene.render();
	});

	window.addEventListener("resize", () => {
		engine.resize();
	});
}

/**
 * Seeks in the document for a canvas with an id equals to the value of CANVAS_ID
 * and returns it.
 *
 * Returns undefined if no such element with this id can be found or if it's
 * not a Canvas.
 *
 * @returns the canvas or undefined if not found
 */
function getScreen() : HTMLCanvasElement | undefined {
	const screen = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
	if (!screen) {
		alert("Unable to start the simulation. Check logs for more details.");
		console.error(`Unable to find the canvas with id "${CANVAS_ID}".`);
		return undefined;
	}
	return screen;
}

/**
 * Filters the scene to display in the given canvas based on the value of "CURRENT_SCENE".
 *
 * @param engine the BabylonJS engine instance to use
 * @param canvas the canvas which will hosts the final rendering
 * @returns the wanted Scene if it matchs a known one, or undefined if it doesn't.
 */
function getScene(engine : BABYLON.Engine, canvas : HTMLCanvasElement) : AbstractScene | undefined {
	switch (CURRENT_SCENE.toLowerCase()) {
		case "cube" :
			return new SimpleCube(engine, canvas);
		case "house":
			return new Houses(engine, canvas);
		default:
			console.error(`No scene found with code ${CURRENT_SCENE}`);
			return undefined;
	}
}

document.addEventListener("DOMContentLoaded", main);