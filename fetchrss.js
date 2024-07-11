// Fetch myrss.xml using fetch API
    fetch('myrss.xml')
        .then(response => response.text())
        .then(xml => {
            // Parse XML string to XMLDocument
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');

            // Extract RSS items from XMLDocument
            const items = xmlDoc.querySelectorAll('item');

            // Display RSS items on the page
            const rssFeed = document.getElementById('rssFeed');
            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const description = item.querySelector('description').textContent;
                const image = item.querySelector('image').textContent;
                const link = item.querySelector('link').textContent;

                const rssItem = document.createElement('div');
                rssItem.classList.add('rss-item');
                rssItem.innerHTML = `
                    <a href="${link}" target="_self">
                        <img src="${image}" alt="${title}">
                    </a>
                    <div class="rss-item-content">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <a class="link" href="${link}" target="_self">Read more</a>
                    </div>
                `;
                rssFeed.appendChild(rssItem);
            });
        })
        .catch(error => console.error('Error fetching myrss.xml:', error));