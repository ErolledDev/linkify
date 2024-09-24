// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const redirectUrl = urlParams.get('url');
const imageUrl = urlParams.get('image');
const title = urlParams.get('title');
const description = urlParams.get('description');

// Set image source
const imageElement = document.getElementById('image');
if (imageUrl) {
    imageElement.src = imageUrl;
}

// Set content
document.getElementById('title').innerText = title;
document.getElementById('description').innerText = description;

// Countdown logic
let countdown = 25; // seconds
const countdownElement = document.getElementById('countdown');
const continueButton = document.getElementById('continueButton');

const countdownInterval = setInterval(() => {
    if (countdown > 0) {
        countdownElement.innerText = `Please wait in seconds ${countdown}`;
        countdown--;
    } else {
        clearInterval(countdownInterval);
        countdownElement.style.display = 'none';
        continueButton.style.display = 'inline-block';
    }
}, 1000);

// Redirect on button click
continueButton.addEventListener('click', () => {
    window.location.href = redirectUrl;
});
