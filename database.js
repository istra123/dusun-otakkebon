const users = [
    { username: "admin", password: "admin123" }
];

let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, image: "image/profil.jpg", whatsapp: "1234567890" },
    { id: 2, image: "product2.jpg", whatsapp: "0987654321" },
    { id: 3, image: "product3.jpg", whatsapp: "1122334455" }
];

let photos = JSON.parse(localStorage.getItem('photos')) || [
    { id: 1, image: "image/profil.jpg", name: "Wilayah 1" },
    { id: 2, image: "village2.jpg", name: "Wilayah 2" }
];

localStorage.setItem('products', JSON.stringify(products));
localStorage.setItem('photos', JSON.stringify(photos));
