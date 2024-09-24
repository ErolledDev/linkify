document.addEventListener("DOMContentLoaded", function() {
    fetch('https://linkified.vercel.app/myrss.xml')
        .then(response => response.text())
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
                const enclosure = item.querySelector('enclosure');
                const imageUrl = enclosure ? enclosure.getAttribute('url') : '';
                const link = item.querySelector('link').textContent;

                const rssItem = document.createElement('div');
                rssItem.classList.add('rss-items');

                rssItem.innerHTML = `
                    <a href="${link}" target="_self">
                        <img src="${imageUrl}" alt="${title}">
                        <h1>${title}</h1>
                        <p>${description}</p>
                    </a>
                `;
                rssFeed.appendChild(rssItem);
            });
        })
        .catch(error => console.error('Error fetching myrss.xml:', error));
});
