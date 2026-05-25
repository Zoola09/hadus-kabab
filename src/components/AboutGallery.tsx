import { Sparkles, Flame, CheckCircle, Quote } from 'lucide-react';
import { GALLERY_IMAGES, GALLERY_IMAGES_LT } from '../data';
import { useLanguage } from '../LanguageContext';

export default function AboutGallery() {
  const { language } = useLanguage();

  const benefits = language === 'lt'
    ? [
        '100% tik aukščiausios kokybės mėsa',
        'Lavašas kepamas kas valandą',
        'Mūsų slapti česnakiniai padažai',
        'Natūralūs marinatai be cheminių priedų'
      ]
    : [
        '100% Certified Prime Cuts Only',
        'Sourdough Lavash Baked Hourly',
        'Pure Roasted-Garlic Secret Sauces',
        'Chemical & Preservative Free Rubs'
      ];

  const galleryItems = language === 'lt' ? GALLERY_IMAGES_LT : GALLERY_IMAGES;

  return (
    <div className="bg-[#fcfcfc] transition-colors duration-300">
      
      {/* ABOUT SECTION CORE */}
      <section id="about" className="bg-[#f5f5dc] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Story copy (Cols 7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#e65100]/15 border border-[#e65100]/30 text-[#e65100]">
              <Flame className="w-4 h-4 animate-pulse" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest">
                {language === 'lt' ? 'MŪSŲ ISTORIJA' : 'Our Heritage Story'}
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-stone-850">
              {language === 'lt' ? (
                <>
                  Gimęs iš <span className="text-[#e65100]">atviros ugnies ir tradicijų</span>
                </>
              ) : (
                <>
                  Born from <span className="text-[#e65100]">Open Flames & Tradition</span>
                </>
              )}
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl font-normal">
              {language === 'lt'
                ? 'Hadus Kabab Vilnius tiekia autentiškus keptus patiekalus, įkvėptus tradicinių gatvės maisto receptų, naudojant šviežius ingredientus ir ryškius skonius. Tikime, kad gatvės maistas yra garbingas amatas, nusipelnęs geriausių produktų.'
                : 'Hadus Kabab serves authentic grilled dishes inspired by traditional street food recipes using fresh ingredients and bold flavors. We believe street food is a noble craft that deserves the finest ingredients.'}
            </p>

            <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl font-light">
              {language === 'lt'
                ? 'Kiekvieną rytą mūsų kepėjai kruopščiai paruošia ir dukart marinuoja aukščiausios kokybės jautieną, avieną bei vištieną šalto spaudimo aliejuje su šviežiais vietiniais česnakais ir rankomis maltais prieskoniais. Kepame išskirtinai ant natūralių beržinių anglių, kad išlaikytume sultingą dūmo skonį kurio nepamiršite.'
                : 'Every morning, our pitmasters hand-trim and double-marinate prime lamb cuts and chicken breast fillets in cold pressed oils, minced local garlic, and hand-ground sumac imports. We cook exclusively over high-density, raw oak lump coal to lock in pure, smoky moisture.'}
            </p>

            {/* Quick checklist benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 pt-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle className="w-5 h-5 text-[#e65100] flex-shrink-0" />
                  <span className="font-sans font-semibold">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Testimonial callout */}
            <div className="border-l-4 border-[#e65100] pl-5 pt-1.5 pb-1.5 bg-[#e65100]/5 rounded-r-xl max-w-xl">
              <Quote className="w-8 h-8 text-[#e65100]/25 -mb-2" />
              <p className="font-sans text-xs sm:text-sm text-stone-800 italic font-normal">
                {language === 'lt'
                  ? '"Hadus vištienos suktinukas apibrėžia, koks turi būti tikras ant grotelių keptas šalies kebabas. Karštas, pritaikytas pagal jūsų norus, su gausiu česnakiniu padažu!"'
                  : '"The chicken wrap at Hadus defines what grilled kebab street dining should be. Hot, heavily customized, with garlic sauce that lingers beautifully!"'}
              </p>
              <span className="block font-sans text-[11px] font-bold uppercase tracking-widest text-[#e65100] mt-2">
                — {language === 'lt' ? 'Gastro Apžvalga, 2026' : 'Gastro Review, 2026'}
              </span>
            </div>

          </div>

          {/* Story visual representation (Cols 5) */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl group border border-stone-200">
            <img
              src="/images/about_grill_1778320577939.png"
              alt="Perfect Grilling Technique over Charcoal"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-black/10" />
            <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 bg-white/90 rounded-2xl border border-stone-200 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-[#e65100] font-mono tracking-widest uppercase block">
                {language === 'lt' ? 'IŠTIKIMI NUO PIRMOS DIENOS' : 'MEMBER SINCE day one'}
              </span>
              <span className="font-display text-base font-extrabold text-stone-850 mt-1 block">
                {language === 'lt' ? 'Išskirtinis medžio anglies dūmo skonis' : 'Commitment to Charcoal Taste'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* PHOTO GALLERY GRID */}
      <section id="gallery" className="py-24 bg-[#fcfcfc] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#e65100]/15 border border-[#e65100]/30 text-[#e65100] mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest">
                {language === 'lt' ? 'Mūsų Galerija' : 'Our Gallery'}
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-850">
              {language === 'lt' ? 'Akimirkos iš Hadus Virtuvės' : 'Sights of Hadus Grilling'}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-500 mt-2">
              {language === 'lt'
                ? 'Žvilgtelkite į karštas krosnis, prieskonių grūstuvus ir dūminius mėsos iešmus.'
                : 'Browse the visual journey of our ovens, spice mortars, and searing pit skewers.'}
            </p>
          </div>

          {/* GRID CORES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((img, index) => (
              <div
                key={index}
                className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-white cursor-default"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                
                {/* Overlay transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/35 to-black/30 group-hover:from-stone-900 group-hover:via-stone-900/50 transition-all duration-300" />
                
                {/* Detail contents */}
                <div className="absolute bottom-5 left-5 right-5 text-left transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e65100]/25 border border-[#e65100]/40 text-[#ffb74d] text-[9px] font-bold uppercase tracking-widest mb-2 leading-none">
                    GRILL SPEC
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                    {img.title}
                  </h4>
                  <p className="font-sans text-[11px] text-gray-350 mt-1.5 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
