export default function ThankYouDisplay () {
    const form = document.querySelector('#newsletter');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.innerHTML = `<h2>Congrats! You have successfully subscribed to our newsletter!</h2>`;
    })
}