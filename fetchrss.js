document.addEventListener("DOMContentLoaded", function () {
    fetch('myrss.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(xml => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');

            // Extract RSS items from XMLDocument
            const items = xmlDoc.querySelectorAll('item');

            // Reference the RSS feed section
            const rssFeed = document.getElementById('rssFeed');

            // Clear any existing content
            rssFeed.innerHTML = '';

            // Display RSS items on the page
            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const description = item.querySelector('description').textContent;
                const image = item.querySelector('image') ? item.querySelector('image').textContent : 'default-image-url.jpg';
                const link = item.querySelector('link').textContent;

                const rssItem = document.createElement('div');
                rssItem.classList.add('rss-items'); // Ensure this class matches your CSS

                rssItem.innerHTML = `
                    <a href="${link}" target="_self">
                        <img src="${image}" alt="${title}">
                        <h1>${title}</h1>
                        <p>${description}</p>
                    </a>
                `;
                rssFeed.appendChild(rssItem);
            });
        })
        .catch(error => console.error('Error fetching myrss.xml:', error));
});
