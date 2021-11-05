import details from './details.js'

let editSection = document.querySelector("#edit-movie");
let editForm = document.querySelector("#edit-movie > form");

export default function onEdit(id) {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	editSection.classList.remove("hide");

	getMovieDetails(id);

	editForm.addEventListener("submit", onSubmit);
}

function onSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.currentTarget)
    if (!formData.get('title')|| !formData.get('description') || !formData.get('imageUrl')) {
        return
    }
    const body = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    }
    let id = document.querySelector("#edit-movie > form > div:nth-child(2) > input").getAttribute('data-id')
    fetch('http://localhost:3030/data/movies/'+id, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
			"X-Authorization": sessionStorage.getItem("authToken"),
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        details.showPage()
    })
    .catch(err => console.error(err))
}

function getMovieDetails(id) {
	fetch("http://localhost:3030/data/movies/" + id)
		.then((res) => res.json())
		.then((data) => {
			fillForm(data);
		})
		.catch((err) => {
			console.error(err);
		});
}

function fillForm(data) {
	let title = document.querySelector("#edit-movie > form > div:nth-child(2) > input");
	let description = document.querySelector("#edit-movie > form > div:nth-child(3) > textarea");
	let image = document.querySelector("#edit-movie > form > div:nth-child(4) > input");

	title.value = data["title"];
    title.setAttribute('data-id', data['_id'])
	description.value = data["description"];
	image.value = data["img"];
}
