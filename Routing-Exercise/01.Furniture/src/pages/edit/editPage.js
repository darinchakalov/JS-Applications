import { editFurniture, getSingleFurniture } from "../../services/furnitureServices.js";
import { editTemplate } from "./editTemplate.js";

let form = undefined;

async function submitHandler(context, id, e) {
	e.preventDefault();
	let formData = new FormData(e.target);

	form.invalidFields = {};
	let make = formData.get("make");
    if (make.length < 4) {
        form.invalidFields.make = true;
    }
	let model = formData.get("model");
    if (model.length < 4) {
        form.invalidFields.model = true;
    }
	let year = formData.get("year");
	if (year < 1950 || year > 2050) {
        form.invalidFields.year = true;
    }
    let description = formData.get("description");
	if (description.length < 10) {
        form.invalidFields.description = true;
    }
    let price = formData.get("price");
	if (price <= 0) {
        form.invalidFields.price = true;
    }
    let img = formData.get("img");
	if (img === '') {
        form.invalidFields.img = true;
    }

    if (Object.keys(form.invalidFields).length > 0) {
        let templateResult = editTemplate(form)
        return context.renderView(templateResult)
    }

    let material = formData.get('material')

	let furniture = {
		make,
		model,
		year,
		description,
		price,
		img,
        material,
	};
	let editResult = await editFurniture(id, furniture);
	context.page.redirect("/dashboard");
}

async function showView(context) {
    let furnitureId = context.params.id
    let furniture = await getSingleFurniture(furnitureId)

	let boundSubmitHandler = submitHandler.bind(null, context, furnitureId);
	form = {
		submitHandler: boundSubmitHandler,
        values: {
            make: furniture.make,
			model: furniture.model,
			year: furniture.year,
			description: furniture.description,
			price: furniture.price,
			img: furniture.img,
            material: furniture.material
        },
		invalidFields: {},
	};
	let templateResult = editTemplate(form);
	context.renderView(templateResult);
}

export default {
	showView,
};
