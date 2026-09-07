// App.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "./components/Sidebar.jsx";
import Homepage from "./Homepage.jsx";
import InputPage from "./InputPage.jsx";
import Historypage from "./HistoryPage.jsx";  

// 1. Buat komponen sederhana untuk masing-masing halaman

function App() {
  // 2. Pindahkan state ke App.jsx sebagai "sumber kebenaran" (source of truth)
  const [currentTab, setCurrentTab] = useState("home");

  // 3. Fungsi Logika untuk menentukan halaman mana yang muncul
  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <Homepage />;
      case "InputData":
        return <InputPage />;
      case "StorageData":
        return <Historypage/>;   
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
     <aside className="fixed top-0 left-0 z-50">
      <SideBar activeTab={currentTab} setActiveTab={setCurrentTab} />
    </aside>
          <main className="pl-64 min-h-screen p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab} // KUNCI PENTING: Memberi tahu Framer Motion bahwa ini elemen baru
            initial={{ opacity: 0, y: 20 }} // Posisi awal sebelum muncul
            animate={{ opacity: 1, y: 0 }}  // Posisi saat muncul di layar
            exit={{ opacity: 0, y: -20 }}   // Posisi saat akan menghilang
            transition={{ duration: 0.2 }}  // Kecepatan animasi
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>


    </div>
  );
}

export default App;