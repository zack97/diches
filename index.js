const express = require("express");
const crypto = require("crypto");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const secureKey = crypto.randomBytes(32).toString("hex");

console.log(secureKey);

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.body.api_key;
  const secretKey = process.env.SECRET_KEY;
  if (apiKey && apiKey === secretKey) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

app.use(express.json());
app.use(apiKeyMiddleware);

const dishes = [
  {
    name: "Spaghetti Carbonara",
    timeToPrepare: "30 minutes",
    ingredients: [
      "Spaghetti",
      "Eggs",
      "Bacon",
      "Parmesan cheese",
      "Garlic",
      "Black pepper",
    ],
    steps: [
      "Cook spaghetti according to package instructions.",
      "Fry bacon until crispy.",
      "Whisk eggs, garlic, and cheese together.",
      "Mix everything together and serve.",
    ],
  },
  {
    name: "Chicken Curry",
    timeToPrepare: "45 minutes",
    ingredients: [
      "Chicken",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Spices",
      "Coconut milk",
    ],
    steps: [
      "Saute onion, ginger, and garlic.",
      "Add chicken and cook until browned.",
      "Add tomatoes and spices, cook until soft.",
      "Pour in coconut milk, simmer until chicken is cooked through.",
    ],
  },
  {
    name: "Caesar Salad",
    timeToPrepare: "15 minutes",
    ingredients: [
      "Romaine lettuce",
      "Croutons",
      "Parmesan cheese",
      "Caesar dressing",
    ],
    steps: [
      "Wash and chop lettuce.",
      "Add croutons and cheese.",
      "Toss with Caesar dressing.",
      "Serve immediately.",
    ],
  },
  {
    name: "Chocolate Cake",
    timeToPrepare: "1 hour",
    ingredients: [
      "Flour",
      "Sugar",
      "Cocoa powder",
      "Eggs",
      "Milk",
      "Butter",
      "Vanilla extract",
    ],
    steps: [
      "Mix dry ingredients.",
      "Add wet ingredients and mix until smooth.",
      "Bake in preheated oven.",
      "Let cool and serve.",
    ],
  },
];

app.get("/", (req, res) => {
  res.json(dishes);
});

dishes.forEach((dish, index) => {
  app.get(`/dish${index}`, (req, res) => {
    res.json(dish);
  });
});

app.get("/info", (req, res) => {
  res.send(
    'Welcome to the Recipe API! Here are the available endpoints:\n\n- GET /: Get the list of all dishes\n- GET /dish{index}: Get details of a specific dish\n\nTo access the API, include your API key in the request body as "api_key".'
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
