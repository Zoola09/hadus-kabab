export interface CustomizationOption {
  name: string;
  priceModifier: number;
}

export interface MenuItemCustomization {
  sizes: CustomizationOption[];
  sauces: CustomizationOption[];
  extras: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  name_lt?: string;
  description: string;
  description_lt?: string;
  category: 'kebabs' | 'wraps' | 'plates' | 'sides' | 'drinks';
  basePrice: number;
  image: string;
  popular?: boolean;
  customization?: MenuItemCustomization;
}

export interface CartItem {
  cartId: string; // unique cart instance ID
  menuItem: MenuItem;
  selectedSize: CustomizationOption;
  selectedSauce: CustomizationOption;
  selectedExtras: CustomizationOption[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  phone: string;
  type: 'pickup' | 'delivery';
  paymentMethod: 'card' | 'gpay_apple' | 'cash';
  deliveryAddress?: string;
  status: 'received' | 'grilling' | 'wrapping' | 'ready' | 'completed';
  timestamp: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
