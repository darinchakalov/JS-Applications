export function verifyInput(user) {
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailPattern.test(user.email)) {
        return alert('You need to fill in a valid email')
    } else if (user.username.length < 3) {
        return alert('Username must be at least 3 characters')
    } else if (user.password.length < 3) {
        return alert('Password must be at least 3 characters')
    } else if (user.password !== user.repass) {
        return alert('Passwords don\'t match')
    } else {
        return 'valid'
    }
}