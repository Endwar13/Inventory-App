// src/hooks/useData.js
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient'; // Memanggil instance Supabase dari file konfigurasi

export function useData() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Set default loading ke true

  // Fungsi khusus untuk refetch/panggil manual (misal setelah tambah data)
  const fetchBarang = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Daftar-Barang') //Melakukan query ke tabel 'Daftar-Barang'
      .select('*'); //Memilih semua kolom dari tabel

    if (error) {
      console.error('Error saat mengambil data:', error.message);
    } else {
      setItems(data); //Memperbarui state items dengan data yang diambil dari Supabase
    }
    setLoading(false);
  }, []);

  // Fetch pertama kali tanpa memanggil setLoading(true) secara synchronous di Effect
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      const { data, error } = await supabase
        .from('Daftar-Barang')
        .select('*');

      if (!isMounted) return;

      if (error) {
        console.error('Error saat mengambil data:', error.message);
      } else {
        setItems(data);
      }
      setLoading(false);
    }

    loadInitialData();

    return () => {
      isMounted = false; // Cleanup untuk mencegah memory leak
    };
  }, []);

  // Fungsi untuk menambah data
  const tambahBarang = async (barangBaru) => {
    setLoading(true);
    const { error } = await supabase
      .from('Daftar-Barang')
      .insert([
        {
          // Memasukkan data baru ke dalam tabel 'Daftar-Barang'
          // Format: Nama_Tabel: value variable
          Nama: barangBaru.nama,
          Jenis: barangBaru.jenis,
          Jumlah: parseInt(barangBaru.jumlah), 
          Satuan: barangBaru.satuan,
          Harga: parseInt(barangBaru.harga)
        }
      ]);

    if (error) {
      console.error('Gagal menambahkan data:', error.message);
      alert('Gagal menambah data: ' + error.message);
      setLoading(false);
      return false;
    } else {
      alert('Data berhasil ditambahkan!');
      await fetchBarang(); // Memanggil ulang data setelah insert
      return true;
    }
  };
  // Nilai yang dikembalikan dari hook ini, termasuk items, loading, dan fungsi tambahBarang serta fetchBarang
  return { items, loading, tambahBarang, fetchBarang };
}
/** 
 * Contoh Penggunaan di Komponen:
 * import { useData } from '../hooks/useData.js'; untuk memanggil custom hook

 * const { items, loading } = useData(); tambahkan baris ini untuk memanggil fungsi atau item dari hooks yang digunakan di komponen
 * 
 * const { tambahBarang, loading } = useData(); Gunakan baris ini di komponen untuk memanggil fungsi tambahBarang dari hook useData
 * fungsi tambahBarang digunakan untuk menambahkan data baru ke tabel 'Daftar-Barang' di Supabase.
 * 
 * Gunakan Baris berikut untuk menghubungkan value input form dengan state lokal di komponen:
 * const [nama, setNama] = useState(''); // Nama state lokal harus sesuai dengan nama properti yang akan dikirim ke fungsi tambahBarang //
 * const [jenis, setJenis] = useState('');
 * const [jumlah, setJumlah] = useState('');
 * const [satuan, setSatuan] = useState('');
 * const [harga, setHarga] = useState('');
 * 
 * Gunakan fungsi berikut untuk mengirim data dari form ke fungsi tambahBarang:
 * const handleSubmit = async (e) => {
    e.preventDefault();
    // Parameter dari fungsi tambahBarang diisi dengan objek yang berisi data dari state lokal
    const success = await tambahBarang({
      nama,
      jenis,
      jumlah,
      satuan,
      harga
    });

    // Reset Input Form jika berhasil menambahkan data berdasarkan dari output variabel success (true/false) dari fungsi tambahBarang
    if (success) {
      setNama('');
      setJenis('');
      setJumlah('');
      setSatuan('');
      setHarga('');
    }
  };
 * items: array berisi data barang dari Supabase.
 * loading: boolean untuk menandai status loading data.
 * tambahBarang: fungsi untuk menambahkan data baru ke tabel 'Daftar-Barang'.
 * fetchBarang: fungsi untuk memanggil ulang data dari Supabase secara manual.
 * 
 * Fungsi fetchBarang dapat dipanggil secara manual jika ingin melakukan refetch data setelah operasi tertentu.


 */
