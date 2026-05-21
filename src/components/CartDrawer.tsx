import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MapPin, Truck, HelpCircle, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (cartId: string, currentQty: number, adjustment: number) => void;
  onRemove: (cartId: string) => void;
  onCheckout: (
    name: string,
    phone: string,
    type: 'pickup' | 'delivery',
    paymentMethod: 'card' | 'gpay_apple' | 'cash',
    address?: string
  ) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const { language, t } = useLanguage();
  
  // Order Type toggling: pickup vs delivery
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // Payment methods: card, gpay_apple, or cash
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gpay_apple' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceFee = subtotal > 0 ? 1.50 : 0;
  const grandTotal = subtotal + serviceFee;

  const handleCheckoutSubmit = () => {
    const errors: Record<string, string> = {};
    if (orderType === 'delivery') {
      if (!customerName.trim()) {
        errors.name = language === 'lt' ? 'Prašome nurodyti savo vardą' : 'Please provide your name';
      }
      if (!customerPhone.trim()) {
        errors.phone = language === 'lt' ? 'Reikalingas galiojantis telefonas užsakymo patvirtinimui' : 'Valid phone is required for order verification';
      }
      if (!deliveryAddress.trim()) {
        errors.address = language === 'lt' ? 'Reikalingas fizinis pristatymo adresas' : 'A physical delivery address is required';
      }
    }

    if (paymentMethod === 'card') {
      const cleanNum = cardNumber.replace(/\s+/g, '');
      if (!cleanNum.trim() || cleanNum.length < 12) {
        errors.cardNumber = language === 'lt' ? 'Nurodykite teisingą kortelės numerį (min 12 skaičių)' : 'Provide a valid card (min 12 digits)';
      }
      if (!cardExpiry.trim() || !cardExpiry.includes('/')) {
        errors.cardExpiry = language === 'lt' ? 'Nurodykite galiojimo datą MM/YY formatu' : 'Provide MM/YY expiry';
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        errors.cardCvv = language === 'lt' ? 'Nurodykite 3 skaitmenų CVV kodą' : 'Provide active 3-digit CVV';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    onCheckout(
      orderType === 'pickup' ? (language === 'lt' ? 'Atsiėmimas vietoje' : 'Local Handout') : customerName, 
      orderType === 'pickup' ? 'N/A' : customerPhone, 
      orderType, 
      paymentMethod,
      orderType === 'delivery' ? deliveryAddress : undefined
    );

    // Reset local fields upon submission
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  const handleWalletCheckout = (provider: 'Google Pay' | 'Apple Pay') => {
    const errors: Record<string, string> = {};
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      errors.address = language === 'lt' ? 'Reikalingas fizinis pristatymo adresas' : 'A physical delivery address is required';
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const nameToUse = orderType === 'pickup' ? (language === 'lt' ? 'Svečias' : 'Pickup Guest') : (customerName.trim() || `${provider} User`);
    const phoneToUse = orderType === 'pickup' ? 'N/A' : (customerPhone.trim() || '+37061234567');

    onCheckout(
      nameToUse,
      phoneToUse,
      orderType,
      'gpay_apple',
      orderType === 'delivery' ? deliveryAddress : undefined
    );

    // Reset local fields upon submission
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  const getLocalizedSizeName = (name: string, lang: string) => {
    if (lang !== 'lt') return name.split(' (')[0];
    const lower = name.toLowerCase();
    if (lower.includes('regular')) return 'Reguliarus';
    if (lower.includes('large')) return 'Didelis';
    if (lower.includes('grand')) return 'Karališkas';
    if (lower.includes('bread')) return 'Tradicinė duona';
    if (lower.includes('lavash')) return 'Lavašas';
    if (lower.includes('plated')) return 'Didelė lėkštė';
    if (lower.includes('single')) return 'Vienguba porcija';
    if (lower.includes('double')) return 'Dviguba porcija';
    if (lower.includes('tall')) return 'Didelė 500ml';
    if (lower.includes('normal')) return 'Vidutinė 330ml';
    return name.split(' (')[0];
  };

  const getLocalizedSauceName = (name: string, lang: string) => {
    if (lang !== 'lt') return name.split(' Special')[0];
    const lower = name.toLowerCase();
    if (lower.includes('garlic')) return 'Aštrus česnakinis';
    if (lower.includes('tzatziki')) return 'Švelnus Tzatziki';
    if (lower.includes('tahini')) return 'Saldus Tahini';
    if (lower.includes('none') || lower === 'none') return 'Be padažo';
    return name.split(' Special')[0];
  };

  const getLocalizedExtraName = (name: string, lang: string) => {
    if (lang !== 'lt') return name.split(' Slice')[0].split(' Extra ')[0];
    const lower = name.toLowerCase();
    if (lower.includes('feta')) return 'Sūris Feta';
    if (lower.includes('jalapeno')) return 'Chalapos pipirai';
    if (lower.includes('avocado')) return 'Avokadas';
    if (lower.includes('pita')) return 'Pitos duonelė';
    if (lower.includes('sumac')) return 'Sumac prieskoniai';
    return name.split(' Slice')[0].split(' Extra ')[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/80 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Drawer content core */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left z-10 border-l border-warm-beige-dark">
        
        {/* HEADER SECTION */}
        <div className="p-5 bg-charcoal text-white flex items-center justify-between border-b border-charcoal-light flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5.5 h-5.5 text-gold-orange" />
            <span className="font-display text-lg font-bold tracking-tight uppercase">
              {language === 'lt' ? 'Pirkinių krepšelis' : 'Your Shopping Bag'}
            </span>
            {cart.length > 0 && (
              <span className="px-2 py-0.5 bg-gold-orange text-white text-[11px] font-bold rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-charcoal-light text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CART MAIN BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            /* EMPTY CART STATE */
            <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
              <div className="w-20 h-20 bg-warm-beige-light rounded-full flex items-center justify-center mb-5 text-gray-400">
                <ShoppingBag className="w-10 h-10 text-gold-orange/50" />
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                {language === 'lt' ? 'Jūsų krepšelis atrodo labai tuščias...' : 'Your bag feels very light...'}
              </h3>
              <p className="font-sans text-sm text-gray-500 max-w-xs mb-8">
                {language === 'lt'
                  ? 'Sultingi vištienos iešmeliai, traškūs suktinukai ir kiti dūminiai kepsniai jau paruošti kepti!'
                  : 'Freshly skewered chicken, sizzling traditional lamb skewers, and premium garlic wraps are ready to fulfill your cravings!'}
              </p>
              <button
                onClick={onClose}
                className="bg-gold-orange hover:bg-gold-orange-hover text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all duration-300 w-full cursor-pointer"
              >
                {language === 'lt' ? 'Vartyti Meniu dabar' : 'Browse Menu Now'}
              </button>
            </div>
          ) : (
            <>
              {/* CUSTOM CHOICES SCROLL */}
              <div className="space-y-4">
                <span className="font-display text-xs font-extrabold uppercase tracking-widest text-charcoal/85 bg-warm-beige-light/80 px-2 py-0.5 rounded border border-warm-beige/40 inline-block mb-2">
                  {language === 'lt' ? 'Užsakymo suvestinė' : 'Order Summaries'}
                </span>
                
                {cart.map((item) => {
                  const nameVal = (language === 'lt' && item.menuItem.name_lt) ? item.menuItem.name_lt : item.menuItem.name;
                  
                  return (
                    <div
                      key={item.cartId}
                      className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-warm-beige-light/50 border border-warm-beige/30 hover:border-warm-beige-dark transition-all duration-300 relative group"
                    >
                      {/* Photo thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={item.menuItem.image}
                          alt={nameVal}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                      </div>

                      {/* Options specs list */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans text-sm font-bold text-charcoal leading-tight truncate">
                          {nameVal}
                        </h4>
                        
                        {/* Sizing description */}
                        <div className="flex flex-wrap gap-1 mt-1 text-[11px] font-sans font-medium text-gray-500">
                          <span className="bg-white px-1.5 py-0.5 rounded border border-gray-100 text-charcoal font-semibold">
                            {getLocalizedSizeName(item.selectedSize.name, language)}
                          </span>
                          {item.selectedSauce.name && item.selectedSauce.name !== 'None' && (
                            <span className="bg-white px-1.5 py-0.5 rounded border border-gray-100">
                              {language === 'lt' ? 'Padažas' : 'Sauce'}: {getLocalizedSauceName(item.selectedSauce.name, language)}
                            </span>
                          )}
                        </div>

                        {/* Extras descriptors */}
                        {item.selectedExtras.length > 0 && (
                          <p className="text-[10px] font-sans text-gold-orange font-bold mt-1.5 truncate">
                            + {item.selectedExtras.map((e) => getLocalizedExtraName(e.name, language)).join(', ')}
                          </p>
                        )}

                        {/* Quantity Selector + Price panel */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Incrementor */}
                          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border border-gray-150">
                            <button
                              onClick={() => onUpdateQty(item.cartId, item.quantity, -1)}
                              className="p-1 rounded bg-gray-50 hover:bg-gold-orange hover:text-white transition-colors cursor-pointer"
                              aria-label="Decrease item quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-charcoal w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(item.cartId, item.quantity, 1)}
                              className="p-1 rounded bg-gray-50 hover:bg-gold-orange hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase item quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Cash Panel */}
                          <span className="font-mono text-xs font-bold text-charcoal">
                            €{item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Absolute remove icon */}
                      <button
                        onClick={() => onRemove(item.cartId)}
                        className="absolute top-2.5 right-2.5 p-1 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* CHECKOUT SETTINGS & DETAILS (SCROLLS COMFORTABLY WITH MAIN BODY) */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-6 text-left">
                
                {/* ORDER TYPE SELECTOR */}
                <div>
                  <span className="font-display text-xs font-extrabold uppercase tracking-widest text-[#1E1E1E] block mb-2">
                    {language === 'lt' ? 'Atsiėmimo būdas' : 'Fulfillment Mode'}
                  </span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-semibold cursor-pointer transition-all duration-200 ${
                        orderType === 'pickup'
                          ? 'bg-gold-orange text-white shadow'
                          : 'text-gray-600 hover:text-charcoal'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{language === 'lt' ? 'Atsiėmimas vietoje' : 'Local Pickup'}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-semibold cursor-pointer transition-all duration-200 ${
                        orderType === 'delivery'
                          ? 'bg-gold-orange text-white shadow'
                          : 'text-gray-600 hover:text-charcoal'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>{language === 'lt' ? 'Pristatymas į namus' : 'Home Delivery'}</span>
                    </button>
                  </div>
                </div>

                {/* CUSTOMER INFO FIELDS */}
                {orderType === 'delivery' && (
                  <div className="space-y-3.5 animate-fade-in">
                    <span className="font-display text-xs font-extrabold uppercase tracking-widest text-[#1E1E1E] block mb-1.5">
                      {language === 'lt' ? 'Pristatymo duomenys' : 'Receipt Details'}
                    </span>

                    <div>
                      <input
                        type="text"
                        placeholder={language === 'lt' ? 'Jūsų vardas ir pavardė' : 'Your Full Name'}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border font-medium bg-white focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange shadow-sm transition-all duration-200 ${
                          formErrors.name ? 'border-red-400 ring-2 ring-red-400/20' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      />
                      {formErrors.name && (
                        <span className="text-[10px] font-bold text-red-500 block mt-1">{formErrors.name}</span>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder={language === 'lt' ? 'Telefono numeris patvirtinimui' : 'Phone Number for Verification'}
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border font-medium bg-white focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange shadow-sm transition-all duration-200 ${
                          formErrors.phone ? 'border-red-400 ring-2 ring-red-400/20' : 'border-gray-350 hover:border-gray-450'
                        }`}
                      />
                      {formErrors.phone && (
                        <span className="text-[10px] font-bold text-red-500 block mt-1">{formErrors.phone}</span>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder={language === 'lt' ? 'Įveskite tikslų pristatymo adresą' : 'Enter Full Physical Delivery Address'}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border font-medium bg-white focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange shadow-sm transition-all duration-200 ${
                          formErrors.address ? 'border-red-400 ring-2 ring-red-400/20' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      />
                      {formErrors.address && (
                        <span className="text-[10px] font-bold text-red-500 block mt-1">{formErrors.address}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* PAYMENT METHOD SELECTOR */}
                <div className="border-t border-gray-200 pt-4 text-left">
                  <span className="font-display text-xs font-extrabold uppercase tracking-widest text-[#1E1E1E] block mb-2.5">
                    {language === 'lt' ? 'Mokėjimo būdas' : 'Payment Method'}
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2 mr-0.5">
                    {/* Credit card option */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('card');
                        setFormErrors(prev => {
                          const copy = { ...prev };
                          delete copy.cardNumber;
                          delete copy.cardExpiry;
                          delete copy.cardCvv;
                          return copy;
                        });
                      }}
                      className={`py-3 px-1 rounded-xl flex flex-col items-center justify-center space-y-1.5 bg-white border-2 text-center transition-all duration-300 cursor-pointer transform active:scale-95 ${
                        paymentMethod === 'card'
                          ? 'border-gold-orange bg-gold-orange/10 text-[#1E1E1E] font-black shadow-md'
                          : 'border-gray-300 text-stone-600 hover:text-charcoal hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className={`w-4.5 h-4.5 ${paymentMethod === 'card' ? 'text-gold-orange font-bold' : 'text-stone-600'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-tight leading-none scaling-text">
                        {language === 'lt' ? 'Kortele' : 'Pay Card'}
                      </span>
                    </button>

                    {/* Google Pay / Apple Pay option */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('gpay_apple');
                        setFormErrors(prev => {
                          const copy = { ...prev };
                          delete copy.cardNumber;
                          delete copy.cardExpiry;
                          delete copy.cardCvv;
                          return copy;
                        });
                      }}
                      className={`py-3 px-1 rounded-xl flex flex-col items-center justify-center space-y-1.5 bg-white border-2 text-center transition-all duration-300 cursor-pointer transform active:scale-95 ${
                        paymentMethod === 'gpay_apple'
                          ? 'border-gold-orange bg-gold-orange/10 text-[#1E1E1E] font-black shadow-md'
                          : 'border-gray-300 text-stone-600 hover:text-charcoal hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      <Smartphone className={`w-4.5 h-4.5 ${paymentMethod === 'gpay_apple' ? 'text-gold-orange font-bold' : 'text-stone-600'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-tight leading-none scaling-text">Apple/GPay</span>
                    </button>

                    {/* Cash option */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('cash');
                        setFormErrors(prev => {
                          const copy = { ...prev };
                          delete copy.cardNumber;
                          delete copy.cardExpiry;
                          delete copy.cardCvv;
                          return copy;
                        });
                      }}
                      className={`py-3 px-1 rounded-xl flex flex-col items-center justify-center space-y-1.5 bg-white border-2 text-center transition-all duration-300 cursor-pointer transform active:scale-95 ${
                        paymentMethod === 'cash'
                          ? 'border-gold-orange bg-gold-orange/10 text-[#1E1E1E] font-black shadow-md'
                          : 'border-gray-300 text-stone-600 hover:text-charcoal hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      <Wallet className={`w-4.5 h-4.5 ${paymentMethod === 'cash' ? 'text-gold-orange' : 'text-stone-600'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-tight leading-none scaling-text">
                        {language === 'lt' ? 'Grynaisiais' : 'Pay Cash'}
                      </span>
                    </button>
                  </div>

                  {/* Conditional Display Inputs */}
                  {paymentMethod === 'card' && (
                    <div className="mt-3.5 p-3.5 bg-gray-100/85 rounded-xl border border-gray-250 space-y-3.5 animate-fade-in text-left">
                      <div>
                        <span className="text-[10px] uppercase font-extrabold text-[#1E1E1E] tracking-wider block mb-1">
                          {language === 'lt' ? 'Kortelės numeris' : 'Card Number'}
                        </span>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
                            setCardNumber(formatted);
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange ${
                            formErrors.cardNumber ? 'border-red-400 ring-2 ring-red-400/20' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        />
                        {formErrors.cardNumber && (
                          <span className="text-[10px] text-red-500 font-bold block mt-1">{formErrors.cardNumber}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <span className="text-[10px] uppercase font-extrabold text-[#1E1E1E] tracking-wider block mb-1">
                            {language === 'lt' ? 'Galiojimo data' : 'Expiry Date'}
                          </span>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length > 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2, 4);
                              }
                              setCardExpiry(value);
                            }}
                            className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange ${
                              formErrors.cardExpiry ? 'border-red-400 ring-2 ring-red-400/20' : 'border-gray-300 hover:border-gray-400'
                            }`}
                          />
                          {formErrors.cardExpiry && (
                            <span className="text-[10px] text-red-500 font-bold block mt-1">{formErrors.cardExpiry}</span>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-extrabold text-[#1E1E1E] tracking-wider block mb-1">CVC / CVV</span>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className={`w-full px-3 py-2 text-xs rounded-xl border font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange ${
                              formErrors.cardCvv ? 'border-red-400 ring-2 ring-red-400/20' : 'border-gray-300 hover:border-gray-400'
                            }`}
                          />
                          {formErrors.cardCvv && (
                            <span className="text-[10px] text-red-500 font-bold block mt-1">{formErrors.cardCvv}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'gpay_apple' && (
                    <div className="mt-3.5 space-y-2 animate-fade-in text-left">
                      <div className="p-3.5 bg-gray-100/90 rounded-xl border border-gray-250 text-center shadow-inner">
                        <span className="text-[10px] text-stone-700 font-extrabold block mb-2.5 tracking-wider unique-label">
                          {language === 'lt' ? 'SAUGŪS BANDOMIEJI MOKĖJIMAI' : 'SECURE SANDBOX WALLET GATEWAYS'}
                        </span>
                        <div className="flex flex-col space-y-2">
                          <button
                            type="button"
                            onClick={() => handleWalletCheckout('Google Pay')}
                            className="w-full bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl py-2.5 flex items-center justify-center space-x-1.5 px-2 cursor-pointer transition-all duration-200 shadow hover:shadow-md select-none border border-neutral-700"
                          >
                            <span className="font-sans font-bold text-xs">
                              {language === 'lt' ? 'Mokėti su' : 'Pay with'}
                            </span>
                            <span className="font-sans text-xs tracking-tight font-black bg-white text-black px-1.5 py-0.5 rounded leading-none">G Pay</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWalletCheckout('Apple Pay')}
                            className="w-full bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl py-2.5 flex items-center justify-center space-x-1.5 px-2 cursor-pointer transition-all duration-200 shadow hover:shadow-md select-none border border-neutral-700"
                          >
                            <span className="font-sans font-extrabold text-xs"> Pay</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cash' && (
                    <div className="mt-3.5 p-3.5 bg-gold-orange/10 rounded-xl border-2 border-gold-orange/25 animate-fade-in text-left shadow-sm">
                      <div className="flex items-start space-x-2 text-stone-700">
                        <Wallet className="w-4.5 h-4.5 text-gold-orange flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-black text-[#1E1E1E] uppercase tracking-wide">
                            {language === 'lt' ? 'Atsiskaitymas grynaisiais vietoje' : 'Cash payment on delivery/pickup'}
                          </p>
                          <p className="text-[11px] text-stone-600 leading-normal mt-1">
                            {language === 'lt' ? (
                              <>
                                Prašome paruošti tikslią sumą <strong className="text-[#1E1E1E] font-extrabold">€{grandTotal.toFixed(2)}</strong> atsiskaitymui atsiimant užsakymą arba pristačiusiam kurjeriui. Grynieji pinigai priimami iškart!
                              </>
                            ) : (
                              <>
                                Please pay the exact amount of <strong className="text-[#1E1E1E] font-extrabold">${grandTotal.toFixed(2)}</strong> to our staff when collecting your order or to the delivery courier. Cash is accepted instantly!
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* PRICING CHECKS */}
                <div className="border-t border-gray-150 pt-4 space-y-2.5 font-sans text-xs text-left">
                  <div className="flex justify-between text-stone-700 font-semibold">
                    <span>{language === 'lt' ? 'Krepšelio suma' : 'Subtotal Items'}</span>
                    <span className="font-mono text-stone-800 font-bold">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-700 font-semibold items-center">
                    <span className="flex items-center">
                      {language === 'lt' ? 'Pakuotės ir aptarnavimo mokestis' : 'Packaging & Service Fee'}
                      <HelpCircle className="w-3.5 h-3.5 ml-1.5 text-stone-500 hover:text-gold-orange transition-colors cursor-help" title={language === 'lt' ? 'Apima bioskaidžias ekologiškas pakuotes' : 'Includes compostable organic packing foil'} />
                    </span>
                    <span className="font-mono text-stone-800 font-bold">€{serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal text-sm font-extrabold pt-2.5 border-t border-dashed border-gray-300">
                    <span className="text-stone-800 font-black">{language === 'lt' ? 'Iš viso mokėti' : 'Total Amount'}</span>
                    <span className="font-mono text-base text-gold-orange font-extrabold">€{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Dynamic clearance footer margin to ensure scrolled inputs clear the floating bottom panel */}
                <div className="h-10" />

              </div>
            </>
          )}
        </div>

        {/* PINNED BOTTOM SUBMIT CONTAINER */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-gray-150 p-5 flex-shrink-0 shadow-2xl relative z-10">
            <button
              onClick={handleCheckoutSubmit}
              className="w-full bg-gold-orange hover:bg-gold-orange-hover active:scale-[0.97] text-white py-3.5 px-6 rounded-2xl font-extrabold uppercase tracking-widest text-xs shadow-xl hover:shadow-2xl hover:shadow-gold-orange/20 shadow-gold-orange/15 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>{language === 'lt' ? 'Pateikti užsakymą' : 'Place order'}</span>
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
              <span className="font-mono tracking-wide text-xs">€{grandTotal.toFixed(2)}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
