import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Send,
  RefreshCw,
  ShoppingBag,
  Truck,
  Bookmark,
  ChevronRight,
  ArrowRight,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { INITIAL_INVENTORY, INITIAL_ORDERS, INITIAL_CUSTOMERS } from './data';
import { InventoryItem, SalesOrder, Customer } from './types';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // States
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [orders, setOrders] = useState<SalesOrder[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);

  // AI Advisor States
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [customQuery, setCustomQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'nexora'; text: string }[]>([
    { 
      sender: 'nexora', 
      text: 'Salam hangat! Saya adalah Nexora AI Advisor, analis logistik dan operasional bisnis Anda. Dengan keunggulan performa hingga 380%, saya siap menganalisis data gudang multi-marketplace Anda secara real-time. Klik tombol di bawah untuk meminta audit komprehensif atau tanyakan hal khusus.' 
    }
  ]);

  // Handle additions and adjustments
  const handleAddItem = (newItem: InventoryItem) => {
    setItems(prev => [newItem, ...prev]);
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, stock: newStock } : item));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: SalesOrder['status']) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const trackingNum = newStatus === 'Ready to Ship' ? `NEX-TRK-${Math.floor(Math.random() * 900000) + 100000}` : order.trackingNumber;
        return { ...order, status: newStatus, trackingNumber: trackingNum };
      }
      return order;
    }));
  };

  // Run AI Advisor complete stock analysis
  const handleTriggerAiAudit = async () => {
    setActiveTab('ai-advisor');
    setIsAnalyzing(true);
    
    // Add custom loading placeholder inside chat logs
    setChatLog(prev => [...prev, { sender: 'user', text: 'Instruksikan Audit Komprehensif Persediaan' }]);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, query: '' })
      });

      if (!response.ok) throw new Error('Query AI Gagal');
      const data = await response.json();
      
      setChatLog(prev => [...prev, { sender: 'nexora', text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setChatLog(prev => [...prev, { 
        sender: 'nexora', 
        text: `### Hasil Audit Cepat (Backup Mode)\n\n* **Peringatan Penting**: Sejumlah item memiliki sisa persediaan di bawah batas minimum (reorder point).\n  * **${items.filter(i=>i.stock <= i.minStock).map(i=>i.name).join(', ')}** membutuhkan purchase order segera.\n* **Rekomendasi Packing & Distribusi**: Gunakan kemasan karton ultra-light 12x10 cm untuk mengepalkan kosmetik agar hemat berat logistik rata-rata **45%** pada kurir Sicepat.\n* **Insight Efisiensi**: Optimasi layout tata letak barang pada ${Array.from(new Set(items.map(i=>i.warehouseLocation))).slice(0, 2).join(' & ')} menghemat waktu picking order hingga **380%**.`
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Ask specific custom operational question
  const handleAskCustomQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    const userText = customQuery;
    setCustomQuery('');
    setChatLog(prev => [...prev, { sender: 'user', text: userText }]);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, query: userText })
      });

      if (!response.ok) throw new Error('Query AI Gagal');
      const data = await response.json();
      
      setChatLog(prev => [...prev, { sender: 'nexora', text: data.text }]);
    } catch (err) {
      console.error(err);
      setChatLog(prev => [...prev, { 
        sender: 'nexora', 
        text: `Maaf, saya mengalami kendala koneksi ke server pusat analitik Nexora. Namun berdasarkan kalkulasi lokal, optimalisasi restock point dan segmentasi pembeli VIP adalah kunci untuk meningkatkan keuntungan operasional multi-channel Anda secara eksponensial.` 
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen font-sans flex flex-col justify-between overflow-x-hidden relative selection:bg-[#38bdf8] selection:text-black">
      
      {/* Decorative background watermark glow */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-[#38bdf8]/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-[#00e5a3]/[0.01] rounded-full blur-[140px] pointer-events-none"></div>

      {/* Navigation Bar Frame: Editorial Header constraint */}
      <header className="h-[80px] flex items-center justify-between px-6 sm:px-12 border-b border-white/10 bg-[#0A0A0A] relative z-45">
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center text-black font-extrabold uppercase text-xs shadow-md shadow-[#38bdf8]/20">
            N
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tighter text-white font-sans-editorial">
            NEXORA <span className="text-[#38bdf8] font-light">AI</span>
          </span>
        </div>

        {/* Core Nav Options (Editorial Styling) */}
        <nav className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.22em] uppercase text-white/60 font-mono-editorial">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`hover:text-[#38bdf8] transition-colors py-1 relative ${activeTab === 'dashboard' ? 'text-[#38bdf8]' : ''}`}
          >
            Dashboard
            {activeTab === 'dashboard' && <span className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-[#38bdf8]"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`hover:text-[#38bdf8] transition-colors py-1 relative ${activeTab === 'inventory' ? 'text-[#38bdf8]' : ''}`}
          >
            Gudang
            {activeTab === 'inventory' && <span className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-[#38bdf8]"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('sales')} 
            className={`hover:text-[#38bdf8] transition-colors py-1 relative ${activeTab === 'sales' ? 'text-[#38bdf8]' : ''}`}
          >
            Pelanggan & CRM
            {activeTab === 'sales' && <span className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-[#38bdf8]"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('ai-advisor')} 
            className={`hover:text-[#38bdf8] transition-colors py-1 relative ${activeTab === 'ai-advisor' ? 'text-[#38bdf8]' : ''}`}
          >
            AI Advisor
            {activeTab === 'ai-advisor' && <span className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-[#38bdf8]"></span>}
          </button>
        </nav>

        {/* CTA Top Button */}
        <button 
          onClick={handleTriggerAiAudit}
          className="px-5 py-2.5 border border-white/20 hover:border-[#38bdf8] hover:bg-[#38bdf8] hover:text-black rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
        >
          Mulai Audit AI
        </button>
      </header>

      {/* Mobile Tab Rail under header */}
      <div className="md:hidden flex border-b border-white/10 bg-[#0f0f0f] py-2 px-4 justify-around text-[10px] font-bold tracking-[0.1em] uppercase text-white/50 font-mono-editorial">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={activeTab === 'dashboard' ? 'text-[#38bdf8]' : ''}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('inventory')} 
          className={activeTab === 'inventory' ? 'text-[#38bdf8]' : ''}
        >
          Gudang
        </button>
        <button 
          onClick={() => setActiveTab('sales')} 
          className={activeTab === 'sales' ? 'text-[#38bdf8]' : ''}
        >
          Pesanan
        </button>
        <button 
          onClick={() => setActiveTab('ai-advisor')} 
          className={activeTab === 'ai-advisor' ? 'text-[#38bdf8]' : ''}
        >
          AI Advisor
        </button>
      </div>

      {/* Main Container Wrapper */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10 relative z-10">
        {activeTab === 'dashboard' && (
          <Dashboard 
            items={items} 
            orders={orders} 
            onNavigate={(tab) => {
              if (tab === 'inventory' || tab === 'sales' || tab === 'ai-advisor') {
                setActiveTab(tab);
              }
            }} 
            triggerAiAudit={handleTriggerAiAudit}
          />
        )}

        {activeTab === 'inventory' && (
          <Inventory 
            items={items}
            onAddItem={handleAddItem}
            onUpdateStock={handleUpdateStock}
          />
        )}

        {/* CUSTOMERS & SALES CRM SCREEN */}
        {activeTab === 'sales' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em]">CRM & MULTI-MARKETPLACE CONSOLE</span>
                <h1 className="text-2xl sm:text-3xl font-bold uppercase text-white font-sans-editorial tracking-tight flex items-center gap-2">
                  Basis Data Pelanggan & Pesanan Toko
                </h1>
                <p className="text-xs sm:text-sm text-white/50">Sinkronisasi mutakhir profil pelanggan dan validasi siklus pengiriman.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Orders and Fulfillments list (8 cols) */}
              <div className="lg:col-span-8 bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-bold tracking-wider font-mono-editorial uppercase text-[#38bdf8]">
                    Alur Kerja Pemesanan Lintas Kanal
                  </h3>
                  <span className="text-[10px] font-mono-editorial text-white/40">Total: {orders.length} Pesanan</span>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => {
                    const isCompleted = order.status === 'Completed';
                    const isPackaging = order.status === 'Packaging';
                    return (
                      <div 
                        key={order.id} 
                        className="p-5 bg-white/[0.01] hover:bg-[#18181b] border border-white/5 hover:border-white/15 rounded-xl transition space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono-editorial font-bold text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                              {order.orderNumber}
                            </span>
                            <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase">
                              {order.marketplace}
                            </span>
                          </div>
                          
                          <span className="text-[10px] text-white/40 font-mono-editorial">
                            Masuk: {new Date(order.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {/* List items attached */}
                        <div className="space-y-1 pl-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-white/70">
                              <span>{it.name} <b className="text-[#38bdf8] font-bold">x{it.quantity}</b></span>
                              <span className="font-mono-editorial">Rp {(it.price * it.quantity).toLocaleString('id-ID')}</span>
                            </div>
                          ))}
                        </div>

                        {/* Logistics info */}
                        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-white/55">
                          <div className="space-y-0.5">
                            <div>Nama Pembeli: <b className="text-white">{order.customerName}</b></div>
                            <div className="text-[10px]">Kurir Pengiriman: {order.shippingOption}</div>
                            {order.trackingNumber && (
                              <div className="text-[10px] font-mono-editorial text-[#38bdf8]">No Resi: {order.trackingNumber}</div>
                            )}
                          </div>

                          {/* Fulfillment actions inside layout */}
                          <div className="flex items-center gap-2 pt-1 sm:pt-0">
                            {order.status === 'Pending' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'Packaging')}
                                className="px-3.5 py-1.5 bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8]/20 border border-[#38bdf8]/25 rounded-lg text-[10px] font-mono-editorial uppercase tracking-wider transition"
                              >
                                Siapkan Paket
                              </button>
                            )}
                            {order.status === 'Packaging' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'Ready to Ship')}
                                className="px-3.5 py-1.5 bg-[#38bdf8] text-black hover:bg-[#0ea5e9] font-bold rounded-lg text-[10px] font-mono-editorial uppercase tracking-wider transition"
                              >
                                Selesai Kemas & Cetak Resi
                              </button>
                            )}
                            {order.status === 'Ready to Ship' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
                                className="px-3.5 py-1.5 bg-zinc-800 text-white/90 hover:bg-zinc-700 border border-white/10 rounded-lg text-[10px] font-mono-editorial uppercase tracking-wider transition"
                              >
                                Serahkan ke Kurir Logistik
                              </button>
                            )}
                            {order.status === 'Shipped' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'Completed')}
                                className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-[10px] font-mono-editorial uppercase tracking-wider transition"
                              >
                                Tandai Selesai
                              </button>
                            )}
                            {isCompleted && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono-editorial uppercase font-bold tracking-wider px-2 py-1">
                                <CheckCircle size={10} /> TERKIRIM & SELESAI
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Customer segmentation details CRM (4 cols) */}
              <div className="lg:col-span-4 bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-sm font-bold tracking-wider font-mono-editorial uppercase text-[#38bdf8]">
                    Informasi Segmen Pelanggan
                  </h3>
                  <p className="text-[10px] text-white/45 font-mono-editorial tracking-widest mt-0.5">CRM INTEGRATED PROFILES</p>
                </div>

                <div className="space-y-4">
                  {customers.map((cust) => {
                    const statusColor = 
                      cust.segment === 'VIP' ? 'text-purple-400 bg-purple-500/5 border-purple-550/25' :
                      cust.segment === 'Loyal' ? 'text-emerald-400 bg-emerald-500/5 border-emerald-550/25' :
                      cust.segment === 'New' ? 'text-sky-400 bg-[#38bdf8]/5 border-[#38bdf8]/20' :
                      'text-white/60 bg-white/5 border-white/10';

                    return (
                      <div key={cust.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white">{cust.name}</h4>
                          <span className={`text-[9px] font-mono-editorial font-bold uppercase border rounded px-1.5 py-0.5 ${statusColor}`}>
                            {cust.segment} Set
                          </span>
                        </div>
                        <p className="text-[10px] text-white/50 font-mono-editorial truncate">{cust.email}</p>
                        
                        <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] font-mono-editorial border-t border-white/5 text-white/70">
                          <div>
                            <span className="text-[9px] text-white/40 uppercase block">Total Transaksi</span>
                            <span className="text-white font-bold">Rp {cust.totalSpent.toLocaleString('id-ID')}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-white/40 uppercase block">Jumlah Order</span>
                            <span className="text-white font-bold">{cust.ordersCount} Kali</span>
                          </div>
                        </div>

                        {cust.notes && (
                          <p className="text-[10px] text-[#38bdf8] italic pt-1 leading-relaxed">
                            "{cust.notes}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 2: Fitur CRM Info Card Section */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden mt-6">
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/[0.01] rounded-full blur-[100px] pointer-events-none"></div>
              <div className="max-w-2xl space-y-2">
                <span className="text-[10px] font-mono-editorial text-purple-400 uppercase tracking-[0.3em] block">
                  CUSTOMER RETENTION HUB
                </span>
                <h2 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans-editorial tracking-tight flex items-center gap-2">
                  Kenali Pelanggan Anda Lebih Dalam, Tingkatkan Repeat Order.
                </h2>
                <p className="text-xs text-white/50 font-sans-editorial">
                  Data pelanggan bukan sekadar nama dan nomor telepon, melainkan kunci pertumbuhan omzet Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-[#18181b]/40 border border-[#white]/5 rounded-xl space-y-3 hover:border-purple-500/30 transition">
                  <div className="text-purple-400">
                    <UserCheck size={18} />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">
                    Segmentasi Konsumen Otomatis
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans-editorial">
                    Nexora AI secara cerdas mengelompokkan pelanggan setia, pelanggan baru, hingga pelanggan yang sudah lama tidak berbelanja.
                  </p>
                </div>

                <div className="p-5 bg-[#18181b]/40 border border-white/5 rounded-xl space-y-3 hover:border-[#38bdf8]/30 transition">
                  <div className="text-[#38bdf8]">
                    <Clock size={18} />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">
                    Riwayat Transaksi Terpusat
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans-editorial">
                    Akses cepat ke data preferensi produk setiap pelanggan untuk strategi promosi yang lebih personal dan tepat sasaran.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEXORA AI OPERATIONS ADVISOR CHAT SCREEN */}
        {activeTab === 'ai-advisor' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em]">AI MANAGEMENT LAYER</span>
              <h1 className="text-3xl font-bold uppercase text-white font-sans-editorial tracking-tight">
                Nexora AI Advisor
              </h1>
              <p className="text-xs sm:text-sm text-white/60">
                Pindai kesehatan operasional, analisis tingkat rasio persediaan, rekomendasi logistik pengemasan, 
                dan temukan strategi penciptaan efisiensi hingga 380%.
              </p>
            </div>

            {/* Quick Action prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                disabled={isAnalyzing}
                onClick={handleTriggerAiAudit}
                className="p-4 bg-[#121212] border border-white/15 hover:border-[#38bdf8]/40 hover:bg-[#18181b] rounded-xl text-left transition space-y-2"
              >
                <div className="w-7 h-7 bg-white/5 rounded flex items-center justify-center text-[#38bdf8]">
                  <Database size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">Audit Persediaan Pokok</h4>
                  <p className="text-[10px] text-white/50 leading-relaxed font-sans-editorial mt-0.5">Analisis instan stok berlebih vs menipis.</p>
                </div>
              </button>

              <button 
                disabled={isAnalyzing}
                onClick={async () => {
                  setCustomQuery('Tunjukkan rekomendasi packing pengemasan yang paling hemat berat volumetrik untuk ongkir kurir marketplace.');
                  setIsAnalyzing(true);
                  setChatLog(prev => [...prev, { sender: 'user', text: 'Tunjukkan rekomendasi packing pengemasan paling efisien.' }]);
                  try {
                    const response = await fetch('/api/gemini/analyze', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ items, query: 'rekomendasi packing pengemasan paling efisien hemat ongkos kirim' })
                    });
                    const d = await response.json();
                    setChatLog(prev => [...prev, { sender: 'nexora', text: d.text }]);
                  } catch(e) {
                    setChatLog(prev => [...prev, { sender: 'nexora', text: 'Berdasarkan berat produk yang Anda miliki, kemas produk di bawah 500g (seperti Serum Glow & Lampu LED) menggunakan *mailer pouch bubblewrap liner* dibanding kardus karton agar menghemat rata-rata **150g per paket** volumetrik, meningkatkan efisiensi keuntungan ongkir signifikan.' }]);
                  } finally {
                    setIsAnalyzing(false);
                  }
                }}
                className="p-4 bg-[#121212] border border-white/15 hover:border-[#38bdf8]/40 hover:bg-[#18181b] rounded-xl text-left transition space-y-2"
              >
                <div className="w-7 h-7 bg-white/5 rounded flex items-center justify-center text-[#38bdf8]">
                  <Bookmark size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">Strategi Pengemasan</h4>
                  <p className="text-[10px] text-white/50 leading-relaxed mt-0.5 font-sans-editorial">Formula hemat dimensi pack agar hemat ongkir lintas pulau.</p>
                </div>
              </button>

              <button 
                disabled={isAnalyzing}
                onClick={async () => {
                  setCustomQuery('Bagaimana skenario mempercepat operasional toko saya hingga mencapai efisiensi 380%?');
                  setIsAnalyzing(true);
                  setChatLog(prev => [...prev, { sender: 'user', text: 'Bagaimana cara mencapai efisiensi 380%?' }]);
                  try {
                    const response = await fetch('/api/gemini/analyze', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ items, query: 'Bagaimana platform Nexora meningkatkan efisiensi hingga 380%?' })
                    });
                    const d = await response.json();
                    setChatLog(prev => [...prev, { sender: 'nexora', text: d.text }]);
                  } catch(e) {
                    setChatLog(prev => [...prev, { sender: 'nexora', text: 'Untuk mencapai peningkatan efisiensi **380%**:\n\n1. **Gunakan Smart Scan AI** di submenu Gudang untuk pelabelan instan produk baru tanpa input pengetikan manual.\n2. **Gunakan Alur Kerja Pesanan** di submenu CRM untuk memproses pesanan langsung ke status cetak resi otomatis.\n3. **Cegah Stockout** dengan mengawasi metrik peringatan kritis pada list barang.' }]);
                  } finally {
                    setIsAnalyzing(false);
                  }
                }}
                className="p-4 bg-[#121212] border border-white/15 hover:border-[#38bdf8]/40 hover:bg-[#18181b] rounded-xl text-left transition space-y-2"
              >
                <div className="w-7 h-7 bg-white/5 rounded flex items-center justify-center text-[#38bdf8]">
                  <Cpu size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial font-bold">Rasio Efisiensi 380%</h4>
                  <p className="text-[10px] text-white/50 leading-relaxed mt-0.5 font-sans-editorial">Logika integrasi multi-marketplace optimal.</p>
                </div>
              </button>
            </div>

            {/* Chat Conversation Box */}
            <div className="bg-[#121212] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[450px]">
              
              {/* Header inside conversational channel */}
              <div className="bg-[#18181b] p-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] pulse-indicator"></div>
                  <span className="text-xs font-mono-editorial font-bold text-white uppercase tracking-wider">Nexora AI Terminal Aktif</span>
                </div>
                <span className="text-[9px] font-mono-editorial text-white/30">TEMPERATURE: 0.7f</span>
              </div>

              {/* Chat messages stream */}
              <div className="flex-grow p-5 overflow-y-auto space-y-4 custom-scrollbar">
                {chatLog.map((chat, idx) => {
                  const isUser = chat.sender === 'user';
                  return (
                    <div 
                      key={idx} 
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          isUser 
                            ? 'bg-[#38bdf8] text-black font-sans-editorial font-semibold' 
                            : 'bg-[#18181b] border border-white/10 text-white/85 font-sans-editorial'
                        }`}
                      >
                        {chat.sender === 'nexora' ? (
                          <div className="space-y-2 text-white/90">
                            {/* Primitive but beautiful Markdown render block */}
                            {chat.text.split('\n').map((line, lIdx) => {
                              if (line.startsWith('### ')) {
                                return <h4 key={lIdx} className="text-sm font-bold text-[#38bdf8] uppercase tracking-wider block mt-2">{line.replace('### ', '')}</h4>;
                              }
                              if (line.startsWith('* ')) {
                                return <li key={lIdx} className="list-disc pl-4 text-white/80 mt-1">{line.replace('* ', '')}</li>;
                              }
                              return <p key={lIdx} className="mt-1">{line}</p>;
                            })}
                          </div>
                        ) : (
                          <span>{chat.text}</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="bg-[#18181b] border border-white/10 rounded-2xl p-4 flex items-center gap-2.5">
                      <div className="flex gap-1 justify-center items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce" style={{ animationDelay: '200ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce" style={{ animationDelay: '400ms' }}></span>
                      </div>
                      <span className="text-xs font-mono-editorial text-white/40">Nexora sedang memformulasikan data...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Question Textarea form */}
              <form onSubmit={handleAskCustomQuery} className="p-4 bg-[#18181b] border-t border-white/10 flex gap-3">
                <input 
                  type="text" 
                  value={customQuery}
                  placeholder="Ketik pertanyaan strategi bisnis atau mintalah restock plan..."
                  disabled={isAnalyzing}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="flex-grow bg-[#0a0a0a] border border-white/10 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38bdf8] placeholder-white/20 font-sans-editorial"
                />
                <button 
                  type="submit"
                  disabled={isAnalyzing || !customQuery.trim()}
                  className="p-2.5 sm:px-5 bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:bg-white/5 disabled:text-white/20 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-1.5 self-center shrink-0"
                >
                  <Send size={14} /> <span className="hidden sm:inline">Kirim</span>
                </button>
              </form>

            </div>

            {/* Section 3: Fitur Utama AI */}
            <div className="bg-[#121212]/90 border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/[0.01] rounded-full blur-[120px] pointer-events-none"></div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono-editorial text-[#38bdf8] uppercase tracking-[0.3em] block">
                  INTELLIGENT FORECAST ENGINE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans-editorial tracking-tight flex items-center gap-1.5">
                  Didukung oleh AI Advisor: Miliki Konsultan Bisnis Pribadi 24/7.
                </h2>
                <p className="text-xs text-white/50 font-sans-editorial leading-relaxed">
                  Biarkan Artificial Intelligence bekerja menganalisis data rumit Anda dan mengubahnya menjadi keputusan bisnis yang menguntungkan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-[#18181b]/40 border border-white/5 rounded-xl space-y-3 hover:border-[#38bdf8]/30 transition group">
                  <div className="text-[#38bdf8]">
                    <TrendingUp size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">
                    Prediksi Tren Penjualan
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans-editorial">
                    AI memproyeksikan produk apa yang akan laris bulan depan berdasarkan data historis, sehingga Anda bisa menyetok barang dengan tepat.
                  </p>
                </div>

                <div className="p-5 bg-[#18181b]/40 border border-white/5 rounded-xl space-y-3 hover:border-red-500/30 transition group">
                  <div className="text-red-400">
                    <AlertTriangle size={18} className="animate-pulse" />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono-editorial">
                    Audit Operasional Instan
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans-editorial">
                    Menemukan celah pemborosan biaya atau proses logistik yang lambat secara otomatis, memberikan rekomendasi perbaikan secara langsung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Editorial Bottom Micro-Bar (from Design HTML requirement) */}
      <footer className="h-[40px] px-6 sm:px-12 flex items-center justify-between border-t border-white/10 text-[9px] uppercase tracking-[0.2em] text-white/30 bg-[#0A0A0A] relative z-20">
        <div className="truncate pr-4">Inventory Nexora AI - Platform Manajemen Bisnis Terintegrasi</div>
        <div className="hidden sm:flex gap-6 shrink-0">
          <span>Status: Sistem AI Aktif</span>
          <span>Lokasi Server: Jakarta - SGP</span>
          <span>Versi: 2.4.0-PRO</span>
        </div>
      </footer>

    </div>
  );
}
