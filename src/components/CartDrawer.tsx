import { X, Trash2, Plus, Minus, ShoppingBag, HelpCircle } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (cartId: string, currentQty: number, adjustment: number) => void;
  onRemove: (cartId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onProceedToCheckout,
}: CartDrawerProps) {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceFee = subtotal > 0 ? 1.50 : 0;
  const grandTotal = subtotal + serviceFee;

  const getLocalizedSizeName = (name: string, lang: string) => {
    if (lang !== 'lt') return name.split(' (')[0];
    const lower = name.toLowerCase();
    if (lower.includes('regular') || lower.includes('lavašas')) return 'Reguliarus';
    if (lower.includes('large') || lower.includes('didelis')) return 'Didelis';
    if (lower.includes('grand') || lower.includes('karališkas')) return 'Karališkas';
    return name.split(' (')[0];
  };

  const getLocalizedSauceName = (name: string, lang: string) => {
    if (lang !== 'lt') return name.split(' Special')[0];
    const lower = name.toLowerCase();
    if (lower.includes('garlic') || lower.includes('česnakinis')) return 'Česnakinis';
    if (lower.includes('spicy') || lower.includes('aštrus')) return 'Aštrus';
    if (lower.includes('mix') || lower.includes('mišrus')) return 'Mišrus';
    if (lower.includes('tzatziki') || lower.includes('švelnus tzatziki')) return 'Švelnus Tzatziki';
    if (lower.includes('none') || lower.includes('be padažo')) return 'Be padažo';
    return name.split(' Special')[0];
  };

  const getLocalizedExtraName = (name: string, lang: string) => {
    if (lang !== 'lt') return name.split(' Slice')[0].split(' Extra ')[0];
    const lower = name.toLowerCase();
    if (lower.includes('cheese') || lower.includes('sūris')) return 'Sūris';
    if (lower.includes('jalapeno') || lower.includes('chalapos')) return 'Chalapos pipirai';
    if (lower.includes('avocado') || lower.includes('avokadas')) return 'Avokadas';
    if (lower.includes('meat') || lower.includes('mėsa')) return 'Papildoma mėsa';
    return name.split(' Slice')[0].split(' Extra ')[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/80 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Drawer content core */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left z-10 border-l border-stone-200">
        
        {/* HEADER SECTION */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5.5 h-5.5 text-[#ffb74d]" />
            <span className="font-display text-lg font-bold tracking-tight uppercase">
              {language === 'lt' ? 'Pirkinių krepšelis' : 'Your Shopping Bag'}
            </span>
            {cart.length > 0 && (
              <span className="px-2 py-0.5 bg-[#ffb74d] text-black text-[11px] font-bold rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* CART MAIN BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            /* EMPTY CART STATE */
            <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-5 text-gray-400">
                <ShoppingBag className="w-10 h-10 text-[#ffb74d]/50" />
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                {language === 'lt' ? 'Jūsų krepšelis yra tuščias...' : 'Your bag feels very light...'}
              </h3>
              <p className="font-sans text-xs text-stone-500 max-w-xs mb-8">
                {language === 'lt'
                  ? 'Sultingi vištienos iešmeliai, traškūs suktinukai ir kiti dūminiai kepsniai jau paruošti kepti!'
                  : 'Freshly skewered chicken, sizzling traditional lamb skewers, and premium wraps are ready to fulfill your cravings!'}
              </p>
              <button
                onClick={onClose}
                className="bg-[#ffb74d] hover:bg-[#ffa726] text-black text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all duration-300 w-full cursor-pointer"
              >
                {language === 'lt' ? 'Vartyti Meniu dabar' : 'Browse Menu Now'}
              </button>
            </div>
          ) : (
            <>
              {/* CUSTOM CHOICES SCROLL */}
              <div className="space-y-4">
                <span className="font-display text-xs font-extrabold uppercase tracking-widest text-stone-700 bg-stone-100 px-2.5 py-1 rounded inline-block mb-2">
                  {language === 'lt' ? 'Užsakymo suvestinė' : 'Order Summary'}
                </span>
                
                {cart.map((item) => {
                  const nameVal = (language === 'lt' && item.menuItem.name_lt) ? item.menuItem.name_lt : item.menuItem.name;
                  
                  return (
                    <div
                      key={item.cartId}
                      className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-all duration-300 relative group text-left"
                    >
                      {/* Photo thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
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
                        <h4 className="font-sans text-sm font-bold text-stone-900 leading-tight truncate">
                          {nameVal}
                        </h4>
                        
                        {/* Sizing description */}
                        <div className="flex flex-wrap gap-1 mt-1 text-[11px] font-sans font-medium text-stone-600">
                          <span className="bg-white px-1.5 py-0.5 rounded border border-stone-200 text-stone-900 font-semibold">
                            {getLocalizedSizeName(item.selectedSize.name, language)}
                          </span>
                          {item.selectedSauce.name && item.selectedSauce.name !== 'None' && (
                            <span className="bg-white px-1.5 py-0.5 rounded border border-stone-200">
                              {language === 'lt' ? 'Padažas' : 'Sauce'}: {getLocalizedSauceName(item.selectedSauce.name, language)}
                            </span>
                          )}
                        </div>

                        {/* Extras descriptors */}
                        {item.selectedExtras.length > 0 && (
                          <p className="text-[10px] font-sans text-amber-700 font-bold mt-1.5 truncate">
                            + {item.selectedExtras.map((e) => getLocalizedExtraName(e.name, language)).join(', ')}
                          </p>
                        )}

                        {/* Quantity Selector + Price panel */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Incrementor */}
                          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border border-stone-200">
                            <button
                              onClick={() => onUpdateQty(item.cartId, item.quantity, -1)}
                              className="p-1 rounded bg-stone-50 hover:bg-[#ffb74d] hover:text-black transition-colors cursor-pointer"
                              aria-label="Decrease item quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-stone-900 w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(item.cartId, item.quantity, 1)}
                              className="p-1 rounded bg-stone-50 hover:bg-[#ffb74d] hover:text-black transition-colors cursor-pointer"
                              aria-label="Increase item quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-bold text-stone-900">
                            €{item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Absolute remove icon */}
                      <button
                        onClick={() => onRemove(item.cartId)}
                        className="absolute top-2.5 right-2.5 p-1 text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* PRICING CHECKS */}
              <div className="border-t border-stone-200 pt-5 space-y-2.5 font-sans text-xs text-left">
                <div className="flex justify-between text-stone-600 font-semibold">
                  <span>{language === 'lt' ? 'Krepšelio suma' : 'Subtotal Items'}</span>
                  <span className="font-mono text-stone-800 font-bold">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600 font-semibold items-center">
                  <span className="flex items-center">
                    {language === 'lt' ? 'Aptarnavimo mokestis' : 'Service Fee'}
                    <HelpCircle className="w-3.5 h-3.5 ml-1.5 text-stone-400 hover:text-stone-600 transition-colors cursor-help" title={language === 'lt' ? 'Apima pakuotės mokestį' : 'Includes package fee'} />
                  </span>
                  <span className="font-mono text-stone-800 font-bold">€{serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-900 text-sm font-extrabold pt-2.5 border-t border-dashed border-stone-200">
                  <span>{language === 'lt' ? 'Iš viso mokėti' : 'Total Amount'}</span>
                  <span className="font-mono text-base text-[#e65100] font-extrabold">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* PINNED BOTTOM SUBMIT CONTAINER */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-stone-200 p-5 flex-shrink-0 shadow-2xl relative z-10">
            <button
              onClick={onProceedToCheckout}
              className="w-full bg-[#ffb74d] hover:bg-[#ffa726] active:scale-[0.97] text-black py-3.5 px-6 rounded-2xl font-extrabold uppercase tracking-widest text-xs shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>{language === 'lt' ? 'Eiti į apmokėjimą' : 'Proceed to Checkout'}</span>
              <span className="w-1.5 h-1.5 bg-black/40 rounded-full"></span>
              <span className="font-mono tracking-wide text-xs">€{grandTotal.toFixed(2)}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
