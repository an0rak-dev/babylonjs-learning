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
 * Village will display several textured meshes, some animations and sounds too.
 *
 * @author Sylvain Nieuwlandt
 */
export class Village extends AbstractScene {
	private readonly worldWidth : number;
	private readonly worldHeight : number;

	constructor(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
		super(engine, canvas);
		this.worldWidth = 10;
		this.worldHeight = 10;
	}

	protected init(): void {
		this.addCamera(0, 1, -2);
		const box = BABYLON.MeshBuilder.CreateBox("box", {}, this.scene);
		const ground = BABYLON.MeshBuilder.CreateGround("ground", { width : this.worldWidth, height: this.worldHeight }, this.scene);
		box.position.y = 0.5;

		const crowd = new BABYLON.Sound("crowd", "/crowd.mp3", this.scene,
		 	null,
			{autoplay: true, loop: true});

	}
}