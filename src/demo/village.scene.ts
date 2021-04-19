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
		const block = new Block(2, 4, this.scene);
		block.moveTo(-2.5, 0, 1);
		new BABYLON.Sound("crowd", "/crowd.mp3", this.scene,
		 	null,
			{autoplay: true, loop: true});
	}
}

class Block {
	private readonly houses: House[][];
	private readonly rows: number;
	private readonly columns: number;

	constructor(rows: number, columns: number, scene: BABYLON.Scene) {
		this.houses = new Array();
		this.rows = rows;
		this.columns = columns;
		for (var row = 0; row < this.rows; row++) {
			const rowHouse = new Array();
			for (var col = 0; col < this.columns; col++) {
				rowHouse.push(new House(scene));
			}
			this.houses.push(rowHouse);
		}
	}

	public moveTo(x: number, y: number, z: number) : void {
		var currentX = x;
		var currentZ = z;
		const xIncrement = House.WIDTH + 0.5;
		const zIncrement = House.DEPTH + 0.5;
		for (var row = 0; row < this.rows; row++) {
			currentX = x;
			for (var col = 0; col < this.columns; col++) {
				this.houses[row][col].moveTo(currentX, y, currentZ);
				currentX += xIncrement;
			}
			currentZ += zIncrement;
		}
	}
}

class House {
	public static readonly WIDTH = 1;
	public static readonly DEPTH = 1;
	private readonly scene : BABYLON.Scene;
	private readonly walls : BABYLON.Mesh;
	private readonly roof : BABYLON.Mesh;

	constructor(scene: BABYLON.Scene) {
		this.scene = scene;
		this.walls = BABYLON.MeshBuilder.CreateBox("box", {}, this.scene);
		const roofOptions = {
			diameter: 1.3,
			height: 1.2,
			tessellation: 3
		};
		this.roof = BABYLON.MeshBuilder.CreateCylinder("roof", roofOptions, this.scene);
		this.roof.scaling.x = 0.75;
		this.roof.rotation.z = Math.PI / 2;
		this.moveTo(0, 0, 0);
	}

	moveTo(x: number, y: number, z: number) : void {
		const houseCenterY = 0.5;
		const roofCenterY = houseCenterY + 0.70;
		this.walls.position.x = x;
		this.walls.position.y = y + houseCenterY;
		this.walls.position.z = z;
		this.roof.position.x = x;
		this.roof.position.y = y + roofCenterY;
		this.roof.position.z = z;
	}
}