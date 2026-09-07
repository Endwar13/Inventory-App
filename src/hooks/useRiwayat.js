// src/hooks/useRiwayat.js
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useRiwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true); // Default sudah true

  // Fungsi khusus untuk refetch/panggil manual (misal setelah insert data)
  const fetchRiwayat = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('Tabel-Riwayat').select('*');
    
    if (error) {
      console.error('Error fetch riwayat:', error.message);
    } else {
      setRiwayat(data);
    }
    setLoading(false);
  }, []);

  // Fetch pertama kali tanpa memicu rendering ganda
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      const { data, error } = await supabase.from('Tabel-Riwayat').select('*');
      
      if (!isMounted) return;

      if (error) {
        console.error('Error load awal riwayat:', error.message);
      } else {
        setRiwayat(data);
      }
      setLoading(false); // Mematikan loading hanya saat data sudah siap
    }

    loadInitialData();

    return () => {
      isMounted = false; // Cleanup untuk mencegah memory leak
    };
  }, []);

  const tambahRiwayat = async (dataBaru) => {
    setLoading(true);
    const { error } = await supabase.from('Tabel-Riwayat').insert([{
      Nama_Barang: dataBaru.nama,
      Jumlah_pinjam: parseInt(dataBaru.jumlah),
      Status_pinjam: dataBaru.status,
      Waktu_Dipinjam: dataBaru.waktu
    }]);

    if (error) {
      alert('Gagal menambah data: ' + error.message);
      setLoading(false);
      return false;
    } else {
      alert('Data berhasil ditambahkan!');
      await fetchRiwayat(); // Update tabel otomatis setelah insert
      return true;
    }
  };

  return { riwayat, loading, tambahRiwayat };
}

/**
 * Custom Hooks useRiwayat Digunakan untuk melakukan operasi CRUD pada tabel 'Tabel-Riwayat' di Supabase.
 * 
 * Penggunaannya memiliki cara yang mirip dengan useData, termasuk state riwayat, loading, dan fungsi tambahRiwayat.
 * 
 * Contoh penggunaan:
 * const { riwayat, loading, tambahRiwayat } = useRiwayat();
 * 
 * - riwayat: array berisi data riwayat dari Supabase.
 * - loading: boolean untuk menandai status loading data.
 * - tambahRiwayat: fungsi untuk menambahkan data baru ke tabel riwayat.
 * 
 * Parameter dari fungsi tambahRiwayat disesuaikan dengan nama kolom di Tabel-Riwayat yaitu:
 * - Nama_Barang
 * - Jumlah_pinjam
 * - Status_pinjam
 * - Waktu_Dipinjam
 * 
 * Data yang dikirimkan ke fungsi tambahRiwayat harus berupa object dengan properti-properti tersebut.
 * Format data yang dikirimkan ke fungsi tambahRiwayat adalah: { nama, jumlah, waktu, status }.
 * 
 * Fungsi fetchRiwayat dapat dipanggil secara manual jika ingin melakukan refetch data setelah operasi tertentu.
 */