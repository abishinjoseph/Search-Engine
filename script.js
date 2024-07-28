document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '169f1821ff5a4a659b2a8ae3649de717';
    const apiUrl = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`;

    // Fetch news articles
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                const articles = data.articles.slice(0, 3);

                articles.forEach((article, index) => {
                    const imageElement = document.getElementById(`image${index + 1}`);
                    const titleElement = document.getElementById(`title${index + 1}`);
                    const linkElement = document.getElementById(`link${index + 1}`);

                    if (article.urlToImage) {
                        imageElement.src = article.urlToImage;
                    } else {
                        imageElement.src = 'https://kubrick.htvapps.com/vidthumb/f6865cb1-d77d-4a31-ba83-d57c4b2324d8/4b9c9d8f-ad14-47ea-bcf4-bf24ee0bb1f3.jpg?crop=0.383xw:0.383xh;0.517xw,0.252xh&resize=1200:*'; // Fallback image
                    }

                    titleElement.innerHTML = `<b>${article.title || 'No Title Available'}</b>`;
                    linkElement.href = article.url || '#'; // Set URL for redirection
                });
            } else {
                console.log('No articles found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    const performSearch = () => {
        const query = searchInput.value;
        if (query) {
            window.location.href = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
        }
    };

    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    // Update date and time function
    function updateDateTime() {
        const dateTimeElement = document.getElementById('dateAndTime');
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }

    updateDateTime(); // Initial call to display date and time immediately
    setInterval(updateDateTime, 1000); // Update every second
});
