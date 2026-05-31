import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ShoppingBag, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  Truck, 
  CheckCircle,
  ArrowUpRight,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';
import { InventoryItem, SalesOrder } from '../types';
import LandingFeatures from './LandingFeatures';

interface DashboardProps {
  items: InventoryItem[];
  orders: SalesOrder[];
  onNavigate: (tab: string) => void;
  triggerAiAudit: () => void;
}

export default function Dashboard({ items, orders, onNavigate, triggerAiAudit }: DashboardProps) {
  const lowStockItems = items.filter(item => item.stock <= item.minStock);
  const pendingOrders = orders.filter(order => order.status === 'Pending' || order.status === 'Packaging');
  
  // Calculations
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalOrders = orders.length;
  
  // Marketplace Distribution
  const mktCount = orders.reduce((acc, order) => {
    acc[order.marketplace] = (acc[order.marketplace] || 0) + order.totalPrice;
    return acc;
  }, {} as Record<string, number>);

  const marketplaces = [
    { name: 'Shopee' as const, color: 'text-orange-400 border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10' },
    { name: 'Tokopedia' as const, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10' },
    { name: 'TikTok Shop' as const, color: 'text-zinc-250 border-white/20 bg-white/5 hover:bg-white/10' },
    { name: 'Lazada' as const, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Editorial Headline Hero Header */}
      <div className="relative overflow-hidden border border-white/10 rounded-2xl bg-[#0e0e0e] p-8 sm:p-10 shadow-2xl">
        {/* Playfair Display Watermark in Background */}
        <div className="stat-focus absolute right-[-20px] bottom-[-40px] text-[180px] sm:text-[240px] italic pointer-events-none text-white/[0.04] font-serif-editorial select-none z-0">
          380%
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-white/10 text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] pulse-indicator"></span>
            Nexora AI Core v2.4.0
          </div>
          
          <div className="space-y-2">
            <span className="text-[#38bdf8] font-semibold tracking-[0.3em] uppercase text-xs block">
              Modern Operations Solution
            </span>
            <h1 className="editorial-h1 text-4xl sm:text-6xl text-[#F5F5F5] uppercase">
              TRANSFORMASI<br />
              <span className="text-transparent text-stroke-white">DIGITAL</span><br />
              OPERASIONAL BISNIS.
            </h1>
          </div>

          <p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed font-light font-sans-editorial">
            Inventory Nexora AI mengintegrasikan pengelolaan gudang, stok barang, penjualan multi-marketplace, 
            hingga customer database dalam satu ekosistem canggih. Didukung Smart Scan & Artificial Intelligence.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              id="dash-ai-btn"
              onClick={triggerAiAudit}
              className="px-6 py-3 bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-bold text-xs uppercase tracking-widest rounded-full transition duration-300 shadow-lg flex items-center gap-2"
            >
              <Cpu size={14} /> Hubungkan AI Advisor
            </button>
            <button 
              id="dash-scan-btn"
              onClick={() => onNavigate('inventory')}
              className="px-6 py-3 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-bold text-xs uppercase tracking-widest rounded-full transition duration-300 flex items-center gap-2"
            >
              Simulasikan Smart Scan
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Editorial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#0F0F0F]">
        <div className="p-6 space-y-3 relative overflow-hidden group hover:bg-white/[0.01] transition-colors">
          <span className="text-3xl font-bold font-sans-editorial block text-white">380%</span>
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#38bdf8] block">Efisiensi Profitabilitas</span>
            <span className="text-xs text-white/50 block font-light mt-1">Siklus pencarian, packing, dan update Marketplace terotomatisasi penuh.</span>
          </div>
        </div>
        <div className="p-6 space-y-3 relative overflow-hidden group hover:bg-white/[0.01] transition-colors">
          <span className="text-3xl font-bold font-sans-editorial block text-white">Real-time</span>
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#38bdf8] block">Analisis Performa</span>
            <span className="text-xs text-white/50 block font-light mt-1">Data penjualan diringkas instan guna mencegah barang berlebih (overstock).</span>
          </div>
        </div>
        <div className="p-6 space-y-3 relative overflow-hidden group hover:bg-white/[0.01] transition-colors">
          <span className="text-3xl font-bold font-sans-editorial block text-white">Zero Risk</span>
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#38bdf8] block">Human Error Prevention</span>
            <span className="text-xs text-white/50 block font-light mt-1">Pemindaian logistik terukur memangkas risiko salah kirim barang ke pelanggan.</span>
          </div>
        </div>
      </div>

      {/* Section 1: Fitur Utama (Menjelaskan Menu "Dashboard" & "Gudang") */}
      <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Background glow graphic */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-3xl space-y-2">
          <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">
            SAYAP BISNIS DIGITAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white font-sans-editorial tracking-tight leading-tight">
            Kendali Penuh Operasional Bisnis, Tanpa Pusing Pindah Aplikasi.
          </h2>
          <p className="text-xs sm:text-sm text-white/50 max-w-2xl font-sans-editorial">
            Dari urusan rak gudang sampai pesanan menumpuk di marketplace, Nexora AI menyelesaikannya secara otomatis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#18181b]/50 border border-white/5 rounded-xl space-y-3 hover:border-[#38bdf8]/30 transition group">
            <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] border border-[#38bdf8]/20 transition-all duration-300 group-hover:scale-105">
              <Layers size={18} />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono-editorial">
              Smart Inventory & Multi-Gudang
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans-editorial">
              Pantau perpindahan stok antar-gudang secara akurat. Sistem otomatis memberikan peringatan dini jika stok produk terlaris Anda mulai menipis.
            </p>
          </div>

          <div className="p-6 bg-[#18181b]/50 border border-white/5 rounded-xl space-y-3 hover:border-[#38bdf8]/30 transition group">
            <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] border border-[#38bdf8]/20 transition-all duration-300 group-hover:scale-105">
              <RefreshCw size={18} />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono-editorial">
              Sinkronisasi Marketplace Otomatis
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans-editorial">
              Stok terupdate secara real-time di semua toko online Anda setiap kali ada penjualan. Selamat tinggal sanksi penalti akibat stok kosong (overselling).
            </p>
          </div>

          <div className="p-6 bg-[#18181b]/50 border border-white/5 rounded-xl space-y-3 hover:border-[#38bdf8]/30 transition group">
            <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] border border-[#38bdf8]/20 transition-all duration-300 group-hover:scale-105">
              <Truck size={18} />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono-editorial">
              Manajemen Packing Super Cepat
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans-editorial">
              Alur pengemasan terpandu yang meminimalkan salah kirim barang. Dilengkapi fitur cetak label massal dalam satu klik.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Column Metric Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue card */}
        <div className="p-6 bg-[#121212] border border-white/10 rounded-xl space-y-3 relative group hover:border-[#38bdf8]/30 transition">
          <div className="flex justify-between items-center text-white/40">
            <span className="text-[11px] font-mono-editorial uppercase tracking-wider">OMSET TOTAL</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-sans-editorial tracking-tight">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono-editorial text-emerald-400">
              SINKRONISASI AKTIF (+12.4%)
            </span>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="p-6 bg-[#121212] border border-white/10 rounded-xl space-y-3 relative group hover:border-[#38bdf8]/30 transition">
          <div className="flex justify-between items-center text-white/40">
            <span className="text-[11px] font-mono-editorial uppercase tracking-wider">LOG PESANAN</span>
            <ShoppingBag size={16} className="text-[#38bdf8]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-sans-editorial tracking-tight">
              {totalOrders} Pesanan
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono-editorial text-[#38bdf8]">
              {pendingOrders.length} BUTUH DIAMBIL/DIKEMAS
            </span>
          </div>
        </div>

        {/* Low Stock count Card */}
        <div className="p-6 bg-[#121212] border border-white/10 rounded-xl space-y-3 relative group hover:border-red-500/30 transition">
          <div className="flex justify-between items-center text-white/40">
            <span className="text-[11px] font-mono-editorial uppercase tracking-wider">PERINGATAN STOK</span>
            <AlertTriangle size={16} className={lowStockItems.length > 0 ? 'text-red-400' : 'text-emerald-400'} />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-sans-editorial tracking-tight text-white">
              {lowStockItems.length} Produk
            </h3>
            <span className={`inline-flex items-center gap-1 text-[10px] font-mono-editorial ${lowStockItems.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {lowStockItems.length > 0 ? 'RESTOCK SEGERA' : 'STATUS GUDANG AMAN'}
            </span>
          </div>
        </div>

        {/* AI Efficiency Indicator Card */}
        <div className="p-6 bg-transparent border-2 border-dashed border-[#38bdf8]/20 hover:border-[#38bdf8]/40 rounded-xl space-y-3 relative transition flex flex-col justify-between">
          <div className="flex justify-between items-center text-[#38bdf8]">
            <span className="text-[11px] font-mono-editorial uppercase tracking-widest">NEXORA PROTOCOL</span>
            <Sparkles size={16} className="animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <h3 className="text-3xl font-serif-editorial italic text-white font-black">
              +380%
            </h3>
            <span className="text-[10px] text-white/50 font-mono-editorial uppercase tracking-wider block mt-1">
              PROFITABILITAS OPERASIONAL
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts & Logs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-4">
        
        {/* Multichannel Sales Progress Matrix */}
        <div className="lg:col-span-8 bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-editorial tracking-widest text-[#38bdf8] uppercase block">Integrated Revenue Matrix</span>
              <h2 className="text-lg font-bold text-white mt-1 uppercase flex items-center gap-2">
                <Layers size={16} className="text-[#38bdf8]" /> Kinerja Penjualan Multi-Marketplace
              </h2>
            </div>
            <button 
              id="mkt-sync-btn"
              onClick={triggerAiAudit}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white flex items-center gap-1.5 transition self-start"
            >
              <RefreshCw size={12} /> Sync Statistik
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {marketplaces.map((mkt) => {
              const amount = mktCount[mkt.name] || 0;
              const maxAmount = Math.max(...Object.values(mktCount), 100000);
              const percentage = Math.min(100, Math.round((amount / maxAmount) * 100));
              
              return (
                <div 
                  key={mkt.name} 
                  className={`p-5 rounded-xl border border-white/5 flex flex-col justify-between space-y-4 transition ${mkt.color}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono-editorial uppercase tracking-widest font-bold">
                      {mkt.name}
                    </span>
                    <span className="text-[9px] font-mono-editorial px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      LIVE
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-white/40 block uppercase">Kontribusi Penjualan</span>
                    <span className="text-xl font-bold font-mono-editorial text-white tracking-tight">
                      Rp {amount.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-white/40 font-mono-editorial">
                      <span>Prosentase Output</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#38bdf8] h-1 transition-all duration-1000" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Info Feature callout Block */}
          <div className="p-4 bg-white/5 border-l-2 border-[#38bdf8] rounded-r-lg space-y-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial flex items-center gap-1">
              <Sparkles size={14} className="text-[#38bdf8]" /> Analisis Prediktif AI Nexora
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-sans-editorial">
              Sistem mendeteksi momentum penjualan produk tinggi pada Marketplace <b>Shopee & Tokopedia</b> selama akhir pekan ini. 
              Gunakan fitur <button onClick={() => onNavigate('ai-advisor')} className="text-[#38bdf8] underline hover:text-white transition">AI Advisor</button> untuk memetakan alokasi stok optimal.
            </p>
          </div>
        </div>

        {/* Live Warehouse Operations log (4 cols) */}
        <div className="lg:col-span-4 bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-editorial tracking-widest text-white/45 uppercase block">Warehouse Actions</span>
            <h2 className="text-base font-bold text-white uppercase flex items-center gap-2">
              <Truck size={16} className="text-[#38bdf8]" /> Log Penjualan & Gudang
            </h2>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[300px] flex-1 pr-1 custom-scrollbar">
            {orders.map((order) => (
              <div key={order.id} className="text-xs flex gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                  {order.status === 'Completed' ? (
                    <CheckCircle size={14} className="text-emerald-400" />
                  ) : order.status === 'Packaging' ? (
                    <Layers size={14} className="text-amber-400" />
                  ) : order.status === 'Shipped' ? (
                    <Truck size={14} className="text-blue-400" />
                  ) : (
                    <Clock size={14} className="text-[#38bdf8]" />
                  )}
                </div>
                <div className="flex-1 space-y-1 font-sans-editorial text-white/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono-editorial text-[10px] tracking-wider">
                      {order.orderNumber}
                    </span>
                    <span className="text-[9px] text-white/50 uppercase italic font-serif-editorial">
                      {order.marketplace}
                    </span>
                  </div>
                  <p className="text-white/60 leading-snug">
                    <b>{order.customerName}</b> membeli {order.items.reduce((sum, item) => sum + item.quantity, 0)} item.
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono-editorial text-white/40 pt-0.5">
                    <span>Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${
                      order.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10' :
                      order.status === 'Packaging' ? 'text-amber-400 bg-amber-500/5 border-amber-500/10' :
                      order.status === 'Ready to Ship' ? 'text-sky-400 bg-sky-500/5 border-sky-500/10' :
                      'text-white/60 bg-white/5 border-white/10'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            id="all-orders-nav-btn"
            onClick={() => onNavigate('sales')}
            className="w-full text-center text-[10px] font-mono-editorial font-bold uppercase tracking-wider py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition flex items-center justify-center gap-1.5"
          >
            Manajemen Semua Pesanan <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      {/* Landing Marketing & Financial Optimization Sections */}
      <LandingFeatures 
        items={items} 
        orders={orders} 
        onNavigate={onNavigate} 
        triggerAiAudit={triggerAiAudit} 
      />

      {/* Section 5: Call to Action (CTA) Akhir / Footer */}
      <div className="border border-white/10 rounded-2xl bg-[#0e0e0e] p-8 sm:p-12 text-center relative overflow-hidden space-y-6">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#38bdf8]/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">
            ACCELERATE GROWTH
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white font-sans-editorial tracking-tight">
            Siap Mengubah Cara Anda Mengelola Bisnis?
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans-editorial">
            Bergabunglah dengan era baru manajemen inventaris yang cerdas, efisien, dan bebas risiko.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          <button 
            id="cta-audit-now-btn"
            onClick={triggerAiAudit}
            className="px-8 py-3.5 bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-[#38bdf8]/10 hover:shadow-[#38bdf8]/20 inline-flex items-center gap-2"
          >
            <Sparkles size={14} className="animate-pulse" /> Mulai Audit AI Sekarang
          </button>
          <p className="text-[10px] text-white/40 font-mono-editorial">
            * Gratis untuk 100 Pendaftar Pertama Bulan Ini.
          </p>
        </div>
      </div>
    </div>
  );
}
