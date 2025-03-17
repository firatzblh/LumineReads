
# Aplikasi Pengelolaan Buku - LumineReads

## Deskripsi
LumineReads adalah aplikasi berbasis web untuk mencari, menambah, mengedit, dan menghapus buku dari daftar favorit pengguna. Aplikasi ini menggunakan Google Books API untuk mencari buku berdasarkan kata kunci pencarian dan menyimpan data buku secara lokal di browser menggunakan `localStorage`.

## Fitur
- **Pencarian Buku**: Mencari buku berdasarkan judul atau penulis menggunakan Google Books API.
- **Tambah Buku**: Menambahkan buku secara manual ke dalam daftar buku.
- **Edit Buku**: Mengedit detail buku yang sudah ditambahkan.
- **Hapus Buku**: Menghapus buku dari daftar.
- **Favorit Buku**: Menambahkan buku ke dalam daftar favorit dan menghapusnya.

## Link Github
Sumber kode aplikasi ini dapat ditemukan di repository GitHub:
[GitHub Repository - Aplikasi Pengelolaan Buku](https://github.com/username/repository)  
*Gantilah `username/repository` dengan username dan nama repository yang sesuai.*

## API Public yang Digunakan

Aplikasi ini menggunakan **Google Books API** untuk mencari buku berdasarkan kata kunci yang dimasukkan oleh pengguna.

### Endpoint API yang Digunakan
1. **Endpoint Pencarian Buku**  
   - **URL**: `https://www.googleapis.com/books/v1/volumes?q={query}`
   - **Method**: `GET`
   - **Parameters**: 
     - `q`: Kata kunci pencarian buku (judul, penulis, atau kategori).
   
   #### Request:
   - **URL**: `https://www.googleapis.com/books/v1/volumes?q=javascript`
   - **Method**: `GET`
   
   #### Response:
   ```json
   {
     "items": [
       {
         "volumeInfo": {
           "title": "Learning JavaScript",
           "authors": ["John Doe"],
           "publishedDate": "2020",
           "imageLinks": {
             "thumbnail": "http://linktoimage.com/image.jpg"
           }
         }
       }
     ]
   }


## Penjelasan Aplikasi

### 1. **Pencarian Buku (GET)**
   - **Fungsi**: Pengguna dapat mencari buku dengan mengetikkan kata kunci (judul atau penulis) pada kolom pencarian.
   - **Metode**: `GET`
   - **Deskripsi**: Aplikasi akan mengirimkan permintaan `GET` ke Google Books API untuk mencari buku yang relevan dengan kata kunci yang dimasukkan oleh pengguna. Hasil pencarian akan menampilkan daftar buku yang ditemukan.
   
   #### Contoh Request:
   ```http
   GET https://www.googleapis.com/books/v1/volumes?q=javascript
   ```
   #### Contoh Response:
   ```json
   {
     "items": [
       {
         "volumeInfo": {
           "title": "JavaScript: The Good Parts",
           "authors": ["Douglas Crockford"],
           "publishedDate": "2008",
           "imageLinks": {
             "thumbnail": "https://link-to-thumbnail.jpg"
           }
         }
       }
     ]
   }
   ```

### 2. **Tambah Buku (POST)**
   - **Fungsi**: Pengguna dapat menambahkan buku secara manual dengan memasukkan informasi buku (judul, penulis, tahun terbit, dan URL gambar sampul).
   - **Metode**: `POST`
   - **Deskripsi**: Buku yang ditambahkan akan disimpan dalam `localStorage`. Data buku yang baru akan ditambahkan ke dalam array buku yang ada dan ditampilkan di daftar buku.
   - **Formulir untuk menambahkan buku**: Pengguna mengisi form yang terdiri dari judul, penulis, tahun terbit, dan gambar sampul.

   #### Contoh Request:
   ```json
   POST /books
   {
     "title": "Learning React",
     "author": "Alex Banks",
     "year": "2017",
     "cover": "https://example.com/cover.jpg"
   }
   ```

   #### Contoh Response:
   ```json
   {
     "status": "success",
     "message": "Buku berhasil ditambahkan!"
   }
   ```

### 3. **Edit Buku (PUT)**
   - **Fungsi**: Pengguna dapat mengedit detail buku yang sudah ditambahkan, seperti mengganti judul, penulis, tahun terbit, atau gambar sampul.
   - **Metode**: `PUT`
   - **Deskripsi**: Data buku yang dipilih akan diperbarui dan disimpan kembali ke dalam `localStorage`. Setelah edit, daftar buku yang ada akan diperbarui.

   #### Contoh Request:
   ```json
   PUT /books/{id}
   {
     "title": "Learning React Updated",
     "author": "Alex Banks Updated",
     "year": "2020",
     "cover": "https://example.com/updated-cover.jpg"
   }
   ```

   #### Contoh Response:
   ```json
   {
     "status": "success",
     "message": "Buku berhasil diperbarui!"
   }
   ```

### 4. **Hapus Buku (DELETE)**
   - **Fungsi**: Pengguna dapat menghapus buku yang ada dari daftar buku.
   - **Metode**: `DELETE`
   - **Deskripsi**: Buku yang dihapus akan dihapus dari `localStorage`, dan daftar buku yang ada akan diperbarui.

   #### Contoh Request:
   ```json
   DELETE /books/{id}
   ```

   #### Contoh Response:
   ```json
   {
     "status": "success",
     "message": "Buku berhasil dihapus!"
   }
   ```

### 5. **Favorit Buku**
   - **Fungsi**: Pengguna dapat menambahkan buku ke dalam daftar favorit dengan menekan tombol **Favorit** pada buku tersebut.
   - **Metode**: Tidak ada request eksternal, karena data favorit disimpan di `localStorage`.



### Penjelasan:
1. **GET**: Digunakan untuk pencarian buku. Aplikasi mengirimkan request ke Google Books API untuk mendapatkan daftar buku berdasarkan kata kunci yang dimasukkan oleh pengguna.
2. **POST**: Digunakan untuk menambahkan buku baru ke daftar buku lokal pengguna.
3. **PUT**: Digunakan untuk memperbarui data buku yang sudah ada (misalnya mengedit judul, penulis, tahun terbit).
4. **DELETE**: Digunakan untuk menghapus buku dari daftar.

