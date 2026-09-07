import { useState } from "react";
import { useData } from "../hooks/useData"; // Ambil data barang untuk dropdown

function InputPinjamForm() {
  const { tambahBarang, loading } = useData();

  // 2. State lokal khusus untuk menangani input form
  const [nama, setNama] = useState('');
  const [jenis, setJenis] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [satuan, setSatuan] = useState('');
  const [harga, setHarga] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. Panggil fungsi tambahBarang dari hook dan kirim objek data
    const success = await tambahBarang({
      nama,
      jenis,
      jumlah,
      satuan,
      harga
    });

    // Reset Input Form jika berhasil menambahkan data
    if (success) {
      setNama('');
      setJenis('');
      setJumlah('');
      setSatuan('');
      setHarga('');
    }
  };

  return (
    <>
    <section className="card card-xl m-5 shadow-4 card-border rounded-box bg-indigo-300">
        <div className="card-body p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Tambah Barang Baru</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium mb-1">Nama Barang</label>
              <input
                type="text"
                id="nama"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="jenis" className="block text-sm font-medium mb-1">Jenis</label>
              <select 
                id="jenis"
                required
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                defaultValue="Pick a color" 
                className="select w-full border rounded px-3 py-2">
                     <option value="" disabled selected>Select a Type</option>
                    <option value="Komponen">Komponen</option>
                    <option value="Tools">Tools</option>
                    <option value="Controller">Controller</option>
                    <option value="Electronics & Pneumatic">Electronics & Pneumatic</option>
            </select>
              
            </div>
            <div>
              <label htmlFor="jumlah" className="block text-sm font-medium mb-1">Jumlah</label>
              <input
                type="number"
                id="jumlah"
                required
                placeholder="Min: 1"
                defaultValue={"Komponen"}
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
                <label htmlFor="satuan" className="block text-sm font-medium mb-1">Satuan</label>
                <input type="text" 
                id="satuan" 
                className="input w-full border rounded px-3 py-2" 
                placeholder="Contoh: pcs, unit, kg" 
                value={satuan}
                onChange={(e) => setSatuan(e.target.value) }
                required
                />
            </div>
            <div>
                <label htmlFor="harga" className="block text-sm font-medium mb-1">Harga</label>
                <input type="text" 
                id="harga" 
                className="input w-full border rounded px-3 py-2" 
                placeholder="Contoh: 50000" 
                value={harga}
                onChange={(e) => setHarga(e.target.value) }
                required
                />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              {loading ? 'Menambahkan...' : 'Tambah Data'}
            </button>
          </form>
        </div>
    </section>
    </>

  )}

  export default InputPinjamForm;