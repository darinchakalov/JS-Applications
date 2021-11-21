export async function requester(uri, options) {
    const baseUrl = 'http://localhost:3030'
    const response = await fetch(baseUrl+uri, options)
    if (response.ok === false) {
        const err = await response.json()
        return err
    }
    try {
        return await response.json()
    } catch (err) {
        return err
    }
}