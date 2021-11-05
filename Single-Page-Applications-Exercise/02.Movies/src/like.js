import e from "./elements.js";

function onLike(id) {
	const body = {
		movieId: id,
	};
	fetch("http://localhost:3030/data/likes", {
		method: "POST",
		headers: { "Content-Type": "application/json", "X-Authorization": sessionStorage.getItem("authToken") },
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((data) => {
			liked(id)
		})
		.catch((err) => console.error(err));
}

function liked(id) {
    let likeBtn = document.querySelector("#movie-example > div > div > div.col-md-4.text-center > button")
    let btnParent = likeBtn.parentNode

    fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
    .then(res => res.json())
    .then(data => {
        likeBtn.remove();
        e('span', `Liked ${data}`, btnParent, 'enrolled-span')
    })
    .catch(err => console.error(err))
    
}

export async function userLikes(movieID, userID) {
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieID}%22%20and%20_ownerId%3D%22${userID}%22`)
    let data = await response.json()
    return data.length

}

export default {
	onLike,
    userLikes,
    liked
};
