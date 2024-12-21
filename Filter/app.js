// Mengambil referensi elemen HTML yang diperlukan untuk pencarian
// searchInput untuk input pencarian, itemList untuk menampilkan hasil
const searchInput = document.getElementById('searchInput');
const itemList = document.getElementById('itemList');

// Data items berupa array yang berisi objek dengan id dan name
// Bisa diganti dengan data dari API atau database
const items = [
    { id: 1, name: 'JavaScript Tutorial' },
    { id: 2, name: 'HTML Course' },
    { id: 3, name: 'CSS Fundamentals' },
    { id: 4, name: 'React Basics' },
    { id: 5, name: 'Node.js Guide' },
    { id: 6, name: 'Python Learning' },
    { id: 7, name: 'Web Development' },
    { id: 8, name: 'Database SQL' },
];

// Fungsi untuk menampilkan loading indicator
// Muncul saat user mengetik dan menunggu hasil pencarian
// Menggunakan emoji ⏳ sebagai indikator
const showLoading = () => {
    itemList.innerHTML = `
        <li class="p-4 text-center">
            <div class="flex flex-col items-center justify-center space-y-4">
                <span class="text-4xl animate-spin">⏳</span>
                <span class="text-gray-500 text-lg">Loading...</span>
            </div>
        </li>`;
};

// Fungsi untuk merender/menampilkan items ke dalam HTML
// Memiliki 2 kondisi: saat tidak ada hasil dan saat ada hasil
// Menggunakan map untuk mengubah array menjadi HTML string
const renderItems = filteredItems => {
    // Cek jika array kosong, tampilkan pesan tidak ada hasil
    if (!filteredItems.length) {
        itemList.innerHTML = `
            <li class="p-4 text-center">
                <div class="flex flex-col items-center justify-center space-y-4">
                    <span class="text-4xl animate-bounce">😫</span>
                    <span class="text-gray-500 text-lg">No items found</span>
                    <p class="text-gray-400 text-sm">Try searching with different keywords</p>
                </div>
            </li>`;
        return;
    }

    // Jika ada hasil, render items dalam bentuk list
    // Menggunakan map untuk membuat HTML dan join untuk menggabungkan
    itemList.innerHTML = filteredItems
        .map(
            item => `
            <li class="p-4 hover:bg-gray-50 border-b border-gray-200 last:border-0">
                <div class="flex items-center justify-between">
                    <span class="text-gray-800">${item.name}</span>
                </div>
            </li>
        `,
        )
        .join('');
};

// Fungsi untuk memfilter items berdasarkan teks pencarian
// Menggunakan method filter dan includes
// Case insensitive dengan toLowerCase()
const filterItems = searchText => {
    return items.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );
};

// Event listener untuk input pencarian
// Berjalan setiap user mengetik (event 'input')
// Menampilkan loading, lalu hasil setelah 500ms
const handleSearch = searchInput.addEventListener('input', e => {
    const searchText = e.target.value;
    showLoading(); // Tampilkan loading
    setTimeout(() => {
        const filteredItems = filterItems(searchText);
        renderItems(filteredItems);
    }, 500); // Delay 500ms untuk simulasi loading
});

// Render semua items saat pertama kali load
// Menampilkan seluruh data tanpa filter
renderItems(items);
