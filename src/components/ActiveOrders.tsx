import { Clock, Flame, ShieldAlert, Award, AlertCircle, Sparkles, Navigation, X } from 'lucide-react';
import { Order } from '../types';

interface ActiveOrdersProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrders: Order[];
}

export default function ActiveOrders({ isOpen, onClose, activeOrders }: ActiveOrdersProps) {
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
        <div className="px-6 py-4.5 bg-charcoal text-white flex items-center justify-between border-b border-charcoal-light">
          <div className="flex items-center space-x-2.5">
            <Clock className="w-5.5 h-5.5 text-gold-orange animate-pulse" />
            <h3 className="font-display text-base font-extrabold uppercase tracking-wide">
              Live Kitchen Tracker
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-charcoal-light text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Tracker"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* BODY LIST OF CURRENT MEALS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
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
                    <div>
                      <span className="font-mono text-[10px] font-extrabold text-stone-700 tracking-wider block uppercase mb-1">ORDER BRAND ID</span>
                      <span className="font-display text-sm font-black text-charcoal bg-warm-beige-light px-2.2 py-0.5 rounded border border-warm-beige/50">#{order.id.toUpperCase()}</span>
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
                    </div>
                  </div>

                   {/* LIVE STATUS CARD */}
                  <div className={`p-4 rounded-2xl ${details.bg} border border-gold-orange/15 mb-6 flex items-start space-x-3.5 shadow-sm`}>
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
