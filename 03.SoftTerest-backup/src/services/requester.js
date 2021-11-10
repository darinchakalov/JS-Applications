export default async function request(uri, options) {
    const baseUrl = 'http://localhost:3030'
    const response = await fetch(baseUrl+uri, options)
    console.log(response);
    if (response.ok === false) {
        const err = await response.json()
        console.error(err.message)
        return
    }
    try {
        return await response.json()
    } catch (err) {
        return response
    }
}