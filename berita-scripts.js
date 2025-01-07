function fetchBerita() {
    fetch('/berita')
        .then(response => response.json())
        .then(beritaList => {
            const beritaContainer = document.getElementById('berita-container');
            beritaContainer.innerHTML = ''; // Kosongkan kontainer terlebih dahulu
            beritaList.forEach(berita => {
                const article = document.createElement('article');
                const title = document.createElement('h3');
                const content = document.createElement('p');
                title.innerText = berita.title;
                content.innerText = berita.content;
                article.appendChild(title);
                article.appendChild(content);
                beritaContainer.appendChild(article);
            });
        })
        .catch(error => console.error('Error fetching berita:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBerita();
});
