import { useState } from 'react';
import { Clock, Flame, ShieldAlert, Award, AlertCircle, Sparkles, Navigation, X, Trash2, Shield } from 'lucide-react';
import { Order } from '../types';
import { useLanguage } from '../LanguageContext';

interface ActiveOrdersProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrders: Order[];
  onDismissOrder: (orderId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  isAutoSimulate: boolean;
  onToggleAutoSimulate: (val: boolean) => void;
}

export default function ActiveOrders({
  isOpen,
  onClose,
  activeOrders,
  onDismissOrder,
  onUpdateOrderStatus,
  isAutoSimulate,
  onToggleAutoSimulate,
}: ActiveOrdersProps) {
  const { language } = useLanguage();
  const [isStaffMode, setIsStaffMode] = useState(false);
  if (!isOpen) return null;

  const getStatusDetails = (status: Order['status']) => {
    switch (status) {
      case 'received':
        return {
          title: 'Hadus Kitchen Received Order',
          desc: 'Our chef is preparing fresh spices and trimming selected kebabs.',
          color: 'text-blue-500',
          bg: 'bg-blue-500/10',
          step: 1,
        };
      case 'grilling':
        return {
          title: 'Sizzling Grill Action',
          desc: 'Your skewers are turning slowly over hot organic charcoal embers.',
          color: 'text-gold-orange',
          bg: 'bg-gold-orange/10',
          step: 2,
        };
      case 'wrapping':
        return {
          title: 'Wrapping Tightly',
          desc: 'Foiled up with heat-lock materials to keep everything piping hot.',
          color: 'text-[#9333EA]',
          bg: 'bg-purple-500/10',
          step: 3,
        };
      case 'ready':
        return {
          title: 'Piping Hot & Ready!',
          desc: 'Ready at Harbour Branch front desk counter, or loaded on couriers.',
          color: 'text-green-600',
          bg: 'bg-green-600/10',
          step: 4,
        };
      default:
        return {
          title: 'Preparing Order',
          desc: 'Wait just a moment...',
          color: 'text-gray-500',
          bg: 'bg-gray-500/10',
          step: 1,
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col animate-scale-up border border-warm-beige-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-6 py-4.5 bg-charcoal text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-light">
          <div className="flex items-center space-x-2.5">
            <Clock className="w-5.5 h-5.5 text-gold-orange animate-pulse" />
            <h3 className="font-display text-base font-extrabold uppercase tracking-wide">
              Live Kitchen Tracker
            </h3>
          </div>

          <div className="flex items-center space-x-3.5">
            {/* Staff Mode Toggle */}
            <button
              onClick={() => setIsStaffMode(!isStaffMode)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isStaffMode 
                  ? 'bg-red-500/10 border-red-500/35 text-red-400 font-extrabold' 
                  : 'bg-stone-850 border-stone-700 text-gray-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isStaffMode ? (language === 'lt' ? 'Valdymo Režimas' : 'Staff Mode ON') : (language === 'lt' ? 'Restorano Darbuotojams' : 'Staff Dashboard')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-charcoal-light text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Tracker"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* BODY LIST OF CURRENT MEALS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {isStaffMode && (
            <div className="p-4 bg-red-500/5 border border-red-500/15 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in text-left">
              <div>
                <h4 className="text-xs font-black text-red-400 uppercase tracking-wide">Restaurant Simulation Control</h4>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">Toggle automatic customer status simulation or manually advance orders below.</p>
              </div>
              <div className="flex items-center space-x-3 bg-charcoal px-3 py-2 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {language === 'lt' ? 'Auto-Simuliacija' : 'Auto-Simulate Progress'}
                </span>
                <button
                  onClick={() => onToggleAutoSimulate(!isAutoSimulate)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    isAutoSimulate ? 'bg-gold-orange' : 'bg-stone-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      isAutoSimulate ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeOrders.length === 0 ? (
            <div className="text-center py-10 px-4">
              <ShieldAlert className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="font-sans text-sm text-gray-500">No active kitchen orders found. Visit Menu to start!</p>
            </div>
          ) : (
            activeOrders.map((order) => {
              const details = getStatusDetails(order.status);
              return (
                <div key={order.id} className="border-b border-gray-100 pb-8 last:border-b-0 last:pb-0">
                  
                  {/* TITLE WRAP */}
                  <div className="flex flex-col sm:flex-row sm:items-stretch justify-between gap-3 mb-4.5">
                    <div className="flex items-center justify-between w-full sm:w-auto">
                      <div>
                        <span className="font-mono text-[10px] font-extrabold text-stone-700 tracking-wider block uppercase mb-1">ORDER BRAND ID</span>
                        <span className="font-display text-sm font-black text-charcoal bg-warm-beige-light px-2.2 py-0.5 rounded border border-warm-beige/50">#{order.id.toUpperCase()}</span>
                      </div>
                      <button
                        onClick={() => onDismissOrder(order.id)}
                        className="sm:hidden text-red-500 hover:text-red-750 p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                        title="Cancel/Remove Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="text-left sm:text-right">
                        <span className="font-mono text-[10px] font-extrabold text-stone-700 block tracking-wider uppercase">Fulfillment</span>
                        <span className="inline-flex items-center text-xs font-bold text-gold-orange uppercase mt-1">
                          {order.type === 'pickup' ? (
                            <>
                              <Award className="w-3.5 h-3.5 mr-1" />
                              Pick-up
                            </>
                          ) : (
                            <>
                              <Navigation className="w-3.5 h-3.5 mr-1 animate-bounce" />
                              Delivery
                            </>
                          )}
                        </span>
                      </div>

                      <div className="text-left sm:text-right border-l border-gray-200 pl-4">
                        <span className="font-mono text-[10px] font-extrabold text-stone-700 block tracking-wider uppercase">Payment</span>
                        <div className="mt-1">
                          {order.paymentMethod === 'card' && (
                            <span className="bg-amber-100/50 text-[#D97706] px-2.5 py-0.5 rounded-full border border-gold-orange/20 font-sans text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                              💳 Credit Card
                            </span>
                          )}
                          {order.paymentMethod === 'gpay_apple' && (
                            <span className="bg-black text-white px-2.5 py-0.5 rounded-full font-sans text-[10px] font-extrabold tracking-wide uppercase shadow-sm border border-neutral-700">
                              📱 Apple / GPay
                            </span>
                          )}
                          {order.paymentMethod === 'cash' && (
                            <span className="bg-emerald-55 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-250 font-sans text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                              💵 Cash Pay
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="hidden sm:flex items-center border-l border-gray-200 pl-4 animate-fade-in">
                        <button
                          onClick={() => onDismissOrder(order.id)}
                          className="flex items-center space-x-1.5 text-[10px] text-red-500 hover:text-white hover:bg-red-500 font-extrabold uppercase tracking-wider px-2.5 py-1.5 rounded-xl border border-red-500/30 transition-all duration-205 cursor-pointer"
                          title="Cancel/Remove Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{language === 'lt' ? 'Atšaukti' : 'Cancel'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                   {/* LIVE STATUS CARD */}
                  <div className={`p-4 rounded-2xl ${details.bg} border border-gold-orange/15 mb-6 flex items-center justify-between shadow-sm gap-3`}>
                    <div className="flex items-start space-x-3.5">
                      <div className={`p-2.5 rounded-xl bg-white text-gold-orange shadow-md flex-shrink-0 animate-bounce-short`}>
                        <Flame className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-left">
                        <h4 className={`font-display text-sm font-black ${details.color} uppercase tracking-wider`}>
                          {details.title}
                        </h4>
                        <p className="font-sans text-xs text-stone-700 mt-1 leading-relaxed font-semibold">
                          {details.desc}
                        </p>
                      </div>
                    </div>
                    {order.status === 'ready' && (
                      <button
                        onClick={() => onDismissOrder(order.id)}
                        className="px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-display text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        {language === 'lt' ? 'Pašalinti' : 'Dismiss'}
                      </button>
                    )}
                  </div>

                  {/* STEPS TRAILBAR */}
                  <div className="grid grid-cols-4 gap-2 relative mb-6">
                    {/* Visual Line Background */}
                    <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 z-0 rounded-full" />
                    
                    {/* Stepper bubbles */}
                    {[
                      { step: 1, label: 'Ordered' },
                      { step: 2, label: 'Grilling' },
                      { step: 3, label: 'Foiled' },
                      { step: 4, label: 'Ready' }
                    ].map((stepObj) => {
                      const isActive = details.step >= stepObj.step;
                      const isUpcoming = details.step < stepObj.step;
                      const isCompleted = details.step > stepObj.step;
                      return (
                        <div key={stepObj.step} className="flex flex-col items-center z-10">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-2 font-mono text-xs font-black ${
                            isActive 
                              ? 'bg-gold-orange border-gold-orange text-white scale-105 shadow-md shadow-gold-orange/20' 
                              : 'bg-white border-gray-300 text-stone-500'
                          }`}>
                            {isCompleted ? '✓' : stepObj.step}
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-wider mt-2.5 ${isActive ? 'text-[#1E1E1E]' : 'text-stone-500'}`}>
                            {stepObj.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* STAFF CONTROL CONTROLLER */}
                  {isStaffMode && (
                    <div className="mb-6 p-4 bg-stone-900 text-white rounded-2xl border border-stone-850 text-left animate-fade-in">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest">
                            Staff Operations
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-gold-orange uppercase bg-stone-800 px-2 py-0.5 rounded">
                          Status: {order.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2.5">
                        {order.status === 'received' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'grilling')}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                          >
                            Accept & Start Grill
                          </button>
                        )}
                        {order.status === 'grilling' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'wrapping')}
                            className="px-3.5 py-2 rounded-xl bg-gold-orange hover:bg-gold-orange-hover text-black text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                          >
                            Mark Wrapped (Foiled)
                          </button>
                        )}
                        {order.status === 'wrapping' && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => onDismissOrder(order.id)}
                            className="px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                          >
                            Archive Order
                          </button>
                        )}
                        
                        <button
                          onClick={() => onDismissOrder(order.id)}
                          className="px-3.5 py-2 rounded-xl bg-red-650 hover:bg-red-750 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md ml-auto"
                        >
                          Cancel/Delete
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUMMARY CARDS OF WHAT EXTRACTED */}
                  <div className="bg-gray-150/40 rounded-2xl p-4.5 border border-gray-250 text-left animate-fade-in">
                    <span className="font-display text-[10px] font-extrabold uppercase tracking-widest text-[#1E1E1E] block mb-2.5">
                      Basket Checklist
                    </span>
                    <div className="space-y-2">
                      {order.items.map((cartItem) => (
                        <div key={cartItem.cartId} className="flex justify-between items-center text-xs text-[#1E1E1E]">
                          <span className="font-sans">
                            <strong className="text-charcoal font-extrabold">{cartItem.quantity}x</strong> {cartItem.menuItem.name} 
                            <span className="text-stone-605 text-[10.5px] block pl-5 font-bold mt-0.5">
                              - {cartItem.selectedSize.name.split(' (')[0]} / {cartItem.selectedSauce.name.split(' Special')[0]}
                            </span>
                          </span>
                          <span className="font-mono text-stone-800 font-bold">${cartItem.totalPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-dashed border-gray-305 font-sans text-xs">
                      <span className="font-extrabold text-stone-800 uppercase tracking-wide">Paid Total</span>
                      <span className="font-mono text-sm font-extrabold text-gold-orange bg-white px-2 py-0.5 rounded border border-gray-205 shadow-inner">${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* RECOVERY HELPER CARD */}
                  <div className="mt-4 flex items-center space-x-2.5 justify-center py-2.5 px-4 bg-gray-150/50 rounded-xl border border-gray-200/50">
                    <AlertCircle className="w-4 h-4 text-stone-700" />
                    <span className="font-sans text-[11px] text-stone-700 font-bold tracking-wide uppercase">
                      Please have your applet open to track real-time changes.
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="bg-charcoal px-6 py-4 border-t border-charcoal-light flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-white/50 text-[10px] font-semibold tracking-wider font-mono uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-orange mr-1" />
            Hadus Fire Grill Station • 1
          </div>
          <button
            onClick={onClose}
            className="bg-gold-orange hover:bg-gold-orange-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow"
          >
            Cool, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
