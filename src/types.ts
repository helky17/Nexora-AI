export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  warehouseLocation: string;
  price: number;
  imageUrl?: string;
  weight: number; // in grams
  salesCount: number;
}

export type MarketplaceType = 'Tokopedia' | 'Shopee' | 'Lazada' | 'TikTok Shop';

export interface SalesOrder {
  id: string;
  orderNumber: string;
  marketplace: MarketplaceType;
  customerName: string;
  items: {
    sku: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Packaging' | 'Ready to Ship' | 'Shipped' | 'Completed';
  createdAt: string;
  shippingOption: string;
  trackingNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  segment: 'VIP' | 'Loyal' | 'New' | 'Regular';
  totalSpent: number;
  lastOrderDate: string;
  ordersCount: number;
  notes?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  lowStockCount: number;
  fulfillmentRate: number; // in %
  marketplaceDistribution: Record<MarketplaceType, number>;
  efficiencyGained: number; // e.g., 380%
}
