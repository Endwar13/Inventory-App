# Inventory App Documentation

## Tech Stack

1. React js (no Typescript)
2. Daisy UI
3. Supabase  as Cloud Database

Tabel Name=

- Daftar-Barang : Tabel Utama untuk data nama, jenis, harga satuan, jumlah total, jumlah tersedia
- Tabel-Riwayat: Tabel Log peminjaman barang dari inventory  => Berelasi dengan 'Daftar-Barang'. Jumlah yang dipinjam mengurangi jumlah yang tersedia namun tidak mengurangi jumlah total.

## Fitur Penyimpanan Barang (Register Barang baru)

User dapat menginput data diawal untuk register barang baru, bila barang sudah ada tapi terjadi penambahan, user dapat melakukan penambahan.

Note: Fitur Update Belum tersedia, Baru mendukung fitur Create and Read.

Proses pembacaan data dan pengiriman data dilakukan dengan memanggil fungsi dan costum hooks dari file useData.js dan useRiwayat.js

`const { items, loading } = useData();`

Untuk membaca data dari hooks useData dan memanggil semua item dari tabel data di supabase
Tambahkan  baris kode

`const { tambahBarang, loading } = useData();`

Untuk mengirim data melalui form di awal fungsi dengan struktur `const {namaFungsi} = namaHooks`

Detail dan dokumenatsi dari alur data dan custom hooks untuk supabase ditulis di file hooks masing masing menggunakan JSDoc.


