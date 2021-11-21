export function notify(message) {
    const box = document.getElementById('errorBox');
    box.innerHTML = `<span>${message}</span>`;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}