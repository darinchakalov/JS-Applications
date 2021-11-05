import e from './element.js'
import postExpand from './comments.js'

let postSection = document.querySelector('#posts-section')

function loadPosts() {
    fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    .then(res => res.json())
    .then(data => {
        postSection.innerHTML =''
        for (const key in data) {
            let topicContainer = e('div', null, postSection, 'topic-container')
            topicContainer.id = data[key]['_id']
            let topicNameWrapper = e('div', null, topicContainer, 'topic-name-wrapper')
            let topicName = e('div', null, topicNameWrapper, 'topic-name')
            let nameA = e('a', null, topicName, 'normal')
            let nameH2 = e('h2', data[key]['topicName'], nameA)
            let columnsDiv = e('div', null, topicName, 'columns')
            let columns = e('div', null, columnsDiv)
            let date = e('p', null, columns)
            date.innerHTML = `Date: <time>${data[key]['date']}</time>`
            let nickName = e('div', null, columns,'nick-name')
            let username = e('p',`Username: `, nickName)
            let userSpan = e('span', data[key]['username'], username)

            topicContainer.addEventListener('click', postExpand)
        }
    })
    .catch(err => {
        console.error(data.message);
    })
}

export default {
    loadPosts
}

