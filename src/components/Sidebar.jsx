import { motion } from "framer-motion";

function SideBar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "home", label: "Data Inventory" },
    { id: "InputData", label: "Input Data" },
    {id: "StorageData", label:"Data History"}
  ];

  return (
    // Menggunakan justify-start dan gap-4 agar item tersusun rapi dari atas
    <div className="flex h-screen w-64 flex-col justify-start gap-4 bg-zinc-900 p-2 shadow-lg text-zinc-100">
      <div className="card hover-3d w-full flex mx-none flex-row gap-5 cursor-pointer  p-4 text-center text-lg bg-zinc-800 font-bold text-white shadow-sm border border-zinc-700">
        <img className=" h-6 w-6" src="./public/Inventory.svg" alt="Logo" />
        <span>Inventory App</span>
      </div>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            // Melebarkan w-full agar tombol memenuhi area lebar sidebar
            className={`relative w-full h-12 flex items-center px-4 rounded-xl transition-colors duration-200 ${
              isActive ? "text-zinc-950 font-semibold" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-dock-pill"
                className="absolute inset-0 bg-lime-400 rounded-xl z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <motion.div
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative z-10 flex items-center gap-3"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}


export default SideBar;