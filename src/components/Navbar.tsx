import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Clock } from 'lucide-react';
import { CartItem, Order } from '../types';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeOrders: Order[];
  onOpenOrders: () => void;
}

export default function Navbar({ cart, onOpenCart, activeOrders, onOpenOrders }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky navbar
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-charcoal/95 backdrop-blur-md border-b border-charcoal-light shadow-xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 bg-gold-orange rounded-xl flex items-center justify-center shadow-lg shadow-gold-orange/20 group-hover:bg-gold-orange-hover group-hover:scale-110 transition-all duration-300">
              <Flame className="w-6 h-6 text-warm-beige group-hover:animate-pulse" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold text-white tracking-tight uppercase block leading-none">
                Hadus
              </span>
              <span className="font-sans text-[11px] font-semibold text-gold-orange tracking-widest uppercase block leading-none mt-1">
                Kabab • Grill • Street
              </span>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-gold-orange transition-colors cursor-pointer block"
            >
              {t('homepage')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-gold-orange transition-colors cursor-pointer block"
            >
              {t('feastMenu')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-gold-orange transition-colors cursor-pointer block"
            >
              {t('ourHeritage')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-gold-orange transition-colors cursor-pointer block"
            >
              {t('reachUs')}
            </button>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Active Orders Tracker Trigger */}
            {activeOrders.length > 0 && (
              <button
                onClick={onOpenOrders}
                className="relative p-2.5 rounded-xl bg-charcoal-light border border-gold-orange/30 text-gold-orange hover:bg-gold-orange hover:text-white transition-all duration-300 cursor-pointer flex items-center space-x-2 shadow-lg shadow-gold-orange/10"
                title="Track Active Orders"
              >
                <Clock className="w-5 h-5 animate-spin-slow" />
                <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
                  {language === 'lt' ? 'Sekti Užsakymą' : 'Track Order'} ({activeOrders.length})
                </span>
                <span className="sm:hidden w-2.5 h-2.5 bg-red-600 rounded-full absolute -top-0.5 -right-0.5 animate-ping" />
              </button>
            )}

            {/* Shopping Bag Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-charcoal-light text-white hover:bg-charcoal border border-transparent hover:border-charcoal-light transition-all duration-300 group cursor-pointer flex items-center"
              aria-label="Toggle Shopping Bag"
            >
              <ShoppingBag className="w-5.5 h-5.5 text-warm-beige group-hover:scale-110 group-hover:text-gold-orange transition-all duration-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold-orange text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce-short shadow-md shadow-gold-orange/20">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Order Now Button */}
            <button
              onClick={() => scrollToSection('menu')}
              className="hidden lg:inline-flex bg-gold-orange hover:bg-gold-orange-hover text-white text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-gold-orange/20 hover:shadow-gold-orange/40 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {language === 'lt' ? 'Užsisakyti' : 'Order Now'}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-charcoal-light md:hidden transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden id-mobile-nav fixed inset-x-0 top-[70px] bg-charcoal/98 border-t border-charcoal-light shadow-2xl z-50 animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left font-sans text-lg font-semibold text-white hover:text-gold-orange border-b border-charcoal-light pb-2 cursor-pointer"
            >
              {t('homepage')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="block w-full text-left font-sans text-lg font-semibold text-white hover:text-gold-orange border-b border-charcoal-light pb-2 cursor-pointer"
            >
              {t('feastMenu')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left font-sans text-lg font-semibold text-white hover:text-gold-orange border-b border-charcoal-light pb-2 cursor-pointer"
            >
              {t('ourHeritage')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left font-sans text-lg font-semibold text-white hover:text-gold-orange border-b border-charcoal-light pb-2 cursor-pointer"
            >
              {t('reachUs')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="w-full bg-gold-orange hover:bg-gold-orange-hover text-white text-center font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 shadow-md block cursor-pointer"
            >
              {language === 'lt' ? 'Užsisakyti dabar' : 'Order Now'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
