// fetchrss.js

document.addEventListener("DOMContentLoaded", function () {
    fetch('myrss.xml')
        .then(response => {
            // Check if the response is okay (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(xml => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');

            // Check for parsing errors
            const parseError = xmlDoc.getElementsByTagName("parsererror");
            if (parseError.length > 0) {
                console.error('Parsing Error:', parseError[0].textContent);
                throw new Error("Error parsing XML");
            }

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
                const enclosure = item.querySelector('enclosure');
                const imageUrl = enclosure ? enclosure.getAttribute('url') : '';
                const link = item.querySelector('link').textContent;

                const rssItem = document.createElement('div');
                rssItem.classList.add('rss-items');

                rssItem.innerHTML = `
                    <a href="${link}" target="_self">
                        <img src="${imageUrl}" alt="${title}">
                        <h1>${title}</h1>
                      
                    </a>
                `;
                rssFeed.appendChild(rssItem);
            });
        })
        .catch(error => {
            console.error('Error fetching myrss.xml:', error);
            alert('Failed to load RSS feed. Please check the console for more details.');
        });
});
