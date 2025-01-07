const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tentangDusun = { content: 'Informasi mengenai Dusun Otak Kebon.' };

// Rute untuk mendapatkan data berita dusun
app.get('/tentang-dusun', (req, res) => {
    res.json(tentangDusun);
});

// Rute untuk menyimpan data berita dusun
app.post('/edit-tentang-dusun', (req, res) => {
    console.log("Menerima data:", req.body); // Log data yang diterima
    tentangDusun.content = req.body.content;
    res.send('Informasi tentang dusun berhasil disimpan!');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let products = [];
let photos = [];

// Fungsi untuk menghapus file dari sistem
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error menghapus file: ${err}`);
        } else {
            console.log(`File ${filePath} berhasil dihapus`);
        }
    });
}

// Rute untuk mengupload foto produk
app.post('/upload-product', upload.single('photo'), (req, res) => {
    try {
        const product = {
            id: Date.now(),
            whatsapp: req.body.whatsapp,
            image: `/uploads/${req.file.filename}`,
            filePath: req.file.path // Simpan path file untuk penghapusan
        };
        products.push(product);
        res.send('Produk berhasil ditambahkan!');
    } catch (err) {
        console.error(err);
        res.status(400).send('Terjadi kesalahan saat mengupload produk.');
    }
});

// Rute untuk mengupload foto wilayah
app.post('/upload-region', upload.single('photo'), (req, res) => {
    try {
        const photo = {
            id: Date.now(),
            name: req.body.name,
            image: `/uploads/${req.file.filename}`,
            filePath: req.file.path // Simpan path file untuk penghapusan
        };
        photos.push(photo);
        res.send('Foto wilayah berhasil ditambahkan!');
    } catch (err) {
        console.error(err);
        res.status(400).send('Terjadi kesalahan saat mengupload foto.');
    }
});

// Rute untuk menghapus produk
app.delete('/delete-product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(product => product.id === productId);
    if (product) {
        deleteFile(product.filePath); // Hapus file dari sistem
        products = products.filter(product => product.id !== productId);
        res.send('Produk berhasil dihapus!');
    } else {
        res.status(404).send('Produk tidak ditemukan.');
    }
});

// Rute untuk menghapus foto wilayah
app.delete('/delete-photo/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const photo = photos.find(photo => photo.id === photoId);
    if (photo) {
        deleteFile(photo.filePath); // Hapus file dari sistem
        photos = photos.filter(photo => photo.id !== photoId);
        res.send('Foto berhasil dihapus!');
    } else {
        res.status(404).send('Foto tidak ditemukan.');
    }
});

// Rute untuk mendapatkan data produk
app.get('/products', (req, res) => {
    res.json(products);
});

// Rute untuk mendapatkan data foto
app.get('/photos', (req, res) => {
    res.json(photos);
});

// Rute untuk melayani file statis dari direktori utama
app.use(express.static(path.join(__dirname)));

// Rute untuk melayani file statis dari direktori uploads
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
