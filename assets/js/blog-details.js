/* ============================================================
   Sugar & Scoop — Blog Details (dynamic blog article loader)
   Reads ?slug=<blog-slug> or ?id=<blog-id> from the URL and
   populates the blog-details.html page with that article's
   own data, image, author, date, and content so every "Read More"
   button opens its own unique article instead of a shared page.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Canonical Blog Catalogue (7 Unique Articles) ---------- */
  var BLOG_POSTS = {
    "summer-scoop-fest": {
      id: "summer-scoop-fest",
      slug: "summer-scoop-fest",
      title: "Summer Scoop Fest Is Coming",
      category: "Events",
      date: "August 10, 2026",
      readTime: "4 min read",
      image: "assets/images/blog/blog-summer-scoop-fest.jpg",
      alt: "Sugar and Scoop Summer Scoop Fest celebration",
      staticPage: "blog-details-scoop-fest.html",
      lead: "Every summer we throw the party we would want to go to ourselves: two days of live churn-offs, secret flavour voting and free sample cones in the heart of New York. Here is everything you need to know about Summer Scoop Fest 2026.",
      author: {
        name: "Marcus Johnson",
        role: "Store Manager",
        avatar: "assets/images/team/team-4.jpg"
      },
      sections: [
        {
          heading: "What is Scoop Fest?",
          content: "Scoop Fest is our annual open day at 123 Dessert Lane. For one weekend the kitchen doors come off, the scoop counter turns into a tasting bar, and the whole parlour becomes a two-day celebration of everything we make. It started as a thank-you to the neighbourhood five years ago and it has grown into the date on the calendar our regulars refuse to miss."
        },
        {
          heading: "Live churn-offs",
          content: "Watch our scoop team go head-to-head in a real churn-off. Two teams, two machines and one mystery base mix, all made fresh on stage across the afternoon. Guests get to taste both batches blind and vote for the winner with a token drop at the counter. The winning team's flavour gets named and sold for the rest of the month."
        },
        {
          heading: "Secret flavour voting",
          content: "Every year we churn three mystery flavours that never appear on the menu. This year we can confirm two of them are a roasted white chocolate and orange blossom, and a smoked vanilla with toasted marshmallow. The third is still locked in the freezer. Your vote decides which one becomes a permanent scoop next season."
        }
      ],
      quote: {
        text: "“The whole team builds Scoop Fest from scratch. By Saturday night we are exhausted and glowing — it is genuinely the best two days of the year.”",
        author: "— Marcus Johnson, Sugar & Scoop"
      },
      secondarySection: {
        heading: "Early-bird tickets",
        content: "General entry is free all weekend, but early-bird tickets get you a tasting paddle of six signature scoops, a seat at the churn-off and a vote that counts twice. Tickets are strictly limited and go on sale at the start of next week, so set a reminder and grab yours before the weekend sells out like it did last year."
      },
      ingredientsTitle: "Plan your visit",
      ingredients: [
        { icon: "bi-calendar3", num: "When", text: "Saturday & Sunday, 10am - 6pm" },
        { icon: "bi-geo-alt-fill", num: "Where", text: "123 Dessert Lane, 5th Avenue, New York, NY 10001" },
        { icon: "bi-ticket-perforated", num: "Tickets", text: "Free entry all weekend · early-bird tasting paddles sold separately" },
        { icon: "bi-telephone-fill", num: "Questions", text: "Call +1 (555) 234-8765 or email hello@sugarandscoop.com" }
      ],
      extraNote: "Bring the family, bring an appetite, and bring your loudest vote. We will see you at the counter.",
      ctaBtn: { text: "Ask Us a Question", href: "contact.html" },
      tags: ["Events", "News", "Ice Cream", "New York"],
      prevSlug: "the-weekend-pancake-stack",
      nextSlug: "how-we-make-our-chocolate-truffle-ice-cream",
      relatedSlugs: ["the-weekend-pancake-stack", "donut-sundaes-are-back", "secrets-to-perfectly-chewy-cookies"]
    },

    "how-we-make-our-chocolate-truffle-ice-cream": {
      id: "chocolate-truffle-ice-cream",
      slug: "how-we-make-our-chocolate-truffle-ice-cream",
      title: "How We Make Our Chocolate Truffle Ice Cream",
      category: "Recipe",
      date: "June 12, 2026",
      readTime: "6 min read",
      image: "assets/images/blog/blog-truffle.jpg",
      alt: "Chocolate truffle ice cream scoop being churned",
      staticPage: "blog-details.html",
      lead: "Every scoop of our chocolate truffle ice cream starts with a single bar of 70% single-origin dark chocolate and ends with a ribbon of hand-made truffle folded through a slow-churned custard. Here is exactly how we do it, from the kitchen at 123 Dessert Lane.",
      author: {
        name: "Marcus Johnson",
        role: "Store Manager",
        avatar: "assets/images/team/team-4.jpg"
      },
      sections: [
        {
          heading: "Start with the chocolate",
          content: "We are picky about cocoa. The chocolate is melted over a gentle bain-marie, never a hot pan, until it reaches a silky 45°C. Melting too fast burns the delicate notes of the bean, and you can taste the difference in the very first bite. Once smooth, it sits covered and warm while we build the base around it."
        },
        {
          heading: "Build the custard base",
          content: "The base is a classic French custard: whole milk, heavy cream, egg yolks and a little sugar whisked over low heat until the mixture coats the back of a spoon. We stir in the warm melted chocolate and a scrape of vanilla bean paste, then press it all through a fine sieve to catch any stray bits of egg or cocoa."
        }
      ],
      quote: {
        text: "“Good ice cream is twenty percent recipe and eighty percent patience. If you rush the churn, the chocolate never gets a chance to shine.”",
        author: "— Marcus Johnson, Sugar & Scoop"
      },
      secondaryImage: {
        src: "assets/images/bakes/chocolate-bar.jpg",
        alt: "Bar of single-origin dark chocolate broken into pieces"
      },
      secondarySection: {
        heading: "Churn slowly, freeze fast",
        content: "The chilled custard goes into our machine and churns for a good forty minutes at a lower speed than you might expect. Slow churning folds in just enough air to make the scoop light without losing any of that deep cocoa flavour. The finished batch is frozen fast and deep so the ice cream stays smooth instead of icy."
      },
      tertiarySection: {
        heading: "The truffle fold",
        content: "The last step is our little obsession. Soft chocolate truffles are broken into ragged pieces and folded through the freshly churned ice cream by hand. The chunks stay tender at freezer temperature, so every spoonful has a patch of intense, fudgy chocolate hiding in the middle. That is the moment the flavour finally tastes like Sugar & Scoop."
      },
      ingredientsTitle: "What you will need",
      ingredients: [
        { icon: "bi-check-lg", num: "250g", text: "70% single-origin dark chocolate" },
        { icon: "bi-check-lg", num: "500ml", text: "Whole milk" },
        { icon: "bi-check-lg", num: "300ml", text: "Heavy cream" },
        { icon: "bi-check-lg", num: "6", text: "Large egg yolks" },
        { icon: "bi-check-lg", num: "120g", text: "Fine sugar" },
        { icon: "bi-check-lg", num: "1 tsp", text: "Vanilla bean paste, plus a pinch of sea salt" }
      ],
      extraNote: "Want to taste the finished result? It is scooped fresh every day in store, and we would love you to come and try a cone on us.",
      ctaBtn: { text: "See the Ice Cream Menu", href: "ice-cream.html" },
      tags: ["Recipe", "Ice Cream", "Chocolate", "Guides"],
      prevSlug: "secrets-to-perfectly-chewy-cookies",
      nextSlug: "baking-the-perfect-layer-cake",
      relatedSlugs: ["donut-sundaes-are-back", "secrets-to-perfectly-chewy-cookies", "baking-the-perfect-layer-cake"]
    },

    "donut-sundaes-are-back": {
      id: "donut-sundaes-are-back",
      slug: "donut-sundaes-are-back",
      title: "Donut Sundaes Are Back",
      category: "News",
      date: "July 2, 2026",
      readTime: "3 min read",
      image: "assets/images/blog/blog-donut.jpg",
      alt: "Donut sundae topped with chocolate sauce",
      staticPage: "blog-details-donut-sundaes.html",
      lead: "They are back. After a summer of requests, comments and one very persuasive postcard pinned to our fridge, the Donut Sundae has officially returned to the Sugar & Scoop menu.",
      author: {
        name: "Daniel Reyes",
        role: "Dessert Specialist",
        avatar: "assets/images/team/team-2.jpg"
      },
      sections: [
        {
          heading: "The comeback sundae",
          content: "The Donut Sundae is exactly as silly, warm and wonderful as it sounds. A freshly glazed donut is split and toasted, then crowned with cold vanilla soft serve, a generous pour of hot fudge and a scatter of toasted hazelnuts. The heat of the donut meets the cold of the soft serve in the very first spoonful."
        },
        {
          heading: "Why it disappeared",
          content: "We pulled it from the menu last autumn to make room for seasonal specials and, honestly, to let our soft serve machine recover. But the reaction was loud and immediate. \"Bring back the donut sundae\" is the single most common thing we hear at the counter, so this time it is here to stay."
        }
      ],
      quote: {
        text: "“People do not order the donut sundae. They plan their whole week around it.”",
        author: "— Daniel Reyes, Sugar & Scoop"
      },
      secondarySection: {
        heading: "How to order it",
        content: "You can grab one in store today, or add it to a delivery order online. It travels well in our insulated boxes, though it is at its very best eaten within the first five minutes. It is priced at $8.50, and there is also a mini version for the younger scoop fans."
      },
      ingredientsTitle: "What makes it special",
      ingredients: [
        { icon: "bi-check-lg", num: "Donut", text: "Freshly made glazed artisan brioche donut, split & toasted" },
        { icon: "bi-check-lg", num: "Ice Cream", text: "Generous swirl of slow-churned vanilla soft serve" },
        { icon: "bi-check-lg", num: "Toppings", text: "Warm 70% dark Belgian fudge drizzle and toasted hazelnut crunch" }
      ],
      ctaBtn: { text: "See the Sundae Menu", href: "sundaes.html" },
      tags: ["News", "Sundaes", "Donuts", "Menu"],
      prevSlug: "baking-the-perfect-layer-cake",
      nextSlug: "chocolate-covered-strawberries-in-10-minutes",
      relatedSlugs: ["how-we-make-our-chocolate-truffle-ice-cream", "secrets-to-perfectly-chewy-cookies", "chocolate-covered-strawberries-in-10-minutes"]
    },

    "secrets-to-perfectly-chewy-cookies": {
      id: "secrets-to-perfectly-chewy-cookies",
      slug: "secrets-to-perfectly-chewy-cookies",
      title: "Secrets to Perfectly Chewy Cookies",
      category: "Guide",
      date: "May 28, 2026",
      readTime: "5 min read",
      image: "assets/images/blog/blog-cookies.jpg",
      alt: "Stack of perfectly chewy cookies",
      staticPage: "blog-details-cookies.html",
      lead: "Brown butter, a long rest and the golden minute in the oven. Those are the three habits that changed our cookie game for good, and they are all easy to copy at home once you know why they work.",
      author: {
        name: "Ava Martinez",
        role: "Head Chef",
        avatar: "assets/images/team/team-3.jpg"
      },
      sections: [
        {
          heading: "Habit one: brown the butter",
          content: "Melt your butter over medium heat until the milk solids toast into nutty, amber flecks. Browning cooks off the water, concentrates the flavour, and stops the dough from spreading too thin in the oven. Let it cool until it is warm to the touch, not hot, before whisking it with the sugars."
        },
        {
          heading: "Habit two: rest the dough overnight",
          content: "Do not bake straight away. Chilling the dough balls for at least twelve hours lets the flour hydrate fully and the sugars dissolve. The result is a thicker cookie with a deeper caramel flavour, crisp edges and that dense, chewy center everyone is chasing."
        }
      ],
      quote: {
        text: "“If the cookie looks fully baked in the oven, you have already gone too far. Pull them when the edges are set and the center still looks soft.”",
        author: "— Ava Martinez, Sugar & Scoop"
      },
      secondaryImage: {
        src: "assets/images/blog/blog-cookies-baking.jpg",
        alt: "Freshly baked chewy chocolate chip cookies cooling on a wire rack"
      },
      secondarySection: {
        heading: "Habit three: the golden minute",
        content: "Bake hot and short. At 180°C (350°F), a standard scoop takes between nine and eleven minutes. The second the edges turn golden brown and set, pull the tray out. The residual heat on the baking sheet will finish the centers while they cool."
      },
      ingredientsTitle: "What you will need",
      ingredients: [
        { icon: "bi-check-lg", num: "220g", text: "Unsalted butter, browned and cooled" },
        { icon: "bi-check-lg", num: "200g", text: "Dark brown sugar" },
        { icon: "bi-check-lg", num: "100g", text: "Fine white sugar" },
        { icon: "bi-check-lg", num: "2", text: "Large eggs at room temperature" },
        { icon: "bi-check-lg", num: "280g", text: "Plain flour, plus 1/2 tsp baking soda" },
        { icon: "bi-check-lg", num: "250g", text: "Dark chocolate (60–70%), roughly chopped" }
      ],
      extraNote: "Craving the real thing without the wait? Our Chewy Cookie Trio is baked fresh three times a day in store. Order a box for delivery or stop by for one warm off the sheet.",
      ctaBtn: { text: "Order Chewy Cookies", href: "menu.html" },
      tags: ["Guide", "Baking", "Cookies", "Chocolate"],
      prevSlug: "summer-scoop-fest",
      nextSlug: "how-we-make-our-chocolate-truffle-ice-cream",
      relatedSlugs: ["how-we-make-our-chocolate-truffle-ice-cream", "baking-the-perfect-layer-cake", "chocolate-covered-strawberries-in-10-minutes"]
    },

    "baking-the-perfect-layer-cake": {
      id: "baking-the-perfect-layer-cake",
      slug: "baking-the-perfect-layer-cake",
      title: "Baking the Perfect Layer Cake",
      category: "Recipe",
      date: "June 20, 2026",
      readTime: "7 min read",
      image: "assets/images/blog/blog-cake.jpg",
      alt: "Perfectly layered chocolate cake with frosting",
      staticPage: "blog-details-layer-cake.html",
      lead: "Level layers, a chilled crumb coat and one very patient baker. Those three things separate a good home cake from one that looks like it came out of a bakery window. Here is the method we teach every new member of the Sugar & Scoop kitchen team.",
      author: {
        name: "Priya Nair",
        role: "Dessert Specialist",
        avatar: "assets/images/team/team-5.jpg"
      },
      sections: [
        {
          heading: "Start with level layers",
          content: "Even the best recipe bakes a dome. Once your cakes are fully cooled, use a long serrated knife to trim each dome off so every layer is perfectly flat. A turntable makes this much easier, but a steady hand on a board works fine. Level layers are the foundation of a cake that stacks straight and frosts smooth."
        },
        {
          heading: "Build a filling wall",
          content: "Before you add any frosting on top, pipe a ring of buttercream around the edge of each layer. That ring acts as a wall that keeps soft fillings like jam, curd or chocolate ganache exactly where they should be instead of squeezing out the sides. Then fill the middle of the ring and set the next level cake on top."
        }
      ],
      quote: {
        text: "“A bakery-smooth finish is not talent. It is a crumb coat, a chill, and a second coat.”",
        author: "— Priya Nair, Sugar & Scoop"
      },
      secondaryImage: {
        src: "assets/images/blog/blog-cake-crumbcoat.jpg",
        alt: "Smoothing chocolate buttercream crumb coat on a layered cake with a bench scraper"
      },
      secondarySection: {
        heading: "Crumb coat, then chill",
        content: "Spread a thin layer of buttercream over the whole cake and scrape it smooth. This is the crumb coat; it traps every loose crumb so the final layer stays clean. Chill the cake until the crumb coat is firm, at least thirty minutes. Then apply your final coat in generous strokes and smooth it with a bench scraper."
      },
      tertiarySection: {
        heading: "The patient finish",
        content: "Work fast and keep your scraper warm. If the buttercream starts to pull, dip the scraper in hot water, wipe it dry and keep going. Chill the finished cake again before slicing so the layers stay clean, and use a sharp knife dipped in hot water for picture-perfect cuts."
      },
      ingredientsTitle: "What you will need",
      ingredients: [
        { icon: "bi-check-lg", num: "3", text: "Baked 8-inch cake layers, cooled and levelled" },
        { icon: "bi-check-lg", num: "500g", text: "Buttercream frosting" },
        { icon: "bi-check-lg", num: "200g", text: "Jam, curd or ganache filling" },
        { icon: "bi-check-lg", num: "1", text: "Turntable and bench scraper (optional)" },
        { icon: "bi-check-lg", num: "1", text: "Long serrated knife" }
      ],
      extraNote: "Prefer to skip the hard part? Our kitchen bakes and decorates custom cakes to order every week. Head to the bulk orders page and we will build yours.",
      ctaBtn: { text: "Order a Custom Cake", href: "bulk-orders.html" },
      tags: ["Recipe", "Baking", "Cake", "Desserts"],
      prevSlug: "how-we-make-our-chocolate-truffle-ice-cream",
      nextSlug: "donut-sundaes-are-back",
      relatedSlugs: ["how-we-make-our-chocolate-truffle-ice-cream", "secrets-to-perfectly-chewy-cookies", "the-weekend-pancake-stack"]
    },

    "chocolate-covered-strawberries-in-10-minutes": {
      id: "chocolate-covered-strawberries-in-10-minutes",
      slug: "chocolate-covered-strawberries-in-10-minutes",
      title: "Chocolate-Covered Strawberries in 10 Minutes",
      category: "Recipe",
      date: "July 18, 2026",
      readTime: "4 min read",
      image: "assets/images/blog/blog-chocostraw.jpg",
      alt: "Chocolate covered strawberries on a tray",
      staticPage: "blog-details-strawberries.html",
      lead: "Two ingredients, one tempering trick and a tray of glossy berries ready for gifting — or keeping all to yourself. This is the fastest dessert upgrade in the Sugar & Scoop kitchen, and it takes ten minutes start to finish.",
      author: {
        name: "Maya Chen",
        role: "Founder & Head Chocolatier",
        avatar: "assets/images/team/team-1.jpg"
      },
      sections: [
        {
          heading: "Choose the right berries",
          content: "Buy strawberries that are firm, dry and fragrant. They should be bright red with no white shoulders, and ideally medium sized so the chocolate-to-berry ratio stays sensible. Wash them and dry them thoroughly; any water left on the surface will make the chocolate seize and go dull."
        },
        {
          heading: "The one-minute tempering trick",
          content: "The trick that keeps the chocolate glossy and snappy is seeding. Melt two thirds of your chocolate over a gentle bain-marie to 45°C, then take it off the heat and stir in the remaining third, finely chopped. The cool pieces drop the temperature, build stable crystals, and give you a shine that sets with a clean snap."
        }
      ],
      quote: {
        text: "“Dry berries and a seeded melt. Everything else is just showing off.”",
        author: "— Maya Chen, Sugar & Scoop"
      },
      secondaryImage: {
        src: "assets/images/bakes/choco-strawberries.jpg",
        alt: "Glossy chocolate covered strawberries ready to serve"
      },
      secondarySection: {
        heading: "Dip, rest and set",
        content: "Hold each berry by the leaves, dip it three quarters of the way into the chocolate, and let the excess drip off for a second. Place it on a tray lined with baking paper. If you want to decorate, now is the moment — drizzle white chocolate or scatter crushed pistachios before the coating sets. Leave them at room temperature to set, not in the fridge, to keep the shine."
      },
      ingredientsTitle: "What you will need",
      ingredients: [
        { icon: "bi-check-lg", num: "500g", text: "Firm ripe strawberries, washed and dried" },
        { icon: "bi-check-lg", num: "300g", text: "Dark chocolate, finely chopped" },
        { icon: "bi-check-lg", num: "Optional", text: "White chocolate, pistachios or sea salt for decoration" },
        { icon: "bi-check-lg", num: "1", text: "Baking paper lined tray" }
      ],
      extraNote: "Store them in a cool, dry place and eat within two days. They are at their absolute best a few hours after setting, when the coating has its fullest snap.",
      ctaBtn: { text: "Order Chocolate Berries", href: "menu.html" },
      tags: ["Recipe", "Chocolate", "Strawberries", "Quick Desserts"],
      prevSlug: "donut-sundaes-are-back",
      nextSlug: "the-weekend-pancake-stack",
      relatedSlugs: ["the-weekend-pancake-stack", "how-we-make-our-chocolate-truffle-ice-cream", "secrets-to-perfectly-chewy-cookies"]
    },

    "the-weekend-pancake-stack": {
      id: "the-weekend-pancake-stack",
      slug: "the-weekend-pancake-stack",
      title: "The Weekend Pancake Stack",
      category: "Recipe",
      date: "August 5, 2026",
      readTime: "6 min read",
      image: "assets/images/blog/blog-pancakes.jpg",
      alt: "Tall stack of pancakes with syrup and berries",
      staticPage: "blog-details-pancakes.html",
      lead: "Fluffy, golden and worth every minute of the weekend. This is the recipe we make for the family on Sunday mornings, and it comes together from pantry staples in less time than it takes the coffee to brew.",
      author: {
        name: "Marcus Johnson",
        role: "Head Chef",
        avatar: "assets/images/team/team-4.jpg"
      },
      sections: [
        {
          heading: "The batter",
          content: "Our trick is a loose batter with a little acidity. Whisk the flour, sugar and baking powder together in one bowl, and the eggs, milk, melted butter and a splash of buttermilk in another. Fold the wet into the dry until just combined; a few lumps are fine and are actually better. Over-mixing builds gluten and makes pancakes tough."
        },
        {
          heading: "Rest it, briefly",
          content: "Let the batter rest for five to ten minutes while the pan heats. The resting time lets the baking powder start working and the flour hydrate, which gives you that even, pillowy rise. You should see small bubbles start to form on the surface — that is the batter telling you it is ready."
        }
      ],
      quote: {
        text: "“The first pancake is always the test pancake. Eat it at the stove, chef's privilege.”",
        author: "— Marcus Johnson, Sugar & Scoop"
      },
      secondaryImage: {
        src: "assets/images/blog/blog-pancakes-skillet.jpg",
        alt: "Golden pancake sizzling and cooking in a cast iron skillet"
      },
      secondarySection: {
        heading: "The golden minute, pancake style",
        content: "Heat a heavy pan over medium, add a knob of butter, and ladle in the batter. The sign to flip is not a timer but the bubbles: when the surface is covered in popped bubbles and the edges look set, flip. The second side cooks in about half the time of the first. Keep the finished pancakes warm in a low oven while you finish the batch."
      },
      tertiarySection: {
        heading: "Build the stack",
        content: "Stack them high with a pat of butter between every pancake so it melts down the sides. Finish with maple syrup, fresh berries and a dusting of icing sugar. For a parlour-style twist, add a scoop of vanilla ice cream on top — the heat of the stack melts it into a sauce."
      },
      ingredientsTitle: "What you will need",
      ingredients: [
        { icon: "bi-check-lg", num: "250g", text: "Plain flour" },
        { icon: "bi-check-lg", num: "2 tbsp", text: "Fine sugar" },
        { icon: "bi-check-lg", num: "2 tsp", text: "Baking powder, plus a pinch of salt" },
        { icon: "bi-check-lg", num: "2", text: "Large eggs" },
        { icon: "bi-check-lg", num: "300ml", text: "Milk, plus a splash of buttermilk" },
        { icon: "bi-check-lg", num: "50g", text: "Melted butter, plus extra for the pan" }
      ],
      extraNote: "Crave a stack without the cooking? Our waffles and pancakes make weekend appearances all year round — check the menu and order one for delivery.",
      ctaBtn: { text: "See the Waffle Menu", href: "waffles.html" },
      tags: ["Recipe", "Breakfast", "Pancakes", "Weekend"],
      prevSlug: "chocolate-covered-strawberries-in-10-minutes",
      nextSlug: "summer-scoop-fest",
      relatedSlugs: ["chocolate-covered-strawberries-in-10-minutes", "how-we-make-our-chocolate-truffle-ice-cream", "secrets-to-perfectly-chewy-cookies"]
    }
  };

  /* Aliases to resolve any ID / short slug variations cleanly */
  var ALIASES = {
    "chewy-cookies": "secrets-to-perfectly-chewy-cookies",
    "layer-cake": "baking-the-perfect-layer-cake",
    "strawberries": "chocolate-covered-strawberries-in-10-minutes",
    "donut-sundaes": "donut-sundaes-are-back",
    "truffle": "how-we-make-our-chocolate-truffle-ice-cream",
    "pancakes": "the-weekend-pancake-stack",
    "scoop-fest": "summer-scoop-fest",
    "chocolate-truffle-ice-cream": "how-we-make-our-chocolate-truffle-ice-cream"
  };

  function findBlogPost(key) {
    if (!key) return null;
    var norm = key.toLowerCase().trim();
    if (BLOG_POSTS[norm]) return BLOG_POSTS[norm];
    if (ALIASES[norm] && BLOG_POSTS[ALIASES[norm]]) return BLOG_POSTS[ALIASES[norm]];
    
    /* Search by id */
    for (var k in BLOG_POSTS) {
      if (BLOG_POSTS[k].id.toLowerCase() === norm) return BLOG_POSTS[k];
      if (BLOG_POSTS[k].slug.toLowerCase() === norm) return BLOG_POSTS[k];
    }
    return null;
  }

  /* ---------- Render Blog Function ---------- */
  function renderBlog(slugOrId) {
    var post = findBlogPost(slugOrId);
    if (!post) {
      /* Only set default if on generic blog-details.html without any slug */
      var path = window.location.pathname || "";
      var isGenericPage = path.indexOf("blog-details.html") !== -1 && path.indexOf("blog-details-") === -1;
      if (!slugOrId && isGenericPage) {
        post = BLOG_POSTS["how-we-make-our-chocolate-truffle-ice-cream"];
      } else {
        console.warn("Blog article not found for slug/id:", slugOrId);
        return;
      }
    }
    if (!post) return;

    /* Update page title */
    document.title = post.title + " — Sugar & Scoop";

    /* Breadcrumbs */
    var breadcrumbActive = $(".breadcrumb-item.active");
    if (breadcrumbActive) breadcrumbActive.textContent = post.title;

    /* Page Header */
    var pageHeaderTitle = $(".page-header h2");
    if (pageHeaderTitle) pageHeaderTitle.textContent = post.title;

    /* Article Hero Image */
    var articleImg = $("#article img.rounded-5");
    if (articleImg) {
      articleImg.src = post.image;
      articleImg.alt = post.alt;
    }

    /* Article Title H1 */
    var articleH1 = $("#article h1");
    if (articleH1) articleH1.textContent = post.title;

    /* Author info */
    var authorAvatar = $("#article .testimonial-avatar");
    if (authorAvatar) {
      authorAvatar.src = post.author.avatar;
      authorAvatar.alt = post.author.name;
    }
    var authorName = $("#article .font-display.d-block");
    if (authorName) authorName.textContent = post.author.name;

    var authorRole = $("#article small.text-muted-soft");
    if (authorRole) authorRole.textContent = post.author.role;

    /* Meta: Date & Read Time */
    var metaWrap = $("#article .d-flex.flex-wrap.align-items-center.gap-3");
    if (metaWrap) {
      var spans = $$("span", metaWrap);
      spans.forEach(function (sp) {
        if (sp.querySelector(".bi-calendar3") || sp.innerHTML.indexOf("bi-calendar3") !== -1) {
          sp.innerHTML = '<i class="bi bi-calendar3 me-1"></i>' + post.date;
        } else if (sp.querySelector(".bi-clock") || sp.innerHTML.indexOf("bi-clock") !== -1) {
          sp.innerHTML = '<i class="bi bi-clock me-1"></i>' + post.readTime;
        } else if (sp.classList.contains("badge")) {
          sp.innerHTML = '<i class="bi bi-tag me-1"></i>' + post.category;
        }
      });
    }

    /* Lead paragraph */
    var leadP = $("#article p.lead");
    if (leadP) leadP.textContent = post.lead;

    /* Rebuild Article Body */
    var container = $("#article .mx-auto");
    if (container) {
      /* Keep top elements (hero img, title, meta, lead) */
      var bodyHtml = '';
      bodyHtml += '<img alt="' + post.alt + '" class="rounded-5 si-shadow w-100 mb-4" src="' + post.image + '" style="object-fit:cover;height:460px"/>';
      bodyHtml += '<h1 class="display-5 mb-3">' + post.title + '</h1>';
      bodyHtml += '<div class="d-flex flex-wrap align-items-center gap-3 mb-4">';
      bodyHtml += '  <div class="d-flex align-items-center gap-2">';
      bodyHtml += '    <img alt="' + post.author.name + '" class="testimonial-avatar" src="' + post.author.avatar + '"/>';
      bodyHtml += '    <div>';
      bodyHtml += '      <strong class="font-display d-block">' + post.author.name + '</strong>';
      bodyHtml += '      <small class="text-muted-soft">' + post.author.role + '</small>';
      bodyHtml += '    </div>';
      bodyHtml += '  </div>';
      bodyHtml += '  <span class="text-muted-soft"><i class="bi bi-calendar3 me-1"></i>' + post.date + '</span>';
      bodyHtml += '  <span class="text-muted-soft"><i class="bi bi-clock me-1"></i>' + post.readTime + '</span>';
      bodyHtml += '  <span class="badge rounded-pill" style="background:var(--si-gradient-soft);color:var(--si-pink);font-family:var(--si-font-display);font-weight:700"><i class="bi bi-tag me-1"></i>' + post.category + '</span>';
      bodyHtml += '</div>';
      bodyHtml += '<p class="lead text-muted-soft">' + post.lead + '</p>';

      /* Sections */
      if (post.sections) {
        post.sections.forEach(function (sec) {
          bodyHtml += '<h2 class="h4 mt-5 mb-3">' + sec.heading + '</h2>';
          bodyHtml += '<p class="text-muted-soft">' + sec.content + '</p>';
        });
      }

      /* Quote */
      if (post.quote) {
        bodyHtml += '<blockquote class="si-card p-4 my-5" style="border-left:4px solid var(--si-pink)">';
        bodyHtml += '  <p class="font-display fs-5 mb-0" style="color:var(--si-heading)">' + post.quote.text + '</p>';
        bodyHtml += '  <footer class="small text-muted-soft mt-2">' + post.quote.author + '</footer>';
        bodyHtml += '</blockquote>';
      }

      /* Secondary Section */
      if (post.secondarySection) {
        bodyHtml += '<h2 class="h4 mt-5 mb-3">' + post.secondarySection.heading + '</h2>';
        bodyHtml += '<p class="text-muted-soft">' + post.secondarySection.content + '</p>';
      }

      /* Secondary Image */
      if (post.secondaryImage) {
        bodyHtml += '<img alt="' + post.secondaryImage.alt + '" class="rounded-5 si-shadow w-100 my-4" loading="lazy" src="' + post.secondaryImage.src + '" style="object-fit:cover;height:360px"/>';
      }

      /* Tertiary Section */
      if (post.tertiarySection) {
        bodyHtml += '<h2 class="h4 mt-5 mb-3">' + post.tertiarySection.heading + '</h2>';
        bodyHtml += '<p class="text-muted-soft">' + post.tertiarySection.content + '</p>';
      }

      /* Ingredients / Plan your visit list */
      if (post.ingredients && post.ingredients.length > 0) {
        bodyHtml += '<h3 class="h5 mt-5 mb-3">' + (post.ingredientsTitle || "What you will need") + '</h3>';
        bodyHtml += '<ul class="info-list">';
        post.ingredients.forEach(function (ing) {
          bodyHtml += '  <li>';
          bodyHtml += '    <span class="info-ic"><i class="bi ' + (ing.icon || "bi-check-lg") + '"></i></span>';
          bodyHtml += '    <div><strong class="font-display d-block">' + ing.num + '</strong><span>' + ing.text + '</span></div>';
          bodyHtml += '  </li>';
        });
        bodyHtml += '</ul>';
      }

      /* Extra note */
      if (post.extraNote) {
        bodyHtml += '<p class="text-muted-soft">' + post.extraNote + '</p>';
      }

      /* CTA button */
      if (post.ctaBtn) {
        bodyHtml += '<a class="btn btn-grad mt-2" href="' + post.ctaBtn.href + '">' + post.ctaBtn.text + ' <i class="bi bi-arrow-right ms-1"></i></a>';
      }

      /* Share + tags */
      bodyHtml += '<div class="d-flex flex-wrap align-items-center gap-3 mt-5 pt-4 border-top">';
      bodyHtml += '  <span class="font-display fw-bold">Share this post:</span>';
      bodyHtml += '  <button aria-label="Share on Facebook" class="social-circle" type="button"><i class="bi bi-facebook"></i></button>';
      bodyHtml += '  <button aria-label="Share on X" class="social-circle" type="button"><i class="bi bi-twitter-x"></i></button>';
      bodyHtml += '  <button aria-label="Share on LinkedIn" class="social-circle" type="button"><i class="bi bi-linkedin"></i></button>';
      bodyHtml += '  <button aria-label="Share by email" class="social-circle" type="button"><i class="bi bi-envelope"></i></button>';
      bodyHtml += '</div>';



      /* Prev / Next Navigation */
      var prevPost = post.prevSlug ? BLOG_POSTS[post.prevSlug] : null;
      var nextPost = post.nextSlug ? BLOG_POSTS[post.nextSlug] : null;
      if (prevPost || nextPost) {
        bodyHtml += '<nav aria-label="Article navigation" class="d-flex flex-column flex-sm-row gap-3 mt-5 pt-4 border-top">';
        if (prevPost) {
          bodyHtml += '  <a class="btn btn-outline-soft flex-fill d-flex flex-column align-items-start gap-1 py-3" href="' + prevPost.staticPage + '">';
          bodyHtml += '    <small class="text-muted-soft"><i class="bi bi-arrow-left me-1"></i>Previous Post</small>';
          bodyHtml += '    <span class="font-display" style="color:var(--si-heading)">' + prevPost.title + '</span>';
          bodyHtml += '  </a>';
        }
        if (nextPost) {
          bodyHtml += '  <a class="btn btn-outline-soft flex-fill d-flex flex-column align-items-start gap-1 py-3 text-sm-end" href="' + nextPost.staticPage + '">';
          bodyHtml += '    <small class="text-muted-soft">Next Post<i class="bi bi-arrow-right ms-1"></i></small>';
          bodyHtml += '    <span class="font-display" style="color:var(--si-heading)">' + nextPost.title + '</span>';
          bodyHtml += '  </a>';
        }
        bodyHtml += '</nav>';
      }

      container.innerHTML = bodyHtml;
    }

    /* Render Related Blog Posts in #more-posts / #morePosts / .row */
    var moreSection = $("#more-posts") || $("#morePosts") || $("#relatedPosts");
    if (moreSection && post.relatedSlugs) {
      var grid = $(".row", moreSection);
      if (grid) {
        var relatedHtml = '';
        post.relatedSlugs.slice(0, 3).forEach(function (relSlug, idx) {
          var rel = BLOG_POSTS[relSlug];
          if (!rel) return;
          var delayClass = idx === 1 ? ' reveal-delay-1' : (idx === 2 ? ' reveal-delay-2' : '');
          relatedHtml += '<div class="col-md-4 reveal' + delayClass + '">';
          relatedHtml += '  <article class="blog-card h-100" data-blog-category="' + rel.category.toLowerCase() + '" data-blog-id="' + rel.id + '" data-blog-slug="' + rel.slug + '">';
          relatedHtml += '    <div class="blog-media">';
          relatedHtml += '      <a aria-label="Read ' + rel.title + '" class="blog-media-link" href="' + rel.staticPage + '">';
          relatedHtml += '        <img alt="' + rel.alt + '" loading="lazy" src="' + rel.image + '"/>';
          relatedHtml += '      </a>';
          relatedHtml += '      <span class="blog-cat">' + rel.category + '</span>';
          relatedHtml += '    </div>';
          relatedHtml += '    <div class="blog-body">';
          relatedHtml += '      <div class="blog-meta">';
          relatedHtml += '        <span><i class="bi bi-calendar3"></i> ' + rel.date + '</span>';
          relatedHtml += '        <span><i class="bi bi-clock"></i> ' + rel.readTime + '</span>';
          relatedHtml += '      </div>';
          relatedHtml += '      <h3 class="blog-title"><a href="' + rel.staticPage + '">' + rel.title + '</a></h3>';
          relatedHtml += '      <p class="mb-0 text-muted-soft">' + rel.lead.slice(0, 140) + '...</p>';
          relatedHtml += '      <a class="btn btn-sm btn-grad-soft align-self-start mt-auto" href="' + rel.staticPage + '">Read More <i class="bi bi-arrow-right ms-1"></i></a>';
          relatedHtml += '    </div>';
          relatedHtml += '  </article>';
          relatedHtml += '</div>';
        });
        grid.innerHTML = relatedHtml;
      }
    }
  }

  /* ---------- Initialize dynamic loader on DOMContentLoaded ---------- */
  function initBlogDetails() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug") || params.get("id");
    
    /* If on blog-details.html and slug is provided, or if slug is present on any detail page */
    if (slug) {
      renderBlog(slug);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlogDetails);
  } else {
    initBlogDetails();
  }

  /* Expose helper and catalogue for testing & integration */
  window.SUGAR_SCOOP_BLOG = {
    POSTS: BLOG_POSTS,
    ALIASES: ALIASES,
    findBlogPost: findBlogPost,
    renderBlog: renderBlog
  };

})();
