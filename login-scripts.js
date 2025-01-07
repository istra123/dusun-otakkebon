function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login berhasil!');
        window.location.href = 'admin.html';
    } else {
        errorMessage.textContent = 'Username atau password salah!';
    }
}
