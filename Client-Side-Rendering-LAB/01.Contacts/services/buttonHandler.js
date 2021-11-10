function onClick(e) {
    e.preventDefault()
    let parentDiv = e.target.parentNode
    let detailsDiv = parentDiv.querySelector('.details')
    if (detailsDiv.style.display === 'none') {
        detailsDiv.style.display = 'block'
    } else {
        detailsDiv.style.display = 'none'
    }
}

export default onClick