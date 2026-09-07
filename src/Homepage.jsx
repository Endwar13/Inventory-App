import {Stat, TabelStat} from "./components/Stat.jsx";
import { ItemCost, TotalItemCost } from "./components/MultiTable.jsx"; 
import { useData } from './hooks/useData.js';


function HomePage() {
const { items, loading } = useData();

  if (loading) return <div className="skeleton h-32 w-auto"></div>;

  // Proteksi jika items bernilai null atau undefined agar tidak crash
  const dataItems = items || [];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center m-4 shadow rounded ">
        <Stat />
      </div>
      <span className="flex items-center justify-content border-b-2 border-neutral-800 p-2 mx-2 text-xl font-[Plus Jakarta Sans]"> Tabel Item</span>
      <div className="card overflow-hidden m-2 shadow-4  border rounded-12">
       
        <TabelStat />
      </div>
      <span className="flex items-center justify-content border-b-2 border-neutral-800 p-2 mx-2 text-xl"> General Data </span>

      <div className="card-body  w-full flex flex-row p-2 gap-6 items-center justify-content">
        <ItemCost item={dataItems}/>
        <TotalItemCost item={dataItems}/>
      </div>
    </div>
    
  )}

  export default HomePage;