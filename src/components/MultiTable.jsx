export function ItemCost({ item }) {
    return (
        <>
            <div className="overflow-hidden w-[50%] h-full  rounded-box border border-zinc-200 bg-white">
                <table className="table  w-full ">
                    {/* head */}
                    <thead className="bg-zinc-50 text-zinc-600 font-medium border-b border-zinc-200">
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                    </tr>
                    </thead>
                    <tbody className="text-zinc-700 bg-white">
                    {item.map((item, index) => (
                        <tr key={item.id || index}>
                            <td>{item.Nama}</td>
                            <td>Rp. {item.Harga}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export function TotalItemCost({ item }) {
    return (
        <div className="overflow-hidden w-[50%] h-full rounded-box border border-zinc-200 bg-white">
            <table className="table w-full ">
                {/* head */}
                <thead className="bg-zinc-50 text-zinc-600 font-medium border-b border-zinc-200">
                    <tr>
                        <th>Nama</th>
                        <th>Harga Total</th>
                    </tr>
                </thead>
                <tbody className="text-zinc-700 bg-white">
                    {Array.isArray(item) && item.map((singleItem, index) => {
                        // Hitung total cost untuk setiap objek di dalam array
                        const jumlah = parseInt(singleItem.Jumlah) || 0;
                        const harga = parseInt(singleItem.Harga) || 0;
                        const totalCost = jumlah * harga;

                        return (
                            <tr key={singleItem.id || index}>
                                <td>{singleItem.Nama}</td>
                                <td>Rp. {totalCost}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}