import { useData } from '../hooks/useData.js';

export function Stat() {
  const { items, loading } = useData();

  if (loading) return <div className="skeleton h-32 w-32"></div>;

  // Mengamankan items agar tidak pernah null/undefined
  const dataItems = items || [];

  // Hitung total unit barang
  const totalTersedia = dataItems.reduce((total, item) => total + (Number(item.Jumlah) || 0), 0);

  // Hitung total nilai aset (Harga x Jumlah)
  const totalAset = dataItems.reduce(
    (total, item) => total + (Number(item.Harga) || 0) * (Number(item.Jumlah) || 0),
    0
  );

  return (
    <div className="stats shadow-sm border border-zinc-200 w-full bg-white">
      <div className="stat border-r border-zinc-200">
        <div className="stat-figure text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-zinc-500 font-medium">Total Jenis Barang</div>
        <div className="stat-value text-zinc-900">{dataItems.length}</div>
      </div>

      <div className="stat border-r border-zinc-200">
        <div className="stat-figure text-indigo-600"></div>
        <div className="stat-title text-zinc-500 font-medium">Total Unit Tersedia</div>
        <div className="stat-value text-zinc-900">{totalTersedia}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-zinc-500 font-medium">Total Aset</div>
        <div className="stat-value text-zinc-900">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAset)}
        </div>
      </div>
    </div>
  );
}
export function TabelStat() {
  // Panggil items dan loading langsung dari custom hook
  const { items, loading } = useData();

  if (loading) return <div className="skeleton h-32 w-auto"></div>;

  // Proteksi jika items bernilai null atau undefined agar tidak crash
  const dataItems = items || [];

  return (
    <div className="bg-white border border-zinc-200 overflow-x-auto rounded-xl">
      <table className="table  w-full rounded">
        {/* head */}
        <thead className="bg-zinc-50 text-zinc-600 font-medium border-b border-zinc-200">
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Jenis</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody className="text-zinc-700 bg-white">
          {dataItems.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.Nama}</td>
              <td>{item.Jenis}</td>
              <td className="text-left">
                {item.Jumlah} {item.Satuan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


