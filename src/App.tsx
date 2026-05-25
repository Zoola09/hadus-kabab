import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CustomizationModal from './components/CustomizationModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ActiveOrders from './components/ActiveOrders';
import AboutGallery from './components/AboutGallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import { MENU_ITEMS } from './data';
import { MenuItem, CartItem, Order, CustomizationOption } from './types';

export default function App() {
  // Global React items states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Persistence: Restore cart and previous order states from localStorage
  useEffect(() => {
    const cachedCart = localStorage.getItem('hadus_cart');
    const cachedOrders = localStorage.getItem('hadus_orders');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (err) {
        console.error('Failed to parse cached cart', err);
      }
    }
    if (cachedOrders) {
      try {
        setActiveOrders(JSON.parse(cachedOrders));
      } catch (err) {
        console.error('Failed to parse cached orders', err);
      }
    }
  }, []);

  // Save changes to cache securely
  useEffect(() => {
    localStorage.setItem('hadus_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hadus_orders', JSON.stringify(activeOrders));
  }, [activeOrders]);

  // ACTUATION: Live Kitchen Cooking Status Stepper State Machine
  // Cycles order statuses: received -> grilling -> wrapping -> ready (10 seconds intervals)
  useEffect(() => {
    if (activeOrders.length === 0) return;

    // Check if there are active orders that aren't 'ready' yet
    const hasActiveWork = activeOrders.some((order) => order.status !== 'ready');
    if (!hasActiveWork) return;

    const interval = setInterval(() => {
      setActiveOrders((prevOrders) => {
        let stateChanged = false;
        const mapped = prevOrders.map((order) => {
          if (order.status === 'received') {
            stateChanged = true;
            return { ...order, status: 'grilling' as const };
          } else if (order.status === 'grilling') {
            stateChanged = true;
            return { ...order, status: 'wrapping' as const };
          } else if (order.status === 'wrapping') {
            stateChanged = true;
            return { ...order, status: 'ready' as const };
          }
          return order;
        });

        return stateChanged ? mapped : prevOrders;
      });
    }, 12000); // 12 seconds per step - perfect duration for interactive feedback

    return () => clearInterval(interval);
  }, [activeOrders]);

  // ACTIONS: In-Cart modifications
  const handleUpdateQty = (cartId: string, currentQty: number, adjustment: number) => {
    const targetQty = currentQty + adjustment;
    if (targetQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const unitPrice = item.unitPrice;
          return {
            ...item,
            quantity: targetQty,
            totalPrice: unitPrice * targetQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // ACTIONS: Append customized food items to cart
  const handleAddToCart = (
    item: MenuItem,
    size: CustomizationOption,
    sauce: CustomizationOption,
    extras: CustomizationOption[],
    quantity: number
  ) => {
    const extraPriceSum = extras.reduce((sum, curr) => sum + curr.priceModifier, 0);
    const unitPrice = item.basePrice + size.priceModifier + sauce.priceModifier + extraPriceSum;
    const totalPrice = unitPrice * quantity;

    // Generate unique ID for this specific configured custom instance
    const cartId = `${item.id}-${size.name}-${sauce.name}-${extras.map((e) => e.name).sort().join(',')}`;

    setCart((prev) => {
      const matchIndex = prev.findIndex((c) => c.cartId === cartId);
      if (matchIndex > -1) {
        // Exists with identical customizations: increment quantity
        const updated = [...prev];
        const existing = updated[matchIndex];
        const nextQty = existing.quantity + quantity;
        updated[matchIndex] = {
          ...existing,
          quantity: nextQty,
          totalPrice: existing.unitPrice * nextQty,
        };
        return updated;
      } else {
        // New unique choice: append
        return [
          ...prev,
          {
            cartId,
            menuItem: item,
            selectedSize: size,
            selectedSauce: sauce,
            selectedExtras: extras,
            quantity,
            unitPrice,
            totalPrice,
          },
        ];
      }
    });

    // Automatically slide open the bag for interactive receipt confirmation
    setIsCartOpen(true);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const size = item.customization?.sizes[0] || { name: 'Regular', priceModifier: 0 };
    const sauce = (item.customization?.sauces && item.customization.sauces.length > 0)
      ? item.customization.sauces[0]
      : { name: 'None', priceModifier: 0 };
    handleAddToCart(item, size, sauce, [], 1);
  };

  // ACTIONS: Proceed and submit finalized checkout
  const handleCheckout = (
    name: string,
    phone: string,
    type: 'pickup' | 'delivery',
    paymentMethod: 'card' | 'gpay_apple' | 'cash',
    address?: string
  ) => {
    const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0) + 1.50; // Total + service fee
    const orderId = `hd-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      totalAmount,
      customerName: name,
      phone,
      type,
      paymentMethod,
      deliveryAddress: address,
      status: 'received',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Append to live kitchen list, empty checkout drawer and direct user attention to live tracker
    setActiveOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsTrackerOpen(true);
  };

  return (
    <div className="min-h-screen bg-warm-beige-light flex flex-col justify-between selection:bg-gold-orange selection:text-white">
      {/* NAVIGATION SECTION */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeOrders={activeOrders}
        onOpenOrders={() => setIsTrackerOpen(true)}
      />

      {/* HERO SECTION */}
      <Hero />

      {/* DETAILED INTERACTIVE MENU */}
      <div className="bg-white border-y border-warm-beige-dark/20">
        <MenuSection
          items={MENU_ITEMS}
          onItemSelect={(item) => setSelectedMenuItem(item)}
          onQuickAdd={handleQuickAdd}
        />
      </div>

      {/* STORY AND PHOTO GALLERY SECTION */}
      <AboutGallery />

      {/* LOCATION, COORDINATES AND CONTACT FORM */}
      <div className="bg-white border-t border-warm-beige-dark/10">
        <ContactSection />
      </div>

      {/* FOOTER COGNIZANCES */}
      <Footer />

      {/* DRAWER: Shopping Bag Checkout Module */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* MODAL: Checkout payment & details flow */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onCheckoutComplete={handleCheckout}
      />

      {/* MODAL: Sizing, Sauce and Toppings choices selector */}
      <CustomizationModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* MODAL: Active orders Live progress cook stepper */}
      <ActiveOrders
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        activeOrders={activeOrders}
      />
    </div>
  );
}
