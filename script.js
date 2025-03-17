const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const bookList = document.getElementById("bookList");
const addedBooksList = document.getElementById("addedBooksList");
const favoritesList = document.getElementById("favoritesList");
const addBookForm = document.getElementById("addBookForm");
const editBookForm = document.getElementById("editBookForm");
const editSubmit = document.getElementById("editSubmit");
const cancelEdit = document.getElementById("cancelEdit");

let books = JSON.parse(localStorage.getItem("books")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let editIndex = null;

// 🔍 Pencarian Buku dari API
const spinner = document.createElement('div');
spinner.className = 'spinner';
spinner.style.display = 'none';
searchButton.appendChild(spinner);

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return alert("Masukkan kata kunci pencarian!");

    // Tampilkan Spinner saat mencari
    spinner.style.display = 'inline-block';

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        bookList.innerHTML = data.items ? data.items.map(book => {
            const info = book.volumeInfo;
            return `
                <div class="book-item">
                    <img src="${info.imageLinks?.thumbnail || 'no-image.jpg'}" alt="${info.title}" class="book-cover">
                    <div class="book-info">
                        <h3>${info.title}</h3>
                        <p>${info.authors?.join(", ") || "Tanpa Penulis"} - ${info.publishedDate || "Tanpa Tahun"}</p>
                        <button onclick="saveBook('${info.title}', '${info.authors?.join(", ") || "Tanpa Penulis"}', '${info.publishedDate || "Tanpa Tahun"}', '${info.imageLinks?.thumbnail || 'no-image.jpg'}')">💾 Simpan</button>
                    </div>
                </div>`;
        }).join("") : "<p>Tidak ada buku ditemukan.";
    } catch (error) {
        alert("Gagal mengambil data dari API!");
    } finally {
        // Hapus Spinner setelah pencarian selesai
        spinner.style.display = 'none';
    }
});

// Fungsi untuk Menampilkan Notifikasi
function showNotification(message, isError = false) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    if (isError) {
        notification.classList.add("notification-error");
    }
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add("show"), 10);
    setTimeout(() => notification.classList.remove("show"), 4000);
}

// 💾 Simpan Buku
function saveBook(title, author, year, cover) {
    // Periksa apakah buku sudah ada
    const existingBook = books.find(book => book.title === title);
    if (existingBook) {
        showNotification("Buku sudah ada!", true); // Error jika buku sudah ada
        return;
    }

    books.push({ title, author, year, cover });
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    showNotification("Buku berhasil ditambahkan!");
}

// 🔄 Menampilkan Buku
function displayBooks() {
    addedBooksList.innerHTML = books.map((book, index) => `
        <div class="book-item">
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author} - ${book.year}</p>
                <button onclick="editBook(${index})">✏️ Edit</button>
                <button onclick="deleteBook(${index})">🗑️ Hapus</button>
                <button onclick="addToFavorites(${index})">❤️ Favorit</button>
            </div>
        </div>
    `).join("");
}

// ✏️ Edit Buku
function editBook(index) {
    editIndex = index;
    document.getElementById("editTitle").value = books[index].title;
    document.getElementById("editAuthor").value = books[index].author;
    document.getElementById("editYear").value = books[index].year;
    document.getElementById("editCover").value = books[index].cover;
    document.getElementById("edit-book").classList.remove("hidden");
}

editSubmit.addEventListener("click", () => {
    books[editIndex] = {
        title: document.getElementById("editTitle").value,
        author: document.getElementById("editAuthor").value,
        year: document.getElementById("editYear").value,
        cover: document.getElementById("editCover").value
    };
    localStorage.setItem("books", JSON.stringify(books));
    document.getElementById("edit-book").classList.add("hidden");
    displayBooks();
    showNotification("Buku berhasil diperbarui!");
});

cancelEdit.addEventListener("click", () => {
    document.getElementById("edit-book").classList.add("hidden");
});

// 🗑️ Hapus Buku
function deleteBook(index) {
    const deletedBook = books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    showNotification(`Buku "${deletedBook[0].title}" berhasil dihapus!`);
}

// ❤️ Tambah ke Favorit
function addToFavorites(index) {
    const favoriteBook = books[index];
    
    // Cek jika buku sudah ada di favorit
    if (favorites.find(book => book.title === favoriteBook.title)) {
        showNotification("Buku sudah ada di favorit!", true);
        return;
    }

    favorites.push(favoriteBook);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
    showNotification(`Buku "${favoriteBook.title}" berhasil ditambahkan ke favorit!`);
}

// 🔄 Menampilkan Favorit
function displayFavorites() {
    favoritesList.innerHTML = favorites.map((book, index) => `
        <div class="book-item">
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author} - ${book.year}</p>
                <button onclick="removeFromFavorites(${index})">❌ Hapus dari Favorit</button>
            </div>
        </div>
    `).join("");
}

// ❌ Hapus dari Favorit
function removeFromFavorites(index) {
    const removedBook = favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
    showNotification(`Buku "${removedBook[0].title}" dihapus dari favorit!`);
}

// Tambah Buku Manual
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const year = document.getElementById("bookYear").value;
    const cover = document.getElementById("bookCover").value;
    saveBook(title, author, year, cover);
    addBookForm.reset();
});

// Menampilkan Data Saat Halaman Dimuat
displayBooks();
displayFavorites();
