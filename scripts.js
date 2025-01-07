console.log('Website Dusun Otak Kebon siap!');

// Render foto
function fetchPhotos() {
    fetch('/photos')
        .then(response => response.json())
        .then(photos => {
            const photoContainer = document.getElementById('photo-container');
            photoContainer.innerHTML = ''; // Kosongkan kontainer terlebih dahulu
            photos.forEach(photo => {
                const a = document.createElement('a');
                const img = document.createElement('img');
                a.href = photo.image;
                a.setAttribute('data-lightbox', 'gallery');
                img.src = photo.image;
                img.alt = photo.name;
                img.style.width = '200px'; // Sesuaikan ukuran gambar
                img.style.height = 'auto';
                a.appendChild(img);
                photoContainer.appendChild(a);
            });
        })
        .catch(error => console.error('Error fetching photos:', error));
}

// Render produk
function fetchProducts() {
    fetch('/products')
        .then(response => response.json())
        .then(productList => {
            const productContainer = document.getElementById('products-container');
            productContainer.innerHTML = ''; // Kosongkan kontainer terlebih dahulu
            productList.forEach(product => {
                const productDiv = document.createElement('div');
                const img = document.createElement('img');
                const whatsappLink = document.createElement('a');

                img.src = product.image;
                img.alt = 'Produk';
                img.style.width = '200px'; // Sesuaikan ukuran gambar
                img.style.height = 'auto';

                whatsappLink.href = `https://wa.me/${product.whatsapp}`;
                whatsappLink.className = 'whatsapp-button';
                whatsappLink.target = '_blank';
                whatsappLink.innerText = 'Via WhatsApp';

                productDiv.appendChild(img);
                productDiv.appendChild(whatsappLink);

                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Muat informasi berita dusun
function fetchTentangDusun() {
    fetch('/tentang-dusun')
        .then(response => response.json())
        .then(data => {
            const infoContainer = document.getElementById('dusun-info');
            infoContainer.innerHTML = `<p>${data.content}</p>`;
        })
        .catch(error => console.error('Error fetching tentang dusun:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPhotos();
    fetchProducts();
    fetchTentangDusun();
});
