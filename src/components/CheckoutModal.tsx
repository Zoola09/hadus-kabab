import React, { useState, useEffect } from 'react';
import { X, MapPin, Truck, CreditCard, Wallet, Smartphone, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onCheckoutComplete: (
    name: string,
    phone: string,
    type: 'pickup' | 'delivery',
    paymentMethod: 'card' | 'gpay_apple' | 'cash',
    address?: string
  ) => void;
}

type CheckoutStep = 'details' | 'payment' | 'processing' | 'success';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  rotation: number;
}

function ConfettiEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#ffb74d', '#ffa726', '#ff7043', '#4db6ac', '#81c784', '#64b5f6', '#ba68c8'];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 90; i++) {
      newParticles.push({
        id: i,
        x: 50, // Center X
        y: 25, // Start near the success icon
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 9 + 5,
        rotation: Math.random() * 360,
      });
    }
    setParticles(newParticles);

    let animationFrameId: number;
    const startTime = Date.now();

    const updateParticles = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed > 2.5) return;

      setParticles((prev) =>
        prev.map((p) => {
          const rad = p.angle;
          const currentSpeed = Math.max(0, p.speed - elapsed * 5.5);
          const dx = Math.cos(rad) * currentSpeed * 2.2;
          const dy = Math.sin(rad) * currentSpeed * 2.2 + elapsed * elapsed * 18;

          return {
            ...p,
            x: p.x + dx,
            y: p.y + dy,
            rotation: p.rotation + currentSpeed * 1.8,
          };
        })
      );

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            borderRadius: p.id % 3 === 0 ? '50%' : p.id % 3 === 1 ? '0%' : '20%',
            opacity: Math.max(0, 1 - (p.y / 100)),
            transition: 'opacity 0.15s ease',
          }}
        />
      ))}
    </div>
  );
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onCheckoutComplete,
}: CheckoutModalProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState<CheckoutStep>('details');
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gpay_apple' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [simulatedOrderId, setSimulatedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceFee = subtotal > 0 ? 1.50 : 0;
  const grandTotal = subtotal + serviceFee;

  const validateDetailsStep = () => {
    const errors: Record<string, string> = {};
    
    // Validate Name (cannot contain numbers, must be at least 2 chars)
    if (!customerName.trim()) {
      errors.name = language === 'lt' ? 'Prašome nurodyti savo vardą' : 'Please provide your name';
    } else if (/\d/.test(customerName)) {
      errors.name = language === 'lt' ? 'Varde negali būti skaičių' : 'Name cannot contain numbers';
    } else if (customerName.trim().length < 2) {
      errors.name = language === 'lt' ? 'Vardas per trumpas' : 'Name is too short';
    }

    // Validate Phone (must be a valid phone number, digits only with optional country code prefix)
    const phoneTrimmed = customerPhone.trim();
    if (!phoneTrimmed) {
      errors.phone = language === 'lt' ? 'Reikalingas telefono numeris' : 'Phone number is required';
    } else {
      const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
      if (!phoneRegex.test(phoneTrimmed)) {
        errors.phone = language === 'lt' ? 'Nurodykite teisingą telefono numerį' : 'Please provide a valid phone number';
      }
    }
    
    // Validate Address (only for delivery)
    if (orderType === 'delivery') {
      if (!deliveryAddress.trim()) {
        errors.address = language === 'lt' ? 'Reikalingas pristatymo adresas' : 'Delivery address is required';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetailsStep()) {
      setStep('payment');
    }
  };

  const validatePaymentStep = () => {
    const errors: Record<string, string> = {};

    if (paymentMethod === 'card') {
      const cleanNum = cardNumber.replace(/\s+/g, '');
      
      // Luhn checksum validation algorithm
      const checkLuhn = (numStr: string) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = numStr.length - 1; i >= 0; i--) {
          let digit = parseInt(numStr.charAt(i), 10);
          if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }
          sum += digit;
          shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
      };

      if (!cleanNum.trim() || cleanNum.length < 15 || cleanNum.length > 16 || !/^\d+$/.test(cleanNum)) {
        errors.cardNumber = language === 'lt' 
          ? 'Nurodykite teisingą kortelės numerį (15-16 skaitmenų)' 
          : 'Provide a valid card number (15-16 digits)';
      } else if (!checkLuhn(cleanNum)) {
        errors.cardNumber = language === 'lt' 
          ? 'Neteisingas kortelės numerio kontrolinis skaičius' 
          : 'Invalid card number checksum';
      }

      // Expiration Date (format MM/YY, must be in the future)
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      const match = cardExpiry.match(expiryRegex);
      if (!cardExpiry.trim() || !match) {
        errors.cardExpiry = language === 'lt' 
          ? 'Nurodykite teisingą galiojimo datą (MM/YY)' 
          : 'Provide valid MM/YY expiry';
      } else {
        const month = parseInt(match[1], 10);
        const year = parseInt("20" + match[2], 10);
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12
        const currentYear = now.getFullYear();
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          errors.cardExpiry = language === 'lt' 
            ? 'Kortelės galiojimo laikas pasibaigęs' 
            : 'Card has expired';
        }
      }

      // CVV/CVC (exactly 3 or 4 digits)
      if (!cardCvv.trim() || !/^\d{3,4}$/.test(cardCvv)) {
        errors.cardCvv = language === 'lt' 
          ? 'CVV turi būti 3 ar 4 skaitmenys' 
          : 'CVV must be 3 or 4 digits';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'card' && !validatePaymentStep()) {
      return;
    }

    // Generate Order ID for local tracking display before calling parent
    const generatedId = `hd-${Math.floor(1000 + Math.random() * 9000)}`;
    setSimulatedOrderId(generatedId);
    setStep('processing');

    // Simulate Payment Gateway processing delay
    setTimeout(() => {
      setStep('success');
      onCheckoutComplete(
        orderType === 'pickup' ? customerName || (language === 'lt' ? 'Svečias' : 'Pickup Guest') : customerName,
        orderType === 'pickup' ? customerPhone || 'N/A' : customerPhone,
        orderType,
        paymentMethod,
        orderType === 'delivery' ? deliveryAddress : undefined
      );
    }, 2500);
  };

  const handleWalletSelect = (provider: 'Google Pay' | 'Apple Pay') => {
    const generatedId = `hd-${Math.floor(1000 + Math.random() * 9000)}`;
    setSimulatedOrderId(generatedId);
    setStep('processing');

    setTimeout(() => {
      setStep('success');
      onCheckoutComplete(
        customerName.trim() || `${provider} User`,
        customerPhone.trim() || 'N/A',
        orderType,
        'gpay_apple',
        orderType === 'delivery' ? deliveryAddress : undefined
      );
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-up border border-stone-200">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 bg-stone-900 text-white">
          <div className="flex items-center space-x-2">
            {step === 'payment' && (
              <button 
                onClick={() => setStep('details')}
                className="mr-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            <h3 className="font-display text-lg font-bold tracking-tight uppercase">
              {step === 'details' && (language === 'lt' ? 'Pristatymo Duomenys' : 'Delivery Details')}
              {step === 'payment' && (language === 'lt' ? 'Atsiskaitymas' : 'Payment')}
              {step === 'processing' && (language === 'lt' ? 'Apdorojama...' : 'Processing...')}
              {step === 'success' && (language === 'lt' ? 'Užsakymas Priimtas!' : 'Order Confirmed!')}
            </h3>
          </div>
          {step !== 'processing' && step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6">
          
          {/* STEP 1: DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  {language === 'lt' ? 'Atsiėmimo būdas' : 'Fulfillment Method'}
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-stone-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-sm font-semibold transition-all duration-200 ${
                      orderType === 'pickup'
                        ? 'bg-[#ffb74d] text-black shadow'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{language === 'lt' ? 'Atsiėmimas vietoje' : 'Local Pickup'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-sm font-semibold transition-all duration-200 ${
                      orderType === 'delivery'
                        ? 'bg-[#ffb74d] text-black shadow'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>{language === 'lt' ? 'Pristatymas į namus' : 'Home Delivery'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    {language === 'lt' ? 'Jūsų vardas ir pavardė *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'lt' ? 'Vardas Pavardė' : 'John Doe'}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb74d]/20 focus:border-[#ffb74d] ${
                      formErrors.name ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.name && <p className="text-xs text-red-500 font-medium mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    {language === 'lt' ? 'Telefono numeris *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+37060000000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb74d]/20 focus:border-[#ffb74d] ${
                      formErrors.phone ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.phone && <p className="text-xs text-red-500 font-medium mt-1">{formErrors.phone}</p>}
                </div>

                {orderType === 'delivery' && (
                  <div className="animate-fade-in">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      {language === 'lt' ? 'Pristatymo adresas *' : 'Delivery Address *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'lt' ? 'Gatvė, namo nr., buto nr., Vilnius' : 'Ukmerges g. 240, Vilnius'}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb74d]/20 focus:border-[#ffb74d] ${
                        formErrors.address ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-300'
                      }`}
                    />
                    {formErrors.address && <p className="text-xs text-red-500 font-medium mt-1">{formErrors.address}</p>}
                  </div>
                )}
              </div>

              {/* pricing summary */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex justify-between text-sm font-semibold text-stone-700">
                  <span>{language === 'lt' ? 'Mokėti iš viso' : 'Grand Total'}</span>
                  <span className="text-lg font-extrabold text-stone-900">{grandTotal.toFixed(2)} €</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#ffb74d] hover:bg-[#ffa726] text-black font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all duration-200 cursor-pointer"
              >
                {language === 'lt' ? 'Tęsti į apmokėjimą' : 'Continue to Payment'}
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2.5">
                  {language === 'lt' ? 'Pasirinkite mokėjimo būdą' : 'Select Payment Method'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 rounded-xl border-2 flex flex-col items-center justify-center space-y-1.5 transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#ffb74d] bg-[#ffb74d]/10 text-stone-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {language === 'lt' ? 'Kortelė' : 'Card'}
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('gpay_apple')}
                    className={`py-3 px-2 rounded-xl border-2 flex flex-col items-center justify-center space-y-1.5 transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'gpay_apple'
                        ? 'border-[#ffb74d] bg-[#ffb74d]/10 text-stone-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Wallets</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-3 px-2 rounded-xl border-2 flex flex-col items-center justify-center space-y-1.5 transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'border-[#ffb74d] bg-[#ffb74d]/10 text-stone-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {language === 'lt' ? 'Grynieji' : 'Cash'}
                    </span>
                  </button>
                </div>
              </div>

              {/* CARD DETAILS */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                      {language === 'lt' ? 'Kortelės numeris' : 'Card Number'}
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        let match = val.match(/.{1,4}/g)?.join(' ') || '';
                        setCardNumber(match);
                      }}
                      className={`w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb74d]/20 focus:border-[#ffb74d] ${
                        formErrors.cardNumber ? 'border-red-500' : 'border-stone-300'
                      }`}
                    />
                    {formErrors.cardNumber && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                        {language === 'lt' ? 'Galiojimo data' : 'Expiry Date'}
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2) {
                            val = val.slice(0, 2) + '/' + val.slice(2, 4);
                          }
                          setCardExpiry(val);
                        }}
                        className={`w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb74d]/20 focus:border-[#ffb74d] ${
                          formErrors.cardExpiry ? 'border-red-500' : 'border-stone-300'
                        }`}
                      />
                      {formErrors.cardExpiry && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className={`w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb74d]/20 focus:border-[#ffb74d] ${
                          formErrors.cardCvv ? 'border-red-500' : 'border-stone-300'
                        }`}
                      />
                      {formErrors.cardCvv && <p className="text-[10px] text-red-500 font-semibold mt-1">{formErrors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* GPAY / APPLE PAY */}
              {paymentMethod === 'gpay_apple' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-3 animate-fade-in">
                  <p className="text-xs text-stone-600 font-semibold uppercase tracking-wider">
                    {language === 'lt' ? 'Greitas atsiskaitymas pinigine' : 'Express Wallet Checkout'}
                  </p>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleWalletSelect('Google Pay')}
                      className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 hover:bg-neutral-800 transition-all cursor-pointer"
                    >
                      <span>Google Pay</span>
                    </button>
                    <button
                      onClick={() => handleWalletSelect('Apple Pay')}
                      className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 hover:bg-neutral-800 transition-all cursor-pointer"
                    >
                      <span>Apple Pay</span>
                    </button>
                  </div>
                </div>
              )}

              {/* CASH */}
              {paymentMethod === 'cash' && (
                <div className="p-4 bg-[#ffb74d]/10 rounded-2xl border border-[#ffb74d]/30 space-y-2 animate-fade-in">
                  <div className="flex items-start space-x-2 text-stone-850">
                    <Wallet className="w-5 h-5 text-[#ffa726] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase">
                        {language === 'lt' ? 'Atsiskaitymas grynaisiais' : 'Cash Payment'}
                      </h4>
                      <p className="text-xs text-stone-600 leading-normal mt-1">
                        {language === 'lt'
                          ? `Prašome paruošti tikslią sumą €${grandTotal.toFixed(2)} atsiskaitymui atsiėmimo metu arba pristačiusiam kurjeriui.`
                          : `Please prepare the exact sum of ${grandTotal.toFixed(2)} € to pay on collection or to our delivery courier.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-[#ffb74d] hover:bg-[#ffa726] text-black font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{language === 'lt' ? 'Pateikti užsakymą' : 'Place Order'}</span>
                <span>•</span>
                <span>{grandTotal.toFixed(2)} €</span>
              </button>
            </div>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full border-4 border-[#ffb74d]/30 border-t-[#ffb74d] animate-spin"></div>
              <div>
                <h4 className="font-display text-lg font-bold text-stone-900">
                  {language === 'lt' ? 'Apdorojamas mokėjimas...' : 'Authorizing transaction...'}
                </h4>
                <p className="text-xs text-stone-500 mt-1.5 max-w-xs mx-auto">
                  {language === 'lt' 
                    ? 'Saugiai apdorojame jūsų užsakymo duomenis. Prašome neuždaryti lango.'
                    : 'We are securing your order and verifying payment details.'}
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-5 animate-scale-up relative">
              <ConfettiEffect />
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-lg shadow-emerald-500/10 animate-bounce-short relative">
                <CheckCircle className="w-10 h-10 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping opacity-75" />
              </div>

              <div>
                <h4 className="font-display text-2xl font-black text-stone-900">
                  {language === 'lt' ? 'Užsakymas Sėkmingas!' : 'Order Placed!'}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  ID: <span className="font-mono font-bold text-stone-700">{simulatedOrderId}</span>
                </p>
              </div>

              <div className="w-full bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs text-stone-700">
                  <span className="font-semibold">{language === 'lt' ? 'Atsiėmimo būdas' : 'Type'}</span>
                  <span className="font-bold capitalize">{orderType}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-700">
                  <span className="font-semibold">{language === 'lt' ? 'Mokėjimo būdas' : 'Paid Via'}</span>
                  <span className="font-bold uppercase">{paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-700 pt-2 border-t border-stone-200">
                  <span className="font-semibold flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-[#ffa726]" />
                    {language === 'lt' ? 'Numatomas laikas' : 'Estimated Time'}
                  </span>
                  <span className="font-bold text-stone-900">
                    {orderType === 'delivery' ? '35-45 min' : '15-20 min'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-stone-950 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow hover:bg-stone-850 transition-colors cursor-pointer"
              >
                {language === 'lt' ? 'Sekti Mano Užsakymą' : 'Track My Order'}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
