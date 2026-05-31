import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  RefreshCw, 
  Lock, 
  ShieldCheck, 
  Activity, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Award, 
  MessageSquare, 
  Heart,
  Layers,
  ShoppingBag,
  Database,
  Users,
  AlertTriangle,
  FileSpreadsheet,
  Bell,
  History,
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
  User,
  MessageCircle,
  X,
  Send,
  HelpCircle
} from 'lucide-react';
import { InventoryItem, SalesOrder } from '../types';

interface LandingFeaturesProps {
  items: InventoryItem[];
  orders: SalesOrder[];
  onNavigate: (tab: string) => void;
  triggerAiAudit: () => void;
}

export default function LandingFeatures({ items, orders, onNavigate, triggerAiAudit }: LandingFeaturesProps) {
  // Pricing toggle ('monthly' | 'annually')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  // Interactive UI Preview state: 'inventory' | 'crm' | 'ai'
  const [activePreviewTab, setActivePreviewTab] = useState<'inventory' | 'crm' | 'ai'>('inventory');

  // Multi-user role switcher: 'gudang' | 'keuangan' | 'owner'
  const [activeRole, setActiveRole] = useState<'gudang' | 'keuangan' | 'owner'>('owner');

  // Seasonal forecasting state: 'ramadhan' | 'harbolnas' | 'yearend' | 'normal'
  const [seasonalEvent, setSeasonalEvent] = useState<'ramadhan' | 'harbolnas' | 'yearend' | 'normal'>('harbolnas');

  // Technical FAQ expansion states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Floating Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'agent', text: 'Halo! Selamat datang di Nexora AI. Ada yang bisa kami bantu mengenai integrasi sistem atau migrasi data gudang Anda?', time: 'Baru saja' }
  ]);

  // Live Simulated Activity logs
  const [activityLogs, setActivityLogs] = useState<Array<{ id: number; employee: string; role: string; action: string; time: string; status: 'success' | 'warning' | 'info' }>>([
    { id: 1, employee: 'Andi Pratama', role: 'Staff Gudang', action: 'Scan Barcode NEX-KOPI-GP1 sukses didaftarkan', time: '1 menit yang lalu', status: 'success' },
    { id: 2, employee: 'Siti Rahma', role: 'Staff Keuangan', action: 'Mengunduh rekap HPP & Pajak Marketplace Mei', time: '5 menit yang lalu', status: 'info' },
    { id: 3, employee: 'System AI', role: 'Gemini Agent', action: 'Peringatan otomatis: Stok "Serum Glow Hyaluronic" di bawah batas aman', time: '12 menit yang lalu', status: 'warning' },
    { id: 4, employee: 'Farhan (Owner)', role: 'Super Admin', action: 'Melakukan penyesuaian margin harga pokok', time: '1 jam yang lalu', status: 'success' },
  ]);

  // Custom simulation trigger
  const triggerMockLog = (actionType: 'scan' | 'finance' | 'alert') => {
    let newLog: typeof activityLogs[0];
    const uniqueId = Date.now();
    
    if (actionType === 'scan') {
      newLog = {
        id: uniqueId,
        employee: 'Andi Pratama',
        role: 'Staff Gudang',
        action: 'Simulasi Scan: Memvalidasi label pengiriman J&T EXPRES #948123',
        time: 'Sedang berjalan',
        status: 'success'
      };
    } else if (actionType === 'finance') {
      newLog = {
        id: uniqueId,
        employee: 'Siti Rahma',
        role: 'Staff Keuangan',
        action: 'Sinkronisasi kas: Menyesuaikan komisi administrasi Shopee 6%',
        time: 'Baru saja',
        status: 'info'
      };
    } else {
      newLog = {
        id: uniqueId,
        employee: 'System AI',
        role: 'Gemini Engine',
        action: 'Seasonal forecast: Mendeteksi lonjakan pesanan 11.11, menyarankan restock +40%',
        time: 'Sedang dianalisis',
        status: 'warning'
      };
    }
    
    setActivityLogs([newLog, ...activityLogs.slice(0, 5)]);
  };

  // Chat message submit handler
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Baru saja' }]);
    setChatInput('');

    // Generate smart mock responses based on local keywords
    setTimeout(() => {
      let botResponse = 'Terima kasih atas pertanyaan Anda. Silakan hubungi WA sales kami di +62-811-2233-4455 untuk demo integrasi private mandiri.';
      const cleanMsg = userMsg.toLowerCase();
      
      if (cleanMsg.includes('harga') || cleanMsg.includes('biaya') || cleanMsg.includes('paket')) {
        botResponse = 'Nexora AI memiliki paket Starter, Pro (Best Seller Rp 639rb/bln tahunan), dan Enterprise. Semuanya mendukung AI Advisor. Kakak bisa klik tombol "Mulai Langganan Pro" di atas untuk lanjut!';
      } else if (cleanMsg.includes('gudang') || cleanMsg.includes('marketplace') || cleanMsg.includes('shopee')|| cleanMsg.includes('tokopedia')) {
        botResponse = 'Betul sekali! Nexora sync dua arah ke Shopee, Tokopedia, TikTok Shop, & Lazada. Stok langsung berkurang otomatis di semua toko online jika ada penjualan.';
      } else if (cleanMsg.includes('uji') || cleanMsg.includes('gratis') || cleanMsg.includes('trial') || cleanMsg.includes('coba')) {
        botResponse = 'Kami menyediakan trial 14 hari penuh tanpa kartu kredit. Anda bisa mulai dengan klik "Mulai Audit AI Sekarang" atau link demo di dashboard.';
      } else if (cleanMsg.includes('keamanan') || cleanMsg.includes('aman') || cleanMsg.includes('data')) {
        botResponse = 'Nexora menggunakan enkripsi 256-bit kelas militer dengan cloud backup otomatis setiap jam. Data penjualan dan riwayat pembeli Anda terjamin 100% aman.';
      }

      setChatMessages(prev => [...prev, { sender: 'agent', text: botResponse, time: 'Baru saja' }]);
    }, 900);
  };

  // Dynamic Financial Analytics calculations based on state data
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const estimatedHpp = Math.round(totalRevenue * 0.55); // Estimated COGS (HPP) is 55%
  const adminFees = Math.round(totalRevenue * 0.06); // 6% marketplace admin fees
  const netProfit = totalRevenue - estimatedHpp - adminFees;

  // Inventory Turnover metrics
  const fastMoving = items.filter(item => item.salesCount >= 10);
  const slowMoving = items.filter(item => item.salesCount < 10);
  const deadStockValue = slowMoving.reduce((sum, item) => sum + (item.stock * item.price), 0);

  // Marketplaces and Logistics listing with respective color branding for hover effects
  const integrationLogos = [
    { name: 'Shopee', color: 'hover:text-[#EE4D2D] hover:border-[#EE4D2D]/35 hover:bg-[#EE4D2D]/5', type: 'Marketplace' },
    { name: 'Tokopedia', color: 'hover:text-[#42B549] hover:border-[#42B549]/35 hover:bg-[#42B549]/5', type: 'Marketplace' },
    { name: 'TikTok Shop', color: 'hover:text-[#FE2C55] hover:border-[#FE2C55]/35 hover:bg-[#FE2C55]/5', type: 'Marketplace' },
    { name: 'Lazada', color: 'hover:text-[#0F146D] hover:border-[#0F146D]/35 hover:bg-[#0F146D]/5', type: 'Marketplace' },
    { name: 'J&T Express', color: 'hover:text-[#E02020] hover:border-[#E02020]/35 hover:bg-[#E02020]/5', type: 'Ekspedisi' },
    { name: 'JNE', color: 'hover:text-[#0D5CAD] hover:border-[#0D5CAD]/35 hover:bg-[#0D5CAD]/5', type: 'Ekspedisi' },
    { name: 'SiCepat', color: 'hover:text-[#E02B20] hover:border-[#E02B20]/35 hover:bg-[#E02B20]/5', type: 'Ekspedisi' },
    { name: 'GoSend', color: 'hover:text-[#00AA13] hover:border-[#00AA13]/35 hover:bg-[#00AA13]/5', type: 'Logistik' }
  ];

  // Seasonal Data multipliers
  const getSeasonalMultipliers = () => {
    switch (seasonalEvent) {
      case 'ramadhan':
        return { multiplier: '2.8x Lipat', restockNeeded: '+180% StockUp', description: 'Permintaan busana, parcel kopi blend, skincare hampers melonjak drastis menjelang lebaran.' };
      case 'harbolnas':
        return { multiplier: '4.2x Lipat', restockNeeded: '+320% StockUp', description: 'Peak season tertinggi 11.11 dan 12.12. Persentase checkout naik ekstrem pada pukul 00:00 - 02:00 pagi.' };
      case 'yearend':
        return { multiplier: '1.9x Lipat', restockNeeded: '+90% StockUp', description: 'Masa liburan sekolah dan promo clearance sale akhir tahun.' };
      default:
        return { multiplier: '1.0x Normal', restockNeeded: 'Stok Sesuai Rencana', description: 'Sirkulasi harian aman terkendali dengan model restock otomatis berdasarkan burn-rate.' };
    }
  };

  const seasonalMetrics = getSeasonalMultipliers();

  // FAQ list
  const faqs = [
    {
      q: 'Apakah aplikasi Nexora AI bisa diakses melalui HP / Smartphone?',
      a: 'Sangat bisa! Nexora AI dirancang dengan sistem Progressive Web App (PWA) responsif tinggi. Anda, staff logistik, serta admin finance di lapangan dapat memantau stok, menscan barcode, serta mengonfirmasi nota pesanan langsung dari browser ponsel atau tablet.'
    },
    {
      q: 'Bagaimana mekanisme sirkulasi integrasi marketplace berjalan?',
      a: 'Nexora AI menggunakan protokol API webhook real-time. Setiap kali ada barang keluar dari toko Shopee Anda, sistem mendaftarkan pengurang stok, mengevaluasi sisa stok fisik di Gudang Sentral, lalu mengirimkan API update stok terbaru ke akun Tokopedia dan TikTok Shop secara instan dalam 1.2 detik.'
    },
    {
      q: 'Apakah aman membagi akses data ke karyawan gudang?',
      a: 'Sangat aman. Nexora AI memiliki sistem keamanan Multi-User Role Management. Staff Gudang hanya dapat membuka menu Barcode Scanner, Rak Gudang, & Label Packing. Mereka terisolasi sepenuhnya dari menu sensitif seperti Laporan Laba Bersih, Pengeluaran Pajak, atau Riwayat Akun Penjualan Pemilik Toko.'
    },
    {
      q: 'Bagaimana jika koneksi internet terputus sewaktu packing?',
      a: 'Nexora AI dilengkapi dengan Smart Offline Caching. Seluruh data scan yang tervalidasi saat internet mati akan disimpan sementara di memori internal browser lokal, dan akan langsung tersinkron ulang secara otomatis ketika koneksi terhubung kembali.'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* 💡 Ide Tambahan: Interactive Dashboard Preview (High-Fidelity) */}
      <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/[0.02] rounded-full blur-[110px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">
              LIVE SYSTEM SIMULATION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans-editorial tracking-tight">
              Interactive Dashboard Preview
            </h2>
            <p className="text-xs text-white/50 font-sans-editorial leading-relaxed">
              Klik opsi pemantauan di bawah ini untuk melihat simulasi interface aktual yang terintegrasi secara real-time pada workspace Nexora.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex bg-[#18181b] p-1.5 border border-white/10 rounded-xl max-w-full overflow-x-auto self-start">
            <button 
              id="preview-tab-inventory-btn"
              onClick={() => setActivePreviewTab('inventory')}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono-editorial uppercase tracking-wider transition shrink-0 ${activePreviewTab === 'inventory' ? 'bg-[#38bdf8] text-black' : 'text-white/60 hover:text-white'}`}
            >
              Gudang
            </button>
            <button 
              id="preview-tab-crm-btn"
              onClick={() => setActivePreviewTab('crm')}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono-editorial uppercase tracking-wider transition shrink-0 ${activePreviewTab === 'crm' ? 'bg-[#38bdf8] text-black' : 'text-white/60 hover:text-white'}`}
            >
              Pelanggan & CRM
            </button>
            <button 
              id="preview-tab-ai-btn"
              onClick={() => setActivePreviewTab('ai')}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono-editorial uppercase tracking-wider transition shrink-0 ${activePreviewTab === 'ai' ? 'bg-[#38bdf8] text-black' : 'text-white/60 hover:text-white'}`}
            >
              AI Advisor
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Panel Mock */}
        <div className="bg-[#0b0b0d] border border-white/10 rounded-xl p-5 sm:p-6 min-h-[280px] flex flex-col justify-between transition-all duration-300">
          {activePreviewTab === 'inventory' && (
            <div className="space-y-4 text-xs font-sans-editorial">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-white font-mono-editorial text-[10px] uppercase">
                  <Layers size={12} className="text-[#38bdf8]" /> Rak Database Gudang Sentral
                </div>
                <span className="text-[9px] text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 rounded-md px-1.5 py-0.5 uppercase tracking-wider font-mono-editorial">6 Saluran Sinkron</span>
              </div>
              
              <div className="space-y-2">
                {items.slice(0, 3).map((item) => {
                  const isCritical = item.stock <= item.minStock;
                  return (
                    <div key={item.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between gap-3 hover:bg-white/[0.04] transition">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate text-[13px]">{item.name}</div>
                        <div className="text-[10px] text-white/40 font-mono-editorial mt-0.5">{item.sku} • {item.warehouseLocation}</div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <span className="text-[9px] text-white/35 block font-mono-editorial uppercase">STOK FISIK</span>
                          <span className={`font-mono-editorial font-bold text-xs ${isCritical ? 'text-red-400' : 'text-white'}`}>{item.stock} Unit</span>
                        </div>
                        <div>
                          {isCritical ? (
                            <span className="text-[8px] font-bold text-red-400 bg-red-400/5 border border-red-500/20 rounded px-1.5 py-0.5 uppercase tracking-wider">CRITICAL</span>
                          ) : (
                            <span className="text-[8px] font-bold text-emerald-400 bg-emerald-400/5 border border-emerald-500/20 rounded px-1.5 py-0.5 uppercase tracking-wider">OK SECURE</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activePreviewTab === 'crm' && (
            <div className="space-y-4 text-xs font-sans-editorial">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-white font-mono-editorial text-[10px] uppercase">
                  <Users size={12} className="text-purple-400" /> Segmentasi Pelanggan VIP & Loyal
                </div>
                <span className="text-[9px] text-purple-400 bg-purple-500/5 border border-purple-500/25 rounded-md px-1.5 py-0.5 uppercase tracking-wider font-mono-editorial">CRM Aktif</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-purple-500/[0.02] border border-purple-500/15 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white font-sans-editorial text-xs">Dewi Lestari</span>
                    <span className="text-[8px] font-mono-editorial font-bold bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded uppercase">VIP Set</span>
                  </div>
                  <p className="text-[10px] text-white/50 leading-relaxed italic">"Pembeli VIP Berhak mendapatkan gift eksklusif pada pemesanan di atas Rp 200rb."</p>
                  <div className="pt-1.5 border-t border-white/5 flex justify-between text-[10px] text-white/60">
                    <span>Spent: <b>Rp 3.450.000</b></span>
                    <span>Order: <b>22 Kali</b></span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/[0.02] border border-emerald-500/15 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white font-sans-editorial text-xs">Budi Setiawan</span>
                    <span className="text-[8px] font-mono-editorial font-bold bg-emerald-400/15 text-emerald-400 px-1.5 py-0.5 rounded uppercase font-bold">LOYAL</span>
                  </div>
                  <p className="text-[10px] text-white/50 leading-relaxed italic">"Sangat menyukai kopi blend reguler. Mengutamakan respon cepat."</p>
                  <div className="pt-1.5 border-t border-white/5 flex justify-between text-[10px] text-white/60">
                    <span>Spent: <b>Rp 1.250.000</b></span>
                    <span>Order: <b>8 Kali</b></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePreviewTab === 'ai' && (
            <div className="space-y-4 text-xs font-sans-editorial">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-white font-mono-editorial text-[10px] uppercase">
                  <Sparkles size={12} className="text-[#38bdf8]" /> Analisis Logistik Heuristik Gemini
                </div>
                <span className="text-[9px] text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 rounded-md px-1.5 py-0.5 uppercase tracking-wider font-mono-editorial">Temperature: 0.7f</span>
              </div>

              <div className="p-4 bg-[#18181b]/50 border border-white/5 rounded-xl space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#38bdf8]/10 rounded border border-[#38bdf8]/20 flex items-center justify-center text-xs text-[#38bdf8] shrink-0 font-extrabold">N</div>
                  <div className="space-y-1.5">
                    <h5 className="font-bold text-[#38bdf8] text-[10px] uppercase tracking-wider font-mono-editorial">Nexora Advisor rekomendasi sirkulasi</h5>
                    <p className="text-[11px] text-white/80 leading-relaxed">
                      "Stok produk <b>Serum Glow Hyaluronic</b> mendekati kritis sisa <b>8 unit</b>. Estimasi sisa hari habis (burn-rate) kurang dari 3 hari berdasarkan tren event diskon Shopee. Segera jalankan pengalihan inventory atau luncurkan purchase order restock ke Pabrik."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-white/50 font-mono-editorial uppercase">
            <span>SINKRONISASI AKTIF CORESYSTEM</span>
            <button 
              id="preview-tab-navigate-btn"
              onClick={() => onNavigate(activePreviewTab === 'ai' ? 'ai-advisor' : activePreviewTab === 'crm' ? 'sales' : 'inventory')}
              className="text-[#38bdf8] hover:text-white font-bold transition flex items-center gap-1 text-[10px]"
            >
              Uji Fitur Asli <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* 1. Sistem Notifikasi Otomatis & Log Aktivitas (Smart Alerts & Activity Log) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Automatic Smart Notification & Incident Center (7 cols) */}
        <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#38bdf8]/[0.01] rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono-editorial text-amber-400 uppercase tracking-[0.2em]">SMART ALERTS LOGS</span>
              <span className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[8px] font-mono-editorial font-bold uppercase rounded">Real-Time Webhook</span>
            </div>
            <h3 className="text-base font-bold text-white uppercase font-sans-editorial tracking-tight flex items-center gap-1.5">
              Notifikasi Stok Kritis & Log Aktivitas Karyawan
            </h3>
            <p className="text-xs text-white/45">
              Nexora AI merekapitulasi setiap pergerakan stok oleh karyawan dan memberikan alert instan WhatsApp/Telegram begitu barang menyentuh limit krusial.
            </p>
          </div>

          {/* Interactive Simulation Panel */}
          <div className="space-y-2.5 my-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-editorial text-white/40 uppercase">Aktivitas Internal Terkini</span>
              <div className="flex gap-1.5">
                <button 
                  id="stimulate-scan-btn"
                  onClick={() => triggerMockLog('scan')}
                  className="px-2 py-1 bg-white/5 hover:bg-[#38bdf8]/15 border border-white/10 hover:border-[#38bdf8]/30 rounded text-[9px] text-white/75 hover:text-[#38bdf8] font-bold font-mono-editorial transition"
                >
                  + Simulate Scan
                </button>
                <button 
                  id="stimulate-finance-btn"
                  onClick={() => triggerMockLog('finance')}
                  className="px-2 py-1 bg-white/5 hover:bg-purple-500/15 border border-white/10 hover:border-purple-500/30 rounded text-[9px] text-white/75 hover:text-purple-400 font-bold font-mono-editorial transition"
                >
                  + Adj. Finance
                </button>
                <button 
                  id="stimulate-ai-btn"
                  onClick={() => triggerMockLog('alert')}
                  className="px-2 py-1 bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/30 rounded text-[9px] text-white/75 hover:text-amber-400 font-bold font-mono-editorial transition"
                >
                  + Trigger AI Alert
                </button>
              </div>
            </div>

            {/* Simulated Live Log Feed */}
            <div className="bg-[#0b0b0d] border border-white/5 rounded-xl p-3.5 space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex text-[11px] items-start justify-between gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0 animate-fade-in">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white">{log.employee}</span>
                      <span className="text-[8px] text-white/30 font-mono-editorial bg-white/5 px-1 rounded uppercase tracking-wider">{log.role}</span>
                    </div>
                    <p className="text-white/60 leading-relaxed font-sans-editorial">{log.action}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[9px] text-white/30 font-mono-editorial">{log.time}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'success' ? 'bg-emerald-400' : log.status === 'warning' ? 'bg-amber-400' : 'bg-[#38bdf8]'}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-[10px] text-amber-400 leading-relaxed flex items-center gap-2 font-mono-editorial uppercase">
            <Bell size={12} className="shrink-0 animate-bounce" />
            <span>Peringatan instan WhatsApp terhubung ke nomor Owner (+62-812-***-**29)</span>
          </div>
        </div>

        {/* 2. Manajemen Multi-Akses & Peran (Multi-User Role Management - 5 cols) */}
        <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-editorial text-purple-400 uppercase tracking-[0.2em] block">ACCESS CONTROL SUITE</span>
            <h3 className="text-base font-bold text-white uppercase font-sans-editorial tracking-tight">Manajemen Multi-Akses & Peran</h3>
            <p className="text-xs text-white/45">Lindungi sirkulasi finansial dengan membatasi hak operasional staf logistik gudang.</p>
          </div>

          {/* Interactive Role Selector Switcher */}
          <div className="bg-[#18181b] p-1 border border-white/10 rounded-xl grid grid-cols-3 gap-1 select-none">
            <button 
              id="role-gudang-btn"
              onClick={() => setActiveRole('gudang')}
              className={`py-1.5 text-[10px] font-bold uppercase rounded-lg transition font-mono-editorial ${activeRole === 'gudang' ? 'bg-purple-500 text-white font-extrabold' : 'text-white/50 hover:text-white'}`}
            >
              Staff Gudang
            </button>
            <button 
              id="role-keuangan-btn"
              onClick={() => setActiveRole('keuangan')}
              className={`py-1.5 text-[10px] font-bold uppercase rounded-lg transition font-mono-editorial ${activeRole === 'keuangan' ? 'bg-purple-500 text-white font-extrabold' : 'text-white/50 hover:text-white'}`}
            >
              Staff Finance
            </button>
            <button 
              id="role-owner-btn"
              onClick={() => setActiveRole('owner')}
              className={`py-1.5 text-[10px] font-bold uppercase rounded-lg transition font-mono-editorial ${activeRole === 'owner' ? 'bg-purple-500 text-white font-extrabold' : 'text-white/50 hover:text-white'}`}
            >
              Super Owner
            </button>
          </div>

          {/* Role matrix dynamic description cards */}
          <div className="bg-[#0b0b0d] border border-white/5 rounded-xl p-4 space-y-3.5 text-xs text-white/75">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-bold text-white uppercase font-mono-editorial text-[10px]">DAFTAR HAK AKSES SISTEM</span>
              <span className="text-[9px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono-editorial">Nexora-ACL v1.2</span>
            </div>

            {activeRole === 'gudang' && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span>Smart Scan Barcode & Audit Rak Fisik</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span>Pemenuhan Pesanan (Packing & Cetak Resi)</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 opacity-60">
                  <X size={12} /> <span className="line-through">Laporan Omzet Bersih & Margin Margin</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 opacity-60">
                  <X size={12} /> <span className="line-through">Ubah Konfigurasi Gemeni API Key</span>
                </div>
              </div>
            )}

            {activeRole === 'keuangan' && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-red-400 opacity-60">
                  <X size={12} /> <span className="line-through flex items-center gap-1">Smart Scan & Pemindahan Rak</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span>Analisis Laba/Rugi Bersih & HPP Ekspektasi</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span>Rekap Data Piutang & Biaya Admin Marketplace</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 opacity-60">
                  <X size={12} /> <span className="line-through">Ubah Konfigurasi Gemeni API Key</span>
                </div>
              </div>
            )}

            {activeRole === 'owner' && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span className="font-bold">Akses Penuh Seluruh Dashboard Gudang</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span className="font-bold">Akses Modul Keuangan & Strategi Pemasaran</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span className="font-bold">Akses AI Advisor Analisis Musiman Gemini</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={12} /> <span className="font-bold">Manajemen Kunci API & Sandi Perbankan</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-purple-500/5 border border-purple-500/15 rounded-xl text-[10px] text-purple-400 leading-relaxed font-sans-editorial">
            * Batasi penyalahgunaan wewenang: Amankan rahasia dapur supplier dan data margin omzet bulanan dari staff kasir gudang.
          </div>
        </div>

      </div>

      {/* 3. Prediksi Inventaris Berbasis Musim (AI Seasonal Forecasting) */}
      <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#38bdf8]/[0.01] rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">
              SEASONAL DEMAND ENGINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans-editorial tracking-tight flex items-center gap-1.5">
              Prediksi Inventaris Berbasis Musim (AI Seasonal Forecasting)
            </h2>
            <p className="text-xs text-white/50 font-sans-editorial leading-relaxed">
              Teknologi algoritma prediktif kami menganalisis tren data historis transaksi tahun lalu untuk memproyeksikan restock ideal menjelang hari raya besar nasional.
            </p>
          </div>

          {/* Event Selector buttons */}
          <div className="flex bg-[#18181b] p-1 border border-white/15 rounded-xl overflow-x-auto self-start">
            <button 
              id="event-normal-btn"
              onClick={() => setSeasonalEvent('normal')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono-editorial uppercase transition shrink-0 ${seasonalEvent === 'normal' ? 'bg-[#38bdf8] text-black font-extrabold' : 'text-white/60 hover:text-white'}`}
            >
              Normal
            </button>
            <button 
              id="event-ramadhan-btn"
              onClick={() => setSeasonalEvent('ramadhan')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono-editorial uppercase transition shrink-0 ${seasonalEvent === 'ramadhan' ? 'bg-[#38bdf8] text-black font-extrabold' : 'text-white/60 hover:text-white'}`}
            >
              Lebaran / Ramadhan
            </button>
            <button 
              id="event-harbolnas-btn"
              onClick={() => setSeasonalEvent('harbolnas')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono-editorial uppercase transition shrink-0 ${seasonalEvent === 'harbolnas' ? 'bg-[#38bdf8] text-black font-extrabold' : 'text-white/60 hover:text-white'}`}
            >
              Harbolnas (11.11 / 12.12)
            </button>
            <button 
              id="event-yearend-btn"
              onClick={() => setSeasonalEvent('yearend')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono-editorial uppercase transition shrink-0 ${seasonalEvent === 'yearend' ? 'bg-[#38bdf8] text-black font-extrabold' : 'text-white/60 hover:text-white'}`}
            >
              Akhir Tahun / Clearance
            </button>
          </div>
        </div>

        {/* Dynamic event outcome */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className="md:col-span-4 bg-[#18181b]/60 border border-white/5 p-5 rounded-xl space-y-2 text-center flex flex-col justify-center">
            <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase block">PROYEKSI CHEKOUT BANDWIDTH</span>
            <div className="text-3xl font-black text-white font-mono-editorial tracking-tight">{seasonalMetrics.multiplier}</div>
            <span className="text-[9px] text-[#38bdf8] font-mono-editorial font-bold bg-[#38bdf8]/15 border border-[#38bdf8]/20 rounded-md px-1.5 py-0.5 inline-block mx-auto uppercase tracking-wider">
              {seasonalMetrics.restockNeeded}
            </span>
          </div>

          <div className="md:col-span-8 bg-[#18181b]/60 border border-white/5 p-5 rounded-xl flex flex-col justify-center space-y-2">
            <span className="text-[10px] font-mono-editorial text-white/40 uppercase block">Rekomendasi Penataan Gudang AI Advisor Indonesia</span>
            <p className="text-xs text-white/80 leading-relaxed leading-relaxed font-sans-editorial italic">
              "Kami merekomendasikan untuk menaikkan kapasitas lini pengemasan (packing zone) Anda menjelang event ini sebesar 40%. Pastikan sediaan kardus dimensi sedang disuplai dari supplier utama minimal 14 hari sebelum hari-H untuk mengantisipasi overload pengiriman J&T dan JNE."
            </p>
            <p className="text-[11px] text-[#38bdf8] font-sans-editorial">
              💡 <b>Catatan Musiman:</b> {seasonalMetrics.description}
            </p>
          </div>

        </div>

      </div>

      {/* 2. Ekosistem Integrasi (Integration Ecosystem) */}
      <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-1.5">
          <span className="text-[9px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">AUTOMATED INTEGRATIONS</span>
          <h3 className="text-xl font-bold uppercase text-white font-sans-editorial tracking-tight">
            Terintegrasi Sempurna dengan Ekosistem Bisnis Anda
          </h3>
          <p className="text-xs text-white/50 font-sans-editorial max-w-lg mx-auto leading-relaxed">
            Sinkronkan stok barang dan kurir logistik dari seluruh marketplace terbesar di Asia Tenggara tanpa perlu input manual berkali-kali.
          </p>
        </div>

        {/* Integration logos grayscale elements */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {integrationLogos.map((logo) => (
            <div 
              key={logo.name}
              className={`p-4 bg-[#18181b]/60 border border-white/5 hover:border-white/15 rounded-xl transition-all duration-300 text-center select-none group cursor-default ${logo.color}`}
            >
              <span className="block text-white/35 group-hover:text-white transition-colors font-mono-editorial font-extrabold text-sm tracking-tighter">
                {logo.name}
              </span>
              <span className="block text-[8px] text-white/20 mt-1 uppercase tracking-widest font-mono-editorial font-bold group-hover:text-white/40">
                {logo.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sosial Bukti / Testimoni & Studi Kasus (Social Proof / Case Studies) */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/[0.01] rounded-full blur-[90px] pointer-events-none"></div>

        <div className="space-y-1.5 max-w-xl">
          <span className="text-[9px] font-mono-editorial text-purple-400 uppercase tracking-[0.3em] block">SUCCESS STORIES</span>
          <h3 className="text-xl font-bold uppercase text-white font-sans-editorial tracking-tight">
            Sosial Bukti & Kepuasan Pengusaha Indonesia
          </h3>
          <p className="text-xs text-white/50 font-sans-editorial">
            Dengarkan langsung dari para pebisnis lokal yang sukses mengamankan margin profitabilitas mereka bersama Nexora AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-[#18181b]/50 border border-white/5 rounded-xl space-y-4 relative">
            <span className="text-[28px] font-serif-editorial text-[#38bdf8]/10 absolute top-2 right-4 select-none">“</span>
            <p className="text-xs text-white/80 leading-relaxed leading-relaxed font-sans-editorial relative z-10">
              "Sebelum pakai Nexora AI, tim gudang saya sering salah kirim barang dan stok di Shopee sering bocor. Sekarang, proses packing jauh lebih cepat dengan Smart Scan, dan kami bisa memproyeksikan stok untuk campaign bulan depan berkat AI Advisor."
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/35 flex items-center justify-center text-xs font-bold font-mono-editorial text-[#38bdf8]">FS</div>
              <div>
                <h5 className="text-xs font-bold text-white uppercase font-sans-editorial">Farhan Syah</h5>
                <p className="text-[9px] text-[#38bdf8] font-mono-editorial uppercase">CEO Brand Fashion Lokal</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#18181b]/50 border border-white/5 rounded-xl space-y-4 relative">
            <span className="text-[28px] font-serif-editorial text-[#38bdf8]/10 absolute top-2 right-4 select-none">“</span>
            <p className="text-xs text-white/80 leading-relaxed leading-relaxed font-sans-editorial relative z-10">
              "Sinkronisasi real-time multi-marketplace mengubah cara kami scaling. Tanpa overselling, tanpa pusing penalti toko. Rekomendasi volume packing AI Advisor menghemat ratusan juta rupiah ongkos kirim lintas pulau."
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-550/25 flex items-center justify-center text-xs font-bold font-mono-editorial text-purple-400">DL</div>
              <div>
                <h5 className="text-xs font-bold text-white uppercase font-sans-editorial">Dewi Lestari</h5>
                <p className="text-[9px] text-purple-400 font-mono-editorial uppercase">Founder Nexora Skincare</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Keamanan Data & Reliabilitas Sistem (Enterprise-Grade Security - 2 cols table) */}
      <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="text-[9px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">DISASTER RECOVERY STANDARD</span>
          <h3 className="text-xl font-bold uppercase text-white font-sans-editorial tracking-tight">Skema Backup & Pemulihan Keamanan Data</h3>
          <p className="text-xs text-white/50 font-sans-editorial">Aset terpenting dari sebuah kelancaran operasional toko online Anda adalah data yang handal dan bebas kebocoran.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 bg-[#18181b]/40 border border-white/5 rounded-xl space-y-3 flex items-start gap-4 hover:border-[#38bdf8]/30 transition">
            <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/5 flex items-center justify-center border border-[#38bdf8]/20 text-[#38bdf8] shrink-0">
              <Lock size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">Cloud Backup Otomatis</h4>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans-editorial">
                Seluruh data transaksi dan stok digandakan secara real-time setiap jam pada cluster server cloud yang aman. Terjamin bebas data hilang.
              </p>
            </div>
          </div>

          <div className="p-5 bg-purple-550/[0.01] border border-white/5 rounded-xl space-y-3 flex items-start gap-4 hover:border-purple-500/30 transition">
            <div className="w-10 h-10 rounded-lg bg-purple-500/5 flex items-center justify-center border border-purple-500/20 text-purple-400 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">Enkripsi Data End-to-End</h4>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans-editorial">
                Kami memperlakukan data penjualan, margin laba, dan identitas privasi pembeli Anda dengan sandi enkripsi 256-bit standar perbankan.
              </p>
            </div>
          </div>

          <div className="p-5 bg-emerald-550/[0.01] border border-white/5 rounded-xl space-y-3 flex items-start gap-4 hover:border-emerald-500/30 transition">
            <div className="w-10 h-10 rounded-lg bg-[#00e5a3]/5 flex items-center justify-center border border-[#00e5a3]/20 text-[#00e5a3] shrink-0">
              <Activity size={18} className="animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">Jaminan Server Uptime 99.9%</h4>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans-editorial">
                Server redundansi ganda menjamin sistem selalu online di segala kondisi agar operasional gudang dan sirkulasi cetak resi Anda tidak tertunda.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 6. Skema Harga yang Transparan (Pricing Tier) */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#38bdf8]/[0.01] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-[9px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">TRANSPARENT TARIFF PLANS</span>
          <h3 className="text-2xl font-bold uppercase text-white font-sans-editorial tracking-tight leading-tight">
            Skema Harga yang Transparan dan Terjangkau
          </h3>
          <p className="text-xs text-white/50 font-sans-editorial">
            Pilihlah paket yang paling sesuai dengan intensitas penjualan toko multi-marketplace Anda sekarang.
          </p>

          {/* Monthly/Annually Billing Switcher */}
          <div className="inline-flex bg-[#18181b] p-1 border border-white/15 rounded-full select-none justify-center mt-2 mx-auto">
            <button
              id="billing-monthly-btn"
              onClick={() => setBillingPeriod('monthly')}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase transition tracking-wider ${billingPeriod === 'monthly' ? 'bg-[#38bdf8] text-black font-extrabold' : 'text-white/60 hover:text-white'}`}
            >
              Bayar Bulanan
            </button>
            <button
              id="billing-annually-btn"
              onClick={() => setBillingPeriod('annually')}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase transition tracking-wider flex items-center gap-1.5 ${billingPeriod === 'annually' ? 'bg-[#38bdf8] text-black font-extrabold' : 'text-white/60 hover:text-white'}`}
            >
              Tahunan (-20%)
            </button>
          </div>
        </div>

        {/* 3 tables comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Starter Plan */}
          <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-white/15 transition relative">
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-mono-editorial text-white/40 uppercase tracking-widest block font-bold">LUMSUM STARTER</span>
                <h4 className="text-base font-bold text-white uppercase font-sans-editorial tracking-wide mt-1">Starter / Growth</h4>
                <p className="text-[11px] text-white/50 mt-1 font-sans-editorial">Cocok untuk bisnis lokal dan reseller rintisan baru.</p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-2xl font-black font-mono-editorial text-white">
                  {billingPeriod === 'monthly' ? 'Rp 299.000' : 'Rp 239.000'}
                </span>
                <span className="text-[10px] text-white/40 block">per bulan (ditagih per tahun)</span>
              </div>

              <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-sans-editorial text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Maks. 500 Pesanan / bulan
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Koneksi 2 Marketplace online
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Fitur AI Advisor Dasar
                </li>
                <li className="flex items-center gap-2 opacity-35 line-through font-sans-editorial">
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></span> Fitur Smart Scan AI khusus
                </li>
              </ul>
            </div>

            <button 
              id="starter-free-trial-btn"
              onClick={triggerAiAudit}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] uppercase font-mono-editorial tracking-widest border border-white/10 rounded-xl transition"
            >
              Uji Coba Gratis
            </button>
          </div>

          {/* Pro Plan (Best Value) */}
          <div className="bg-[#18181b]/70 border-2 border-[#38bdf8]/40 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-[#38bdf8]/70 transition relative">
            <div className="absolute top-[-11px] right-6 bg-[#38bdf8] text-black text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md font-mono-editorial">
              ★ REKOMENDASI BRAND
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-mono-editorial text-[#38bdf8] uppercase tracking-widest block font-bold">PROFESSIONAL SUITE</span>
                <h4 className="text-base font-bold text-white uppercase font-sans-editorial tracking-wide mt-1">Pro / Scale Up</h4>
                <p className="text-[11px] text-white/50 mt-1 font-sans-editorial">Sempurna untuk brand yang berkembang aktif di berbagai marketplace.</p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-2xl font-black font-mono-editorial text-[#38bdf8]">
                  {billingPeriod === 'monthly' ? 'Rp 799.000' : 'Rp 639.000'}
                </span>
                <span className="text-[10px] text-white/40 block">per bulan (ditagih per tahun)</span>
              </div>

              <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-sans-editorial text-white/85">
                <li className="flex items-center gap-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> <b>Pesanan Tanpa Batas</b> / bulan
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Koneksi <b>Semua Marketplace</b>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Akses Penuh <b>AI Advisor Analyst</b>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Smart Scan AI bertenaga Gemini
                </li>
              </ul>
            </div>

            <button 
              id="cta-pro-sub-btn"
              onClick={triggerAiAudit}
              className="w-full py-2.5 bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-extrabold text-[10px] uppercase font-mono-editorial tracking-widest rounded-xl transition shadow-lg shadow-[#38bdf8]/10"
            >
              Mulai Langganan Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[#18181b]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-white/15 transition relative">
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-mono-editorial text-purple-400 uppercase tracking-widest block font-bold">HIGH SCALABILITY</span>
                <h4 className="text-base font-bold text-white uppercase font-sans-editorial tracking-wide mt-1">Enterprise Plan</h4>
                <p className="text-[11px] text-white/50 mt-1 font-sans-editorial">Kebutuhan khusus korporasi besar atau jaringan pergudangan multi-cabang.</p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-2xl font-black font-mono-editorial text-white">Tarif Custom</span>
                <span className="text-[10px] text-white/40 block">konsultasi skema & server</span>
              </div>

              <ul className="space-y-2 border-t border-white/5 pt-4 text-xs font-sans-editorial text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Integrasi API Khusus / Custom
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Dedicated Server 100% SLA Uptime
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Tim Support Prioritas 24 Jam
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Kontrak SLA & Nondisclosure Agreement
                </li>
              </ul>
            </div>

            <button 
              id="contact-advisor-btn"
              onClick={triggerAiAudit}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] uppercase font-mono-editorial tracking-widest border border-white/10 rounded-xl transition"
            >
              Hubungi Tim Advisor
            </button>
          </div>

        </div>
      </div>

      {/* NEW: Section FAQ (Pertanyaan Umum - Technical Dropdowns) */}
      <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <span className="text-[9px] font-mono-editorial text-purple-400 uppercase tracking-[0.3em] block">COMMON DOUBTS ANSWERED</span>
          <h3 className="text-xl font-bold uppercase text-white font-sans-editorial tracking-tight">FAQ / Pertanyaan Umum</h3>
          <p className="text-xs text-white/50 font-sans-editorial">Butuh jawaban teknis mengenai kesiapan platform kami sebelum berlangganan?</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index} 
                className="bg-[#18181b]/40 border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center text-white hover:bg-white/[0.02] transition gap-4"
                >
                  <span className="text-xs sm:text-xs font-bold uppercase tracking-wider font-sans-editorial">{faq.q}</span>
                  <div className="text-purple-400 shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-white/60 leading-relaxed font-sans-editorial border-t border-white/5 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE FLOATING LIVE CHAT WIDGET POPUP */}
      <div className="fixed bottom-6 right-6 z-[999]">
        {!isChatOpen ? (
          <button
            id="chat-trigger-bubble-btn"
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-[#38bdf8] text-black hover:bg-[#0ea5e9] rounded-full flex items-center justify-center shadow-2xl transition hover:scale-110 relative group"
            title="Chat dengan Support Advisor"
          >
            <MessageCircle size={26} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold animate-pulse">1</span>
          </button>
        ) : (
          <div className="w-[330px] sm:w-[360px] bg-[#0b0b0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between max-h-[450px]">
            {/* Chat header */}
            <div className="bg-[#121212] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono-editorial">Nexora Support</h4>
                  <p className="text-[9px] text-white/50">Balas cepat bertenaga Smart Assistant</p>
                </div>
              </div>
              <button 
                id="close-chat-btn"
                onClick={() => setIsChatOpen(false)}
                className="text-white/45 hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages flow */}
            <div className="p-4 space-y-3 overflow-y-auto h-[250px] custom-scrollbar text-xs">
              {chatMessages.map((msg, idx) => {
                const isBot = msg.sender === 'agent';
                return (
                  <div key={idx} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1 animate-fade-in`}>
                    <div className={`p-3 max-w-[85%] rounded-xl leading-relaxed font-sans-editorial ${isBot ? 'bg-white/[0.04] text-white/90 border border-white/5 rounded-tl-none' : 'bg-[#38bdf8] text-black font-semibold rounded-tr-none'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-white/30 font-mono-editorial px-1">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Simulated Suggestions pills */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none bg-[#121212]/30">
              <button 
                id="suggest-price-btn"
                onClick={() => { setChatInput('Berapa harga paket Nexora AI?'); }}
                className="text-[9px] px-2 py-1 bg-white/5 hover:bg-white/10 text-white/70 border border-white/5 rounded-full transition"
              >
                Harga Paket?
              </button>
              <button 
                id="suggest-sync-btn"
                onClick={() => { setChatInput('Apakah sync otomatis ke Shopee real-time?'); }}
                className="text-[9px] px-2 py-1 bg-white/5 hover:bg-white/10 text-white/70 border border-white/5 rounded-full transition"
              >
                Sinkronisasi Shopee?
              </button>
              <button
                id="suggest-trial-btn"
                onClick={() => { setChatInput('Ada trial gratis?'); }}
                className="text-[9px] px-2 py-1 bg-white/5 hover:bg-white/10 text-white/70 border border-white/5 rounded-full transition"
              >
                Demo Gratis?
              </button>
            </div>

            {/* Chat Form Input */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-[#121212] border-t border-white/10 flex gap-2">
              <input
                id="chat-widget-input-field"
                type="text"
                placeholder="Tulis pesan..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#38bdf8] text-white placeholder-white/30 text-xs px-3 py-2 rounded-xl focus:outline-none transition font-sans-editorial"
              />
              <button
                id="chat-widget-submit-btn"
                type="submit"
                className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black w-8 h-8 rounded-xl flex items-center justify-center transition shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
