import details from './details.js'
import e from './elements.js'

let movieSection = document.querySelector("#movie > div > div > div")

function showAllMovies() {
    fetch('http://localhost:3030/data/movies')
    .then(res => res.json())
    .then(data => {
        movieSection.innerHTML = ''
        for (const k in data) {
            movieRender(data[k])
        }
    })
    .catch(err => {
        console.error(err);
    })
}

function movieRender(movieData) {
    let movieCard = e('div', null, movieSection, 'card mb-4')
    let image = e('img', null, movieCard, 'card-img-top')
    image.src = movieData["img"]
    image.alt = 'Card image cap'
    image.width = '400'
    let cardBody = e('div', null, movieCard, 'card-body')
    let title = e('h4', movieData['title'], cardBody, 'card-title')
    let cardFooter = e('div', null, movieCard, 'card-footer')
    let a = e('a', null, cardFooter)
    a.href = '#'
    let detailsBtn = e('button', 'Details', cardFooter, 'btn btn-info')
    detailsBtn.type = 'button'
    detailsBtn.setAttribute('data-id', movieData["_id"])
}

export default {
    showAllMovies
}