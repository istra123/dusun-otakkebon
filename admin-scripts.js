console.log('Admin Dusun Otak Kebon siap!');

// Tambahkan event listener untuk tombol tambah foto
document.querySelector('.add-photo').addEventListener('click', () => {
    window.location.href = 'tambah-foto-home.html';
});

// Tambahkan event listener untuk tombol tambah produk
document.querySelector('.add-product').addEventListener('click', () => {
    window.location.href = 'tambah-potensi.html';
});

// Tambahkan event listener untuk tombol simpan informasi tentang dusun
document.querySelector('.edit-button').addEventListener('click', () => {
    const dusunInfo = document.getElementById('dusun-info').value;
    console.log("Mengirim data:", dusunInfo); // Log untuk memastikan data terkirim

    fetch('/edit-tentang-dusun', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: dusunInfo })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error('Error:', error));
});

// Render produk
function renderProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    fetch('/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="Produk">
                    <a href="https://wa.me/${product.whatsapp}" class="whatsapp-button">Via WhatsApp</a>
                    <button class="delete-product">Hapus Produk</button>
                `;

                productDiv.querySelector('.delete-product').addEventListener('click', () => {
                    fetch(`/delete-product/${product.id}`, { method: 'DELETE' })
                        .then(response => response.text())
                        .then(data => {
                            alert(data);
                            renderProducts();
                        })
                        .catch(error => console.error('Error:', error));
                });

                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Render foto
function renderPhotos() {
    const photoContainer = document.getElementById('photo-container');
    photoContainer.innerHTML = '';

    fetch('/photos')
        .then(response => response.json())
        .then(photos => {
            photos.forEach(photo => {
                const photoDiv = document.createElement('div');
                photoDiv.classList.add('photo');
                
                photoDiv.innerHTML = `
                    <img src="${photo.image}" alt="Foto ${photo.name}" class="village-image">
                    <p>${photo.name}</p>
                    <button class="delete-photo">Hapus Foto</button>
                `;

                photoDiv.querySelector('.delete-photo').addEventListener('click', () => {
                    fetch(`/delete-photo/${photo.id}`, { method: 'DELETE' })
                        .then(response => response.text())
                        .then(data => {
                            alert(data);
                            renderPhotos();
                        })
                        .catch(error => console.error('Error:', error));
                });

                photoContainer.appendChild(photoDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Muat informasi tentang dusun dari server
function loadDusunInfo() {
    fetch('/tentang-dusun')
        .then(response => response.json())
        .then(data => {
            document.getElementById('dusun-info').value = data.content;
        })
        .catch(error => console.error('Error fetching tentang dusun:', error));
}

// Render produk, foto, dan informasi dusun saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderPhotos();
    loadDusunInfo();
});
