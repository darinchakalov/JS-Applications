function getInfo() {
    let stopID = document.querySelector("#stopId")
    let stopName = document.querySelector("#stopName")
    let busesUL = document.querySelector("#buses")

    busesUL.innerHTML = ''

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID.value}`)
        .then(response => response.json())
        .then(data => {
            stopName.textContent=data['name'];
            for (const [bus, minutes] of Object.entries(data['buses'])) {
                createElement(`Bus ${bus} arrives in ${minutes} minutes`)
            }
        })
        .catch(err => stopName.textContent = 'Error')

    stopID.value = ''
    function createElement(content) {
        let current = document.createElement('li')
        current.textContent = content
        busesUL.appendChild(current)
        return current
    }
}