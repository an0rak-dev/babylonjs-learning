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

/**
 * AbstractScene is the base class for all the Scene that may be rendered in
 * this application.
 *
 * @author Sylvain Nieuwlandt
 */
export abstract class AbstractScene {
	/**
	 * The current BabylonJS's scene used to render this scene.
	 */
	protected readonly scene : BABYLON.Scene;
	/**
	 * The canvas element which will host all the scene.
	 */
	private readonly canvas : HTMLCanvasElement;

	private initiliazed: boolean;

	/**
	 * Creates a new Scene based on the given engine instance and canvas.
	 *
	 * @param engine the BabylonJS's engine instance
	 * @param canvas the HTML canvas which will actually display the scene in the page.
	 */
	constructor(engine : BABYLON.Engine, canvas : HTMLCanvasElement) {
		this.scene = new BABYLON.Scene(engine);
		this.canvas = canvas;
		this.initiliazed = false;
	}

	/**
	 * Renders the actual scene based on its configuration.
	 */
	public render() : void {
		if (!this.initiliazed) {
			this.init();
			this.initiliazed = true;
		}
		this.scene.render();
	}

	/**
	 * Initialize the current scene.
	 *
	 * Implementations of this method should use the protected attributes 'scene'.
	 */
	protected abstract init() : void;

	/**
	 * Add a camera and a light to the current scene.
	 *
	 * Add a new light pointing upwards (pos Y), and a camera aiming in the given direction.
	 *
	 * @param xTarget the aiming vector of the camera (X-axis coord)
	 * @param yTarget the aiming vector of the camera (Y-axis coord)
	 * @param zTarget the aiming vector of the camera (Z-axis coord)
	 */
	protected addCamera(xTarget : number, yTarget : number, zTarget : number) : void {
		const target = new BABYLON.Vector3(xTarget, yTarget, zTarget);
		const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, target, this.scene);
		camera.attachControl(this.canvas, true);
		new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
	}
}