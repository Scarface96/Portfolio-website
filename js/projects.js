/* Project data for the cards, archive and case viewer.
   To add a project: add an object here, put its images in media/<slug>/, and add a card or archive row in index.html
   with data-open="<slug>". */
const PROJECTS = [
  {
    "slug": "churn",
    "title": "Bank Customer Churn Classification",
    "kick": "Machine learning · Python",
    "stack": [
      "Python",
      "pandas",
      "scikit-learn",
      "Plotly"
    ],
    "desc": "Predicts which of 10,000 bank customers will leave. Four models are compared on held-out customers, and gradient boosting reaches 0.86 ROC AUC: the riskiest fifth of customers holds 62% of those who leave. The live report adds an in-browser risk calculator and a retention budget planner.",
    "repo": "https://github.com/Scarface96/Bank-Customer-Churn-Classification",
    "cover": "media/churn/cover.webp",
    "gallery": [
      {
        "src": "media/churn/01.webp",
        "w": 1032,
        "h": 813,
        "cap": "Four models compared on held-out customers"
      },
      {
        "src": "media/churn/02.webp",
        "w": 1032,
        "h": 455,
        "cap": "In-browser churn-risk calculator"
      },
      {
        "src": "media/churn/03.webp",
        "w": 1032,
        "h": 870,
        "cap": "Retention budget planner"
      }
    ],
    "video": "media/churn/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/Bank-Customer-Churn-Classification/"
  },
  {
    "slug": "toy",
    "title": "Toy Store KPI Report",
    "kick": "Business intelligence · Power BI, Python",
    "stack": [
      "Power BI",
      "DAX",
      "Python",
      "statsmodels"
    ],
    "desc": "Sales from 50 toy stores and 829,262 transactions. Revenue grew 31% this year while profit grew only 16%; the report maps every product by volume and margin, shows when customers buy, and backtests a Q4 forecast. It sits alongside the original Power BI model.",
    "repo": "https://github.com/Scarface96/Toy-Store-KPI-Report",
    "cover": "media/toy/cover.webp",
    "gallery": [
      {
        "src": "media/toy/01.webp",
        "w": 1032,
        "h": 739,
        "cap": "Product portfolio map: units, margin and profit"
      },
      {
        "src": "media/toy/02.webp",
        "w": 1032,
        "h": 704,
        "cap": "Average daily revenue by weekday and month"
      },
      {
        "src": "media/toy/03.webp",
        "w": 1032,
        "h": 826,
        "cap": "Backtested Q4 2023 forecast"
      }
    ],
    "video": "media/toy/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/Toy-Store-KPI-Report/"
  },
  {
    "slug": "b2b",
    "title": "B2B Sales Pipeline CRM Dashboard",
    "kick": "Sales analytics · Excel, Python",
    "stack": [
      "Excel",
      "Python",
      "pandas",
      "Plotly"
    ],
    "desc": "A B2B CRM pipeline: $10.0M won in 2017 at a 63% win rate. Agent win rates come with 95% confidence ranges, the 1,589 open deals are checked against how long winning deals really take, and a filterable leaderboard covers every team.",
    "repo": "https://github.com/Scarface96/B2B-Sales-Pipeline-CRM-Dashboard-for-TechSolutions-Inc.",
    "cover": "media/b2b/cover.webp",
    "gallery": [
      {
        "src": "media/b2b/01.webp",
        "w": 1032,
        "h": 989,
        "cap": "Agent win rates with 95% confidence ranges"
      },
      {
        "src": "media/b2b/02.webp",
        "w": 1032,
        "h": 771,
        "cap": "Open deals vs how long winning deals take"
      },
      {
        "src": "media/b2b/03.webp",
        "w": 1032,
        "h": 939,
        "cap": "Filterable team leaderboard"
      }
    ],
    "video": "media/b2b/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/B2B-Sales-Pipeline-CRM-Dashboard-for-TechSolutions-Inc./"
  },
  {
    "slug": "co2",
    "title": "Global CO₂ Emissions Dashboard",
    "kick": "Data visualisation · Tableau, Python",
    "stack": [
      "Tableau",
      "Python",
      "pandas",
      "Plotly"
    ],
    "desc": "World CO₂ emissions by country, per person and over history. The United States has emitted 24% of all CO₂ ever, while China now emits 31% of each year's total. Includes an animated world map, responsibility against population, and an explorer for any country.",
    "repo": "https://github.com/Scarface96/Global-CO2-Emissions-Dashboard",
    "cover": "media/co2/cover.webp",
    "gallery": [
      {
        "src": "media/co2/01.webp",
        "w": 1032,
        "h": 801,
        "cap": "Animated map of CO₂ per person"
      },
      {
        "src": "media/co2/02.webp",
        "w": 1032,
        "h": 711,
        "cap": "Historical responsibility vs population"
      },
      {
        "src": "media/co2/03.webp",
        "w": 1032,
        "h": 1000,
        "cap": "Country explorer"
      }
    ],
    "video": "media/co2/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/Global-CO2-Emissions-Dashboard/"
  },
  {
    "slug": "hr",
    "title": "HR Analytics Dashboard",
    "kick": "People analytics · Tableau, Python",
    "stack": [
      "Tableau",
      "Python",
      "statsmodels",
      "Plotly"
    ],
    "desc": "Attrition across 1,470 employees. Overtime and seniority are the strongest signals: 53% of entry-level staff who work overtime have left. A logistic regression ranks the drivers as odds ratios, and a segment explorer lets you test any group.",
    "repo": "https://github.com/Scarface96/HR-Analysis-Dashboard",
    "cover": "media/hr/cover.webp",
    "gallery": [
      {
        "src": "media/hr/01.webp",
        "w": 1032,
        "h": 691,
        "cap": "Overtime and seniority"
      },
      {
        "src": "media/hr/02.webp",
        "w": 1032,
        "h": 1000,
        "cap": "Attrition drivers as odds ratios"
      },
      {
        "src": "media/hr/03.webp",
        "w": 1032,
        "h": 718,
        "cap": "Segment explorer"
      }
    ],
    "video": "media/hr/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/HR-Analysis-Dashboard/"
  },
  {
    "slug": "retail",
    "title": "Retail Sales SQL Analysis",
    "kick": "SQL analysis · PostgreSQL, DuckDB",
    "stack": [
      "PostgreSQL",
      "SQL",
      "DuckDB",
      "Python"
    ],
    "desc": "The project's SQL questions answered beside their live results, RFM customer segments and cohort retention. A real SQL engine (DuckDB) runs in the page, so visitors can write their own queries against the 1,997 transactions.",
    "repo": "https://github.com/Scarface96/sql_retail_sales_p1",
    "cover": "media/retail/cover.webp",
    "gallery": [
      {
        "src": "media/retail/01.webp",
        "w": 1032,
        "h": 1000,
        "cap": "The SQL questions beside their live results"
      },
      {
        "src": "media/retail/02.webp",
        "w": 1032,
        "h": 734,
        "cap": "RFM customer segments"
      },
      {
        "src": "media/retail/03.webp",
        "w": 1032,
        "h": 823,
        "cap": "Live SQL editor running DuckDB in the browser"
      }
    ],
    "video": "media/retail/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/sql_retail_sales_p1/"
  },
  {
    "slug": "netflix",
    "title": "Reelhouse (Netflix-style app)",
    "kick": "Web app · React, Firebase",
    "stack": [
      "React",
      "Tailwind CSS",
      "Firebase",
      "TMDB API"
    ],
    "desc": "A streaming-style film browser that grew out of a Netflix clone. Trending hero, nine genre rows, a details dialog with trailer, cast and similar films, search across TMDB, and a My List that syncs to Firestore when you sign in.",
    "repo": "https://github.com/Scarface96/netflix-clone",
    "cover": "media/netflix/cover.webp",
    "gallery": [
      {
        "src": "media/netflix/01.webp",
        "w": 1200,
        "h": 750,
        "cap": "Home with trending hero and genre rows"
      },
      {
        "src": "media/netflix/02.webp",
        "w": 1200,
        "h": 750,
        "cap": "Details dialog with trailer, cast and similar films"
      },
      {
        "src": "media/netflix/03.webp",
        "w": 1200,
        "h": 750,
        "cap": "Search across the TMDB catalogue"
      },
      {
        "src": "media/netflix/04.webp",
        "w": 1200,
        "h": 750,
        "cap": "Sign-in page with poster wall"
      }
    ],
    "video": "media/netflix/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/netflix-clone/"
  },
  {
    "slug": "kaidis",
    "title": "KAIDIS Coffee Shop",
    "kick": "Client website · HTML, CSS, JS",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "desc": "A responsive café website designed as a modern, client-ready landing page for a local business.",
    "repo": "https://github.com/Scarface96/KAIDIS--Coffee-Shop",
    "cover": "media/kaidis/cover.webp",
    "gallery": [
      {
        "src": "media/kaidis/01.webp",
        "w": 1400,
        "h": 875,
        "cap": "Homepage on desktop"
      },
      {
        "src": "media/kaidis/02.webp",
        "w": 1200,
        "h": 982,
        "cap": "Menu section"
      },
      {
        "src": "media/kaidis/03.webp",
        "w": 1200,
        "h": 708,
        "cap": "Gallery section"
      },
      {
        "src": "media/kaidis/04.webp",
        "w": 1200,
        "h": 758,
        "cap": "Testimonials"
      },
      {
        "src": "media/kaidis/05.webp",
        "w": 585,
        "h": 1266,
        "cap": "Homepage on mobile"
      }
    ],
    "video": "media/kaidis/video.mp4",
    "vkind": "reel",
    "live": "https://scarface96.github.io/KAIDIS--Coffee-Shop/"
  },
  {
    "slug": "movie",
    "title": "Movie Search App",
    "kick": "Web app · React",
    "stack": [
      "React",
      "OMDb API",
      "Jest"
    ],
    "desc": "Search films and series with type and year filters, open details with IMDb, Rotten Tomatoes and Metacritic ratings, and keep a watchlist with watched tracking, saved in the browser.",
    "repo": "https://github.com/Scarface96/movie-app",
    "cover": "media/movie/cover.webp",
    "gallery": [
      {
        "src": "media/movie/01.webp",
        "w": 1200,
        "h": 750,
        "cap": "Search results with filters"
      },
      {
        "src": "media/movie/02.webp",
        "w": 1200,
        "h": 750,
        "cap": "Details with ratings from three sources"
      },
      {
        "src": "media/movie/03.webp",
        "w": 1200,
        "h": 750,
        "cap": "Watchlist with watched tracking"
      }
    ],
    "video": "media/movie/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/movie-app/"
  },
  {
    "slug": "weather",
    "title": "Weather React App",
    "kick": "Web app · React",
    "stack": [
      "React",
      "Open-Meteo",
      "Jest"
    ],
    "desc": "Current conditions, the next 24 hours and a 7-day forecast for any city, with live search suggestions, your location, °C/°F and a sky that changes with the weather and time of day. Uses the keyless Open-Meteo API, so the live demo never breaks.",
    "repo": "https://github.com/Scarface96/weather-react-app",
    "cover": "media/weather/cover.webp",
    "gallery": [
      {
        "src": "media/weather/01.webp",
        "w": 1200,
        "h": 750,
        "cap": "City search with suggestions"
      },
      {
        "src": "media/weather/02.webp",
        "w": 1200,
        "h": 750,
        "cap": "Forecast for Tokyo"
      },
      {
        "src": "media/weather/03.webp",
        "w": 585,
        "h": 1266,
        "cap": "Forecast on mobile"
      }
    ],
    "video": "media/weather/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/weather-react-app/"
  },
  {
    "slug": "airbnb",
    "title": "Airbnb Listings Analysis",
    "kick": "Exploratory analysis · Python",
    "stack": [
      "Python",
      "pandas",
      "Matplotlib",
      "Seaborn"
    ],
    "desc": "Exploratory analysis of Paris Airbnb listings: prices by neighbourhood, growth in new hosts, and price trends over time.",
    "repo": "https://github.com/Scarface96/AirBnB-Listing-Analysis-Review",
    "cover": "media/airbnb/cover.webp",
    "gallery": [
      {
        "src": "media/airbnb/01.webp",
        "w": 690,
        "h": 453,
        "cap": "Price by Paris neighbourhood"
      },
      {
        "src": "media/airbnb/02.webp",
        "w": 589,
        "h": 453,
        "cap": "New hosts by year"
      },
      {
        "src": "media/airbnb/03.webp",
        "w": 571,
        "h": 453,
        "cap": "Average price by year"
      }
    ],
    "video": "media/airbnb/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "restaurant",
    "title": "Restaurant Order Analysis",
    "kick": "SQL analysis · MySQL, Python",
    "stack": [
      "MySQL",
      "SQL",
      "Python",
      "Plotly"
    ],
    "desc": "5,343 orders from a restaurant's first quarter of 2023. SQL questions answered with real results, busy-hour patterns, menu engineering (Stars, Plowhorses, Puzzles and Dogs) and which dishes are ordered together. 6 of 32 dishes are both cheap and rarely ordered.",
    "repo": "https://github.com/Scarface96/Restaurant-Order-Analysis",
    "cover": "media/restaurant/cover.webp",
    "gallery": [
      {
        "src": "media/restaurant/01.webp",
        "w": 1032,
        "h": 624,
        "cap": "Busy hours by weekday"
      },
      {
        "src": "media/restaurant/02.webp",
        "w": 1032,
        "h": 936,
        "cap": "Menu engineering: Stars, Plowhorses, Puzzles and Dogs"
      },
      {
        "src": "media/restaurant/03.webp",
        "w": 1032,
        "h": 640,
        "cap": "What goes with each dish"
      }
    ],
    "video": "media/restaurant/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/Restaurant-Order-Analysis/"
  },
  {
    "slug": "covid",
    "title": "COVID-19 Data Exploration",
    "kick": "SQL analysis · SQL Server, Python",
    "stack": [
      "T-SQL",
      "SQL Server",
      "Python",
      "Plotly"
    ],
    "desc": "COVID-19 cases, deaths and vaccinations worldwide, with a focus on South Africa: four waves, excess deaths suggesting the true toll was about three times the 102,595 reported, and vaccination by continent.",
    "repo": "https://github.com/Scarface96/covid-project",
    "cover": "media/covid/cover.webp",
    "gallery": [
      {
        "src": "media/covid/01.webp",
        "w": 1032,
        "h": 982,
        "cap": "South Africa's four waves"
      },
      {
        "src": "media/covid/02.webp",
        "w": 1032,
        "h": 895,
        "cap": "Excess deaths vs reported COVID deaths"
      },
      {
        "src": "media/covid/03.webp",
        "w": 1032,
        "h": 704,
        "cap": "Vaccination by continent"
      }
    ],
    "video": "media/covid/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/covid-project/"
  },
  {
    "slug": "customer",
    "title": "Customer Purchase Behaviour",
    "kick": "Analysis · in progress",
    "stack": [
      "Python"
    ],
    "desc": "An analysis of customer purchase behaviour. This repository is still in progress, with documentation and implementation to follow.",
    "repo": "https://github.com/Scarface96/Customer_purchase_behaviour",
    "cover": "media/customer/cover.webp",
    "gallery": [],
    "video": null,
    "vkind": null
  },
  {
    "slug": "ecommerce",
    "title": "E-commerce Landing Page",
    "kick": "Website · HTML, CSS, JS",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "Glide.js"
    ],
    "desc": "BlogShop, a multi-page store front with product listings, product details, a cart page and a Glide.js carousel.",
    "repo": "https://github.com/Scarface96/e-commerce-landing-page",
    "cover": "media/ecommerce/cover.webp",
    "gallery": [
      {
        "src": "media/ecommerce/01.webp",
        "w": 1400,
        "h": 875,
        "cap": "Landing page on desktop"
      },
      {
        "src": "media/ecommerce/02.webp",
        "w": 585,
        "h": 1266,
        "cap": "Landing page on mobile"
      }
    ],
    "video": "media/ecommerce/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "payroll",
    "title": "Payroll Web App",
    "kick": "Web app · JavaScript",
    "stack": [
      "JavaScript",
      "Bootstrap",
      "JSON"
    ],
    "desc": "Loads employees from JSON, takes hours worked and calculates monthly pay, with max, min, average and totals.",
    "repo": "https://github.com/Scarface96/payroll-web-app",
    "cover": "media/payroll/cover.webp",
    "gallery": [
      {
        "src": "media/payroll/01.webp",
        "w": 1200,
        "h": 769,
        "cap": "Payroll table with pay calculated"
      }
    ],
    "video": "media/payroll/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "todo",
    "title": "To-Do List",
    "kick": "Web app · JavaScript",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "desc": "A to-do list for adding tasks, marking them complete and deleting them.",
    "repo": "https://github.com/Scarface96/TO-DO-LIST-MAIN",
    "cover": "media/todo/cover.webp",
    "gallery": [
      {
        "src": "media/todo/01.webp",
        "w": 1200,
        "h": 338,
        "cap": "To-do list with four tasks"
      }
    ],
    "video": "media/todo/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "weatherweb",
    "title": "Weather Web App",
    "kick": "Web app · JavaScript",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "OpenWeatherMap"
    ],
    "desc": "A vanilla JavaScript weather card: search a city and see its temperature, humidity and wind speed from the OpenWeatherMap API, with an icon for the current conditions.",
    "repo": "https://github.com/Scarface96/weather-web-app",
    "cover": "media/weatherweb/cover.webp",
    "gallery": [
      {
        "src": "media/weatherweb/01.webp",
        "w": 590,
        "h": 762,
        "cap": "Result for Cape Town"
      }
    ],
    "video": "media/weatherweb/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "burger",
    "title": "Restaurant Burger House",
    "kick": "Website · HTML, CSS, JS",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "ScrollReveal"
    ],
    "desc": "Burger House, a restaurant landing page with specials, menu, events and contact sections, animated with ScrollReveal.",
    "repo": "https://github.com/Scarface96/Restaurant-burger-house",
    "cover": "media/burger/cover.webp",
    "gallery": [
      {
        "src": "media/burger/01.webp",
        "w": 1400,
        "h": 875,
        "cap": "Homepage on desktop"
      },
      {
        "src": "media/burger/02.webp",
        "w": 585,
        "h": 1266,
        "cap": "Homepage on mobile"
      }
    ],
    "video": "media/burger/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "lusagi",
    "title": "Lussagi Agency Website",
    "kick": "Website · HTML, CSS, JS",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "Font Awesome"
    ],
    "desc": "Lussagi, a digital agency site covering web design, SEO, hosting, digital marketing, ad campaigns and brand marketing.",
    "repo": "https://github.com/Scarface96/Lusagi-website",
    "cover": "media/lusagi/cover.webp",
    "gallery": [
      {
        "src": "media/lusagi/01.webp",
        "w": 1400,
        "h": 875,
        "cap": "Homepage on desktop"
      },
      {
        "src": "media/lusagi/02.webp",
        "w": 585,
        "h": 1266,
        "cap": "Homepage on mobile"
      }
    ],
    "video": "media/lusagi/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "bmi",
    "title": "BMI Calculator",
    "kick": "Web app · React",
    "stack": [
      "React",
      "JavaScript",
      "Jest"
    ],
    "desc": "Metric or imperial BMI with a measuring-tape scale for the WHO bands, the healthy weight range for your height, and a history of recent readings saved in the browser.",
    "repo": "https://github.com/Scarface96/bmi-calculator",
    "cover": "media/bmi/cover.webp",
    "gallery": [
      {
        "src": "media/bmi/01.webp",
        "w": 1200,
        "h": 750,
        "cap": "Result on the measuring-tape scale"
      },
      {
        "src": "media/bmi/02.webp",
        "w": 585,
        "h": 1266,
        "cap": "Imperial units and reading history on mobile"
      }
    ],
    "video": "media/bmi/video.mp4",
    "vkind": "recording",
    "live": "https://scarface96.github.io/bmi-calculator/"
  },
  {
    "slug": "clock",
    "title": "Analog Clock",
    "kick": "Web app · JavaScript",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "desc": "An analog clock with hour, minute and second hands driven by JavaScript.",
    "repo": "https://github.com/Scarface96/clock-app",
    "cover": "media/clock/cover.webp",
    "gallery": [
      {
        "src": "media/clock/01.webp",
        "w": 585,
        "h": 1266,
        "cap": "Analog clock"
      }
    ],
    "video": "media/clock/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "squid",
    "title": "Red Light, Green Light 3D Game",
    "kick": "3D game · Three.js",
    "stack": [
      "JavaScript",
      "Three.js",
      "GSAP"
    ],
    "desc": "A 3D take on Red Light, Green Light built with Three.js and GSAP, following a tutorial.",
    "repo": "https://github.com/Scarface96/squid-game",
    "cover": "media/squid/cover.webp",
    "gallery": [
      {
        "src": "media/squid/01.webp",
        "w": 1200,
        "h": 675,
        "cap": "Start screen with the 3D doll"
      },
      {
        "src": "media/squid/02.webp",
        "w": 1200,
        "h": 675,
        "cap": "Gameplay"
      }
    ],
    "video": "media/squid/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "adventure",
    "title": "Choose Your Adventure",
    "kick": "Terminal game · Python",
    "stack": [
      "Python"
    ],
    "desc": "A branching text adventure. Go right, cross the bridge and talk to the stranger to win the golden ticket.",
    "repo": "https://github.com/Scarface96/choose-adventure",
    "cover": "media/adventure/cover.webp",
    "gallery": [
      {
        "src": "media/adventure/01.webp",
        "w": 876,
        "h": 356,
        "cap": "Terminal session"
      }
    ],
    "video": "media/adventure/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "rps",
    "title": "Rock Paper Scissors",
    "kick": "Terminal game · Python",
    "stack": [
      "Python"
    ],
    "desc": "Rock Paper Scissors against the computer, keeping score until you quit.",
    "repo": "https://github.com/Scarface96/rock-paper-scissors",
    "cover": "media/rps/cover.webp",
    "gallery": [
      {
        "src": "media/rps/01.webp",
        "w": 876,
        "h": 513,
        "cap": "Terminal session"
      }
    ],
    "video": "media/rps/video.mp4",
    "vkind": "reel"
  }
];
