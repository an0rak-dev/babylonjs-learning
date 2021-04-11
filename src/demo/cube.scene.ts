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
import { AbstractScene } from "../scene";

/**
 * SimpleCube is the most basic scene which will renders a cube with no particular
 * texture on it in.
 *
 * @author Sylvain Nieuwlandt
 */
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