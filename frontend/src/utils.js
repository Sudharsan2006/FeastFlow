/**
 * Ordered food data — checked from MOST SPECIFIC to LEAST SPECIFIC.
 * Longer / more specific names MUST come before shorter/generic ones.
 * Each Unsplash URL is hand-picked to show the exact dish.
 */
const FOOD_MAP = [
  // ─── Indian ───────────────────────────────────────────────────────────────
  { keys: ['chicken biryani','biryani'],     img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80', category:'Indian',      desc:'Aromatic saffron basmati layered with spiced chicken' },
  { keys: ['mutton biryani'],               img: 'https://images.unsplash.com/photo-1630409351217-bc9f58f93c0d?w=600&q=80', category:'Indian',      desc:'Slow-cooked tender mutton on saffron basmati rice' },
  { keys: ['butter chicken','murgh makhani'],img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80', category:'Indian',      desc:'Grilled chicken in velvety tomato-cream sauce' },
  { keys: ['palak paneer'],                 img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', category:'Indian',      desc:'Fresh cottage cheese cubes in a creamy spinach gravy' },
  { keys: ['paneer tikka'],                 img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', category:'Indian',      desc:'Marinated cottage cheese grilled in the tandoor' },
  { keys: ['dal makhani','dal','daal'],      img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', category:'Indian',      desc:'Slow-cooked black lentils simmered overnight with cream' },
  { keys: ['samosa','samosas'],             img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', category:'Indian',      desc:'Crispy pastry filled with spiced potatoes & peas' },
  { keys: ['masala dosa','dosa'],           img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80', category:'South Indian',desc:'Crispy fermented rice crepe with spiced potato filling' },
  { keys: ['idli'],                         img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80', category:'South Indian',desc:'Steamed rice cakes served with sambar & chutney' },
  { keys: ['vada pav'],                     img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80', category:'Indian',      desc:'Mumbai\'s favourite spiced potato fritter slider' },
  { keys: ['chole bhature','chole','chana'],img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80', category:'Indian',      desc:'Fluffy deep-fried bhature with spiced chickpea curry' },
  { keys: ['chicken tikka'],               img: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&q=80', category:'Indian',      desc:'Juicy chicken pieces marinated in tandoori spices' },
  { keys: ['chicken curry','curry'],        img: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80', category:'Indian',      desc:'Rich home-style chicken curry with whole spices' },
  { keys: ['paneer'],                       img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80', category:'Indian',      desc:'Cottage cheese in a rich Mughlai gravy' },
  { keys: ['naan','roti','chapati','garlic naan','bread'],img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', category:'Indian',      desc:'Freshly baked Indian flatbread from the hot tandoor' },

  // ─── South Indian / Snacks ─────────────────────────────────────────────────
  { keys: ['uttapam'],                      img: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80', category:'South Indian',desc:'Thick rice pancake topped with fresh veggies' },
  { keys: ['pongal'],                       img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', category:'South Indian',desc:'Soft rice and lentil porridge with ghee & pepper' },

  // ─── Continental / Italian ────────────────────────────────────────────────
  { keys: ['margherita pizza','cheese pizza','pizza'],img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', category:'Italian', desc:'Classic Neapolitan with San Marzano tomato & buffalo mozzarella' },
  { keys: ['pasta arrabbiata','pasta carbonara','pasta'], img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80', category:'Italian', desc:'Al dente pasta in rich slow-cooked tomato sauce' },
  { keys: ['risotto'],                      img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80', category:'Italian',     desc:'Creamy arborio rice with parmesan and white wine' },
  { keys: ['lasagna'],                      img: 'https://images.unsplash.com/photo-1599021419847-d8a7a6aba5f4?w=600&q=80', category:'Italian',     desc:'Layers of pasta, beefy Bolognese & béchamel sauce' },

  // ─── American / Fast Food ─────────────────────────────────────────────────
  { keys: ['veggie burger','veg burger','burger'], img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', category:'American', desc:'Juicy patty stacked with fresh lettuce, cheese & pickles' },
  { keys: ['cheese burger'],               img: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80', category:'American',    desc:'Double smash patty loaded with American cheese & sauce' },
  { keys: ['hot dog'],                     img: 'https://images.unsplash.com/photo-1612392062631-94c23a8af5a4?w=600&q=80', category:'American',    desc:'Grilled frank in a brioche bun with classic toppings' },
  { keys: ['french fries','fries'],        img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', category:'American',    desc:'Crispy golden fries seasoned with sea salt' },
  { keys: ['sandwich'],                    img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', category:'Café',         desc:'Toasted artisan bread with grilled chicken & avocado' },
  { keys: ['wrap'],                        img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', category:'Café',         desc:'Grilled veggies & hummus in a warm wheat wrap' },

  // ─── Asian ───────────────────────────────────────────────────────────────
  { keys: ['fried rice'],                  img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80', category:'Asian',       desc:'Wok-tossed rice with eggs, vegetables & soy sauce' },
  { keys: ['noodle','noodles','hakka'],    img: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=600&q=80', category:'Asian',       desc:'Silky stir-fried noodles with veggies & chilli sauce' },
  { keys: ['sushi'],                       img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80', category:'Japanese',    desc:'Premium grade sashimi hand-rolled with seasoned rice' },
  { keys: ['ramen'],                       img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80', category:'Japanese',    desc:'Rich pork broth with noodles, soft egg & nori' },
  { keys: ['dim sum','dumpling'],          img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80', category:'Chinese',      desc:'Delicate steamed parcels with savoury filling' },
  { keys: ['spring roll'],                 img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', category:'Chinese',      desc:'Crispy golden rolls stuffed with veggies & glass noodles' },
  { keys: ['manchurian'],                  img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&q=80', category:'Indo-Chinese',desc:'Crispy balls in a tangy soy-garlic-chilli sauce' },

  // ─── Mexican ──────────────────────────────────────────────────────────────
  { keys: ['chicken tacos','tacos','taco'],img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', category:'Mexican',    desc:'Crispy shells with slow-cooked seasoned chicken' },
  { keys: ['quesadilla'],                  img: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=80', category:'Mexican',    desc:'Grilled flour tortilla with melted cheese & peppers' },
  { keys: ['nachos'],                      img: 'https://images.unsplash.com/photo-1558081654-10fe2c4e1a74?w=600&q=80', category:'Mexican',    desc:'Crispy tortilla chips loaded with cheese, jalapeños & guac' },

  // ─── Seafood ─────────────────────────────────────────────────────────────
  { keys: ['grilled salmon','salmon'],     img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', category:'Seafood',    desc:'Atlantic salmon fillet with herbs and lemon butter' },
  { keys: ['prawn','prawns','shrimp'],     img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80', category:'Seafood',    desc:'Jumbo tiger prawns flame-grilled in garlic butter' },
  { keys: ['fish'],                        img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80', category:'Seafood',    desc:'Pan-seared catch of the day with seasonal herbs' },

  // ─── Grill / Steaks ──────────────────────────────────────────────────────
  { keys: ['steak'],                       img: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80', category:'Grill',       desc:'Prime-grade sirloin cooked to perfect medium-rare' },
  { keys: ['chicken wings','wings'],       img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80', category:'Grill',     desc:'Smoky glazed wings with blue cheese dipping sauce' },
  { keys: ['barbecue','bbq','kebab','kabab'],img:'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80', category:'Grill',    desc:'Slow-smoked meats basted in signature BBQ sauce' },
  { keys: ['chicken'],                     img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80', category:'Grill',     desc:'Tandoor-charred chicken with mint chutney' },

  // ─── Healthy ─────────────────────────────────────────────────────────────
  { keys: ['caesar salad','salad'],        img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80', category:'Healthy',     desc:'Garden-fresh greens with balsamic vinaigrette & croutons' },
  { keys: ['soup'],                        img: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=600&q=80', category:'Comfort',     desc:'Slow-cooked hearty broth with seasonal vegetables' },
  { keys: ['smoothie','bowl'],             img: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=600&q=80', category:'Healthy',     desc:'Blended superfoods topped with fresh fruit granola' },

  // ─── Desserts ─────────────────────────────────────────────────────────────
  { keys: ['chocolate cake','chocolate'],  img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', category:'Dessert',   desc:'Decadent multi-layer sponge with dark chocolate ganache' },
  { keys: ['cheesecake'],                  img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80', category:'Dessert',   desc:'New York style cheesecake on buttery graham crust' },
  { keys: ['ice cream','gelato','icecream'],img:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80', category:'Dessert',    desc:'Premium artisan gelato with seasonal flavors' },
  { keys: ['gulab jamun'],                 img: '/gulab-jamun.png',                                                            category:'Dessert',   desc:'Soft milk-solid balls soaked in rose-flavoured syrup' },
  { keys: ['kheer','pudding'],             img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80', category:'Dessert',    desc:'Creamy rice pudding with cardamom and pistachios' },
  { keys: ['brownie'],                     img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80', category:'Dessert',   desc:'Fudgy walnut brownie with a gooey centre' },
  { keys: ['cake','pastry'],              img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80', category:'Dessert',    desc:'Freshly baked layered cake with artisan frosting' },

  // ─── Beverages ────────────────────────────────────────────────────────────
  { keys: ['cold coffee','iced coffee'],   img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', category:'Beverages', desc:'Chilled espresso blended with milk and ice' },
  { keys: ['cappuccino','latte','coffee'], img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', category:'Beverages', desc:'Rich espresso with velvety micro-foamed milk' },
  { keys: ['mango lassi','lassi'],         img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', category:'Beverages', desc:'Creamy chilled mango yogurt drink with cardamom' },
  { keys: ['juice','fresh juice'],         img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80', category:'Beverages', desc:'Cold-pressed seasonal fruits, zero added sugar' },
  { keys: ['tea','chai'],                  img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=600&q=80', category:'Beverages', desc:'Aromatic masala chai with ginger, cinnamon & cardamom' },
  { keys: ['milkshake','shake'],           img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', category:'Beverages', desc:'Thick creamy milkshake in your choice of flavour' },
  { keys: ['water','sparkling'],           img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80', category:'Beverages', desc:'Chilled still or sparkling mineral water' },
]

const DEFAULT = {
  img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  category: 'Specialty',
  desc: "Chef's signature creation crafted with the finest ingredients"
}

/**
 * Match food info from dish name using longest-first ordered matching.
 */
export function getFoodInfo(name = '') {
  const lower = name.toLowerCase().trim()
  for (const entry of FOOD_MAP) {
    for (const key of entry.keys) {
      if (lower.includes(key)) {
        return { img: entry.img, category: entry.category, desc: entry.desc }
      }
    }
  }
  return DEFAULT
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export const STATUS_OPTIONS = ['PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED']
