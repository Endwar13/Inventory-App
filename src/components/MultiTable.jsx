export function ItemCost({ item }) {
    return (
        <>
            <div className="overflow-hidden w-[50%] h-full  rounded-box border border-black bg-slate-300">
                <table className="table table-zebra  w-full ">
                    {/* head */}
                    <thead className="bg-sky-300 text-black">
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                    </tr>
                    </thead>
                    <tbody>
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
        <div className="overflow-hidden w-[50%] h-full rounded-box border border-black bg-slate-300">
            <table className="table table-zebra w-full ">
                {/* head */}
                <thead className="bg-sky-300 text-black">
                    <tr>
                        <th>Nama</th>
                        <th>Harga Total</th>
                    </tr>
                </thead>
                <tbody>
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