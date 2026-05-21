import { Flame, Facebook, Instagram, Twitter, ChevronUp } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-white pt-20 pb-12 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UPPER ROW GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-charcoal-light">
          
          {/* Column 1: Brand & Desc (Cols 5) */}
          <div className="md:col-span-5 space-y-5 text-left">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 bg-gold-orange rounded-xl flex items-center justify-center shadow">
                <Flame className="w-6 h-6 text-warm-beige group-hover:scale-115 transition-transform" />
              </div>
              <div>
                <span className="font-display text-2xl font-black text-white uppercase tracking-tight leading-none block">
                  Hadus
                </span>
                <span className="font-sans text-[11px] font-bold text-gold-orange tracking-widest uppercase block leading-none mt-1">
                  Kabab • Grill • Street
                </span>
              </div>
            </button>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {language === 'lt'
                ? 'Autentiškas malkų dūmų kepimo nuotykis, įkvėptas senovės turkų medžio anglies kultūros. Kasdien ruošiama šviežia vietinė mėsa ir kas valandą kepamas prabangus garuojantis lavašas.'
                : 'An authentic wood smoke barbecue adventure inspired by ancestral Turkish charcoal culture. Fresh local meats and hourly-baked sourdough lavash wrapped with premium garlic secret recipe sauces.'}
            </p>
            
            {/* Socials row */}
            <div className="flex items-center space-x-3.5 pt-2">
              {[
                { icon: Facebook, label: 'Facebook Link' },
                { icon: Instagram, label: 'Instagram Link' },
                { icon: Twitter, label: 'Twitter Link' },
              ].map((soc, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-xl bg-charcoal-light/60 hover:bg-gold-orange text-gray-400 hover:text-white transition-all duration-350 transform hover:-translate-y-0.5 shadow cursor-pointer border border-[#2D2D2D]"
                  aria-label={soc.label}
                >
                  <soc.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Cols 3) */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="font-display text-xs font-bold text-gold-orange uppercase tracking-widest pb-1 border-b border-charcoal-light/40 w-2/3">
              {t('exploreHadus')}
            </h4>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-gray-400">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-gold-orange transition-colors cursor-pointer">
                  {t('homepage')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('menu')} className="hover:text-gold-orange transition-colors cursor-pointer">
                  {t('feastMenu')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-gold-orange transition-colors cursor-pointer">
                  {t('ourHeritage')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-gold-orange transition-colors cursor-pointer">
                  {t('reachUs')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact highlights (Cols 4) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="font-display text-xs font-bold text-gold-orange uppercase tracking-widest pb-1 border-b border-charcoal-light/40 w-1/2">
              {t('grillFlagship')}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
              {t('contactAddress')}<br />
              Hotline: <a href="tel:+37061234567" className="text-white hover:text-gold-orange font-semibold">{t('contactPhone')}</a><br />
              Email: <span className="text-white">{t('contactEmail')}</span>
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold tracking-widest uppercase">
                🟢 {t('kitchenActive')}
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL ROW */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[11px] text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} {t('allRightsReserved')}
          </p>
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-1 bg-charcoal-light/40 p-1 rounded-xl border border-charcoal-light/60">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-300 transform active:scale-95 cursor-pointer ${
                language === 'en'
                  ? 'bg-gold-orange text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Switch to English"
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
            <button
              onClick={() => setLanguage('lt')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-300 transform active:scale-95 cursor-pointer ${
                language === 'lt'
                  ? 'bg-gold-orange text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Perjungti į lietuvių kalbą"
            >
              <span>🇱🇹</span>
              <span>Lietuvių</span>
            </button>
          </div>

          {/* Scroll to top circle */}
          <button
            onClick={scrollToTop}
            className="p-3 bg-charcoal-light hover:bg-gold-orange text-gray-300 hover:text-white rounded-full transition-all duration-350 cursor-pointer shadow-lg border border-[#2D2D2D] transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center"
            title={t('backToTop')}
          >
            <ChevronUp className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
