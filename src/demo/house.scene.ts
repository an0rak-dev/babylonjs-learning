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
 * Houses is a simple scene which will renders two textured houses in a green
 * square plane.
 *
 * @author Sylvain Nieuwlandt
 */
export class Houses extends AbstractScene {
	constructor(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
		super(engine, canvas);
	}

	protected init(): void {
		const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 2, -3), this.scene);
		camera.attachControl(this.canvas, true);
		const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

		BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon").then((result) => {
			const house1 = result.meshes[1];
			house1.position.y = 0;
			const house2 = result.meshes[2];
			house2.position.y = 0;
		});
	}
}