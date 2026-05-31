import { InventoryItem, SalesOrder, Customer } from './types';

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "item-1",
    sku: "NEX-KOPI-001",
    name: "Kopi Arabika Gayo Nexora Blend 250g",
    category: "Food & Beverage",
    stock: 120,
    minStock: 30,
    warehouseLocation: "Rak A-02",
    price: 65000,
    weight: 270,
    salesCount: 450
  },
  {
    id: "item-2",
    sku: "NEX-LED-Smart",
    name: "Nexora Smart LED Bulb RGB WiFi 12W",
    category: "Elektronik",
    stock: 15, // Low stock alert!
    minStock: 25,
    warehouseLocation: "Rak C-11",
    price: 135000,
    weight: 180,
    salesCount: 310
  },
  {
    id: "item-3",
    sku: "NEX-HOOD-BLK",
    name: "Hoodie Comfort Oversized Jet Black XL",
    category: "Fashion",
    stock: 45,
    minStock: 15,
    warehouseLocation: "Rak B-05",
    price: 249000,
    weight: 650,
    salesCount: 180
  },
  {
    id: "item-4",
    sku: "NEX-SERUM-03",
    name: "Serum Glow Hyaluronic Nexora Skin 30ml",
    category: "Kosmetik",
    stock: 8, // Low stock!
    minStock: 20,
    warehouseLocation: "Rak D-01",
    price: 110000,
    weight: 90,
    salesCount: 520
  },
  {
    id: "item-5",
    sku: "NEX-MOUSE-WRL",
    name: "Mouse Wireless Ergonomis Nexora Click 2.4G",
    category: "Elektronik",
    stock: 75,
    minStock: 15,
    warehouseLocation: "Rak C-14",
    price: 189000,
    weight: 120,
    salesCount: 140
  },
  {
    id: "item-6",
    sku: "NEX-BOT-SSL",
    name: "Botol Tumbler Vacuum Insulated Stainless Steel 500ml",
    category: "Home & Living",
    stock: 150,
    minStock: 40,
    warehouseLocation: "Rak E-03",
    price: 95000,
    weight: 350,
    salesCount: 95
  }
];

export const INITIAL_ORDERS: SalesOrder[] = [
  {
    id: "order-1",
    orderNumber: "NEX-ORD-202605A",
    marketplace: "Tokopedia",
    customerName: "Budi Setiawan",
    items: [
      { sku: "NEX-KOPI-001", name: "Kopi Arabika Gayo Nexora Blend 250g", quantity: 2, price: 65000 }
    ],
    totalPrice: 130000,
    status: "Completed",
    createdAt: "2026-05-31T08:30:22Z",
    shippingOption: "J&T Express - Reguler",
    trackingNumber: "JT92830182390"
  },
  {
    id: "order-2",
    orderNumber: "NEX-ORD-202605B",
    marketplace: "Shopee",
    customerName: "Dewi Lestari",
    items: [
      { sku: "NEX-SERUM-03", name: "Serum Glow Hyaluronic Nexora Skin 30ml", quantity: 1, price: 110000 },
      { sku: "NEX-KOPI-001", name: "Kopi Arabika Gayo Nexora Blend 250g", quantity: 1, price: 65000 }
    ],
    totalPrice: 175000,
    status: "Packaging",
    createdAt: "2026-05-31T14:15:10Z",
    shippingOption: "Sicepat - HALU"
  },
  {
    id: "order-3",
    orderNumber: "NEX-ORD-202605C",
    marketplace: "TikTok Shop",
    customerName: "Yudi Pratama",
    items: [
      { sku: "NEX-HOOD-BLK", name: "Hoodie Comfort Oversized Jet Black XL", quantity: 1, price: 249000 }
    ],
    totalPrice: 249000,
    status: "Pending",
    createdAt: "2026-05-31T15:45:00Z",
    shippingOption: "JNE - Reguler"
  },
  {
    id: "order-4",
    orderNumber: "NEX-ORD-202605D",
    marketplace: "Lazada",
    customerName: "Amelia Putri",
    items: [
      { sku: "NEX-LED-Smart", name: "Nexora Smart LED Bulb RGB WiFi 12W", quantity: 1, price: 135000 }
    ],
    totalPrice: 135000,
    status: "Ready to Ship",
    createdAt: "2026-05-31T12:05:00Z",
    shippingOption: "Anteraja - Regular",
    trackingNumber: "ANT9872198"
  },
  {
    id: "order-5",
    orderNumber: "NEX-ORD-202605E",
    marketplace: "Shopee",
    customerName: "Rian Hidayat",
    items: [
      { sku: "NEX-KOPI-001", name: "Kopi Arabika Gayo Nexora Blend 250g", quantity: 3, price: 65000 },
      { sku: "NEX-BOT-SSL", name: "Botol Tumbler Vacuum Insulated Stainless Steel 500ml", quantity: 1, price: 95000 }
    ],
    totalPrice: 290000,
    status: "Shipped",
    createdAt: "2026-05-31T09:12:00Z",
    shippingOption: "Shopee Express - Instant",
    trackingNumber: "SPX837261901"
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    name: "Budi Setiawan",
    email: "budi.setiawan@gmail.com",
    phone: "+62 812-3456-7890",
    segment: "Loyal",
    totalSpent: 1250000,
    lastOrderDate: "2026-05-31",
    ordersCount: 8,
    notes: "Sangat menyukai kopi blend reguler. Mengutamakan respon cepat."
  },
  {
    id: "cust-2",
    name: "Dewi Lestari",
    email: "dewi.lestari99@gmail.com",
    phone: "+62 813-9876-5432",
    segment: "VIP",
    totalSpent: 3450000,
    lastOrderDate: "2026-05-31",
    ordersCount: 22,
    notes: "Pembeli VIP. Berhak mendapatkan gift eksklusif pada pemesanan di atas Rp 200rb."
  },
  {
    id: "cust-3",
    name: "Yudi Pratama",
    email: "yudi.pratama@outlook.com",
    phone: "+62 856-7812-3456",
    segment: "New",
    totalSpent: 249000,
    lastOrderDate: "2026-05-31",
    ordersCount: 1,
    notes: "Pelanggan baru dari ulasan viral TikTok."
  },
  {
    id: "cust-4",
    name: "Amelia Putri",
    email: "amelia.p@yahoo.com",
    phone: "+62 878-3344-5566",
    segment: "Regular",
    totalSpent: 450000,
    lastOrderDate: "2026-05-31",
    ordersCount: 3,
    notes: "Sering membeli gadget IoT rumah pintar."
  },
  {
    id: "cust-5",
    name: "Rian Hidayat",
    email: "rian.hid@gmail.com",
    phone: "+62 811-2233-4455",
    segment: "Loyal",
    totalSpent: 1850000,
    lastOrderDate: "2026-05-31",
    ordersCount: 11,
    notes: "Reseller berskala kecil. Sering memesan barang bundle."
  }
];
