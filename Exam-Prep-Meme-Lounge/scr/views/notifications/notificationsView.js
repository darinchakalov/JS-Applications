import { notificationsTemplate } from "./notificationsTemplate.js"

function showNotification(context) {
    let templateResult = notificationsTemplate('test')
    context.renderNotification(templateResult)
}

export default {
    showNotification
}

