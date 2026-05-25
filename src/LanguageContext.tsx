import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'lt';

type TranslationKeys =
  | 'exploreMenu'
  | 'locateUs'
  | 'bagTitle'
  | 'emptyBag'
  | 'emptyBagDesc'
  | 'orderSummaries'
  | 'fulfillmentMode'
  | 'localPickup'
  | 'homeDelivery'
  | 'receiptDetails'
  | 'paymentMethod'
  | 'payCard'
  | 'payCash'
  | 'wallet'
  | 'subtotal'
  | 'serviceFee'
  | 'totalAmount'
  | 'submitOrder'
  | 'kitchenActive'
  | 'activeTracker'
  | 'noActiveOrders'
  | 'noActiveOrdersDesc'
  | 'orderStatusReceived'
  | 'orderStatusGrilling'
  | 'orderStatusWrapping'
  | 'orderStatusReady'
  | 'estimatedTime'
  | 'size'
  | 'saucesTitle'
  | 'extrasTitle'
  | 'addToCart'
  | 'orderPlacedTitle'
  | 'nowServingTag'
  | 'heroMainHeadline'
  | 'heroMainHeadlinePart2'
  | 'heroSubheadline'
  | 'storyTitle'
  | 'storySubtitle'
  | 'storyHeader'
  | 'storyBody'
  | 'galleryTitle'
  | 'contactTitle'
  | 'contactSubtitle'
  | 'contactAddress'
  | 'contactPhone'
  | 'contactEmail'
  | 'activeOrdersBtn'
  | 'cartBtn'
  | 'customQuantity'
  | 'customBasePrice'
  | 'contactNamePlaceholder'
  | 'contactPhonePlaceholder'
  | 'contactAddressPlaceholder'
  | 'contactErrorsName'
  | 'contactErrorsPhone'
  | 'contactErrorsAddress'
  | 'paymentCardNum'
  | 'paymentCardExp'
  | 'paymentCardCvv'
  | 'paymentSandbox'
  | 'paymentCashDesc'
  | 'paymentFeeHelp'
  | 'orderStatusTitle'
  | 'orderStatusDesc'
  | 'exploreHadus'
  | 'homepage'
  | 'feastMenu'
  | 'ourHeritage'
  | 'reachUs'
  | 'grillFlagship'
  | 'footerSocialsTitle'
  | 'allRightsReserved'
  | 'backToTop';

const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    exploreMenu: 'Explore Menu',
    locateUs: 'Locate Us',
    bagTitle: 'Shopping Bag',
    emptyBag: 'Your shopping bag is empty',
    emptyBagDesc: 'Go ahead and explore our flame grilled menu to satisfy your cravings.',
    orderSummaries: 'Order Summaries',
    fulfillmentMode: 'Fulfillment Mode',
    localPickup: 'Local Pickup',
    homeDelivery: 'Home Delivery',
    receiptDetails: 'Receipt Details',
    paymentMethod: 'Payment Method',
    payCard: 'Pay Card',
    payCash: 'Pay Cash',
    wallet: 'Apple/GPay',
    subtotal: 'Subtotal Items',
    serviceFee: 'Packaging & Service Fee',
    totalAmount: 'Total Amount',
    submitOrder: 'Place Order',
    kitchenActive: 'Kitchen is Active',
    activeTracker: 'Active Orders Tracker',
    noActiveOrders: 'No active orders in preparation yet',
    noActiveOrdersDesc: 'Submit an order through the shopping bag drawer to inspect live grill tracker.',
    orderStatusReceived: 'Received',
    orderStatusGrilling: 'Grilling',
    orderStatusWrapping: 'Wrapping',
    orderStatusReady: 'Ready',
    estimatedTime: 'Est. Prep Time',
    size: 'Size',
    saucesTitle: 'Signature Sauce',
    extrasTitle: 'Gourmet Extras',
    addToCart: 'Confirm & Add to Bag',
    orderPlacedTitle: 'Order Processed Successfully!',
    nowServingTag: 'Now Serving Premium Flame Grilled Delights',
    heroMainHeadline: 'Authentic',
    heroMainHeadlinePart2: 'Grilled Flavor',
    heroSubheadline: 'Fresh kebabs, wraps, and traditional street food made daily using locally sourced prime meats, signature spices, and secret clay-oven roasted recipe sauces.',
    storyTitle: 'Craft & Heritage',
    storySubtitle: 'Born in Woodfire smoke',
    storyHeader: 'The Legacy of Turkish Charcoal Culture',
    storyBody: 'At Hadus, we preserve ancient techniques of open pit grilling. We prepare our bespoke lavas sourdough daily and slow-skewer halal-certified local prime ribs and chicken fillets over high-temperatures natural white charcoal. Served hot and spiced to absolute perfection.',
    galleryTitle: 'Kitchen Visuals',
    contactTitle: 'Find Hadus Vilnius',
    contactSubtitle: 'Visit our flagship grill for authentic smoke flavor or place a delivery online.',
    contactAddress: 'Gabijos g. 30, Vilnius, Lithuania, 06100',
    contactPhone: '+370 612 34567',
    contactEmail: 'hello@haduskabab.lt',
    activeOrdersBtn: 'Order Tracker',
    cartBtn: 'Bag',
    customQuantity: 'Quantity',
    customBasePrice: 'Base Price',
    contactNamePlaceholder: 'Your Full Name',
    contactPhonePlaceholder: 'Phone Number for Verification',
    contactAddressPlaceholder: 'Enter Full Physical Delivery Address',
    contactErrorsName: 'Please provide your name',
    contactErrorsPhone: 'Valid phone is required for order verification',
    contactErrorsAddress: 'A physical delivery address is required',
    paymentCardNum: 'Card Number',
    paymentCardExp: 'Expiry Date',
    paymentCardCvv: 'CVC / CVV',
    paymentSandbox: 'SECURE SANDBOX WALLET GATEWAY',
    paymentCashDesc: 'Please pay the exact amount to our staff when collecting your order or to the delivery courier.',
    paymentFeeHelp: 'Includes compostable organic packing foil',
    orderStatusTitle: 'Status Tracker',
    orderStatusDesc: 'Watch your authentic kebab progress in real-time!',
    exploreHadus: 'Explore Hadus',
    homepage: 'Homepage',
    feastMenu: 'Feast Menu',
    ourHeritage: 'Our Heritage',
    reachUs: 'Reach Us',
    grillFlagship: 'Grill Flagship',
    footerSocialsTitle: 'Follow the Fire',
    allRightsReserved: 'Hadus Kabab Vilnius. Inspired by Jammi layout. All Rights Reserved.',
    backToTop: 'Return to top'
  },
  lt: {
    exploreMenu: 'Naršyti Meniu',
    locateUs: 'Rasti Mus',
    bagTitle: 'Pirkinių Krepšelis',
    emptyBag: 'Pirkinių krepšelis tuščias',
    emptyBagDesc: 'Peržiūrėkite mūsų ugnies kepsnių meniu ir išsirinkite savo mėgstamiausius.',
    orderSummaries: 'Užsakymo suvestinė',
    fulfillmentMode: 'Atsiėmimo būdas',
    localPickup: 'Atsiėmimas vietoje',
    homeDelivery: 'Pristatymas į namus',
    receiptDetails: 'Pristatymo duomenys',
    paymentMethod: 'Mokėjimo būdas',
    payCard: 'Mokėti kortele',
    payCash: 'Mokėti grynaisiais',
    wallet: 'Apple / GPay',
    subtotal: 'Suma už krepšelį',
    serviceFee: 'Pakuotės ir paslaugos mokestis',
    totalAmount: 'Iš viso mokėti',
    submitOrder: 'Pateikti užsakymą',
    kitchenActive: 'Virtuvė dirba',
    activeTracker: 'Užsakymų sekimas',
    noActiveOrders: 'Kol kas nėra aktyvių užsakymų',
    noActiveOrdersDesc: 'Sukurkite užsakymą per pirkinių krepšelio skiltį, kad matytumėte tiesioginę būseną.',
    orderStatusReceived: 'Gautas',
    orderStatusGrilling: 'Kepama',
    orderStatusWrapping: 'Vyniojama',
    orderStatusReady: 'Paruošta',
    estimatedTime: 'Numatomas laikas',
    size: 'Dydis',
    saucesTitle: 'Parašo Padažas',
    extrasTitle: 'Gurmaniški Priedai',
    addToCart: 'Patvirtinti ir į krepšelį',
    orderPlacedTitle: 'Užsakymas sėkmingai priimtas!',
    nowServingTag: 'Šiuo metu patiekiame aukščiausios kokybės kepsnius',
    heroMainHeadline: 'Autentiškas',
    heroMainHeadlinePart2: 'Ugnies Skonis',
    heroSubheadline: 'Švieži kebabai, suktinukai ir tradicinis gatvės maistas, gaminamas kasdien iš vietinės šviežios mėsos su slaptais krosnyje skrudintais padažais.',
    storyTitle: 'Meistrystė ir Paveldas',
    storySubtitle: 'Gimęs malkų dūmuose',
    storyHeader: 'Turkų anglies virtuvės palikimas',
    storyBody: 'Hadus restorane mes saugome senovines kepimo ant atviros ugnies technikas. Mūsų lavaso tešla minkoma kasdien, o halal sertifikuota vietinė mėsa kepama ant aukštos temperatūros natūralių beržo anglių. Patiekiama karšta ir puikiai pagardinta prieskoniais.',
    galleryTitle: 'Virtuvės vaizdai',
    contactTitle: 'Raskite Hadus Vilniuje',
    contactSubtitle: 'Apsilankykite mūsų užeigoje Gabijos g. arba užsisakykite pristatymą tiesiai į namus.',
    contactAddress: 'Gabijos g. 30, Vilnius, Lietuva, 06100',
    contactPhone: '+370 612 34567',
    contactEmail: 'hello@haduskabab.lt',
    activeOrdersBtn: 'Užsakymai',
    cartBtn: 'Krepšelis',
    customQuantity: 'Kiekis',
    customBasePrice: 'Bazinė kaina',
    contactNamePlaceholder: 'Jūsų vardas ir pavardė',
    contactPhonePlaceholder: 'Telefono numeris patvirtinimui',
    contactAddressPlaceholder: 'Įveskite tikslų pristatymo adresą',
    contactErrorsName: 'Prašome pateikti savo vardą',
    contactErrorsPhone: 'Reikalingas galiojantis telefonas užsakymo patvirtinimui',
    contactErrorsAddress: 'Reikalingas fizinis pristatymo adresas',
    paymentCardNum: 'Kortelės numeris',
    paymentCardExp: 'Galiojimo data',
    paymentCardCvv: 'CVC / CVV kodas',
    paymentSandbox: 'SAUGŪS BANDOMIEJI MOKĖJIMAI',
    paymentCashDesc: 'Prašome sumokėti tikslią sumą mūsų darbuotojui atsiimant užsakymą arba kurjeriui pristatymo metu.',
    paymentFeeHelp: 'Apima biologiškai skaidžią ekologišką pakuotę',
    orderStatusTitle: 'Būsenos seklys',
    orderStatusDesc: 'Stebėkite savo užsakymo gamybą realiu laiku!',
    exploreHadus: 'Atraskite Hadus',
    homepage: 'Pradžia',
    feastMenu: 'Puotos Meniu',
    ourHeritage: 'Mūsų istorija',
    reachUs: 'Kontaktai',
    grillFlagship: 'Mūsų Užeiga',
    footerSocialsTitle: 'Sekite dūmą',
    allRightsReserved: 'Hadus Kabab Vilnius. Įkvėpta Jammi dizaino. Visos teisės saugomos.',
    backToTop: 'Į viršų'
  }
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const cached = localStorage.getItem('hadus_language');
    return (cached === 'lt' || cached === 'en') ? cached : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hadus_language', lang);
  };

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
