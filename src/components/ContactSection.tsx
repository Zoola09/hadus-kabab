import { useState, FormEvent } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function ContactSection() {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Cleanup
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* SECTION TITLE */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-orange/10 border border-gold-orange/20 text-gold-orange mb-4">
          <Phone className="w-4 h-4" />
          <span className="font-sans text-xs font-bold uppercase tracking-widest">
            {language === 'lt' ? 'Susisiekite su mumis' : 'Connect With Us'}
          </span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
          {language === 'lt' ? 'Kur Mus Rasti' : 'Where to Find Hadus'}
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-500 mt-4 leading-relaxed max-w-xl mx-auto">
          {language === 'lt'
            ? 'Reikia daugiau informacijos apie didesnius užsakymus, alergenus ar šventinį maitinimą? Susisiekite su mūsų grilio meistrais arba apsilankykite užeigoje.'
            : 'Need details about bulk orders, allergen specs, or catering reserves? Squeal to our master grillers or visit our flagships.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* CONTACT DATA INFOS (Cols 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          
          <div className="bg-white rounded-3xl border border-warm-beige-dark p-6 sm:p-8 space-y-8">
            <h3 className="font-display text-xl font-bold text-charcoal flex items-center">
              <span className="w-1.5 h-5 bg-gold-orange mr-2 rounded"></span>
              {language === 'lt' ? 'Mūsų užeigos informacija' : 'Branch Flagship Info'}
            </h3>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-warm-beige-light border border-warm-beige-dark text-gold-orange rounded-xl flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {language === 'lt' ? 'ADRESAS' : 'ADDRESS'}
                </span>
                <span className="block font-sans text-sm sm:text-base text-charcoal font-semibold mt-1">
                  Gabijos g. 30, Vilnius<br />
                  Lithuania, 06100
                </span>
                <a
                  href="https://maps.app.goo.gl/DZepVrJUF8o4SssB6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-sans text-xs text-gold-orange mt-1.5 font-bold cursor-pointer hover:underline"
                >
                  {language === 'lt' ? 'Rodyti maršrutą žemėlapyje' : 'Get directions on map'}
                </a>
              </div>
            </div>

            {/* Hot Call */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-warm-beige-light border border-warm-beige-dark text-gold-orange rounded-xl flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {language === 'lt' ? 'TELEFONAS SUSISIEKTI' : 'PHONE HOTLINE'}
                </span>
                <a href="tel:+37061234567" className="block font-sans text-sm sm:text-base text-charcoal font-semibold mt-1 hover:text-gold-orange transition-colors">
                  +370 612 34567
                </a>
                <span className="block font-sans text-[10px] text-gray-400 font-medium mt-1">
                  {language === 'lt' ? 'Skambučiai priimami virtuvės darbo laiku' : 'Available during active kitchen hours'}
                </span>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-warm-beige-light border border-warm-beige-dark text-gold-orange rounded-xl flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="block font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {language === 'lt' ? 'DARBO LAIKAS' : 'OPENING HOURS'}
                </span>
                
                <div className="mt-2.5 space-y-1.5 font-sans text-xs text-gray-600">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-semibold text-charcoal">
                      {language === 'lt' ? 'Pirm - Ketv:' : 'Mon - Thu:'}
                    </span>
                    <span className="font-mono text-gray-500">10:00 - 24:00</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-semibold text-charcoal">
                      {language === 'lt' ? 'Penkt - Šešt:' : 'Fri - Sat:'}
                    </span>
                    <span className="font-mono text-gold-orange font-bold">10:00 - 04:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-charcoal">
                      {language === 'lt' ? 'Sekmadienis:' : 'Sunday:'}
                    </span>
                    <span className="font-mono text-gray-500">11:00 - 23:00</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* GOOGLE MAPS EMBEDDED */}
          <div className="relative h-60 w-full rounded-3xl overflow-hidden shadow-md border border-warm-beige-dark">
            <iframe
              title="Hadus Kabab Gabijos Vilnius Location"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2303.5655693743997!2d25.220998999999996!3d54.734856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTTCsDQ0JzA1LjUiTiAyNcKwMTMnMTUuNiJF!5e0!3m2!1slt!2slt!4v1779709029026!5m2!1slt!2slt"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

        {/* FEEDBACK CONTACT FORM (Cols 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-warm-beige-dark p-6 sm:p-10 flex flex-col justify-between">
          
          {isSubmitted ? (
            /* SUCCESS FEEDBACK BLOCK */
            <div className="my-auto text-center py-10 space-y-5 animate-scale-up">
              <div className="w-16 h-16 bg-green-50 rounded-full border border-green-200 text-green-500 flex items-center justify-center mx-auto mb-2 animate-bounce-short">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <h3 className="font-display text-2xl font-black text-charcoal">
                {language === 'lt' ? 'Žinutė sėkmingai pristatyta!' : 'Message Sizzled Safely!'}
              </h3>
              
              <p className="font-sans text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                {language === 'lt'
                  ? 'Dėkojame, kad susisiekėte su Hadus Kabab. Mūsų komanda netrukus peržiūrės jūsų žinutę ir susisiekia el. paštu arba telefonu.'
                  : 'Thank you for reaching out to Hadus Kabab. Our crew will evaluate your words and get back via email or mobile shortly.'}
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-gold-orange hover:bg-gold-orange-hover text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer"
              >
                {language === 'lt' ? 'Siųsti naują žinutę' : 'Send New Message'}
              </button>
            </div>
          ) : (
            /* CONCRETE FORM CONTROL */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-charcoal flex items-center mb-1">
                  <span className="w-1.5 h-5 bg-gold-orange mr-2 rounded"></span>
                  {language === 'lt' ? 'Parašykite mūsų komandai' : 'Talk to our Pit Crew'}
                </h3>
                <p className="font-sans text-xs text-gray-400 mt-1">
                  {language === 'lt'
                    ? 'Turite klausimų, pastabų ar norite užsisakyti maistą švenčių renginiams? Brūkštelkite mums!'
                    : 'Have questions, corrections, or catering reservations? Fire away!'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-wide">
                    {language === 'lt' ? 'Mano Vardas *' : 'Your Name *'}
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder={language === 'lt' ? 'Įveskite savo vardą' : 'Enter full name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm text-charcoal bg-gray-50/50 hover:bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange focus:bg-white transition-all duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-wide">
                    {language === 'lt' ? 'El. Pašto Adresas *' : 'Email Address *'}
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm text-charcoal bg-gray-50/50 hover:bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-subject" className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-wide">
                  {language === 'lt' ? 'Užklausos Tema (neprivaloma)' : 'Subject Line (Optional)'}
                </label>
                <input
                  id="form-subject"
                  type="text"
                  placeholder={language === 'lt' ? 'pvz., didesni užsakymai arba maitinimas šventėse' : 'e.g. Bulk wrap orders or catering'}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 text-xs sm:text-sm text-charcoal bg-gray-50/50 hover:bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange focus:bg-white transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-message" className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-wide">
                  {language === 'lt' ? 'Žinutės Turinys *' : 'Your Message Details *'}
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  placeholder={language === 'lt' ? 'Išsamiai aprašykite savo pastabas ar norus...' : 'Tell us what you need in detail...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 text-xs sm:text-sm text-charcoal bg-gray-50/50 hover:bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-orange/20 focus:border-gold-orange focus:bg-white transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit panel */}
              <button
                type="submit"
                disabled={isSubmitting || !name || !email || !message}
                className={`w-full bg-gold-orange hover:bg-gold-orange-hover text-white py-3.5 px-6 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-xl shadow-gold-orange/15 flex items-center justify-center space-x-2.5 cursor-pointer ${
                  isSubmitting || !name || !email || !message ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>{language === 'lt' ? 'Siunčiame...' : 'Pouring coals...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{language === 'lt' ? 'Siųsti Žinutę' : 'Send Message'}</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </section>
  );
}
