<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirection Page</title>
    <style>
        #redirect {
            text-align: center;
            margin-top: 50px;
        }
        #redirect img {
            max-width: 100%;
            height: auto;
        }
        #continueButton {
            display: none;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div id="redirect">
        <img src="image.jpeg" id="image" alt="Image">
        <h1 id="title"></h1>
        <p id="description"></p>
        <span id="countdown"></span>
        <button id="continueButton">Continue</button>
    </div>

    <script>
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
        let countdown = 10; // seconds
        const countdownElement = document.getElementById('countdown');
        const continueButton = document.getElementById('continueButton');

        const countdownInterval = setInterval(() => {
            if (countdown > 0) {
                countdownElement.innerText = `Please wait in seconds ${countdown}`;
                countdown--;
            } else {
                clearInterval(countdownInterval);
                countdownElement.style.display = 'none';
                document.getElementById('description').style.display = 'none';
                continueButton.style.display = 'inline-block';
            }
        }, 1000);

        // Redirect on button click
        continueButton.addEventListener('click', () => {
            window.location.href = redirectUrl;
        });
    </script>
</body>
</html>