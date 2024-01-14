document.getElementById('searchButton').addEventListener('click', function() {
    var query = document.getElementById('searchQuery').value;
    var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(query) + '&format=json&origin=*';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.query.search);
        })
        .catch(error => console.error(error));
});

function displayResults(searchResults) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    searchResults.forEach(result => {
        var resultElement = document.createElement('div');
        resultElement.classList.add('result-item');
        var title = result.title;
        var pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
        resultElement.innerHTML = `<h3><a href="${pageUrl}" target="_blank">${title}</a></h3><p>${result.snippet}</p>`;
        resultsContainer.appendChild(resultElement);
    });
}
