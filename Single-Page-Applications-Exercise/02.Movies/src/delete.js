import home from "./home.js"

export default function onDelete(id) {
    fetch('http://localhost:3030/data/movies/'+id, {
        method: 'DELETE',
        headers: {"X-Authorization": sessionStorage.getItem("authToken"),},
    })
    .then(res => res.json())
    .then(data => {
        home.showPage()
    })
    .catch(err => console.error(err))
}