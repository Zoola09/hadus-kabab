import { MenuItem } from './types';

// Standard customization templates
const standardCustomization = {
  sizes: [
    { name: 'Standard (Standard)', priceModifier: 0 },
    { name: 'Super Size (L)', priceModifier: 1.80 },
    { name: 'King Size (XL)', priceModifier: 3.20 },
  ],
  sauces: [
    { name: 'Hadus Garlic Secret', priceModifier: 0 },
    { name: 'Smoky Chili Hot', priceModifier: 0 },
    { name: 'Lemon Herb Garlic Yogurt', priceModifier: 0 },
    { name: 'Mix Sauce (Garlic + Spicy)', priceModifier: 0.50 },
    { name: 'No Sauce', priceModifier: 0 },
  ],
  extras: [
    { name: 'Charred Sliced Jalapenos', priceModifier: 0.75 },
    { name: 'Melted Cheddar Cheese Slice', priceModifier: 1.20 },
    { name: 'Sweet Pickled Red Onions', priceModifier: 0.50 },
    { name: 'Extra Grilled Kebab Meat', priceModifier: 2.80 },
  ],
};

const beverageCustomization = {
  sizes: [
    { name: 'Regular (330ml)', priceModifier: 0 },
    { name: 'Large (500ml)', priceModifier: 0.80 },
  ],
  sauces: [],
  extras: [
    { name: 'Fresh Lemon Slices', priceModifier: 0.30 },
    { name: 'Extra Cubed Ice', priceModifier: 0 },
  ],
};

const sideCustomization = {
  sizes: [
    { name: 'Standard', priceModifier: 0 },
    { name: 'Share Pack (XL)', priceModifier: 1.50 },
  ],
  sauces: [
    { name: 'Garlic Aioli Dip', priceModifier: 0 },
    { name: 'Spicy Fire Ketchup', priceModifier: 0 },
    { name: 'Traditional Tahini Cream', priceModifier: 0 },
    { name: 'No Sauce Dip', priceModifier: 0 },
  ],
  extras: [
    { name: 'Extra Dip Tub', priceModifier: 0.60 },
    { name: 'Pinch of Sumac Seasoning', priceModifier: 0.15 },
  ],
};

export const MENU_ITEMS: MenuItem[] = [
  // CATEGORY 1: Kebabs
  {
    id: 'kebab-chicken',
    name: 'Hadus Flame Chicken Kebab',
    name_lt: 'Hadus vištienos kebabas',
    description: 'Juicy skewers of hand-cut chicken breast, charcoal grilled, with garden vegetables, signature house garlic dip, and hot lavash.',
    description_lt: 'Sultingi keptos vištienos filė iešmai su šviežiomis sodo daržovėmis, naminiu česnakiniu padažu ir šiltu lavašu.',
    category: 'kebabs',
    basePrice: 7.90,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
    popular: true,
    customization: standardCustomization,
  },
  {
    id: 'kebab-beef',
    name: 'Premium Shaved Beef Kebab',
    name_lt: 'Aukščiausios kokybės jautienos kebabas',
    description: 'Slow-cooked sliced premium flank beef with mild sumac, sweet purple onions, sweet peppers, wrapped with rich savory herbal sauce.',
    description_lt: 'Lėtai kepama sultinga jautiena su puriais svogūnais, saldžiosiomis paprikomis, suvyniota su aromatingu žolelių padažu.',
    category: 'kebabs',
    basePrice: 8.80,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: standardCustomization,
  },
  {
    id: 'kebab-lamb',
    name: 'Hadus Traditional Lamb Kebab',
    name_lt: 'Tradicinis Hadus avienos kebabas',
    description: 'Flame-broiled minced leg of lamb skewer infused with Turkish wild spices, parsley, grilled pointed peppers, and cool mint garlic sauce.',
    description_lt: 'Ant ugnies keptas maltos avienos iešmas, pagardintas laukiniais prieskoniais, petražolėmis, keptais pipirais ir gaiviu mėtiniu padažu.',
    category: 'kebabs',
    basePrice: 9.50,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    popular: true,
    customization: standardCustomization,
  },

  // CATEGORY 2: Wraps
  {
    id: 'wrap-chicken',
    name: 'Grilled Chicken Breasts Wrap',
    name_lt: 'Keptos vištienos suktinukas',
    description: 'Flame-seared chicken breast strip wrapped in authentic warm lavash sourdough with crunchy iceberg lettuce, ripe tomatoes, and garlic sauce.',
    description_lt: 'Ant grotelių skrudinta vištienos krūtinėlė, įsukta į šiltą natūralų lavašą su traškiomis salotomis, pomidorais ir česnakiniu padažu.',
    category: 'wraps',
    basePrice: 6.90,
    image: 'https://images.unsplash.com/photo-1626700051175-656fc7bc31ee?auto=format&fit=crop&q=80&w=800',
    popular: true,
    customization: standardCustomization,
  },
  {
    id: 'wrap-mixed',
    name: 'Mixed Grill Double Wrap',
    name_lt: 'Dvigubas MIX suktinukas',
    description: 'Double serving slice of charcoal lamb cubing & shaved tender beef mixed, loaded with sweet bell onions, roasted red pepper hummus spread.',
    description_lt: 'Dviguba porcija ant anglių keptos avienos bei smulkintos jautienos su saldžiais svogūnais ir paprikų humuso užtepu.',
    category: 'wraps',
    basePrice: 8.20,
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: standardCustomization,
  },
  {
    id: 'wrap-falafel',
    name: 'Crispy Falafel Herb Wrap',
    name_lt: 'Traškus falafelių suktinukas',
    description: 'Crunchy golden chickpea seasoned patties, hand-poured sesame tahini yoghurt cream, crisp cucumbers, pickled red cabbage, and parsley.',
    description_lt: 'Gurgždantys kepti avinžirnių rutuliukai, sezamo tahini jogurto kremas, agurkai, marinuoti raudonieji kopūstai ir šviežios petražolės.',
    category: 'wraps',
    basePrice: 6.20,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: standardCustomization,
  },

  // CATEGORY 3: Plates
  {
    id: 'plate-mixed',
    name: 'Hadus Grand Mixed Grill Plate',
    name_lt: 'Didžioji Hadus MIX lėkštė',
    description: 'The ultimate kebab feast. One lamb skewer, chicken shish core, and carved beef shavi served with hot herb butter over saffron wild rice pilaf, grilled tomatoes, and dual dipping cups.',
    description_lt: 'Tikra grilio puota: avienos iešmas, sultinga vištiena ir smulkinta jautiena su karštu žolelių sviestu, šafrano ryžiais bei keptais pomidorais.',
    category: 'plates',
    basePrice: 14.50,
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=800',
    popular: true,
    customization: standardCustomization,
  },
  {
    id: 'plate-chicken',
    name: 'Tender Grilled Chicken Plate',
    name_lt: 'Sultingos vištienos kepsnio lėkštė',
    description: 'Heaping portion of breast and thigh chicken kebab strip seasoned with warm spices, served with side tabouli salad, hot flatbread triangles, and cool tzatziki.',
    description_lt: 'Didelė ugnimi keptų vištienos kepsnelių porcija, patiekiama su tabouli salotomis, lavašu bei gaiviu tzatziki padažu.',
    category: 'plates',
    basePrice: 11.90,
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: standardCustomization,
  },

  // CATEGORY 4: Sides
  {
    id: 'side-fries',
    name: 'Crisp Sumac Fries',
    name_lt: 'Gruzdintos bulvytės su žagreniu',
    description: 'Golden, double-fried salted potato chips tossed in our signature herbal sumac, oregano, and garlic seasoning, served with a choice of house dip.',
    description_lt: 'Auksinės bulvytės, apibarstytos sumac prieskoniais, raudonėliais bei patiekiamos su pasirinktu slaptu namų padažu.',
    category: 'sides',
    basePrice: 3.50,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: sideCustomization,
  },
  {
    id: 'side-hummus',
    name: 'Creamy Chickpea Hummus & Pita',
    name_lt: 'Švelnus humusas su pita',
    description: 'House-made premium blend of ground garbanzo beans, garlic, fresh oil of tahini, virgin lemon, olive oil splash, sweet paprika, and hot pita bread.',
    description_lt: 'Šviežiai trinti avinžirniai su sezamų pasta (tahini), česnaku, tyru alyvuogių aliejumi, saldžiąja paprika ir karšta pitos duona.',
    category: 'sides',
    basePrice: 4.20,
    image: 'https://images.unsplash.com/photo-1577906096429-f73ae1831241?auto=format&fit=crop&q=80&w=800',
    popular: true,
    customization: sideCustomization,
  },
  {
    id: 'side-salad',
    name: 'Mediterranean Garden Salad',
    name_lt: 'Viduržemio jūros daržovių salotos',
    description: 'Fresh diced hothouse cucumber, vine-ripened tomatoes, sweet red cabbage, kalamata black olive, blocks of sheep milk feta, lemon juice, olive oil.',
    description_lt: 'Gaivūs agurkai, pomidorai, saldus mėlynasis kopūstas, Kalamata alyvuogės, tikros fetos sūrio kubeliai, citrinų sultys bei tyras aliejus.',
    category: 'sides',
    basePrice: 4.80,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: sideCustomization,
  },

  // CATEGORY 5: Drinks
  {
    id: 'drink-ayran',
    name: 'Traditional Chilled Ayran',
    name_lt: 'Tradicinis šaltas Airanas',
    description: 'Refreshing savory Turkish beverage made with whipped creamy white yogurt, purified mountain water, and a pinch of active sea salt.',
    description_lt: 'Gaivus turkiškas jogurto gėrimas, išplaktas su kalnų vandeniu ir žiupsneliu jūros druskos.',
    category: 'drinks',
    basePrice: 2.20,
    image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&q=80&w=800',
    popular: true,
    customization: beverageCustomization,
  },
  {
    id: 'drink-cola',
    name: 'Sparkling Soda Cola (Ice Cold)',
    name_lt: 'Cola stikliniame buteliuke',
    description: 'Classic crisp fizzy refreshing cola, served strictly glass-bottled with a slice of fresh natural yellow lemon over ice cups.',
    description_lt: 'Klasikinė ledinė Cola, patiekiama stikliniame buteliuke su citrinos griežinėliu.',
    category: 'drinks',
    basePrice: 2.50,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: beverageCustomization,
  },
  {
    id: 'drink-water',
    name: 'Pure Spring Still Water',
    name_lt: 'Negazuotas šaltinio vanduo',
    description: 'Natural pure, eco-sourced premium mineral spring water served straight on ice buckets with a fresh cucumber mint slice.',
    description_lt: 'Natūralus tyras mineralinis šaltinio vanduo su agurko bei mėtos griežinėliu.',
    category: 'drinks',
    basePrice: 1.80,
    image: 'https://images.unsplash.com/photo-1608885898957-a599fb1b467a?auto=format&fit=crop&q=80&w=800',
    popular: false,
    customization: beverageCustomization,
  },
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    title: 'Sizzling Charcoal Skewer Flame',
    desc: 'Each skewer is char-grilled over raw, smoky mahogany embers'
  },
  {
    url: 'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800',
    title: 'Handcrafted Lavash Flatbreads',
    desc: 'Fresh artisan bread rolled and baked fresh prior to wrapping'
  },
  {
    url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    title: 'Middle-Eastern Spices & Herbs',
    desc: 'Aromatic sumac, Aleppo chili, and dry oregano from direct sources'
  },
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    title: 'Fired Beef Slices Grill Grate',
    desc: 'Succulent marinated meats trimmed and cooked to flawless moisture'
  },
  {
    url: 'https://images.unsplash.com/photo-1577906096429-f73ae1831241?auto=format&fit=crop&q=80&w=800',
    title: 'Vibrant Traditional Dips',
    desc: 'Golden hummus oil, creamy fresh garlic sauce, and yogurt tzatziki'
  },
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    title: 'Gourmet Healthy Super Greens',
    desc: 'Crispy salad greens with lemon dressing and real Greek feta'
  }
];

export const GALLERY_IMAGES_LT = [
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    title: 'Čirškanti anglių iešmų liepsna',
    desc: 'Kiekvienas iešmas kepamas ant natūralių dūminių raudonmedžio anglių'
  },
  {
    url: 'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800',
    title: 'Rankų darbo lavašo duonelės',
    desc: 'Šviežia amatininkų duona, iškočiota ir iškepta tiesiai prieš jūsų suktinio suvyniojimą'
  },
  {
    url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    title: 'Artimųjų Rytų prieskoniai ir žolelės',
    desc: 'Aromatingas žagrenis (sumac), Alepo paprika ir laukinė raudonėlė iš tiesioginių ūkių'
  },
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    title: 'Keptos jautienos griežinėliai',
    desc: 'Sultinga marinuota mėsa, supjaustyta ir paruošta išlaikant tobuliausią minkštumą'
  },
  {
    url: 'https://images.unsplash.com/photo-1577906096429-f73ae1831241?auto=format&fit=crop&q=80&w=800',
    title: 'Tradiciniai padažai ir užtepėlės',
    desc: 'Auksinis humusas su tyru alyvuogių aliejumi, grietininis česnakinis padažas ir tzatziki jogurtas'
  },
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    title: 'Gurmaniškas sveikas garnyras',
    desc: 'Traškūs sodo žalumynai su citrinos užpilu ir tikru graikišku fetos sūriu'
  }
];
