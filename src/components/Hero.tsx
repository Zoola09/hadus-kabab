import { ArrowRight, Flame, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Hero() {
  const { language, t } = useLanguage();

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-charcoal">
      {/* Background Image with epic grilled kebab aspect under deep dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1600"
          alt="Authentic Grilled Sizzling Kebabs over Flames"
          className="w-full h-full object-cover scale-105 animate-zoom-slow"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to fade to black charcoal edges and maintain perfect high contrast text accessibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal-dark/95 z-10" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-warm-beige-light to-transparent z-10" />
      </div>

      {/* Decorative Fire Embers Animation Block */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-gold-orange rounded-full animate-bubble" style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute bottom-0 left-2/4 w-3.5 h-3.5 bg-gold-orange rounded-full animate-bubble" style={{ animationDelay: '1.5s', animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-3/4 w-1.5 h-1.5 bg-gold-orange rounded-full animate-bubble" style={{ animationDelay: '3s', animationDuration: '5s' }} />
        <div className="absolute bottom-0 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-bubble" style={{ animationDelay: '4.5s', animationDuration: '7s' }} />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl text-left">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gold-orange/15 border border-gold-orange/30 text-gold-orange mb-8 animate-slide-up">
            <Flame className="w-5 h-5 animate-pulse" />
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase">
              {t('nowServingTag')}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-6 animate-slide-up animation-delay-150">
            {t('heroMainHeadline')} <br />
            <span className="text-gold-orange block mt-2 relative">
              {t('heroMainHeadlinePart2')}
              <span className="absolute bottom-0 left-0 w-32 h-1.5 bg-gold-orange rounded-full hidden sm:block"></span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl animate-slide-up animation-delay-300">
            {t('heroSubheadline')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 animate-slide-up animation-delay-450">
            <button
              onClick={scrollToMenu}
              className="flex items-center justify-center space-x-2 bg-gold-orange hover:bg-gold-orange-hover text-white text-base font-bold uppercase tracking-wider px-8 py-4.5 rounded-2xl transition-all duration-300 shadow-xl shadow-gold-orange/30 hover:shadow-gold-orange/50 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
            >
              <span>{t('exploreMenu')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={scrollToContact}
              className="flex items-center justify-center space-x-2 bg-charcoal/80 hover:bg-charcoal border border-gray-600 hover:border-gold-orange text-warm-beige hover:text-white px-8 py-4.5 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-xl transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-gold-orange md-scale-95" />
              <span>{t('locateUs')}</span>
            </button>
          </div>

          {/* Live Quick Info Footer */}
          <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 border-t border-gray-800 pt-10 animate-fade-in animation-delay-600">
            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-display text-white">100% Halal</span>
              <span className="block text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                {language === 'lt' ? 'Aukščiausios Kokybės' : 'Quality Prime Certified'}
              </span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-display text-white">
                {language === 'lt' ? 'Kasdien Šviežia' : 'Daily Fresh'}
              </span>
              <span className="block text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                {language === 'lt' ? 'Naminis Lavašas' : 'Artisan Sourdough Lavash'}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="block text-2xl sm:text-3xl font-bold font-display text-gold-orange">
                {language === 'lt' ? 'Greitas Pristatymas' : 'Fast Delivery'}
              </span>
              <span className="block text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                {language === 'lt' ? 'Karštas ir Sandarus' : 'Tightly Foiled, Piping Hot'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
