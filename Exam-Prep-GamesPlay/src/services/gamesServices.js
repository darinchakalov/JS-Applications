import { del, get, post, put } from "../api/requester.js";

async function getAllGames() {
    return await get('/data/games?sortBy=_createdOn%20desc&distinct=category')
}

async function getSingleGame(id){
    return await get('/data/games/' + id)
}

async function createGame(data) {
    return await post('/data/games', data)
}

async function getAllComments(id) {
    return await get(`/data/comments?where=gameId%3D%22${id}%22`)
}

async function createComment(data) {
    return await post(`/data/comments`, data)
}

async function editGame(id, data) {
    return put('/data/games/' + id, data)
}

async function deleteGame(id) {
    return del('/data/games/' + id)
}


export default {
    getAllGames,
    createGame,
    getSingleGame,
    getAllComments,
    createComment,
    editGame,
    deleteGame
}