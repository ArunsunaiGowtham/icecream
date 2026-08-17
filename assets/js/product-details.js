/* ============================================================
   Sugar & Scoop — Product Details (dynamic product loader)
   Reads ?slug=<product-slug> from the URL and populates the
   product-details.html page with that product's own data, so
   every "Details" button on the Menu page opens its own product
   instead of always showing the Rainbow Sprinkle Cone.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Category display + icon helpers ---------- */
  var CATEGORY_ICONS = {
    "ice-cream": "bi-ice-cream",
    "sundaes": "bi-cup-hot",
    "waffles": "bi-egg-fried",
    "crepes": "bi-ice-cream",
    "milkshakes": "bi-cup-straw",
    "cakes": "bi-cake2",
    "pastries": "bi-cookie"
  };

  function titleCaseCategory(category) {
    return category
      .split(" ")
      .map(function (word) {
        if (word === "ice-cream") return "Ice Cream";
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  /* ---------- Product catalogue (mirrors the Menu page) ---------- */
  var PRODUCTS = {
    "rainbow-sprinkle-cone": {
      id: "p-201", name: "Rainbow Sprinkle Cone", price: 4.5, category: "ice-cream classic",
      image: "assets/images/ice-cream/cone-sprinkle.jpg", alt: "Rainbow sprinkle ice cream cone",
      badge: { text: "Bestseller", cls: "" }, rating: 4.5, reviews: 214,
      desc: "Vanilla bean base rolled in house-made rainbow sprinkles."
    },
    "strawberry-fields-cone": {
      id: "p-202", name: "Strawberry Fields Cone", price: 4.75, category: "ice-cream fruit",
      image: "assets/images/ice-cream/cone-straw-single.jpg", alt: "Strawberry ice cream cone",
      badge: null, rating: 5, reviews: 388,
      desc: "Ripe strawberry gelato made with sun-grown local berries."
    },
    "double-vanilla-scoop": {
      id: "p-203", name: "Double Vanilla Scoop", price: 5.0, category: "ice-cream classic vegan",
      image: "assets/images/ice-cream/scoop-duo.jpg", alt: "Double vanilla ice cream scoops",
      badge: { text: "Vegan", cls: "badge-mint" }, rating: 4.5, reviews: 276,
      desc: "Two generous scoops of Madagascar vanilla bean gelato."
    },
    "midnight-fudge-sundae": {
      id: "p-204", name: "Midnight Fudge Sundae", price: 7.5, category: "sundaes chocolate",
      image: "assets/images/sundaes/sundae-choco.jpg", alt: "Chocolate fudge sundae",
      badge: { text: "New", cls: "badge-purple" }, rating: 4, reviews: 154,
      desc: "Warm fudge sauce over dark chocolate gelato with cocoa crumbs."
    },
    "brownie-mountain": {
      id: "p-205", name: "Brownie Mountain", price: 8.5, category: "sundaes classic",
      image: "assets/images/sundaes/sundae-brownie.jpg", alt: "Brownie sundae",
      badge: { text: "Hot", cls: "" }, rating: 5, reviews: 421,
      desc: "Warm brownie chunks under vanilla gelato with hot chocolate sauce."
    },
    "berry-blast-waffle": {
      id: "p-206", name: "Berry Blast Waffle", price: 7.25, category: "waffles fruit",
      image: "assets/images/waffles/waffle-strawberry.jpg", alt: "Strawberry waffles",
      badge: null, rating: 4.5, reviews: 187,
      desc: "Golden waffle stacked with fresh berries and berry gelato."
    },
    "belgian-original-waffle": {
      id: "p-207", name: "Belgian Original Waffle", price: 6.25, category: "waffles classic",
      image: "assets/images/waffles/waffle-belgian.jpg", alt: "Classic Belgian waffle",
      badge: null, rating: 4.5, reviews: 243,
      desc: "Crisp yeasted waffle dusted with icing sugar."
    },
    "caramel-drizzle-crepe": {
      id: "p-208", name: "Caramel Drizzle Crepe", price: 8.0, category: "crepes classic",
      image: "assets/images/crepes/crepe-icecream.jpg", alt: "Ice cream crepe with caramel drizzle",
      badge: { text: "Popular", cls: "" }, rating: 5, reviews: 312,
      desc: "Thin crepe with salted caramel sauce and vanilla gelato."
    },
    "berry-glaze-crepe": {
      id: "p-208b", name: "Berry Glaze Crepe", price: 7.75, category: "crepes fruit",
      image: "assets/images/crepes/crepe-sauce.jpg", alt: "Crepe glazed with fresh berry sauce",
      badge: { text: "New", cls: "badge-purple" }, rating: 5, reviews: 186,
      desc: "Warm golden French crepe folded with sweet berry glaze and mascarpone."
    },
    "classic-french-crepe": {
      id: "p-208c", name: "Classic French Crepe", price: 6.75, category: "crepes classic",
      image: "assets/images/crepes/crepe-classic.jpg", alt: "Classic French sweet crepe dusted with sugar",
      badge: { text: "Chef's Pick", cls: "" }, rating: 5, reviews: 245,
      desc: "Traditional Parisian crepe with melted butter, dusting of sugar and fresh lemon."
    },
    "citrus-ricotta-crepe": {
      id: "p-208d", name: "Citrus Ricotta Crepe", price: 7.95, category: "crepes fruit",
      image: "assets/images/crepes/crepe-citrus.jpg", alt: "French crepes folded with orange citrus and sweet ricotta",
      badge: { text: "Signature", cls: "" }, rating: 5, reviews: 198,
      desc: "Delicate French crepe folded with sweet ricotta, fresh orange slices and wildflower honey."
    },
    "choco-sprinkle-shake": {
      id: "p-209", name: "Choco Sprinkle Shake", price: 6.75, category: "milkshakes chocolate",
      image: "assets/images/milkshakes/shake-choco-sprinkles.jpg", alt: "Chocolate sprinkle milkshake",
      badge: null, rating: 4.5, reviews: 198,
      desc: "Thick chocolate shake capped with whipped cream and sprinkles."
    },
    "strawberry-cloud-shake": {
      id: "p-210", name: "Strawberry Cloud Shake", price: 6.5, category: "milkshakes fruit vegan",
      image: "assets/images/milkshakes/shake-strawberry.jpg", alt: "Strawberry milkshake",
      badge: { text: "Vegan", cls: "badge-mint" }, rating: 5, reviews: 167,
      desc: "Fresh strawberry shake whipped to a soft cloud."
    },
    "chocolate-fudge-cake": {
      id: "p-211", name: "Chocolate Fudge Cake", price: 9.0, category: "cakes classic",
      image: "assets/images/bakes/cake-chocolate.jpg", alt: "Chocolate fudge cake",
      badge: { text: "Chef's Pick", cls: "" }, rating: 4.5, reviews: 356,
      desc: "Layered chocolate sponge with silky fudge frosting."
    },
    "butter-cookies": {
      id: "p-212", name: "Butter Cookies", price: 5.5, category: "pastries classic",
      image: "assets/images/bakes/cookies.jpg", alt: "Butter cookies",
      badge: null, rating: 4.5, reviews: 289,
      desc: "Crisp golden butter cookies perfect with a scoop of vanilla."
    },
    "fresh-berry-cake": {
      id: "p-213", name: "Fresh Berry Cake", price: 9.5, category: "cakes fruit",
      image: "assets/images/bakes/cake-berries.jpg", alt: "Berry-topped cake slice",
      badge: null, rating: 4.5, reviews: 198,
      desc: "Vanilla sponge with whipped cream and mixed summer berries."
    },
    "celebration-birthday-cake": {
      id: "p-214", name: "Celebration Birthday Cake", price: 12.0, category: "cakes classic",
      image: "assets/images/bakes/cake-birthday.jpg", alt: "Birthday cake with sprinkles",
      badge: { text: "Party Fave", cls: "badge-purple" }, rating: 5, reviews: 412,
      desc: "Vanilla layer cake with buttercream and rainbow sprinkles."
    },
    "chocolate-dipped-strawberries": {
      id: "p-215", name: "Chocolate-Dipped Strawberries", price: 6.5, category: "pastries fruit",
      image: "assets/images/bakes/choco-strawberries.jpg", alt: "Chocolate-dipped strawberries",
      badge: null, rating: 4.5, reviews: 233,
      desc: "Ripe strawberries hand-dipped in Belgian dark chocolate."
    },
    "belgian-chocolate-bar": {
      id: "p-216", name: "Belgian Chocolate Bar", price: 4.0, category: "pastries classic",
      image: "assets/images/bakes/chocolate-bar.jpg", alt: "Belgian dark chocolate bar",
      badge: null, rating: 4, reviews: 121,
      desc: "Thick-cut dark chocolate bar with a delicate snap."
    },
    "glazed-ring-donut": {
      id: "p-217", name: "Glazed Ring Donut", price: 3.5, category: "pastries classic",
      image: "assets/images/bakes/donut-glazed.jpg", alt: "Glazed ring donut",
      badge: null, rating: 4.5, reviews: 167,
      desc: "Soft yeasted donut finished with a classic sugar glaze."
    },
    "assorted-donut-box": {
      id: "p-218", name: "Assorted Donut Box (6)", price: 14.0, category: "pastries combo",
      image: "assets/images/bakes/donuts-box.jpg", alt: "Box of six assorted donuts",
      badge: { text: "Shareable", cls: "" }, rating: 4.5, reviews: 304,
      desc: "Six mixed glazed and filled donuts, great for sharing."
    }
,
    "belgian-dark-dip-cone": {
      id: "p-301", name: "Belgian Dark Dip Cone", price: 5.25, category: "ice-cream classic",
      image: "assets/images/ice-cream/cone-choco.jpg", alt: "Belgian dark chocolate dipped ice cream cone",
      badge: { text: "New", cls: "badge-purple" }, rating: 4.5, reviews: 162,
      desc: "Smooth chocolate gelato dipped in 70% Belgian dark chocolate."
    },
    "chocolate-layer-cake": {
      id: "p-302", name: "Chocolate Layer Cake", price: 4.50, category: "pastries classic",
      image: "assets/images/bakes/cake-chocolate.jpg", alt: "Chocolate layer cake slice",
      badge: {"text": "Bestseller", "cls": ""}, rating: 5.0, reviews: 301,
      desc: "Four layers of dark chocolate cake with silky ganache."
    },
    "chewy-cookie-trio": {
      id: "p-303", name: "Chewy Cookie Trio", price: 3.75, category: "pastries classic",
      image: "assets/images/bakes/cookies.jpg", alt: "Stack of chewy cookies",
      badge: null, rating: 4.5, reviews: 245,
      desc: "Brown-butter cookies baked chewy on the inside, crisp at the edges."
    },
    "glazed-donut-box": {
      id: "p-304", name: "Glazed Donut Box", price: 6.25, category: "pastries classic",
      image: "assets/images/bakes/donuts-box.jpg", alt: "Box of glazed donuts",
      badge: {"text": "New", "cls": ""}, rating: 4.0, reviews: 167,
      desc: "Six fluffy donuts with a classic vanilla glaze - perfect for sharing."
    },
    "chocolate-berries": {
      id: "p-305", name: "Chocolate Berries", price: 5.50, category: "pastries classic",
      image: "assets/images/bakes/choco-strawberries.jpg", alt: "Chocolate covered strawberries",
      badge: null, rating: 4.5, reviews: 199,
      desc: "Plump strawberries dipped in 70% dark chocolate."
    },
    "strawberry-crush-shake": {
      id: "p-306", name: "Strawberry Crush Shake", price: 6.25, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-strawberry.jpg", alt: "Strawberry milkshake",
      badge: {"text": "Vegan", "cls": ""}, rating: 4.5, reviews: 276,
      desc: "Coconut base shaken with ripe summer strawberries."
    },
    "brownie-mountain-sundae": {
      id: "p-307", name: "Brownie Mountain Sundae", price: 8.50, category: "sundaes classic",
      image: "assets/images/sundaes/sundae-brownie.jpg", alt: "Brownie mountain sundae",
      badge: null, rating: 4.5, reviews: 214,
      desc: "Warm brownie, vanilla gelato and rivers of caramel."
    },
    "ice-cream-topper-waffle": {
      id: "p-308", name: "Ice Cream Topper Waffle", price: 6.75, category: "waffles classic",
      image: "assets/images/waffles/waffle-icecream.jpg", alt: "Waffle topped with ice cream scoops",
      badge: null, rating: 5.0, reviews: 388,
      desc: "Fresh waffle smothered with two scoops of the day."
    },
    "cookie-crunch-shake": {
      id: "p-309", name: "Cookie Crunch Shake", price: 6.50, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-choco-sprinkles.jpg", alt: "Chocolate milkshake with sprinkles",
      badge: null, rating: 4.5, reviews: 276,
      desc: "Chocolate shake blended with cookie crumble and sprinkles."
    },
    "strawberry-duo": {
      id: "p-310", name: "Strawberry Duo", price: 5.25, category: "ice-cream classic",
      image: "assets/images/ice-cream/cone-strawberry.jpg", alt: "Two strawberry ice cream cones",
      badge: null, rating: 5.0, reviews: 342,
      desc: "Two strawberry scoops made with sun-ripened local berries."
    },
    "belgian-dark-dip": {
      id: "p-311", name: "Belgian Dark Dip", price: 5.75, category: "ice-cream classic",
      image: "assets/images/ice-cream/cone-choco.jpg", alt: "Chocolate dipped ice cream cone",
      badge: {"text": "New", "cls": ""}, rating: 4.5, reviews: 162,
      desc: "Chocolate gelato dipped in 70% Belgian dark chocolate."
    },
    "strawberry-fields": {
      id: "p-312", name: "Strawberry Fields", price: 4.50, category: "ice-cream classic",
      image: "assets/images/ice-cream/cone-straw-single.jpg", alt: "Strawberry ice cream cone",
      badge: null, rating: 4.0, reviews: 388,
      desc: "Ripe strawberry gelato with real fruit pieces in every scoop."
    },
    "madagascar-vanilla": {
      id: "p-313", name: "Madagascar Vanilla", price: 3.99, category: "ice-cream classic",
      image: "assets/images/ice-cream/scoop-vanilla.jpg", alt: "Vanilla ice cream scoop",
      badge: {"text": "Vegan", "cls": "badge-mint"}, rating: 4.5, reviews: 245,
      desc: "Silky-smooth Madagascar vanilla bean gelato in a single generous scoop."
    },
    "double-scoop": {
      id: "p-314", name: "Double Scoop", price: 5.50, category: "ice-cream classic",
      image: "assets/images/ice-cream/scoop-duo.jpg", alt: "Double vanilla ice cream scoops",
      badge: null, rating: 5.0, reviews: 276,
      desc: "Two generous scoops of Madagascar vanilla bean gelato."
    },
    "berry-pop": {
      id: "p-315", name: "Berry Pop", price: 4.25, category: "ice-cream classic",
      image: "assets/images/ice-cream/pop-strawberry.jpg", alt: "Strawberry ice cream pop",
      badge: {"text": "Vegan", "cls": ""}, rating: 4.5, reviews: 198,
      desc: "Strawberry fruit pop on a stick - pure fruit, no dairy."
    },
    "midnight-cacao-pop": {
      id: "p-316", name: "Midnight Cacao Pop", price: 4.75, category: "ice-cream classic",
      image: "assets/images/ice-cream/pop-choco.jpg", alt: "Chocolate ice cream pop",
      badge: null, rating: 4.5, reviews: 221,
      desc: "Deep dark cacao pop with a hint of espresso - dairy free."
    },
    "cherry-bomb-pop": {
      id: "p-317", name: "Cherry Bomb Pop", price: 6.50, category: "ice-cream classic",
      image: "assets/images/ice-cream/pop-pink.jpg", alt: "Pink cherry ice cream pop",
      badge: {"text": "New", "cls": ""}, rating: 5.0, reviews: 187,
      desc: "Juicy cherry gelato pop finished with a dark cocoa shell."
    },
    "scoop-trio": {
      id: "p-318", name: "Scoop Trio", price: 9.50, category: "ice-cream classic",
      image: "assets/images/ice-cream/pop-flatlay.jpg", alt: "Signature ice cream pop selection",
      badge: {"text": "Signature", "cls": ""}, rating: 5.0, reviews: 95,
      desc: "A signature board of three chef's-choice pops - perfect for sharing."
    },
    "midnight-fudge": {
      id: "p-319", name: "Midnight Fudge", price: 7.50, category: "sundaes classic",
      image: "assets/images/sundaes/sundae-choco.jpg", alt: "Chocolate fudge sundae",
      badge: {"text": "Bestseller", "cls": ""}, rating: 4.5, reviews: 154,
      desc: "Dark chocolate gelato buried under warm fudge and cocoa crumbs."
    },
    "pink-cloud": {
      id: "p-320", name: "Pink Cloud", price: 7.00, category: "sundaes classic",
      image: "assets/images/sundaes/sundae-pink.jpg", alt: "Pink sundae",
      badge: null, rating: 4.5, reviews: 203,
      desc: "Strawberry gelato, marshmallow fluff and a shower of pink sprinkles."
    },
    "strawberry-dream": {
      id: "p-321", name: "Strawberry Dream", price: 6.50, category: "sundaes fruit classic",
      image: "assets/images/sundaes/sundae-strawberry.jpg", alt: "Strawberry sundae with fresh compote and whipped cream",
      badge: { text: "Popular", cls: "" }, rating: 5.0, reviews: 276,
      desc: "Fresh strawberry compote over vanilla gelato with whipped cream."
    },
    "classic-float": {
      id: "p-322", name: "Classic Float", price: 6.00, category: "sundaes classic",
      image: "assets/images/sundaes/sundae-glass.jpg", alt: "Sundae in a glass",
      badge: null, rating: 4.5, reviews: 188,
      desc: "Vanilla gelato floating in fizzy soda with a cherry on top."
    },
    "berry-festival": {
      id: "p-323", name: "Berry Festival", price: 7.25, category: "sundaes classic",
      image: "assets/images/sundaes/sundae-berries.jpg", alt: "Sundae with fresh berries",
      badge: {"text": "New", "cls": ""}, rating: 4.5, reviews: 167,
      desc: "Berries by the handful over gelato with vanilla chantilly."
    },
    "fudge-brownie-sundae": {
      id: "p-324", name: "Fudge Brownie Sundae", price: 8.25, category: "sundaes chocolate",
      image: "assets/images/sundaes/sundae-brownie-delight.jpg", alt: "Decadent chocolate brownie sundae",
      badge: {"text": "Bestseller", "cls": ""}, rating: 5.0, reviews: 348,
      desc: "Decadent chocolate brownie bites layered with artisan gelato, warm fudge sauce and whipped cream."
    },
    "salted-caramel-pecan-sundae": {
      id: "p-325", name: "Salted Caramel Pecan Sundae", price: 8.50, category: "sundaes caramel",
      image: "assets/images/sundaes/sundae-caramel-pecan.jpg", alt: "Salted caramel pecan sundae",
      badge: {"text": "Chef's Pick", "cls": "badge-purple"}, rating: 5.0, reviews: 292,
      desc: "Vanilla bean gelato drenched in warm golden caramel sauce, toasted pecans and whipped cream."
    },
    "berry-blast": {
      id: "p-324", name: "Berry Blast", price: 7.25, category: "waffles classic",
      image: "assets/images/waffles/waffle-strawberry.jpg", alt: "Strawberry waffles",
      badge: {"text": "Bestseller", "cls": ""}, rating: 4.5, reviews: 187,
      desc: "Golden waffle stacked with fresh berries and berry gelato."
    },
    "ice-cream-topper": {
      id: "p-325", name: "Ice Cream Topper", price: 8.00, category: "waffles classic",
      image: "assets/images/waffles/waffle-icecream.jpg", alt: "Waffle with ice cream",
      badge: {"text": "New", "cls": ""}, rating: 4.5, reviews: 203,
      desc: "A cloud of vanilla gelato perched on a warm waffle square."
    },
    "scoop-stack": {
      id: "p-326", name: "Scoop Stack", price: 7.50, category: "waffles classic",
      image: "assets/images/waffles/waffle-top.jpg", alt: "Waffle topped with ice cream scoops",
      badge: null, rating: 4.5, reviews: 149,
      desc: "Three gelato scoops stacked high on a crisp waffle base."
    },
    "belgian-original": {
      id: "p-327", name: "Belgian Original", price: 6.50, category: "waffles classic",
      image: "assets/images/waffles/waffle-belgian.jpg", alt: "Belgian waffle",
      badge: null, rating: 5.0, reviews: 264,
      desc: "Classic crisp Belgian waffle dusted with icing sugar."
    },
    "banana-split": {
      id: "p-328", name: "Banana Split", price: 7.75, category: "waffles classic",
      image: "assets/images/waffles/waffle-banana.jpg", alt: "Waffle with banana",
      badge: null, rating: 4.5, reviews: 178,
      desc: "Warm waffle with caramelised banana, toffee sauce and cream."
    },
    "maple-syrup-classic": {
      id: "p-329", name: "Maple Syrup Classic", price: 5.50, category: "waffles classic",
      image: "assets/images/waffles/waffle-syrup.jpg", alt: "Waffle with maple syrup",
      badge: {"text": "Hot", "cls": ""}, rating: 4.0, reviews: 121,
      desc: "Golden waffle drizzled with real maple syrup and a knob of butter."
    },
    "cocoa-belgian": {
      id: "p-330", name: "Cocoa Belgian", price: 7.00, category: "waffles classic",
      image: "assets/images/waffles/waffle-ceramic.jpg", alt: "Chocolate Belgian waffle on ceramic plate",
      badge: null, rating: 4.5, reviews: 168,
      desc: "Cocoa batter Belgian waffle with warm chocolate sauce and cocoa nibs."
    },
    "milk-chocolate-lattice": {
      id: "p-331", name: "Milk Chocolate Lattice", price: 6.75, category: "waffles classic",
      image: "assets/images/waffles/waffle-square.jpg", alt: "Square waffle drizzled with milk chocolate",
      badge: null, rating: 4.0, reviews: 132,
      desc: "A crisp square waffle latticed with silky milk chocolate."
    },
    "signature-waffle-royale": {
      id: "p-332", name: "Signature Waffle Royale", price: 9.00, category: "waffles classic",
      image: "assets/images/waffles/waffle-plate.jpg", alt: "Signature waffle royale on a plate",
      badge: {"text": "Signature", "cls": ""}, rating: 5.0, reviews: 87,
      desc: "Our chef's waffle - caramelised banana, salted caramel and a scoop of vanilla."
    },
    "ice-cream-fold": {
      id: "p-333", name: "Ice Cream Fold", price: 7.50, category: "crepes classic",
      image: "assets/images/crepes/crepe-icecream.jpg", alt: "Crepe folded around ice cream",
      badge: {"text": "Bestseller", "cls": ""}, rating: 4.5, reviews: 231,
      desc: "A warm golden crepe folded around scoops of vanilla gelato and drizzled with chocolate."
    },
    "berry-glaze": {
      id: "p-334", name: "Berry Glaze", price: 8.00, category: "crepes classic",
      image: "assets/images/crepes/crepe-sauce.jpg", alt: "Crepe glazed with berry sauce",
      badge: {"text": "New", "cls": ""}, rating: 4.0, reviews: 154,
      desc: "Buttery crepe folded with mascarpone and finished with warm mixed-berry glaze."
    },
    "classic-butter-sugar": {
      id: "p-335", name: "Classic Butter & Sugar", price: 6.00, category: "crepes classic",
      image: "assets/images/crepes/crepe-classic.jpg", alt: "Classic crepe with butter and sugar",
      badge: null, rating: 5.0, reviews: 342,
      desc: "The Parisian original - melted butter, a shower of sugar and a squeeze of lemon."
    },
    "cocoa-almond-fold": {
      id: "p-336", name: "Cocoa Almond Fold", price: 7.25, category: "crepes classic",
      image: "assets/images/crepes/crepe-classic.jpg", alt: "Crepe folded with cocoa and almonds",
      badge: {"text": "New", "cls": ""}, rating: 4.5, reviews: 143,
      desc: "Dark cocoa crepe filled with roasted almonds and a drizzle of chocolate."
    },
    "nutella-dream": {
      id: "p-337", name: "Nutella Dream", price: 7.75, category: "crepes classic",
      image: "assets/images/crepes/crepe-icecream.jpg", alt: "Crepe folded with chocolate hazelnut spread",
      badge: null, rating: 5.0, reviews: 289,
      desc: "A warm crepe smeared with chocolate-hazelnut spread and folded over sliced banana."
    },
    "honey-fig-fold": {
      id: "p-338", name: "Honey & Fig Fold", price: 8.50, category: "crepes classic",
      image: "assets/images/crepes/crepe-sauce.jpg", alt: "Crepe finished with honey and fig sauce",
      badge: {"text": "Signature", "cls": ""}, rating: 4.5, reviews: 96,
      desc: "Wildflower honey, roasted figs and mascarpone in a signature golden fold."
    },
    "strawberry-crush": {
      id: "p-339", name: "Strawberry Crush", price: 6.25, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-strawberry.jpg", alt: "Strawberry milkshake",
      badge: {"text": "Bestseller", "cls": ""}, rating: 4.5, reviews: 289,
      desc: "Fresh strawberries blended into vanilla gelato and crowned with whipped cream."
    },
    "cookie-crunch": {
      id: "p-340", name: "Cookie Crunch", price: 7.50, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-choco-sprinkles.jpg", alt: "Chocolate milkshake with sprinkles",
      badge: {"text": "New", "cls": ""}, rating: 5.0, reviews: 367,
      desc: "Chocolate gelato shake with crushed cookies and a shower of rainbow sprinkles."
    },
    "strawberry-whip": {
      id: "p-341", name: "Strawberry Whip", price: 6.75, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-straw-whip.jpg", alt: "Strawberry milkshake with whipped cream",
      badge: null, rating: 4.5, reviews: 198,
      desc: "Silky strawberry gelato whipped with milk and topped with a cloud of cream."
    },
    "double-trouble": {
      id: "p-342", name: "Double Trouble", price: 5.25, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-duo.jpg", alt: "Two layered milkshakes",
      badge: {"text": "Vegan", "cls": ""}, rating: 4.0, reviews: 121,
      desc: "Two-tone shake - vanilla and chocolate layers swirled into one indulgent glass."
    },
    "salted-caramel": {
      id: "p-343", name: "Salted Caramel", price: 7.00, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-caramel.jpg", alt: "Salted caramel milkshake",
      badge: null, rating: 4.5, reviews: 254,
      desc: "Creamy caramel gelato with ribbons of sauce and a flaky sea-salt finish."
    },
    "classic-chocolate": {
      id: "p-344", name: "Classic Chocolate", price: 5.50, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-choco.jpg", alt: "Classic chocolate milkshake",
      badge: null, rating: 5.0, reviews: 412,
      desc: "The crowd-pleaser - rich chocolate gelato blended with cold milk. Simple and perfect."
    },
    "vanilla-bean-dream": {
      id: "p-345", name: "Vanilla Bean Dream", price: 5.75, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-vanilla.jpg", alt: "Vanilla bean milkshake",
      badge: {"text": "Classic", "cls": ""}, rating: 4.5, reviews: 221,
      desc: "Madagascar vanilla bean gelato whipped with cold milk - pure and comforting."
    },
    "mango-tango": {
      id: "p-346", name: "Mango Tango", price: 6.50, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-mango.jpg", alt: "Mango milkshake with whipped cream",
      badge: {"text": "New", "cls": ""}, rating: 4.5, reviews: 134,
      desc: "Sunny Alphonso mango blended with vanilla gelato for a tropical finish."
    },
    "brownie-royale": {
      id: "p-347", name: "Brownie Royale", price: 8.25, category: "milkshakes classic",
      image: "assets/images/milkshakes/shake-brownie.jpg", alt: "Brownie royale chocolate milkshake",
      badge: {"text": "Signature", "cls": ""}, rating: 5.0, reviews: 178,
      desc: "Chocolate gelato shake loaded with brownie chunks and a fudge rim."
    },
    "assorted-donut-box-6": {
      id: "p-348", name: "Assorted Donut Box (6)", price: 14.00, category: "pastries classic",
      image: "assets/images/bakes/donuts-box.jpg", alt: "Box of six assorted donuts",
      badge: {"text": "Shareable", "cls": ""}, rating: 4.5, reviews: 304,
      desc: "Six mixed glazed and filled donuts, great for sharing."
    },
    "chocolate-cookie-shake": {
      id: "p-349", name: "Chocolate Cookie Shake", price: 7.25, category: "milkshakes chocolate",
      image: "assets/images/milkshakes/shake-choco-cookie.jpg", alt: "Chocolate cookie milkshake",
      badge: {"text": "New", "cls": "badge-purple"}, rating: 4.5, reviews: 215,
      desc: "Chocolate milkshake topped with whipped cream, chocolate cookie pieces, and chocolate drizzle."
    },
    "mango-cream-shake": {
      id: "p-350", name: "Mango Cream Shake", price: 6.75, category: "milkshakes fruit",
      image: "assets/images/milkshakes/shake-mango-cream.jpg", alt: "Mango cream milkshake",
      badge: {"text": "Popular", "cls": ""}, rating: 5.0, reviews: 184,
      desc: "Creamy mango milkshake topped with whipped cream and fresh mango pieces."
    },
    "chocolate-fudge-scoop": {
      id: "p-351", name: "Chocolate Fudge Scoop", price: 4.95, category: "ice-cream chocolate",
      image: "assets/images/ice-cream/scoop-choco-fudge.jpg", alt: "Chocolate fudge ice cream scoop",
      badge: {"text": "New", "cls": "badge-purple"}, rating: 5.0, reviews: 312,
      desc: "Rich chocolate gelato with a smooth, fudgy finish."
    },
    "fresh-blueberry-danish": {
      id: "p-352", name: "Fresh Blueberry Danish", price: 4.50, category: "pastries fruit",
      image: "assets/images/bakes/pastry-blueberry-danish.jpg", alt: "Fresh blueberry Danish pastry",
      badge: {"text": "New", "cls": "badge-purple"}, rating: 5.0, reviews: 284,
      desc: "Flaky golden Danish pastry filled with blueberry compote and finished with a light glaze."
    },
    "chocolate-croissant": {
      id: "p-353", name: "Chocolate Croissant", price: 4.75, category: "pastries chocolate",
      image: "assets/images/bakes/pastry-chocolate-croissant.jpg", alt: "Chocolate croissant pastry",
      badge: {"text": "Bestseller", "cls": ""}, rating: 5.0, reviews: 342,
      desc: "Golden, flaky croissant with visible chocolate filling, photographed as a fresh bakery pastry."
    },
    "cinnamon-swirl-pastry": {
      id: "p-354", name: "Cinnamon Swirl Pastry", price: 4.25, category: "pastries classic",
      image: "assets/images/bakes/pastry-cinnamon-swirl.jpg", alt: "Cinnamon swirl pastry",
      badge: {"text": "Chef's Pick", "cls": ""}, rating: 4.5, reviews: 198,
      desc: "Freshly baked cinnamon pastry with visible cinnamon layers and a light sugar glaze."
    },
    "strawberry-cream-layer-cake": {
      id: "p-355", name: "Strawberry Cream Layer Cake", price: 9.75, category: "cakes fruit",
      image: "assets/images/bakes/cake-strawberry-layer.jpg", alt: "Strawberry cream layer cake",
      badge: {"text": "New", "cls": "badge-purple"}, rating: 5.0, reviews: 295,
      desc: "Soft vanilla sponge layered with fresh strawberry cream and ripe berries."
    },
    "chocolate-hazelnut-waffle": {
      id: "p-356", name: "Chocolate Hazelnut Waffle", price: 7.95, category: "waffles chocolate",
      image: "assets/images/waffles/waffle-choco-hazelnut.jpg", alt: "Chocolate hazelnut waffle",
      badge: {"text": "New", "cls": "badge-purple"}, rating: 5.0, reviews: 267,
      desc: "Golden Belgian waffle topped with chocolate-hazelnut spread, chocolate drizzle, and chopped hazelnuts."
    },
    "strawberry-cream-waffle": {
      id: "p-357", name: "Strawberry Cream Waffle", price: 7.75, category: "waffles fruit",
      image: "assets/images/waffles/waffle-strawberry-cream.jpg", alt: "Strawberry cream waffle",
      badge: {"text": "Popular", "cls": ""}, rating: 4.5, reviews: 224,
      desc: "Fresh golden waffle topped with strawberries, whipped cream, and a light berry drizzle."
    }
  };

  var INGREDIENTS_BY_CATEGORY = {
    "ice-cream": ["Whole milk & cream from local dairy farms", "Cane sugar", "Natural flavourings & colours", "Waffle cone or cup (wheat flour, butter, cinnamon)"],
    "sundaes": ["Small-batch gelato base (milk, cream, cane sugar)", "House-made sauce as described", "Whipped cream", "Toppings as described"],
    "waffles": ["Wheat flour batter", "Butter & eggs", "Cane sugar", "Toppings as described"],
    "crepes": ["Wheat flour batter", "Butter & eggs", "Cane sugar", "Gelato & sauce as described"],
    "milkshakes": ["Whole milk", "Small-batch gelato base", "Cane sugar", "Whipped cream"],
    "cakes": ["Wheat flour sponge", "Butter & eggs", "Cane sugar", "Frosting as described"],
    "pastries": ["Wheat flour", "Butter", "Cane sugar", "Chocolate / glaze as described"]
  };

  function formatPrice(n) {
    return "$" + n.toFixed(2);
  }

  function starsMarkup(rating) {
    var full = Math.floor(rating);
    var half = rating - full >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    var html = "";
    for (var i = 0; i < full; i++) html += '<i class="bi bi-star-fill"></i>';
    if (half) html += '<i class="bi bi-star-half"></i>';
    for (var j = 0; j < empty; j++) html += '<i class="bi bi-star"></i>';
    return html;
  }

  function renderProduct(slug) {
    var product = PRODUCTS[slug];
    if (!product) {
      var missing = $("#pdHeading");
      if (missing) missing.textContent = "Product not found";
      return;
    }
    var primaryCategory = product.category.split(" ")[0];
    var eyebrowText = titleCaseCategory(product.category);
    var icon = CATEGORY_ICONS[primaryCategory] || "bi-ice-cream";

    /* Page title + heading */
    document.title = product.name + " - Sugar & Scoop";
    var pageTitle = $("#pdPageTitle");
    if (pageTitle) pageTitle.textContent = product.name;
    var heading = $("#pdHeading");
    if (heading) heading.textContent = product.name;

    /* Meta tags */
    var metaDesc = "Sugar & Scoop - " + product.name + ". " + product.desc;
    var setMeta = function (sel, attr, value) {
      var el = $(sel);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", metaDesc);
    setMeta('meta[property="og:title"]', "content", product.name + " - Sugar & Scoop");
    setMeta('meta[property="og:description"]', "content", metaDesc);
    setMeta('meta[property="og:image"]', "content", "https://www.sugarandscoop.com/" + product.image);
    setMeta('meta[name="twitter:title"]', "content", product.name + " - Sugar & Scoop");
    setMeta('meta[name="twitter:description"]', "content", metaDesc);
    setMeta('meta[name="twitter:image"]', "content", "https://www.sugarandscoop.com/" + product.image);

    /* Eyebrow (category label + icon) */
    var eyebrowIcon = $("#pdEyebrowIcon");
    if (eyebrowIcon) eyebrowIcon.className = "bi " + icon;
    var eyebrowTextEl = $("#pdEyebrowText");
    if (eyebrowTextEl) eyebrowTextEl.textContent = eyebrowText;

    /* Rating + reviews */
    var starsEl = $("#pdStars");
    if (starsEl) {
      starsEl.innerHTML = starsMarkup(product.rating) +
        ' <span class="text-muted-soft" id="pdReviewCount">(' + product.reviews + " reviews)</span>";
    }

    /* Price */
    var priceDisplay = $("[data-product-price-display]");
    if (priceDisplay) priceDisplay.textContent = formatPrice(product.price);
    var oldPriceEl = $("#pdOldPrice");
    if (oldPriceEl) oldPriceEl.textContent = formatPrice(Math.round(product.price * 1.2 * 100) / 100);

    /* Description */
    var descEl = $("#pdDesc");
    if (descEl) descEl.textContent = product.desc + " Made fresh daily at Sugar & Scoop with quality ingredients and a whole lot of love.";
    var descTabP1 = $("#pdDescTabP1");
    if (descTabP1) descTabP1.textContent = "Our " + product.name + " is prepared fresh in small batches. " + product.desc;
    var descTabP2 = $("#pdDescTabP2");
    if (descTabP2) descTabP2.textContent = "Crafted with quality ingredients and served fresh - a true Sugar & Scoop favourite.";

    /* Image + badge */
    var mainImage = $("#pdMainImage");
    if (mainImage) { mainImage.src = product.image; mainImage.alt = product.alt; }
    var badgeEl = $("#pdBadge");
    if (badgeEl) {
      if (product.badge) {
        badgeEl.textContent = product.badge.text;
        badgeEl.className = "product-badge" + (product.badge.cls ? " " + product.badge.cls : "");
        badgeEl.style.display = "";
      } else {
        badgeEl.style.display = "none";
      }
    }

    /* Sizes */
    var sizeGroup = $("#pdSizeGroup");
    if (sizeGroup) {
      var sizes = [
        { label: "Regular", price: product.price },
        { label: "Large", price: Math.round(product.price * 1.4 * 100) / 100 },
        { label: "Party Size", price: Math.round(product.price * 2.5 * 100) / 100 }
      ];
      sizeGroup.innerHTML = sizes.map(function (s, i) {
        return '<button type="button" class="size-btn' + (i === 0 ? " active" : "") + '" data-size="' +
          s.label + '" data-price="' + s.price + '">' + s.label + " &mdash; " + formatPrice(s.price) + "</button>";
      }).join("");

      var display = $("[data-product-price-display]");
      var addBtnEl = $("#pdAddToCartBtn");
      $$(".size-btn", sizeGroup).forEach(function (btn) {
        btn.addEventListener("click", function () {
          $$(".size-btn", sizeGroup).forEach(function (x) { x.classList.remove("active"); });
          btn.classList.add("active");
          if (addBtnEl) addBtnEl.setAttribute("data-product-price", btn.getAttribute("data-price"));
          if (display) display.textContent = formatPrice(parseFloat(btn.getAttribute("data-price")) || 0);
        });
      });
    }

    /* Add to cart button */
    var addBtn = $("#pdAddToCartBtn");
    if (addBtn) {
      addBtn.setAttribute("data-product-id", product.id);
      addBtn.setAttribute("data-product-name", product.name);
      addBtn.setAttribute("data-product-price", product.price);
      addBtn.setAttribute("data-product-img", product.image);
    }

    /* Ingredients */
    var ingredientsList = $("#pdIngredientsList");
    if (ingredientsList) {
      var ingredients = INGREDIENTS_BY_CATEGORY[primaryCategory] || INGREDIENTS_BY_CATEGORY["ice-cream"];
      ingredientsList.innerHTML = ingredients.map(function (item) {
        return '<li class="py-1">' + item + "</li>";
      }).join("");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug") || params.get("product");
    if (slug) renderProduct(slug);
  });
})();
