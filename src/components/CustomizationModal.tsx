import { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { MenuItem, CustomizationOption } from '../types';
import { useLanguage } from '../LanguageContext';

interface CustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    size: CustomizationOption,
    sauce: CustomizationOption,
    extras: CustomizationOption[],
    quantity: number
  ) => void;
}

export default function CustomizationModal({ item, onClose, onAddToCart }: CustomizationModalProps) {
  const { language } = useLanguage();
  const [selectedSize, setSelectedSize] = useState<CustomizationOption | null>(null);
  const [selectedSauce, setSelectedSauce] = useState<CustomizationOption | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<CustomizationOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize selections when item changes
  useEffect(() => {
    if (item && item.customization) {
      if (item.customization.sizes && item.customization.sizes.length > 0) {
        setSelectedSize(item.customization.sizes[0]);
      }
      if (item.customization.sauces && item.customization.sauces.length > 0) {
        setSelectedSauce(item.customization.sauces[0]);
      } else {
        setSelectedSauce(null);
      }
      setSelectedExtras([]);
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  // Compute live prices
  const sizeMod = selectedSize?.priceModifier || 0;
  const sauceMod = selectedSauce?.priceModifier || 0;
  const extrasMod = selectedExtras.reduce((acc, curr) => acc + curr.priceModifier, 0);
  const unitPrice = item.basePrice + sizeMod + sauceMod + extrasMod;
  const totalAmount = unitPrice * quantity;

  const handleExtraToggle = (option: CustomizationOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.name === option.name);
      if (exists) {
        return prev.filter((e) => e.name !== option.name);
      } else {
        return [...prev, option];
      }
    });
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

  const handleAdd = () => {
    if (selectedSize) {
      // Default placeholder sauce if none available
      const sauce = selectedSauce || { name: 'None', priceModifier: 0 };
      onAddToCart(item, selectedSize, sauce, selectedExtras, quantity);
      onClose();
    }
  };

  const nameVal = (language === 'lt' && item.name_lt) ? item.name_lt : item.name;
  const descVal = (language === 'lt' && item.description_lt) ? item.description_lt : item.description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-charcoal/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-scale-up border border-warm-beige-dark"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* UPPER HERO SECTION */}
        <div className="relative h-44 sm:h-56 w-full flex-shrink-0">
          <img
            src={item.image}
            alt={nameVal}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/35" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-charcoal/70 hover:bg-gold-orange text-white hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Close product customization"
          >
            <X className="w-5.5 h-5.5" />
          </button>

          {/* Item Category badge & Name directly overlaid */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-orange text-[10px] font-bold uppercase tracking-widest mb-1.5">
              {language === 'lt'
                ? { kebabs: 'Kebabas', wraps: 'Suktinukas', plates: 'Lėkštė', sides: 'Užkandis', drinks: 'Gėrimas' }[item.category] || item.category
                : item.category}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              {nameVal}
            </h3>
          </div>
        </div>

        {/* CUSTOMIZATION OPTIONS INNER SCROLL */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 sm:space-y-8">
          
          {/* Description */}
          <div>
            <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              {descVal}
            </p>
          </div>

          {/* SIZES CUSTOMIZATION SECTION */}
          {item.customization?.sizes && item.customization.sizes.length > 0 && (
            <div className="border-t border-gray-100 pt-5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-charcoal flex items-center">
                  <span className="w-1.5 h-4 bg-gold-orange mr-2 rounded"></span>
                  {language === 'lt' ? '1. Pasirinkite dydį' : '1. Select Size'}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-semibold tracking-wider font-mono uppercase">
                  {language === 'lt' ? 'Privaloma' : 'Required'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {item.customization.sizes.map((option) => {
                  const isSelected = selectedSize?.name === option.name;
                  return (
                    <button
                      key={option.name}
                      onClick={() => setSelectedSize(option)}
                      className={`p-4 rounded-xl text-left border-2 flex sm:flex-col justify-between items-center sm:items-start transition-all duration-300 relative cursor-pointer ${
                        isSelected
                          ? 'border-gold-orange bg-warm-beige-light shadow-md'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <span className="font-sans text-sm font-bold text-charcoal">
                        {getLocalizedSizeName(option.name, language)}
                      </span>
                      <span className="font-mono text-xs sm:mt-2 text-gold-orange font-bold">
                        {option.priceModifier === 0
                          ? (language === 'lt' ? 'Pradinė kaina' : 'Base Price')
                          : `+€${option.priceModifier.toFixed(2)}`}
                      </span>
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold-orange flex items-center justify-center text-white text-[9px] font-bold">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SAUCES CUSTOMIZATION SECTION */}
          {item.customization?.sauces && item.customization.sauces.length > 0 && (
            <div className="border-t border-gray-100 pt-5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-charcoal flex items-center">
                  <span className="w-1.5 h-4 bg-gold-orange mr-2 rounded"></span>
                  {language === 'lt' ? '2. Pasirinkite padažą' : '2. Choose Sauce'}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-semibold tracking-wider font-mono uppercase">
                  {language === 'lt' ? 'Privaloma' : 'Required'}
                </span>
              </div>

              <div className="space-y-2">
                {item.customization.sauces.map((option) => {
                  const isSelected = selectedSauce?.name === option.name;
                  return (
                    <button
                      key={option.name}
                      onClick={() => setSelectedSauce(option)}
                      className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-gold-orange bg-warm-beige-light/70 text-gold-orange font-bold'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-gold-orange bg-gold-orange text-white' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                        <span className="font-sans text-sm text-charcoal text-left">
                          {getLocalizedSauceName(option.name, language)}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-gold-orange font-bold">
                        {option.priceModifier === 0
                          ? (language === 'lt' ? 'Nemokamai' : 'Free')
                          : `+€${option.priceModifier.toFixed(2)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* EXTRAS CARD LIST SECTION */}
          {item.customization?.extras && item.customization.extras.length > 0 && (
            <div className="border-t border-gray-100 pt-5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-charcoal flex items-center">
                  <span className="w-1.5 h-4 bg-gold-orange mr-2 rounded"></span>
                  {language === 'lt' ? '3. Pasirinkite priedus' : '3. Add Extras'}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-semibold tracking-wider font-mono uppercase">
                  {language === 'lt' ? 'Nebūtina' : 'Optional'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.customization.extras.map((option) => {
                  const isSelected = selectedExtras.some((e) => e.name === option.name);
                  return (
                    <button
                      key={option.name}
                      onClick={() => handleExtraToggle(option)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-gold-orange bg-warm-beige-light/50 text-gold-orange font-bold'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 text-left">
                        <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center ${
                          isSelected ? 'border-gold-orange bg-gold-orange text-white' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="font-sans text-xs sm:text-sm text-charcoal">
                          {getLocalizedExtraName(option.name, language)}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-gold-orange font-semibold whitespace-nowrap ml-2">
                        +€{option.priceModifier.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM ORDER CONTROLS FOLLOWER (FIXED) */}
        <div className="bg-charcoal px-6 py-5 border-t border-charcoal-light flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Incrementor */}
          <div className="flex items-center space-x-4 bg-charcoal-light rounded-xl p-1.5 border border-charcoal-light">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
              className={`p-2 rounded-lg bg-charcoal text-white hover:bg-gold-orange transition-colors cursor-pointer ${
                quantity === 1 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-base font-extrabold text-white w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-lg bg-charcoal text-white hover:bg-gold-orange transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Combined Visual Display Unit & Action Trigger */}
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-3 bg-gold-orange hover:bg-gold-orange-hover text-white px-8 py-3.5 rounded-2xl transition-all duration-300 font-bold tracking-wide uppercase text-sm cursor-pointer shadow-lg shadow-gold-orange/20"
          >
            <Flame className="w-5 h-5" />
            <span>{language === 'lt' ? 'Pridėti į užsakymą' : 'Add To Order'}</span>
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
            <span className="font-mono tracking-tight">€{totalAmount.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
