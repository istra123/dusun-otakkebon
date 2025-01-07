document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const regionPhoto = document.getElementById('region-photo').files[0];

    if (!regionPhoto) {
        alert('Silakan upload foto wilayah.');
        return;
    }

    const newPhotoId = photos.length ? photos[photos.length - 1].id + 1 : 1;

    const newPhoto = {
        id: newPhotoId,
        image: URL.createObjectURL(regionPhoto),
        name: name
    };

    photos.push(newPhoto);
    localStorage.setItem('photos', JSON.stringify(photos));

    alert('Foto wilayah berhasil ditambahkan!');
    window.location.href = 'admin.html';
});
