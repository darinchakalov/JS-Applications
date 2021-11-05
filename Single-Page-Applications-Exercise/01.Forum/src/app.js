import create from './create.js'
import posts from './posts.js'

create.createTopic()
posts.loadPosts()

let homeBtn = document.querySelector("body > header > nav > ul > li > a")
homeBtn.addEventListener('click', e => {
    e.preventDefault()
    document.querySelector("body > div.container > main > div.new-topic-border").classList.remove('hide')
    document.querySelector("#posts-section").classList.remove('hide')
    document.querySelector("body > div.container > main > div.topic-title > div > div.theme-title").classList.add('hide')
    document.querySelector("body > div.container > main > div.topic-title > div > div.comment").classList.add('hide')
    document.querySelector("body > div.container > main > div.topic-title > div > div.answer-comment").classList.add('hide')
})