document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const whatsapp = document.getElementById('whatsapp').value;
    const productPhoto = document.getElementById('product-photo').files[0];

    if (!productPhoto) {
        alert('Silakan upload foto potensi.');
        return;
    }

    const newPotensiId = potensi.length ? potensi[potensi.length - 1].id + 1 : 1;

    const newPotensi = {
        id: newPotensiId,
        image: URL.createObjectURL(productPhoto),
        whatsapp: whatsapp
    };

    potensi.push(newPotensi);
    localStorage.setItem('potensi', JSON.stringify(potensi));

    alert('Potensi berhasil ditambahkan!');
    window.location.href = 'admin.html';
});
