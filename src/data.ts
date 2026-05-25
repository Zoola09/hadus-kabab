import { MenuItem } from './types';

// Standard customization templates localized
const standardCustomization = {
  sizes: [
    { name: 'Regular (Lavašas)', priceModifier: 0 },
    { name: 'Large (Didelis)', priceModifier: 1.50 },
    { name: 'Grand (Karališkas)', priceModifier: 3.00 },
  ],
  sauces: [
    { name: 'Garlic Special (Česnakinis)', priceModifier: 0 },
    { name: 'Spicy Secret (Aštrus)', priceModifier: 0 },
    { name: 'Mix Sauce (Mišrus)', priceModifier: 0.40 },
    { name: 'Tzatziki Soft (Švelnus Tzatziki)', priceModifier: 0 },
    { name: 'No Sauce (Be padažo)', priceModifier: 0 },
  ],
  extras: [
    { name: 'Extra Cheese Slice (Sūris)', priceModifier: 0.80 },
    { name: 'Jalapeno Slices (Chalapos pipirai)', priceModifier: 0.50 },
    { name: 'Fresh Avocado (Avokadas)', priceModifier: 1.00 },
    { name: 'Extra Meat Portion (Papildoma mėsa)', priceModifier: 2.20 },
  ],
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'kebab-lavasas',
    name: 'Kebab in Lavash',
    name_lt: 'Kebabas lavaše',
    description: 'Lavash, selected meat, selected sauce, tomatoes, onions, cucumbers, cabbage.',
    description_lt: 'Lavašas, pasirinkta mėsa, pasirinktas padažas, pomidorai, svogūnai, agurkai, kopūstai.',
    category: 'kebabs',
    basePrice: 5.00,
    image: '/images/menu_item_1_1778322066440.png',
    popular: true,
    customization: standardCustomization,
  },
  {
    id: 'buritas',
    name: 'Burrito',
    name_lt: 'Buritas',
    description: 'Lavash, chicken, selected sauce, cheese, tomatoes, beans, burrito sauce.',
    description_lt: 'Lavašas, vištiena, pasirinktas padažas, sūris, pomidorai, pupelės, burito padažas.',
    category: 'wraps',
    basePrice: 5.50,
    image: '/images/menu_item_2_1778322080469.png',
    popular: false,
    customization: standardCustomization,
  },
  {
    id: 'kebab-pitoje',
    name: 'Kebab in Pita',
    name_lt: 'Kebabas pitoje',
    description: 'Special pita bun, selected meat, selected sauce, crisp lettuce, tomatoes, cucumbers.',
    description_lt: 'ℹ️ Pastaba: ruošiant pitą šildoma tik bandelė ir mėsa, todėl šis patiekalas - gerokai sausesnis.',
    category: 'kebabs',
    basePrice: 6.00,
    image: '/images/menu_item_3_1778322095237.png',
    popular: false,
    customization: standardCustomization,
  },
  {
    id: 'kebab-leksteje',
    name: 'Kebab on Plate',
    name_lt: 'Kebabas lėkštėje',
    description: 'Selected meat, selected sauce, cucumbers, tomatoes, onions, French fries, fresh salad.',
    description_lt: 'Pasirinkta mėsa, pasirinktas padažas, agurkai, pomidorai, svogūnai, gruzdintos bulvytės.',
    category: 'plates',
    basePrice: 6.50,
    image: '/images/menu_item_4_1778322111463.png',
    popular: false,
    customization: standardCustomization,
  },
  {
    id: 'kovotojo-kebabas',
    name: 'Fighter Kebab (Huge)',
    name_lt: 'Kovotojo kebabas',
    description: 'Huge double lavash, extra portion of selected meat, selected sauce, double vegetables.',
    description_lt: 'Lavašas, pasirinkta mėsa, pasirinktas padažas, pomidorai, svogūnai, agurkai (ypač didelė porcija).',
    category: 'kebabs',
    basePrice: 11.00,
    image: '/images/menu_item_5_1778322126658.png',
    popular: true,
    customization: standardCustomization,
  },
  {
    id: 'wrapas',
    name: 'Crispy Wrap',
    name_lt: 'Wrapas',
    description: 'With crispy chicken or shrimp, optional. With shrimp: Lavash, cucumbers, tomatoes, onions.',
    description_lt: 'Su traškia vištiena arba krevetėmis, pasirinktinai. Su krevetėmis: Lavašas, agurkai, pomidorai, svogūnai.',
    category: 'wraps',
    basePrice: 6.50,
    image: '/images/menu_item_6_1778322144561.png',
    popular: false,
    customization: standardCustomization,
  },
  {
    id: 'pepsi',
    name: 'Pepsi',
    name_lt: 'Pepsi',
    description: '0,33l / 0,5l',
    description_lt: '0,33l / 0,5l',
    category: 'drinks',
    basePrice: 1.40,
    image: '/images/pepsi.png',
    popular: false,
    customization: {
      sizes: [
        { name: '0.33l', priceModifier: 0 },
        { name: '0.5l', priceModifier: 0.40 },
      ],
      sauces: [],
      extras: [],
    },
  },
  {
    id: 'sevenup',
    name: '7UP',
    name_lt: '7UP',
    description: '0,33l / 0,5l',
    description_lt: '0,33l / 0,5l',
    category: 'drinks',
    basePrice: 1.40,
    image: '/images/sevenup.png',
    popular: false,
    customization: {
      sizes: [
        { name: '0.33l', priceModifier: 0 },
        { name: '0.5l', priceModifier: 0.40 },
      ],
      sauces: [],
      extras: [],
    },
  },
  {
    id: 'mirinda',
    name: 'Mirinda',
    name_lt: 'Mirinda',
    description: '0,33l / 0,5l',
    description_lt: '0,33l / 0,5l',
    category: 'drinks',
    basePrice: 1.40,
    image: '/images/mirinda.png',
    popular: false,
    customization: {
      sizes: [
        { name: '0.33l', priceModifier: 0 },
        { name: '0.5l', priceModifier: 0.40 },
      ],
      sauces: [],
      extras: [],
    },
  },
  {
    id: 'pepsi-zero',
    name: 'Pepsi Zero Sugar',
    name_lt: 'Pepsi Zero Sugar',
    description: '0,33l',
    description_lt: '0,33l',
    category: 'drinks',
    basePrice: 1.40,
    image: '/images/pepsi_zero.png',
    popular: false,
    customization: {
      sizes: [
        { name: '0.33l', priceModifier: 0 },
      ],
      sauces: [],
      extras: [],
    },
  },
  {
    id: 'jamjam-burger',
    name: 'JamJam burger',
    name_lt: 'JamJam burgeris',
    description: 'Bun with sesame, pickles, tomatoes, red onions, cheese, beef burger patty, BBQ sauce, garlic sauce.',
    description_lt: 'Bandelė su sezamu, marinuoti agurkai, pomidorai, raudonieji svogūnai, sūris, jautienos maltinukas, BBQ padažas, česnakinis padažas.',
    category: 'burgers',
    basePrice: 6.00,
    image: '/images/jamjam_burger.png',
    popular: true,
    customization: {
      sizes: [
        { name: 'Standard (Standartinis)', priceModifier: 0 }
      ],
      sauces: [],
      extras: [
        { name: 'No tomatoes (Be pomidorų)', priceModifier: 0 },
        { name: 'No onions (Be svogūnų)', priceModifier: 0 },
        { name: 'No cucumber (Be agurkų)', priceModifier: 0 },
        { name: 'Less sauce (Mažiau padažo)', priceModifier: 0 }
      ]
    }
  },
  {
    id: 'crispy-chicken-burger',
    name: 'Crispy chicken burger',
    name_lt: 'Traškios vištienos burgeris',
    description: 'Crispy chicken, chipotle sauce, tomatoes, red onions, lettuce, pickles, burger bun. ⚠️ May contain traces of bones.',
    description_lt: 'Traški vištiena, čipotlės padažas, pomidorai, raudonieji svogūnai, salotos, marinuoti agurkai, bandelė. ⚠️ Gali būti kaulų likučių.',
    category: 'burgers',
    basePrice: 6.50,
    image: '/images/crispy_chicken_burger.png',
    popular: false,
    customization: {
      sizes: [
        { name: 'Standard (Standartinis)', priceModifier: 0 }
      ],
      sauces: [],
      extras: [
        { name: 'No tomatoes (Be pomidorų)', priceModifier: 0 },
        { name: 'No onions (Be svogūnų)', priceModifier: 0 },
        { name: 'No cucumber (Be agurkų)', priceModifier: 0 },
        { name: 'Less sauce (Mažiau padažo)', priceModifier: 0 }
      ]
    }
  },
  {
    id: 'umami-burger',
    name: 'Umami burger',
    name_lt: 'Umami burgeris',
    description: 'ℹ️ Note: this dish may take a little longer to prepare. Bun with sesame, Angus aged beef patty, smoked bacon, melted cheese, tomatoes, lettuce, red onions, BBQ sauce.',
    description_lt: 'ℹ️ Pastaba: šis patiekalas gali būti ruošiamas kiek ilgiau. Bandelė su sezamu, Angus brandintos jautienos maltinukas, šaltai rūkyta šoninė, lydytas sūris, pomidorai, salotos, raudonieji svogūnai, BBQ padažas.',
    category: 'burgers',
    basePrice: 8.50,
    image: '/images/umami_burger.png',
    popular: false,
    customization: {
      sizes: [
        { name: 'Standard (Standartinis)', priceModifier: 0 }
      ],
      sauces: [],
      extras: [
        { name: 'No tomatoes (Be pomidorų)', priceModifier: 0 },
        { name: 'No onions (Be svogūnų)', priceModifier: 0 },
        { name: 'No cucumber (Be agurkų)', priceModifier: 0 },
        { name: 'Less sauce (Mažiau padažo)', priceModifier: 0 }
      ]
    }
  },
  {
    id: 'burger-in-lavash',
    name: 'Burger in lavash',
    name_lt: 'Burgeris lavaše',
    description: 'ℹ️ Note: this dish may take a little longer to prepare. Lavash, Angus aged beef patty, cheddar cheese, tomatoes, red onions, pickles, bacon, jalapenos, chipotle sauce, BBQ sauce.',
    description_lt: 'ℹ️ Pastaba: šis patiekalas gali būti ruošiamas kiek ilgiau. Lavašas, Angus brandintos jautienos maltinukas, čederio sūris, pomidorai, raudonieji svogūnai, marinuoti agurkai, šoninė, chalapos pipirai, čipotlės padažas, BBQ padažas.',
    category: 'burgers',
    basePrice: 11.00,
    image: '/images/burger_in_lavash.png',
    popular: false,
    customization: {
      sizes: [
        { name: 'Standard (Standartinis)', priceModifier: 0 }
      ],
      sauces: [],
      extras: [
        { name: 'No tomatoes (Be pomidorų)', priceModifier: 0 },
        { name: 'No pickles (Be marinuotų agurkų)', priceModifier: 0 },
        { name: 'No onions (Be svogūnų)', priceModifier: 0 },
        { name: 'No jalapenos (Be jalapenų)', priceModifier: 0 }
      ]
    }
  },
];

export const GALLERY_IMAGES = [
  {
    url: '/images/gallery_chicken_1778320540253.png',
    title: 'Sizzling Charcoal Grill',
    desc: 'Each skewer is char-grilled over raw, smoky embers'
  },
  {
    url: '/images/hero_kebab_1778320555234.png',
    title: 'Authentic Grilled Flavor',
    desc: 'Experience the true taste of traditional kebabs'
  },
  {
    url: '/images/about_grill_1778320577939.png',
    title: 'Hadus Chef Masterpiece',
    desc: 'Prepared by professional chefs with secret recipe spices'
  }
];

export const GALLERY_IMAGES_LT = [
  {
    url: '/images/gallery_chicken_1778320540253.png',
    title: 'Čirškianti iešmų liepsna',
    desc: 'Kiekvienas iešmas kepamas ant natūralių dūminių anglių'
  },
  {
    url: '/images/hero_kebab_1778320555234.png',
    title: 'Autentiškas grilio skonis',
    desc: 'Pajuskite tikrąjį tradicinių kebabų skonį'
  },
  {
    url: '/images/about_grill_1778320577939.png',
    title: 'Hadus Šefo šedevrai',
    desc: 'Paruošta profesionalių šefų su slaptais prieskoniais'
  }
];
