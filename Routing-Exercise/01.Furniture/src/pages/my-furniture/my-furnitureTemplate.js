import { html } from "../../../node_modules/lit-html/lit-html.js";

export let singleFurnitureTemlate = (furnitureData) => html`
	<div class="col-md-4">
		<div class="card text-white bg-primary">
			<div class="card-body">
				<img src=${furnitureData.img} />
				<p>${furnitureData.description}</p>
				<footer>
					<p>Price: <span>${furnitureData.price} $</span></p>
				</footer>
				<div>
					<a href="/details/${furnitureData._id}" class="btn btn-info">Details</a>
				</div>
			</div>
		</div>
	</div>
`;

export const myFurnitureTemplate = (furniture) => html` <div class="row space-top">
		<div class="col-md-12">
			<h1>Welcome to Furniture System</h1>
			<p>Select furniture from the catalog to view details.</p>
		</div>
	</div>
	<div class="row space-top">${furniture.map(singleFurnitureTemlate)}</div>`;
