import { useState } from "react";
import { useData } from "../hooks/useData"; // Ambil data barang untuk dropdown
import { useRiwayat } from "../hooks/useRiwayat"; // Ambil fungsi riwayat

export function InputPinjamForm() {
    // Ambil data barang dan beri nama alias "listBarang" agar tidak bingung
    const { items: listBarang } = useData(); 
    
    // Ambil fungsi insert dan status loading dari hook riwayat
    const { tambahRiwayat, loading } = useRiwayat();

    // State lokal khusus untuk menangani input form
    const [nama, setNama] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [waktu, setWaktu] = useState('');
    const [status, setStatus] = useState('');

    const handleTambahData = async (e) => {
        e.preventDefault();
        
        // Kirim data ke hook useRiwayat
        const berhasil = await tambahRiwayat({ nama, jumlah, waktu, status });
        
        // Jika berhasil disimpan, reset isi form
        if (berhasil) {
            setNama('');
            setJumlah('');
            setStatus('');
            setWaktu('');
        }
    };

    return (
        <section className="card card-xl m-5 shadow-4 card-border rounded-box bg-indigo-300">
            <div className="card-body p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Tambah Peminjaman Baru</h2>
                <form onSubmit={handleTambahData} className="space-y-4">
                    <div>
                        <label htmlFor="waktu" className="block text-sm font-medium mb-1">Waktu Dipinjam</label>
                        <input
                            type="date"
                            id="waktu"
                            required
                            value={waktu}
                            onChange={(e) => setWaktu(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="nama" className="block text-sm font-medium mb-1">Nama Peminjam/Barang</label>
                        <select
                            id="nama"
                            required
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="" disabled>Pilih Nama</option>
                            {/* Gunakan listBarang dari useData() untuk mengisi opsi dropdown */}
                            {(listBarang || []).map((item, index) => (
                                <option key={item.id || index} value={item.Nama}>
                                    {item.Nama}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="jumlah" className="block text-sm font-medium mb-1">Jumlah</label>
                        <input
                            type="number"
                            id="jumlah"
                            required
                            placeholder="Min: 1"
                            value={jumlah}
                            onChange={(e) => setJumlah(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                        <select
                            id="status"
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select w-full border rounded px-3 py-2"
                        >
                            <option value="" disabled>Pilih Status</option>
                            <option value="Dipinjam">Dipinjam</option>
                            <option value="Dikembalikan">Dikembalikan</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
                    >
                        {loading ? 'Menyimpan...' : 'Tambah Data'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export function TableHistory() {
    // Panggil data riwayat dan loading dari hook useRiwayat
    const { riwayat, loading } = useRiwayat();

    if (loading) return <div className="skeleton h-32 w-auto m-5"></div>;

    // Pastikan array selalu valid untuk mencegah error mapping
    const dataRiwayat = riwayat || [];

    return (
        <div className="bg-slate-300 border rounded overflow-x-auto m-5">
            <table className="table w-full rounded">
                <thead className="bg-sky-300 text-black">
                    <tr>
                        <th>No</th>
                        <th>Waktu</th>
                        <th>Nama</th>
                        <th>Jumlah</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Looping menggunakan dataRiwayat yang otomatis diperbarui */}
                    {dataRiwayat.map((item, index) => (
                        <tr key={item.id || index}>
                            <td>{index + 1}</td>
                            <td>{item.Waktu_Dipinjam}</td>
                            <td>{item.Nama_Barang}</td>
                            <td>{item.Jumlah_pinjam}</td>
                            <td className="text-left">{item.Status_pinjam}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}