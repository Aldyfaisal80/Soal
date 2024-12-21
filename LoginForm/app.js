// Mengambil semua elemen HTML yang dibutuhkan dengan getElementById
const passwordInput = document.getElementById('password'); // Input tempat user mengetik password
const showPassword = document.getElementById('togglePassword'); // Tombol untuk show/hide password
const meterPassword = document.getElementById('strengthBar'); // Bar indikator kekuatan password
const textPassword = document.getElementById('strengthText'); // Text keterangan kekuatan password
const tombolSubmit = document.getElementById('submitBtn'); // Tombol submit form
const pesanError = document.getElementById('validationMessages'); // Tempat menampilkan pesan error

// Fungsi untuk mengecek kekuatan password
function cekPassword(password) {
    let kekuatan = 0; // Nilai awal kekuatan password
    let pesan = []; // Array untuk menyimpan pesan error

    // Mengecek panjang password minimal 8 karakter
    if(password.length >= 8) {
        kekuatan += 20; // Tambah 20 poin jika memenuhi syarat
    } else {
        pesan.push("❌ Minimal 8 karakter"); // Tambah pesan error jika tidak memenuhi
    }

    // Mengecek minimal 1 huruf besar menggunakan regex /[A-Z]/
    if(/[A-Z]/.test(password)) {
        kekuatan += 20;
    } else {
        pesan.push("❌ Minimal 1 huruf besar");
    }

    // Mengecek minimal 1 huruf kecil menggunakan regex /[a-z]/
    if(/[a-z]/.test(password)) {
        kekuatan += 20;
    } else {
        pesan.push("❌ Minimal 1 huruf kecil");
    }

    // Mengecek minimal 1 angka menggunakan regex /[0-9]/
    if(/[0-9]/.test(password)) {
        kekuatan += 20;
    } else {
        pesan.push("❌ Minimal 1 angka");
    }

    // Mengecek minimal 1 karakter spesial menggunakan regex /[!@#$%^&*]/
    if(/[!@#$%^&*]/.test(password)) {
        kekuatan += 20;
    } else {
        pesan.push("❌ Minimal 1 karakter spesial (!@#$%^&*)");
    }

    return { kekuatan, pesan }; // Mengembalikan nilai kekuatan dan pesan error
}

// Fungsi untuk memperbarui tampilan berdasarkan password yang diinput
function updateTampilan(password) {
    const hasil = cekPassword(password); // Mengecek password menggunakan fungsi cekPassword
    
    // Menampilkan pesan error dengan styling CSS
    pesanError.innerHTML = hasil.pesan.map(msg =>
        `<p class="text-sm text-red-500">${msg}</p>`
    ).join('');
    
    // Mengatur lebar bar kekuatan password sesuai nilai kekuatan
    meterPassword.style.width = hasil.kekuatan + '%';
    
    // Mengatur warna dan text berdasarkan nilai kekuatan
    if(hasil.kekuatan <= 20) {
        meterPassword.className = 'h-full rounded bg-red-500'; // Warna merah
        textPassword.textContent = 'Sangat Lemah';
    } else if(hasil.kekuatan <= 40) {
        meterPassword.className = 'h-full rounded bg-orange-500'; // Warna orange
        textPassword.textContent = 'Lemah';
    } else if(hasil.kekuatan <= 60) {
        meterPassword.className = 'h-full rounded bg-yellow-500'; // Warna kuning
        textPassword.textContent = 'Sedang';
    } else if(hasil.kekuatan <= 80) {
        meterPassword.className = 'h-full rounded bg-blue-500'; // Warna biru
        textPassword.textContent = 'Kuat';
    } else {
        meterPassword.className = 'h-full rounded bg-green-500'; // Warna hijau
        textPassword.textContent = 'Sangat Kuat';
    }

    // Mengatur tombol submit aktif/non-aktif berdasarkan kekuatan password
    if(hasil.kekuatan === 100) {
        tombolSubmit.disabled = false; // Aktifkan tombol
        tombolSubmit.className = 'w-full py-2 px-4 rounded text-white bg-green-600';
    } else {
        tombolSubmit.disabled = true; // Non-aktifkan tombol
        tombolSubmit.className = 'w-full py-2 px-4 rounded text-white bg-gray-400';
    }
}

// Event listener saat user mengetik password
passwordInput.addEventListener('input', (e) => {
    updateTampilan(e.target.value); // Update tampilan setiap kali password berubah
});

// Event listener untuk tombol show/hide password
showPassword.addEventListener('click', () => {
    if(passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Ubah ke text untuk menampilkan password
        showPassword.textContent = '🔒';
    } else {
        passwordInput.type = 'password'; // Ubah ke password untuk menyembunyikan
        showPassword.textContent = '👁️';
    }
});

// Event listener saat form di-submit
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah form melakukan submit default
    alert('Password valid!'); // Tampilkan alert sukses
    passwordForm.reset(); // Reset form
    updateTampilan(''); // Reset tampilan
});
