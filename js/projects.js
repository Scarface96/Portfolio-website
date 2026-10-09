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
      "scikit-learn"
    ],
    "desc": "Predicts which bank customers are likely to leave. Compares Logistic Regression with Random Forest, then tunes the decision threshold with ROC analysis, reaching 86% accuracy on 10,000 customer records.",
    "repo": "https://github.com/Scarface96/Bank-Customer-Churn-Classification",
    "cover": "media/churn/cover.webp",
    "gallery": [
      {
        "src": "media/churn/01.webp",
        "w": 567,
        "h": 453,
        "cap": "ROC curve, AUC 0.77"
      },
      {
        "src": "media/churn/02.webp",
        "w": 567,
        "h": 453,
        "cap": "Precision and recall by threshold"
      },
      {
        "src": "media/churn/03.webp",
        "w": 702,
        "h": 432,
        "cap": "Random forest feature importance"
      }
    ],
    "video": "media/churn/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "toy",
    "title": "Toy Store KPI Report",
    "kick": "Business intelligence · Power BI",
    "stack": [
      "Power BI",
      "DAX",
      "Data modelling"
    ],
    "desc": "Retail performance dashboard for a multi-store toy business. A star-schema model over 829K+ sales records with DAX measures for revenue, profit and drill-down analysis.",
    "repo": "https://github.com/Scarface96/Toy-Store-KPI-Report",
    "cover": "media/toy/cover.webp",
    "gallery": [
      {
        "src": "media/toy/01.webp",
        "w": 1200,
        "h": 640,
        "cap": "Monthly revenue across 50 stores"
      },
      {
        "src": "media/toy/02.webp",
        "w": 1200,
        "h": 507,
        "cap": "Revenue by product category"
      }
    ],
    "video": "media/toy/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "b2b",
    "title": "B2B Sales Pipeline CRM Dashboard",
    "kick": "Sales analytics · Excel",
    "stack": [
      "Excel",
      "PivotTables",
      "CRM analytics"
    ],
    "desc": "Interactive dashboard tracking the quarterly pipeline and agent performance across 8,800 opportunities, with manager and region slicers.",
    "repo": "https://github.com/Scarface96/B2B-Sales-Pipeline-CRM-Dashboard-for-TechSolutions-Inc.",
    "cover": "media/b2b/cover.webp",
    "gallery": [
      {
        "src": "media/b2b/01.webp",
        "w": 1200,
        "h": 560,
        "cap": "Won deal value by quarter"
      },
      {
        "src": "media/b2b/02.webp",
        "w": 1200,
        "h": 587,
        "cap": "Top 8 agents by won deal value"
      }
    ],
    "video": "media/b2b/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "co2",
    "title": "Global CO₂ Emissions Dashboard",
    "kick": "Data visualisation · Tableau",
    "stack": [
      "Tableau",
      "Data visualisation"
    ],
    "desc": "Long-run analysis of emissions across 278 countries from 1750 to 2021, using maps, trend lines and comparative views.",
    "repo": "https://github.com/Scarface96/Global-CO2-Emissions-Dashboard",
    "cover": "media/co2/cover.webp",
    "gallery": [
      {
        "src": "media/co2/01.webp",
        "w": 384,
        "h": 384,
        "cap": "Tableau dashboard preview"
      },
      {
        "src": "media/co2/02.webp",
        "w": 1200,
        "h": 640,
        "cap": "Global emissions, 1850 to 2021"
      },
      {
        "src": "media/co2/03.webp",
        "w": 1200,
        "h": 613,
        "cap": "Top 10 emitters in 2021"
      }
    ],
    "video": "media/co2/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "hr",
    "title": "HR Analytics Dashboard",
    "kick": "People analytics · Tableau",
    "stack": [
      "Tableau",
      "HR analytics"
    ],
    "desc": "Workforce dashboard on attrition across 1,470 employees, broken down by department, age, gender and education.",
    "repo": "https://github.com/Scarface96/HR-Analysis-Dashboard",
    "cover": "media/hr/cover.webp",
    "gallery": [
      {
        "src": "media/hr/01.webp",
        "w": 384,
        "h": 384,
        "cap": "Tableau HR dashboard"
      },
      {
        "src": "media/hr/02.webp",
        "w": 1200,
        "h": 480,
        "cap": "Attrition by department"
      },
      {
        "src": "media/hr/03.webp",
        "w": 1200,
        "h": 533,
        "cap": "Attrition by age band"
      }
    ],
    "video": "media/hr/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "retail",
    "title": "Retail Sales SQL Analysis",
    "kick": "SQL analysis · PostgreSQL",
    "stack": [
      "PostgreSQL",
      "SQL",
      "EDA"
    ],
    "desc": "Database setup, cleaning and exploratory analysis, then business KPI queries using CTEs and window functions.",
    "repo": "https://github.com/Scarface96/sql_retail_sales_p1",
    "cover": "media/retail/cover.webp",
    "gallery": [
      {
        "src": "media/retail/01.webp",
        "w": 1200,
        "h": 640,
        "cap": "Monthly retail sales"
      },
      {
        "src": "media/retail/02.webp",
        "w": 1200,
        "h": 373,
        "cap": "Sales by category"
      }
    ],
    "video": "media/retail/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "netflix",
    "title": "Netflix Clone",
    "kick": "Web app · React",
    "stack": [
      "React",
      "Tailwind CSS",
      "Firebase",
      "TMDB API"
    ],
    "desc": "A streaming-style React app with Firebase sign-in, live catalogue data from the TMDB API, and saved shows per user.",
    "repo": "https://github.com/Scarface96/netflix-clone",
    "cover": "media/netflix/cover.webp",
    "gallery": [],
    "video": null,
    "vkind": null
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
      "Axios",
      "styled-components",
      "REST API"
    ],
    "desc": "A React search interface for films, powered by the OMDb API with a debounced search box.",
    "repo": "https://github.com/Scarface96/movie-app",
    "cover": "media/movie/cover.webp",
    "gallery": [],
    "video": null,
    "vkind": null
  },
  {
    "slug": "weather",
    "title": "Weather React App",
    "kick": "Web app · React",
    "stack": [
      "React",
      "OpenWeatherMap",
      "Axios"
    ],
    "desc": "Search any city and get its current conditions using live data from the OpenWeatherMap API.",
    "repo": "https://github.com/Scarface96/weather-react-app",
    "cover": "media/weather/cover.webp",
    "gallery": [
      {
        "src": "media/weather/01.webp",
        "w": 508,
        "h": 551,
        "cap": "City search screen"
      },
      {
        "src": "media/weather/02.webp",
        "w": 508,
        "h": 637,
        "cap": "Result for Cape Town"
      }
    ],
    "video": "media/weather/video.mp4",
    "vkind": "reel"
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
    "kick": "SQL analysis · MySQL",
    "stack": [
      "MySQL",
      "SQL"
    ],
    "desc": "SQL analysis of a restaurant's menu and orders: the most and least ordered items, and what the highest-spending orders contain.",
    "repo": "https://github.com/Scarface96/Restaurant-Order-Analysis",
    "cover": "media/restaurant/cover.webp",
    "gallery": [
      {
        "src": "media/restaurant/01.webp",
        "w": 1200,
        "h": 640,
        "cap": "Most and least ordered items"
      },
      {
        "src": "media/restaurant/02.webp",
        "w": 1200,
        "h": 480,
        "cap": "Highest-spending orders by cuisine"
      }
    ],
    "video": "media/restaurant/video.mp4",
    "vkind": "reel"
  },
  {
    "slug": "covid",
    "title": "COVID-19 Data Exploration",
    "kick": "SQL analysis · SQL Server",
    "stack": [
      "T-SQL",
      "SQL Server"
    ],
    "desc": "SQL exploration of global COVID-19 data: death rates, infection rates relative to population, and country and continent rankings.",
    "repo": "https://github.com/Scarface96/covid-project",
    "cover": "media/covid/cover.webp",
    "gallery": [],
    "video": null,
    "vkind": null
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
      "CSS"
    ],
    "desc": "Takes weight and height and shows the BMI result with a matching illustration.",
    "repo": "https://github.com/Scarface96/bmi-calculator",
    "cover": "media/bmi/cover.webp",
    "gallery": [
      {
        "src": "media/bmi/01.webp",
        "w": 486,
        "h": 778,
        "cap": "BMI result of 30.4"
      }
    ],
    "video": "media/bmi/video.mp4",
    "vkind": "reel"
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
