import { useState, useMemo } from 'react';
import { Search, Sparkles, Flame, ThumbsUp } from 'lucide-react';
import { MenuItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface MenuSectionProps {
  items: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
}

export default function MenuSection({ items, onItemSelect }: MenuSectionProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const CATEGORIES = [
    { id: 'all', name: language === 'lt' ? 'Pilnas Meniu' : 'Full Feast' },
    { id: 'kebabs', name: language === 'lt' ? 'Kebabai' : 'Kebabs' },
    { id: 'wraps', name: language === 'lt' ? 'Suktiniai' : 'Wraps' },
    { id: 'plates', name: language === 'lt' ? 'Lėkštės' : 'Plates' },
    { id: 'sides', name: language === 'lt' ? 'Užkandžiai' : 'Sides' },
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
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* SECTION TITLE */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gold-orange/10 border border-gold-orange/20 text-gold-orange mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="font-sans text-xs font-bold uppercase tracking-widest">
            {language === 'lt' ? 'RANKŲ DARBO SKONIAI' : 'Handcrafted Flavors'}
          </span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
          {language === 'lt' ? 'Išbandykite Hadus Delikatesus' : 'Explore Hadus Specialties'}
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-500 mt-4 leading-relaxed max-w-xl mx-auto">
          {language === 'lt'
            ? 'Mes deriname aukščiausios kokybės mėsą, ypatingus prieskonius bei kepimą ant natūralių beržinių anglių, kad užtikrintume nepriekaištingą skonį. Pasirinkite patiekalą norėdami pritaikyti priedus.'
            : 'We combine prime cuts with dry-rub spices and real wood fire grilling to deliver premium street dining quality. Select an item to customize your order.'}
        </p>
      </div>

      {/* FILTER CONTROLS HUB */}
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between border-b border-gray-200 pb-8 mb-12">
        
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
                    ? 'bg-warm-beige text-gold-orange border border-gold-orange/30 shadow-sm'
                    : 'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/60 border border-transparent'
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
            className="w-full pl-10.5 pr-4 py-3 bg-white hover:bg-gray-50/50 focus:bg-white text-xs sm:text-sm text-charcoal font-sans font-medium placeholder-gray-400 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-charcoal text-xs font-bold"
            >
              {language === 'lt' ? 'Valyti' : 'Clear'}
            </button>
          )}
        </div>

      </div>

      {/* GRID CONTAINER FOR ITEMS */}
      {filteredItems.length === 0 ? (
        /* NO RESULTS */
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-250 p-6">
          <Flame className="w-12 h-12 text-gray-300 mx-auto mb-3.5" />
          <p className="font-display text-lg font-bold text-charcoal">
            {language === 'lt' ? 'Neradome patiekalų pagal jūsų paiešką' : 'No delicious items matched your search'}
          </p>
          <p className="font-sans text-xs text-gray-400 mt-1 max-w-sm mx-auto">
            {language === 'lt'
              ? 'Pabandykite pasirinkti kitą kategoriją arba iš naujo nustatykite filtrus.'
              : 'Try looking up a different food category or resetting filters to find your perfect flame-grilled treat.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-6 bg-gold-orange hover:bg-gold-orange-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
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
                className="group bg-white rounded-xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Card visual banner */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-200 flex-shrink-0">
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
                  
                  {/* Popular Badge indicator if configured */}
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-gold-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow flex items-center space-x-1 z-10 animate-bounce-short">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{language === 'lt' ? 'POPULIARU' : 'POPULAR'}</span>
                    </div>
                  )}

                  {/* Direct price tag absolute overlay */}
                  <div className="absolute bottom-4 right-4 bg-charcoal/90 text-white font-mono text-sm font-extrabold px-3 py-1.5 rounded-xl shadow-lg border border-charcoal-light flex items-center z-10">
                    <span className="text-[10px] font-bold text-gold-orange uppercase mr-1">
                      {language === 'lt' ? 'nuo' : 'from'}
                    </span>
                    €{item.basePrice.toFixed(2)}
                  </div>
                </div>

                {/* CARD DETAILS WRAP */}
                <div className="p-4.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-gold-orange tracking-widest block">
                        {language === 'lt'
                          ? { kebabs: 'Kebabas', wraps: 'Suktinukas', plates: 'Lėkštė', sides: 'Užkandis', drinks: 'Gėrimas' }[item.category] || item.category
                          : item.category}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-charcoal tracking-tight group-hover:text-gold-orange transition-colors leading-snug">
                      {nameVal}
                    </h3>
                    <p className="font-sans text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {descVal}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <button className="w-full py-2.5 bg-[#1E1E1E] active:scale-[0.97] transform text-white text-[11px] font-extrabold tracking-wider rounded-xl uppercase group-hover:bg-gold-orange group-hover:shadow-md transition-all duration-300 cursor-pointer">
                      {language === 'lt' ? 'Pasirinkti priedus ir užsisakyti' : 'Customize & Add To Cart'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
