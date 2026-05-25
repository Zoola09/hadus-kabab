import { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface MenuSectionProps {
  items: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export default function MenuSection({ items, onItemSelect, onQuickAdd }: MenuSectionProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const CATEGORIES = [
    { id: 'all', name: language === 'lt' ? 'Pilnas Meniu' : 'Full Feast' },
    { id: 'kebabs', name: language === 'lt' ? 'Kebabai' : 'Kebabs' },
    { id: 'wraps', name: language === 'lt' ? 'Suktiniai' : 'Wraps' },
    { id: 'plates', name: language === 'lt' ? 'Lėkštės' : 'Plates' },
    { id: 'burgers', name: language === 'lt' ? 'Burgeriai' : 'Burgers' },
    { id: 'drinks', name: language === 'lt' ? 'Gėrimai' : 'Drinks' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      const nameVal = (language === 'lt' && item.name_lt) ? item.name_lt : item.name;
      const descVal = (language === 'lt' && item.description_lt) ? item.description_lt : item.description;

      const matchesSearch =
        nameVal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        descVal.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery, language]);

  return (
    <section id="menu" className="bg-[#111] py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#ffb74d]/10 border border-[#ffb74d]/20 text-[#ffb74d] mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest">
              {language === 'lt' ? 'RANKŲ DARBO SKONIAI' : 'Handcrafted Flavors'}
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'lt' ? 'Mūsų Meniu' : 'Our Menu'}
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 mt-4 leading-relaxed max-w-xl mx-auto">
            {language === 'lt'
              ? 'Mes deriname aukščiausios kokybės mėsą, ypatingus prieskonius bei kepimą ant natūralių beržinių anglių. Pasirinkite patiekalą norėdami pritaikyti priedus.'
              : 'We combine prime cuts with dry-rub spices and real wood fire grilling to deliver premium street dining quality. Select an item to customize your order.'}
          </p>
        </div>

        {/* FILTER CONTROLS HUB */}
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between border-b border-white/10 pb-8 mb-12">
          
          {/* Categories sliding tab */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto overflow-y-hidden no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-350 transform active:scale-95 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-[#ffb74d] text-black border border-[#ffb74d]/30 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-white/60 border border-transparent'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5 pointer-events-none" />
            <input
              type="text"
              placeholder={language === 'lt' ? 'Ieškoti patiekalų...' : 'Search our delicious grills...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10.5 pr-4 py-3 bg-[#1e1e1e] text-white hover:bg-white/5 focus:bg-[#1e1e1e] text-xs sm:text-sm font-sans font-medium placeholder-gray-500 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffb74d]/20 focus:border-[#ffb74d] transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-xs font-bold"
              >
                {language === 'lt' ? 'Valyti' : 'Clear'}
              </button>
            )}
          </div>

        </div>

        {/* GRID CONTAINER FOR ITEMS */}
        {filteredItems.length === 0 ? (
          /* NO RESULTS */
          <div className="text-center py-20 bg-[#1e1e1e] rounded-3xl border border-dashed border-white/10 p-6">
            <p className="font-display text-lg font-bold text-white">
              {language === 'lt' ? 'Neradome patiekalų pagal jūsų paiešką' : 'No delicious items matched your search'}
            </p>
            <p className="font-sans text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              {language === 'lt'
                ? 'Pabandykite pasirinkti kitą kategoriją arba iš naujo nustatykite filtrus.'
                : 'Try looking up a different food category or resetting filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-6 bg-[#ffb74d] hover:bg-[#ffa726] text-black px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              {language === 'lt' ? 'Atkurti filtrus' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          /* GRILL FEAST GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const nameVal = (language === 'lt' && item.name_lt) ? item.name_lt : item.name;
              const descVal = (language === 'lt' && item.description_lt) ? item.description_lt : item.description;
              
              return (
                <div
                  key={item.id}
                  onClick={() => onItemSelect(item)}
                  className="group bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 relative"
                >
                  {/* Card visual banner */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-black flex-shrink-0">
                    <img
                      src={item.image}
                      alt={nameVal}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                    
                    {/* Glow/Overlay on hover */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-300" />
                    
                    {/* Popular Badge indicator */}
                    {item.popular && (
                      <div className="absolute top-4 left-4 bg-amber-900/80 text-[#ffb74d] text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center space-x-1 z-10">
                        <span>Popular 💛</span>
                      </div>
                    )}
                  </div>

                  {/* CARD DETAILS WRAP */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white tracking-tight group-hover:text-[#ffb74d] transition-colors leading-snug">
                        {nameVal}
                      </h4>
                      <p className="font-sans text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                        {descVal}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-white font-bold text-lg font-mono">
                        {item.basePrice.toFixed(2)} €
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickAdd(item);
                        }}
                        className="bg-[#ffb74d] hover:bg-[#ffa726] text-black w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xl cursor-pointer transition-colors duration-200"
                        title={language === 'lt' ? 'Pridėti greitai' : 'Quick Add'}
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
