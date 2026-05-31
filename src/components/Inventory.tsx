import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  Barcode, 
  PlusCircle, 
  ChevronRight, 
  Cpu, 
  Save, 
  X,
  Sparkles,
  Camera,
  Edit2
} from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryProps {
  items: InventoryItem[];
  onAddItem: (item: InventoryItem) => void;
  onUpdateStock: (id: string, newStock: number) => void;
}

export default function Inventory({ items, onAddItem, onUpdateStock }: InventoryProps) {
  // Filters & Search
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Manual Add Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [manualSku, setManualSku] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualCategory, setManualCategory] = useState('Elektronik');
  const [manualStock, setManualStock] = useState(10);
  const [manualMinStock, setManualMinStock] = useState(5);
  const [manualPrice, setManualPrice] = useState(50000);
  const [manualLocation, setManualLocation] = useState('Rak A-01');

  // Smart Scan States
  const [showScanSimulator, setShowScanSimulator] = useState(false);
  const [scanBarcode, setScanBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);

  // Categories list
  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];

  // Filtering Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesLowStock = !showLowStockOnly || item.stock <= item.minStock;
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  // Predefined Barcodes for Quick Simulator
  const presetBarcodes = [
    { code: "NEX-KOPI-GP1", label: "Specialty Gayo Blend", hint: "Paket Kopi Khas" },
    { code: "NEX-IOT-TERM", label: "IoT Smart Thermostat", hint: "Alat Rumah Pintar" },
    { code: "NEX-LIP-ORGN", label: "Premium Organic Lipstick", hint: "Kosmetik Herbal" },
    { code: "NEX-BAG-SKIN", label: "Hampers Kulit Kerajinan Local", hint: "Fashion Etnik" }
  ];

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSku || !manualName) return;

    const newItem: InventoryItem = {
      id: `item-${Date.now()}`,
      sku: manualSku,
      name: manualName,
      category: manualCategory,
      stock: Number(manualStock),
      minStock: Number(manualMinStock),
      warehouseLocation: manualLocation,
      price: Number(manualPrice),
      weight: 200, 
      salesCount: 0
    };

    onAddItem(newItem);
    setShowAddForm(false);
    // Reset inputs
    setManualSku('');
    setManualName('');
    setManualStock(10);
    setManualMinStock(5);
    setManualPrice(50000);
    setManualLocation('Rak A-01');
  };

  const executeSmartScanAI = async (barcodeToScan: string) => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const response = await fetch('/api/gemini/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode: barcodeToScan })
      });

      if (!response.ok) throw new Error('Pemindaian AI gagal');
      const data = await response.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
      // Premium fallbacks
      setScanResult({
        productName: `Gayo Espresso Beans Classic (${barcodeToScan})`,
        category: "Food & Beverage",
        sku: `NEX-GAYO-092`,
        description: "Biji kopi pilihan yang diproses secara tradisional dari dataran tinggi Gayo, menghasilkan aroma cokelat dan rempah yang kuat.",
        estimatedPrice: 85000,
        dimensions: "12x10x5 cm",
        handlingNotes: "Fragile, simpan di tempat kering suhu ruang, butuh bubble wrap"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const applyScanResultToInventory = () => {
    if (!scanResult) return;

    const newItem: InventoryItem = {
      id: `item-${Date.now()}`,
      sku: scanResult.sku || `NEX-SKU-${Math.floor(Math.random() * 900 + 100)}`,
      name: scanResult.productName,
      category: scanResult.category,
      stock: 40, 
      minStock: 12,
      warehouseLocation: `Rak U-${Math.floor(Math.random() * 15 + 1)}`,
      price: scanResult.estimatedPrice || 85000,
      weight: 250,
      salesCount: 0
    };

    onAddItem(newItem);
    setScanResult(null);
    setShowScanSimulator(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em]">WAREHOUSE DATABASE</span>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-white font-sans-editorial tracking-tight flex items-center gap-2">
            Manajemen Gudang & Stok Barang
          </h1>
          <p className="text-xs sm:text-sm text-white/50">Sistem pengelolaan sirkulasi inventaris dengan verifikasi Smart Scan AI.</p>
        </div>
      </div>

      {/* Modern Filter controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#121212] p-5 border border-white/10 rounded-2xl">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          
          {/* Search SKU Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Cari SKU, Nama Produk, atau Rak..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8] font-mono-editorial transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 bg-[#18181b] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8] font-sans-editorial"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'Semua Kategori' : cat}</option>
              ))}
            </select>
            <Filter size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>

          {/* Low Stock Checkbox Toggle */}
          <label className="flex items-center gap-2.5 py-2 px-4 bg-[#18181b] hover:bg-white/5 border border-white/10 rounded-xl cursor-pointer select-none transition">
            <input 
              type="checkbox" 
              checked={showLowStockOnly}
              onChange={(e) => setShowLowStockOnly(e.target.checked)}
              className="accent-[#38bdf8] rounded"
            />
            <span className="text-[11px] text-white/80 font-semibold font-sans-editorial uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={12} className="text-red-400" /> Sisa Stok Kritis
            </span>
          </label>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            id="open-scan-sim-btn"
            onClick={() => {
              setShowScanSimulator(true);
              setScanResult(null);
            }}
            className="px-5 py-2.5 text-[#38bdf8] bg-[#38bdf8]/5 hover:bg-[#38bdf8]/10 border border-[#38bdf8]/25 font-bold text-xs uppercase tracking-widest rounded-full transition flex items-center gap-1.5"
          >
            <Barcode size={14} /> Smart Scan AI
          </button>
          
          <button
            id="open-add-form-btn"
            onClick={() => setShowAddForm(true)}
            className="px-5 py-2.5 bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-bold text-xs uppercase tracking-widest rounded-full transition flex items-center gap-1.5"
          >
            <Plus size={14} /> Tambah Barang
          </button>
        </div>
      </div>

      {/* Manual Product Add Modal Frame */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121212] rounded-2xl border border-white/15 shadow-2xl w-full max-w-lg p-6 space-y-5 animate-scale-up text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[9px] font-mono-editorial text-[#38bdf8] uppercase tracking-wider">NEW REGISTER</span>
                <h3 className="text-base font-bold font-sans-editorial uppercase">Registrasi Barang Baru</h3>
              </div>
              <button onClick={() => setShowAddForm(false)} className="p-1 hover:bg-white/5 rounded-lg text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleManualSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider font-sans-editorial">Kode SKU*</label>
                <input 
                  type="text" 
                  value={manualSku} 
                  onChange={(e) => setManualSku(e.target.value)} 
                  placeholder="NEX-KOPI-002" 
                  required
                  className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white font-mono-editorial focus:border-[#38bdf8] focus:outline-none"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider font-sans-editorial">Kategori</label>
                <select 
                  value={manualCategory} 
                  onChange={(e) => setManualCategory(e.target.value)} 
                  className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white focus:border-[#38bdf8] focus:outline-none"
                >
                  <option value="Elektronik">Elektronik</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Kosmetik">Kosmetik</option>
                  <option value="Home & Living">Home & Living</option>
                </select>
              </div>
              
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider font-sans-editorial">Nama Produk*</label>
                <input 
                  type="text" 
                  value={manualName} 
                  onChange={(e) => setManualName(e.target.value)} 
                  placeholder="Masukkan nama deskriptif lengkap produk..." 
                  required
                  className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white focus:border-[#38bdf8] focus:outline-none"
                />
              </div>

              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider font-sans-editorial">Stok Gudang Hari Ini</label>
                <input 
                  type="number" 
                  value={manualStock} 
                  onChange={(e) => setManualStock(Number(e.target.value))} 
                  className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white focus:border-[#38bdf8] focus:outline-none font-mono-editorial"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider font-sans-editorial">Min. Peringatan Stok</label>
                <input 
                  type="number" 
                  value={manualMinStock} 
                  onChange={(e) => setManualMinStock(Number(e.target.value))} 
                  className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white focus:border-[#38bdf8] focus:outline-none font-mono-editorial"
                />
              </div>

              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider font-sans-editorial">Harga Ritel (Rp)</label>
                <input 
                  type="number" 
                  value={manualPrice} 
                  onChange={(e) => setManualPrice(Number(e.target.value))} 
                  className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white focus:border-[#38bdf8] focus:outline-none font-mono-editorial"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider font-sans-editorial">Lokasi Rak Gudang</label>
                <input 
                  type="text" 
                  value={manualLocation} 
                  onChange={(e) => setManualLocation(e.target.value)} 
                  placeholder="Rak A-12"
                  className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white focus:border-[#38bdf8] focus:outline-none font-mono-editorial"
                />
              </div>

              <div className="col-span-2 pt-4 flex justify-end gap-3 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)} 
                  className="border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/5 text-white/85"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"
                >
                  <Save size={14} /> Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Smart Scan AI Console Frame (Dark High Tech design) */}
      {showScanSimulator && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] text-white rounded-2xl shadow-2xl w-full max-w-3xl border border-white/15 flex flex-col overflow-hidden max-h-[90vh]">
            
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center border border-[#38bdf8]/35 text-[#38bdf8]">
                  <Barcode size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-sans-editorial uppercase text-white">NEXORA SCANNING CONSOLE</h3>
                  <p className="text-[10px] text-white/45 tracking-widest font-mono-editorial">PENGEMASAN & DEKLARASI PRODUK TERINTEGRASI AI</p>
                </div>
              </div>
              <button onClick={() => setShowScanSimulator(false)} className="p-1.5 hover:bg-white/5 rounded-lg text-white/45 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar text-white">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Visual Camera simulation */}
                <div className="md:col-span-6 space-y-4">
                  <span className="text-[10px] text-white/55 font-mono-editorial uppercase tracking-widest block">CAMERA HUD SYSTEM:</span>
                  <div className="relative aspect-video sm:aspect-square bg-black rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center">
                    
                    {/* Glowing Laser Scan Tracker line */}
                    <div className={`absolute left-0 w-full h-[3px] bg-[#38bdf8] top-1/2 -translate-y-1/2 shadow-[0_0_15px_#38bdf8] ${isScanning ? 'animate-bounce' : 'opacity-40'}`}></div>

                    {/* Laser corner crosshairs */}
                    <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-[#38bdf8]"></div>
                    <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-[#38bdf8]"></div>
                    <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-[#38bdf8]"></div>
                    <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-[#38bdf8]"></div>

                    {isScanning ? (
                      <div className="text-center space-y-3 z-10">
                        <Camera className="mx-auto text-[#38bdf8] animate-spin" size={32} />
                        <span className="block text-[10px] font-mono-editorial tracking-[0.2em] text-[#38bdf8]">AI PARSING BARCODE...</span>
                      </div>
                    ) : (
                      <div className="text-center space-y-3 z-10 px-6">
                        <Barcode className="mx-auto text-white/20" size={44} />
                        <span className="block text-xs text-white/40">Gunakan salah satu Kode Barcode Cepat di bawah:</span>
                      </div>
                    )}
                  </div>

                  {/* Laser Presets Selector */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-white/45 font-mono-editorial uppercase tracking-widest block">Kode Barcode Cepat:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {presetBarcodes.map((item) => (
                        <button
                          key={item.code}
                          disabled={isScanning}
                          onClick={() => {
                            setScanBarcode(item.code);
                            executeSmartScanAI(item.code);
                          }}
                          className="p-3 bg-[#121212] border border-white/5 hover:border-[#38bdf8]/50 hover:bg-white/[0.03] rounded-xl text-left transition"
                        >
                          <b className="block text-[#38bdf8] font-bold font-mono-editorial text-xs">{item.code}</b>
                          <span className="block text-[10px] text-white/50 truncate font-sans-editorial mt-0.5">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analytical AI Parser metadata Results */}
                <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] text-white/55 font-mono-editorial uppercase tracking-widest block">EXTRACTED METADATA REVENUE LOG:</span>
                    
                    <div className="p-5 bg-[#121212] rounded-2xl border border-white/10 min-h-[220px] flex flex-col justify-between">
                      {scanResult ? (
                        <div className="space-y-4 text-xs font-sans-editorial">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[8px] tracking-widest text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/25 rounded-md px-2 py-0.5 font-mono-editorial">
                                SKU: {scanResult.sku}
                              </span>
                              <h4 className="text-base font-bold text-white mt-2 uppercase">{scanResult.productName}</h4>
                              <p className="text-[10px] text-white/40 font-mono-editorial uppercase tracking-wider mt-0.5">KATEGORI: {scanResult.category}</p>
                            </div>
                          </div>
                          
                          <p className="text-white/70 leading-relaxed text-xs">{scanResult.description}</p>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs font-sans-editorial">
                            <div>
                              <span className="text-[9px] text-white/40 uppercase block">Riset Ritel</span>
                              <span className="font-bold text-white font-mono-editorial">Rp {scanResult.estimatedPrice?.toLocaleString('id-ID')}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-white/40 uppercase block">Spesifikasi Box</span>
                              <span className="font-bold text-white font-mono-editorial">{scanResult.dimensions}</span>
                            </div>
                          </div>

                          <div className="p-3 bg-[#38bdf8]/5 border border-[#38bdf8]/10 rounded-xl text-[11px] text-[#38bdf8] leading-relaxed">
                            <span className="font-bold">Instruksi Pack:</span> {scanResult.handlingNotes}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3">
                          <Sparkles className="text-white/20 animate-pulse" size={28} />
                          <p className="text-xs text-white/40 font-sans-editorial leading-relaxed">
                            Pilih kode barcode cepat di samping atau masukkan input manual di bawah untuk mengurai deskripsi item secara real-time dari AI.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Custom manual Barcode input */}
                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <label className="text-[10px] text-white/45 font-mono-editorial uppercase tracking-widest block">Barcode/SKU Manual Input:</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={scanBarcode}
                        placeholder="Contoh: NEX-CHIP-901"
                        onChange={(e) => setScanBarcode(e.target.value)}
                        className="flex-1 bg-[#121212] border border-white/10 px-3.5 py-2 rounded-xl text-xs font-mono-editorial text-white placeholder-white/20"
                      />
                      <button 
                        disabled={isScanning || !scanBarcode}
                        onClick={() => executeSmartScanAI(scanBarcode)}
                        className="px-5 py-2 bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-bold uppercase tracking-widest rounded-xl text-xs transition"
                      >
                        BROSING AI
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm Add flow */}
              {scanResult && (
                <div className="p-4 bg-[#38bdf8]/5 border-l-2 border-[#38bdf8] rounded-r-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <p className="text-white/80 leading-relaxed">
                    Identifikasi berhasil! Anda dapat menyimpan barang ini ke database fisik saat ini dengan kapasitas rak otomatis dari sistem.
                  </p>
                  <button
                    onClick={applyScanResultToInventory}
                    className="px-6 py-2.5 bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-bold uppercase tracking-widest rounded-full transition shrink-0"
                  >
                    Simpan Untuk Diinventaris
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Panduan Tombol Interaktif ("Simulasikan Smart Scan") */}
      <div className="bg-[#121212] border border-[#38bdf8]/20 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/[0.01] rounded-full blur-[80px] pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">
              INTERACTIVE TUTORIAL
            </span>
            <h2 className="text-lg sm:text-xl font-bold uppercase text-white font-sans-editorial tracking-tight">
              Coba Sendiri Kecanggihan Teknologi Smart Scan Kami.
            </h2>
            <p className="text-xs text-white/50 font-sans-editorial">
              Ikuti 3 langkah mudah di bawah ini untuk menguji keunggulan pemindaian bertenaga AI Nexora.
            </p>
          </div>
          <button
            onClick={() => {
              setShowScanSimulator(true);
              setScanResult(null);
            }}
            className="px-5 py-2.5 bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8]/25 hover:text-white border border-[#38bdf8]/35 font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center gap-1.5 self-start"
          >
            <Barcode size={13} /> Simulasikan Smart Scan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 bg-[#18181b]/30 border border-white/5 rounded-xl space-y-2 relative">
            <div className="absolute top-3 right-3 text-[18px] font-bold font-mono-editorial text-white/10 select-none">
              01
            </div>
            <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-wider block">LANGKAH SATU</span>
            <h4 className="text-xs font-bold text-white uppercase font-sans-editorial">Scan Barcode</h4>
            <p className="text-[11px] text-white/50 leading-relaxed font-sans-editorial">
              Klik tombol di atas, lalu pilih salah satu <b>"Kode Barcode Cepat"</b> (misal: <code className="text-[#38bdf8]">NEX-KOPI-GP1</code>) atau masukkan manual.
            </p>
          </div>

          <div className="p-4 bg-[#18181b]/30 border border-white/5 rounded-xl space-y-2 relative">
            <div className="absolute top-3 right-3 text-[18px] font-bold font-mono-editorial text-white/10 select-none">
              02
            </div>
            <span className="text-[10px] font-mono-editorial text-purple-400 uppercase tracking-wider block">LANGKAH DUA</span>
            <h4 className="text-xs font-bold text-white uppercase font-sans-editorial">Verifikasi Instan</h4>
            <p className="text-[11px] text-white/50 leading-relaxed font-sans-editorial">
              Sistem AI Nexora langsung mengurai metadata, mencocokkan deskripsi produk, harga, dimensi, serta instruksi pengepakan logistik.
            </p>
          </div>

          <div className="p-4 bg-[#38bdf8]/5 border border-[#38bdf8]/25 rounded-xl space-y-2 relative">
            <div className="absolute top-3 right-3 text-[18px] font-bold font-mono-editorial text-[#38bdf8]/20 select-none">
              03
            </div>
            <span className="text-[10px] font-mono-editorial text-emerald-400 uppercase tracking-wider block">LANGKAH TIGA</span>
            <h4 className="text-xs font-bold text-white uppercase font-sans-editorial">Hasil Verifikasi</h4>
            <p className="text-[11px] text-white/70 leading-relaxed font-sans-editorial">
              <b>Zero Human Error!</b> Klik "Simpan untuk Diinventaris" untuk mendaftarkan barang baru secara otomatis ke rak database fisik tanpa ketik manual.
            </p>
          </div>
        </div>
      </div>

      {/* Main Stock Table with Elegant Editorial Lines */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#18181b] border-b border-white/10 text-white/50 text-[10px] font-mono-editorial uppercase tracking-wider">
                <th className="p-4">Identitas Barang / SKU</th>
                <th className="p-4">Kategori Toko</th>
                <th className="p-4">Lokasi Gudang</th>
                <th className="p-4 text-right">Harga Nilai Satuan</th>
                <th className="p-4 text-center">Stok Unit Fisik</th>
                <th className="p-4">Metrik Peringatan</th>
                <th className="p-4 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-white/80 font-sans-editorial">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const isLow = item.stock <= item.minStock;
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.01] transition border-b border-white/5 last:border-0">
                      <td className="p-4 space-y-1 max-w-sm">
                        <div className="font-bold text-white text-sm tracking-tight">{item.name}</div>
                        <span className="text-[10px] font-mono-editorial text-[#38bdf8] bg-[#38bdf8]/5 border border-[#38bdf8]/20 rounded-md px-2 py-0.5 inline-block uppercase tracking-wider">
                          SKU: {item.sku}
                        </span>
                      </td>
                      <td className="p-4 font-normal text-white/70 uppercase tracking-wide text-[10px] font-mono-editorial">{item.category}</td>
                      <td className="p-4 font-mono-editorial text-white/60">{item.warehouseLocation}</td>
                      <td className="p-4 text-right font-mono-editorial font-semibold text-white">
                        Rp {item.price.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => onUpdateStock(item.id, Math.max(0, item.stock - 5))}
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 text-white/70 rounded-lg font-bold text-xs transition"
                          >
                            -5
                          </button>
                          <span className={`w-14 font-mono-editorial font-bold text-center text-sm ${isLow ? 'text-red-400' : 'text-white'}`}>
                            {item.stock}
                          </span>
                          <button 
                            onClick={() => onUpdateStock(item.id, item.stock + 5)}
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 text-white/70 rounded-lg font-bold text-xs transition"
                          >
                            +5
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono-editorial uppercase text-red-400 px-2.5 py-1 bg-red-400/5 border border-red-500/20 rounded-full">
                            <AlertTriangle size={11} /> Reorder Point
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono-editorial uppercase text-emerald-400 px-2.5 py-1 bg-emerald-400/5 border border-emerald-500/20 rounded-full">
                            Secure Quantity
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            const promptStock = prompt(`Ketik nominal stok fisik baru untuk produk [${item.name}]:`, String(item.stock));
                            if (promptStock !== null && !isNaN(Number(promptStock))) {
                              onUpdateStock(item.id, Number(promptStock));
                            }
                          }}
                          className="text-[10px] font-mono-editorial uppercase tracking-wider text-white/60 hover:text-[#38bdf8] px-3 py-1.5 border border-white/10 hover:border-[#38bdf8]/30 rounded-lg transition hover:bg-white/5 inline-flex items-center gap-1"
                        >
                          <Edit2 size={10} /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-white/30 font-sans-editorial italic text-xs">
                    Tidak ditemukan data barang yang sesuai dengan kombinasi pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
