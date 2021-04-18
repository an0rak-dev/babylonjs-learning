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
		BABYLON.MeshBuilder.CreateGround("ground", { width : this.worldWidth, height: this.worldHeight }, this.scene);
		this.createBlock(-2.5, 1, 4, 2);
		new BABYLON.Sound("crowd", "/crowd.mp3", this.scene,
		 	null,
			{autoplay: true, loop: true});

	}

	private createBlock(x: number, z: number, columns: number, rows : number): void {
		const xIncrement = 1 + 0.5; // 1 = house width, 0.5 = space between houses
		const zIncrement = 1 + 0.5; // 1 = house depth, 0.5 = space between houses

		var currentX = x;
		var currentZ = z;
		for (var row = 0; row < rows; row++) {
			currentX = x;
			for (var col = 0; col < columns; col++) {
				this.createHouse(currentX, 0, currentZ);
				currentX += xIncrement;
			}
			currentZ += zIncrement;
		}
	}

	private createHouse(x : number, y : number, z : number) : void {
		const houseCenterY = 0.5
		const walls = BABYLON.MeshBuilder.CreateBox("box", {}, this.scene);
		const roofOptions = {
			diameter: 1.3,
			height: 1.2,
			tessellation: 3
		};
		const roof = BABYLON.MeshBuilder.CreateCylinder("roof", roofOptions, this.scene);
		roof.scaling.x = 0.75;
		roof.rotation.z = Math.PI / 2;

		walls.position.x = x;
		walls.position.y = y + houseCenterY;
		walls.position.z = z;
		roof.position.x = x;
		roof.position.y = y + houseCenterY + 0.70;
		roof.position.z = z;
	}
}