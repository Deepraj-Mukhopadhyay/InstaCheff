/**
 * Home Page JavaScript for InstaChef App
 */

// Recipe data database
const recipeDatabase = {
    "Chicken Caprese": {
        image: "../images/Home page dishes/Chicken Caprese.webp",
        description: "A delightful fusion of classic Italian Caprese salad with tender grilled chicken, creating a perfect harmony of fresh flavors and textures.",
        cookTime: "25 mins",
        difficulty: "Easy",
        servings: "4 servings",
        ingredients: [
            "4 boneless, skinless chicken breasts (6-8 oz each)",
            "2 large heirloom tomatoes, sliced 1/4-inch thick",
            "8 oz fresh mozzarella di bufala, sliced",
            "1/4 cup fresh basil leaves",
            "3 tbsp high-quality balsamic glaze",
            "2 tbsp extra virgin olive oil",
            "1 tsp kosher salt",
            "1/2 tsp freshly ground black pepper",
            "3 cloves garlic, minced",
            "1 tbsp fresh lemon juice"
        ],
        instructions: [
            "Pound chicken breasts to even 3/4-inch thickness. Season with salt, pepper, and minced garlic. Marinate for 20 minutes at room temperature.",
            "Heat olive oil in a cast-iron skillet over medium-high heat until shimmering.",
            "Cook chicken breasts for 6-7 minutes per side until internal temperature reaches 165°F (74°C) and juices run clear.",
            "Remove chicken and tent with foil. Let rest for 5 minutes to redistribute juices.",
            "Slice chicken diagonally into 1/2-inch thick pieces.",
            "On a large platter, arrange chicken slices alternating with tomato and mozzarella slices in an overlapping pattern.",
            "Drizzle with lemon juice, then balsamic glaze. Scatter fresh basil leaves over the top.",
            "Finish with a light drizzle of olive oil and freshly cracked black pepper. Serve immediately."
        ],
        tips: "Use San Marzano tomatoes for the best flavor. Buffalo mozzarella is creamier than regular mozzarella. Let chicken rest to retain moisture and prevent dryness.",
        nutrition: {
            calories: "340",
            protein: "38g",
            carbs: "9g",
            fat: "18g"
        }
    },
    "Spicy Garlic Noodles": {
        image: "../images/Home page dishes/Spicy garlic Noodles.webp",
        description: "Fiery Asian-inspired noodles wok-tossed in an aromatic garlic sauce with the perfect balance of heat and umami flavors.",
        cookTime: "18 mins",
        difficulty: "Easy",
        servings: "4 servings",
        ingredients: [
            "1 lb fresh Chinese egg noodles (or 12 oz dried)",
            "8 cloves garlic, minced",
            "2 tbsp chili garlic sauce (like Huy Fong)",
            "3 tbsp low-sodium soy sauce",
            "2 tbsp oyster sauce",
            "1 tbsp dark soy sauce (for color)",
            "2 tsp sesame oil",
            "4 green onions, sliced diagonally",
            "1-2 tsp red pepper flakes (adjust to taste)",
            "3 tbsp peanut or vegetable oil",
            "1 tsp sugar",
            "1/4 cup fresh cilantro, chopped",
            "White sesame seeds for garnish"
        ],
        instructions: [
            "Cook noodles in boiling salted water until just tender (2-3 minutes for fresh, follow package for dried). Reserve 3/4 cup cooking water, then drain.",
            "In a small bowl, whisk together soy sauce, oyster sauce, dark soy sauce, sesame oil, and sugar.",
            "Heat peanut oil in a large wok or skillet over high heat until smoking.",
            "Add minced garlic and red pepper flakes, stir-fry for 15-20 seconds until fragrant but not browned.",
            "Add chili garlic sauce and stir for 10 seconds.",
            "Add drained noodles and toss vigorously with tongs for 1 minute.",
            "Pour in sauce mixture and toss until noodles are evenly coated.",
            "Add a splash of reserved noodle water if mixture seems dry.",
            "Remove from heat, add green onions and cilantro, toss once more.",
            "Serve immediately, garnished with sesame seeds and extra green onions."
        ],
        tips: "High heat is essential for wok hei (breath of the wok). Don't let garlic burn or it will turn bitter. Fresh noodles work best but dried lo mein noodles are a good substitute.",
        nutrition: {
            calories: "385",
            protein: "14g",
            carbs: "62g",
            fat: "11g"
        }
    },
    "Avocado Toast": {
        image: "../images/Home page dishes/Avocardo Toast.webp",
        description: "Creamy avocado spread on perfectly toasted bread, topped with fresh ingredients for a nutritious and delicious meal.",
        cookTime: "10 mins",
        difficulty: "Easy",
        servings: "2 servings",
        ingredients: [
            "2 slices whole grain bread",
            "1 large ripe avocado",
            "1 tbsp lime juice",
            "2 cherry tomatoes, halved",
            "1 tbsp olive oil",
            "Salt and pepper to taste",
            "Red pepper flakes (optional)",
            "Hemp seeds or everything bagel seasoning"
        ],
        instructions: [
            "Toast bread slices until golden brown and crispy.",
            "Cut avocado in half, remove pit, and scoop flesh into a bowl.",
            "Mash avocado with lime juice, salt, and pepper until desired consistency.",
            "Spread mashed avocado evenly on toasted bread.",
            "Top with halved cherry tomatoes.",
            "Drizzle with olive oil and sprinkle with red pepper flakes.",
            "Finish with hemp seeds or everything bagel seasoning.",
            "Serve immediately for best texture."
        ],
        tips: "Choose ripe but firm avocados. Add lime juice immediately to prevent browning. Customize with your favorite toppings!",
        nutrition: {
            calories: "280",
            protein: "8g",
            carbs: "22g",
            fat: "20g"
        }
    },
    "Butter Paneer Masala": {
        image: "../images/Home page dishes/Butter Paneer Masala.webp",
        description: "Rich and creamy Indian curry featuring soft paneer cubes in a luscious tomato-based sauce with aromatic spices.",
        cookTime: "35 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "400g paneer, cubed",
            "3 large tomatoes, chopped",
            "1 large onion, chopped",
            "3 tbsp butter",
            "1/2 cup heavy cream",
            "2 tsp ginger-garlic paste",
            "1 tsp garam masala",
            "1 tsp cumin powder",
            "1/2 tsp turmeric",
            "1 tsp red chili powder",
            "Salt to taste",
            "Fresh cilantro for garnish"
        ],
        instructions: [
            "Heat 1 tbsp butter in a pan and lightly fry paneer cubes until golden. Set aside.",
            "In the same pan, sauté onions until golden brown.",
            "Add ginger-garlic paste and cook for 1 minute.",
            "Add tomatoes and cook until they break down completely.",
            "Add all spices and cook for 2-3 minutes until fragrant.",
            "Blend the mixture to a smooth paste and strain if desired.",
            "Return to pan, add remaining butter and cream.",
            "Add fried paneer and simmer for 5-7 minutes.",
            "Garnish with cilantro and serve with rice or naan."
        ],
        tips: "Don't overcook paneer as it can become rubbery. For richer flavor, use cashew paste along with cream.",
        nutrition: {
            calories: "420",
            protein: "18g",
            carbs: "12g",
            fat: "35g"
        }
    },
    "Chicken Burger": {
        image: "../images/Home page dishes/Chicken Burger.webp",
        description: "Juicy grilled chicken burger with fresh lettuce, tomatoes, and special sauce on a toasted bun.",
        cookTime: "20 mins",
        difficulty: "Easy",
        servings: "2 servings",
        ingredients: [
            "2 chicken breast fillets",
            "2 burger buns",
            "2 lettuce leaves",
            "2 tomato slices",
            "2 tbsp mayonnaise",
            "1 tbsp olive oil",
            "Salt and pepper to taste",
            "1 tsp garlic powder"
        ],
        instructions: [
            "Season chicken with salt, pepper, and garlic powder.",
            "Heat olive oil in a pan over medium-high heat.",
            "Cook chicken for 6-7 minutes each side until golden.",
            "Toast burger buns lightly.",
            "Spread mayonnaise on both bun halves.",
            "Layer lettuce, chicken, and tomato.",
            "Serve immediately while hot."
        ],
        tips: "For extra flavor, marinate chicken for 30 minutes before cooking.",
        nutrition: {
            calories: "450",
            protein: "32g",
            carbs: "28g",
            fat: "22g"
        }
    },
    "Chilli Chicken": {
        image: "../images/Home page dishes/Chilli Chiken Gravy.webp",
        description: "Spicy Indo-Chinese chicken dish with bell peppers and onions in a flavorful sauce.",
        cookTime: "30 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "500g chicken, cut into pieces",
            "1 bell pepper, diced",
            "1 onion, diced",
            "3 green chilies, chopped",
            "2 tbsp soy sauce",
            "1 tbsp chili sauce",
            "1 tbsp cornstarch",
            "2 tbsp oil",
            "Salt to taste",
            "Spring onions for garnish"
        ],
        instructions: [
            "Marinate chicken with soy sauce, salt, and cornstarch for 15 minutes.",
            "Heat oil in a wok over high heat.",
            "Stir-fry chicken until golden brown.",
            "Add onions and bell peppers, cook for 3 minutes.",
            "Add green chilies and chili sauce.",
            "Toss everything together for 2 minutes.",
            "Garnish with spring onions and serve hot."
        ],
        tips: "Use high heat for authentic wok-style cooking. Adjust chilies according to spice preference.",
        nutrition: {
            calories: "380",
            protein: "28g",
            carbs: "12g",
            fat: "24g"
        }
    },
    "Pasta Carbonara": {
        image: "../images/Home page dishes/Pasta Crbonara.webp",
        description: "Classic Italian pasta with eggs, cheese, pancetta, and black pepper creating a creamy sauce.",
        cookTime: "20 mins",
        difficulty: "Medium",
        servings: "3 servings",
        ingredients: [
            "300g spaghetti",
            "100g pancetta, diced",
            "3 large eggs",
            "1 cup Parmesan cheese, grated",
            "2 cloves garlic, minced",
            "Black pepper to taste",
            "Salt for pasta water",
            "2 tbsp olive oil"
        ],
        instructions: [
            "Cook spaghetti in salted boiling water until al dente.",
            "In a pan, cook pancetta until crispy.",
            "Beat eggs with Parmesan cheese and black pepper.",
            "Reserve 1 cup pasta water, then drain pasta.",
            "Add hot pasta to pancetta, toss quickly.",
            "Remove from heat, add egg mixture while tossing.",
            "Add pasta water if needed for creaminess.",
            "Serve immediately with extra Parmesan."
        ],
        tips: "Work quickly when adding eggs to prevent scrambling. The residual heat cooks the eggs perfectly.",
        nutrition: {
            calories: "520",
            protein: "24g",
            carbs: "55g",
            fat: "22g"
        }
    },
    "Butter Chicken": {
        image: "../images/Home page dishes/Butter Chicken.webp",
        description: "Creamy and rich Indian curry with tender chicken in a smooth tomato-based sauce.",
        cookTime: "45 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "500g chicken, cut into pieces",
            "1 cup heavy cream",
            "3 tomatoes, chopped",
            "1 onion, chopped",
            "3 tbsp butter",
            "2 tsp ginger-garlic paste",
            "1 tsp garam masala",
            "1 tsp turmeric",
            "1 tsp red chili powder",
            "Salt to taste",
            "Fresh cilantro"
        ],
        instructions: [
            "Marinate chicken with yogurt and spices for 30 minutes.",
            "Cook chicken in a pan until done, set aside.",
            "Sauté onions until golden, add ginger-garlic paste.",
            "Add tomatoes and spices, cook until soft.",
            "Blend mixture to smooth paste.",
            "Return to pan, add cream and butter.",
            "Add cooked chicken and simmer for 10 minutes.",
            "Garnish with cilantro and serve with rice."
        ],
        tips: "For authentic flavor, use kasoori methi (dried fenugreek leaves) as garnish.",
        nutrition: {
            calories: "480",
            protein: "32g",
            carbs: "8g",
            fat: "36g"
        }
    },
    "Dal Makhani": {
        image: "../images/Home page dishes/Dal Makhai.webp",
        description: "Rich and creamy black lentil curry slow-cooked with butter and cream.",
        cookTime: "60 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "1 cup black lentils (urad dal)",
            "1/4 cup kidney beans",
            "3 tbsp butter",
            "1/2 cup heavy cream",
            "2 tomatoes, chopped",
            "1 onion, chopped",
            "2 tsp ginger-garlic paste",
            "1 tsp cumin seeds",
            "1 tsp garam masala",
            "Salt to taste"
        ],
        instructions: [
            "Soak lentils and kidney beans overnight.",
            "Pressure cook with water and salt until soft.",
            "Heat butter, add cumin seeds and onions.",
            "Add ginger-garlic paste and tomatoes.",
            "Add cooked lentils and simmer for 30 minutes.",
            "Add cream and garam masala.",
            "Simmer until thick and creamy.",
            "Serve hot with naan or rice."
        ],
        tips: "Slow cooking is key for authentic flavor. The longer it cooks, the better it tastes.",
        nutrition: {
            calories: "380",
            protein: "18g",
            carbs: "42g",
            fat: "16g"
        }
    },
    "Chicken Biryani": {
        image: "../images/Home page dishes/Chicken Biriyani.webp",
        description: "Aromatic basmati rice layered with spiced chicken and cooked to perfection.",
        cookTime: "90 mins",
        difficulty: "Hard",
        servings: "6 servings",
        ingredients: [
            "500g chicken, cut into pieces",
            "2 cups basmati rice",
            "4 cups water",
            "1 cup yogurt",
            "2 onions, sliced and fried",
            "2 tsp biryani masala",
            "1 tsp turmeric",
            "Whole spices (bay leaves, cardamom, cinnamon)",
            "Saffron soaked in milk",
            "Ghee and oil"
        ],
        instructions: [
            "Marinate chicken with yogurt, biryani masala, and salt.",
            "Parboil rice with whole spices until 70% cooked.",
            "Cook marinated chicken until tender.",
            "Layer rice and chicken alternately in a heavy-bottomed pot.",
            "Sprinkle fried onions and saffron milk on top.",
            "Cover with foil, then lid, and cook on high heat for 3 minutes.",
            "Reduce heat to low and cook for 45 minutes.",
            "Let it rest for 10 minutes before serving."
        ],
        tips: "Use aged basmati rice for best results. The dum cooking method is crucial for authentic biryani.",
        nutrition: {
            calories: "650",
            protein: "35g",
            carbs: "78g",
            fat: "18g"
        }
    },
    "Shrimp Scampi": {
        image: "../images/Home page dishes/Shrimp Scampi.webp",
        description: "Classic Italian-American dish featuring succulent shrimp sautéed in garlic, white wine, and butter, finished with fresh herbs and lemon.",
        cookTime: "20 mins",
        difficulty: "Easy",
        servings: "4 servings",
        ingredients: [
            "1.5 lbs large shrimp (21-25 count), peeled and deveined",
            "1 lb linguine or spaghetti",
            "6 cloves garlic, minced",
            "1/2 cup dry white wine (Pinot Grigio or Sauvignon Blanc)",
            "4 tbsp unsalted butter",
            "3 tbsp extra virgin olive oil",
            "1/4 cup fresh lemon juice (about 2 lemons)",
            "1/4 cup fresh parsley, chopped",
            "1/2 tsp red pepper flakes",
            "1 tsp kosher salt",
            "1/2 tsp black pepper",
            "1/2 cup freshly grated Parmigiano-Reggiano",
            "Lemon wedges for serving"
        ],
        instructions: [
            "Bring a large pot of salted water to boil. Cook pasta according to package directions until al dente. Reserve 1 cup pasta water, then drain.",
            "Pat shrimp dry and season with salt and pepper.",
            "Heat olive oil in a large skillet over medium-high heat.",
            "Add shrimp in a single layer and cook 1-2 minutes per side until pink and just cooked through. Remove shrimp to a plate.",
            "In the same skillet, add minced garlic and red pepper flakes. Sauté for 30 seconds until fragrant.",
            "Add white wine and simmer for 2 minutes, allowing alcohol to cook off.",
            "Add butter and lemon juice, whisking to create a silky sauce.",
            "Return cooked pasta to the skillet with 1/4 cup pasta water. Toss to combine.",
            "Add shrimp back to pan and toss gently. Add more pasta water if needed for consistency.",
            "Remove from heat, add parsley and half the Parmesan. Toss once more.",
            "Serve immediately with remaining Parmesan, lemon wedges, and freshly cracked pepper."
        ],
        tips: "Don't overcook the shrimp - they should be pink and slightly firm. Use good quality white wine that you'd drink. Fresh lemon juice is essential for bright flavor.",
        nutrition: {
            calories: "520",
            protein: "42g",
            carbs: "88g",
            fat: "8g"
        }
    },
    "Vegetarian Chili": {
        image: "../images/Home page dishes/vegetarian Chilli.webp",
        description: "Hearty and satisfying plant-based chili loaded with beans, vegetables, and warming spices that deliver rich, complex flavors.",
        cookTime: "45 mins",
        difficulty: "Easy",
        servings: "6 servings",
        ingredients: [
            "2 tbsp olive oil",
            "1 large yellow onion, diced",
            "1 red bell pepper, diced",
            "1 green bell pepper, diced",
            "3 cloves garlic, minced",
            "2 tbsp tomato paste",
            "2 tsp chili powder",
            "1 tsp ground cumin",
            "1 tsp smoked paprika",
            "1/2 tsp oregano",
            "1/4 tsp cayenne pepper (optional)",
            "1 can (28 oz) crushed tomatoes",
            "1 can (15 oz) black beans, drained and rinsed",
            "1 can (15 oz) kidney beans, drained and rinsed",
            "1 can (15 oz) pinto beans, drained and rinsed",
            "1 cup vegetable broth",
            "1 tsp salt",
            "1/2 tsp black pepper",
            "1 tbsp dark chocolate chips (optional, for richness)",
            "2 tbsp fresh lime juice",
            "Fresh cilantro, diced avocado, and sour cream for serving"
        ],
        instructions: [
            "Heat olive oil in a large Dutch oven or heavy pot over medium heat.",
            "Add diced onion and bell peppers. Cook for 5-7 minutes until softened.",
            "Add minced garlic and cook for 1 minute until fragrant.",
            "Stir in tomato paste and cook for 2 minutes, stirring constantly.",
            "Add chili powder, cumin, paprika, oregano, and cayenne. Cook for 30 seconds until fragrant.",
            "Add crushed tomatoes, all beans, vegetable broth, salt, and pepper.",
            "Bring to a boil, then reduce heat to low and simmer for 25-30 minutes, stirring occasionally.",
            "Stir in chocolate chips (if using) and lime juice during the last 5 minutes.",
            "Taste and adjust seasoning with salt, pepper, or more spices as needed.",
            "Let stand for 5 minutes to thicken before serving.",
            "Serve hot with desired toppings: cilantro, avocado, sour cream, cheese, or cornbread."
        ],
        tips: "For deeper flavor, let chili rest overnight and reheat. Add chocolate for richness without sweetness. Adjust spice level with more or less cayenne.",
        nutrition: {
            calories: "280",
            protein: "15g",
            carbs: "45g",
            fat: "6g"
        }
    },
    "Chicken Tikka Masala": {
        image: "../images/Home page dishes/CHicken tikka masala.webp",
        description: "Britain's favorite curry featuring tender marinated chicken in a rich, creamy tomato-based sauce with aromatic Indian spices.",
        cookTime: "60 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "For the chicken:",
            "1.5 lbs boneless chicken, cut into 1-inch cubes",
            "1 cup plain Greek yogurt",
            "2 tsp garam masala",
            "1 tsp ground cumin",
            "1 tsp ground coriander",
            "1/2 tsp turmeric",
            "1/2 tsp cayenne pepper",
            "3 cloves garlic, minced",
            "1 inch fresh ginger, grated",
            "1 tsp salt",
            "For the sauce:",
            "2 tbsp ghee or butter",
            "1 large onion, finely chopped",
            "4 cloves garlic, minced",
            "1 inch fresh ginger, grated",
            "2 tsp garam masala",
            "1 tsp ground cumin",
            "1 tsp smoked paprika",
            "1 can (28 oz) crushed tomatoes",
            "1 cup heavy cream",
            "2 tbsp tomato paste",
            "1 tsp salt",
            "1/2 tsp sugar",
            "Fresh cilantro and basmati rice for serving"
        ],
        instructions: [
            "Marinate chicken: Combine yogurt, garam masala, cumin, coriander, turmeric, cayenne, garlic, ginger, and salt. Add chicken and marinate for at least 30 minutes or up to 4 hours.",
            "Heat a grill pan or skillet over medium-high heat. Cook marinated chicken for 3-4 minutes per side until charred and cooked through. Set aside.",
            "For sauce: Heat ghee in a large pan over medium heat. Add onion and cook until golden, about 8 minutes.",
            "Add garlic and ginger, cook for 1 minute until fragrant.",
            "Add garam masala, cumin, and paprika. Cook for 30 seconds.",
            "Stir in tomato paste and cook for 2 minutes.",
            "Add crushed tomatoes, salt, and sugar. Simmer for 15 minutes until thickened.",
            "Use an immersion blender to blend sauce until smooth (or transfer to regular blender).",
            "Stir in heavy cream and simmer for 5 minutes.",
            "Add cooked chicken and simmer for 5 more minutes to heat through.",
            "Taste and adjust seasoning. Garnish with fresh cilantro.",
            "Serve hot over basmati rice with naan bread."
        ],
        tips: "Marinating longer develops more flavor. For authentic taste, use kasoori methi (dried fenugreek leaves). Adjust cream for desired richness.",
        nutrition: {
            calories: "480",
            protein: "36g",
            carbs: "15g",
            fat: "32g"
        }
    },
    "Palak Paneer": {
        image: "../images/Home page dishes/Palak paneer.webp",
        description: "Classic North Indian curry featuring soft paneer cubes in a vibrant, creamy spinach gravy spiced with traditional Indian aromatics.",
        cookTime: "35 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "1 lb fresh spinach leaves, washed and chopped",
            "400g paneer, cut into 1-inch cubes",
            "2 medium onions, chopped",
            "4 cloves garlic, minced",
            "1 inch fresh ginger, grated",
            "2 green chilies, slit lengthwise",
            "1 large tomato, chopped",
            "3 tbsp ghee or oil",
            "1 tsp cumin seeds",
            "1 tsp garam masala",
            "1/2 tsp turmeric powder",
            "1 tsp coriander powder",
            "1/2 cup heavy cream",
            "1 tsp salt (or to taste)",
            "1/2 tsp kasoori methi (dried fenugreek leaves)",
            "Fresh ginger julienne for garnish"
        ],
        instructions: [
            "Blanch spinach in boiling water for 2 minutes, then immediately transfer to ice water. Drain and puree until smooth.",
            "Heat 2 tbsp ghee in a pan, lightly fry paneer cubes until golden. Set aside.",
            "In the same pan, add remaining ghee and cumin seeds. Let them splutter.",
            "Add chopped onions and sauté until golden brown, about 6-8 minutes.",
            "Add garlic, ginger, and green chilies. Cook for 2 minutes.",
            "Add chopped tomato and cook until soft and mushy, about 5 minutes.",
            "Add turmeric, coriander powder, and half the garam masala. Cook for 1 minute.",
            "Add the spinach puree and mix well. Cook for 5 minutes on medium heat.",
            "Add cream and salt. Simmer for 3-4 minutes.",
            "Gently add the fried paneer and mix carefully to avoid breaking.",
            "Simmer for 5 minutes, allowing paneer to absorb flavors.",
            "Crush kasoori methi between palms and add along with remaining garam masala.",
            "Garnish with ginger julienne and serve hot with rice or naan."
        ],
        tips: "Don't overcook spinach to retain its bright green color. Add paneer at the end to prevent it from becoming tough. Fresh spinach gives the best flavor.",
        nutrition: {
            calories: "380",
            protein: "22g",
            carbs: "12g",
            fat: "28g"
        }
    },
    "Rajma Cury": {
        image: "../images/Home page dishes/Rajma Cury.webp",
        description: "Hearty Punjabi kidney bean curry in a rich, spiced tomato gravy - a beloved comfort food from North India perfect with rice.",
        cookTime: "90 mins",
        difficulty: "Medium",
        servings: "6 servings",
        ingredients: [
            "2 cups dried rajma (kidney beans), soaked overnight",
            "2 large onions, finely chopped",
            "4 large tomatoes, chopped",
            "1 tbsp ginger-garlic paste",
            "2 green chilies, slit",
            "3 tbsp ghee or oil",
            "1 tsp cumin seeds",
            "2 bay leaves",
            "1 black cardamom",
            "1 inch cinnamon stick",
            "2 tsp coriander powder",
            "1 tsp red chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp garam masala powder",
            "1 tsp salt (or to taste)",
            "1 tsp sugar",
            "2 tbsp fresh cream (optional)",
            "Fresh cilantro for garnish",
            "4-5 cups water for cooking beans"
        ],
        instructions: [
            "Drain soaked rajma and pressure cook with 4 cups water and 1 tsp salt for 15-20 minutes until very soft. Reserve cooking liquid.",
            "Heat ghee in a heavy-bottomed pan. Add cumin seeds, bay leaves, cardamom, and cinnamon. Let them splutter.",
            "Add chopped onions and sauté until golden brown, about 8-10 minutes.",
            "Add ginger-garlic paste and green chilies. Cook for 2 minutes until fragrant.",
            "Add chopped tomatoes and cook until they break down completely, about 10 minutes.",
            "Add coriander powder, red chili powder, turmeric, and half the garam masala. Cook for 2 minutes.",
            "Mash half the cooked rajma and add all beans to the pan along with 2 cups of the reserved cooking liquid.",
            "Add salt and sugar. Bring to a boil, then simmer on low heat for 20-25 minutes until thick and creamy.",
            "Stir occasionally and add more cooking liquid if needed to maintain consistency.",
            "Add remaining garam masala and cream (if using) in the last 5 minutes.",
            "Mash some beans against the side of the pan to thicken the curry.",
            "Garnish with fresh cilantro and serve hot with steamed basmati rice."
        ],
        tips: "Soaking beans overnight is essential. Cook until very soft for authentic texture. The curry tastes better the next day as flavors develop.",
        nutrition: {
            calories: "320",
            protein: "18g",
            carbs: "48g",
            fat: "8g"
        }
    },
    "Rogan Josh": {
        image: "../images/Home page dishes/Rogan Josh.webp",
        description: "Aromatic Kashmiri lamb curry with a rich, deep red gravy infused with traditional spices like fennel, cardamom, and Kashmiri chilies.",
        cookTime: "120 mins",
        difficulty: "Hard",
        servings: "4 servings",
        ingredients: [
            "2 lbs lamb shoulder, cut into 2-inch pieces",
            "1 cup plain yogurt, whisked",
            "2 large onions, thinly sliced",
            "1 tbsp ginger-garlic paste",
            "4 tbsp ghee or mustard oil",
            "2 black cardamom pods",
            "4 green cardamom pods",
            "2 bay leaves",
            "1 inch cinnamon stick",
            "1 tsp fennel powder",
            "2 tsp Kashmiri red chili powder",
            "1 tsp regular chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp garam masala powder",
            "1 tsp salt (or to taste)",
            "1/2 tsp asafoetida (hing)",
            "1 cup warm water",
            "Fresh mint leaves for garnish",
            "Saffron soaked in 2 tbsp warm milk"
        ],
        instructions: [
            "Marinate lamb pieces with half the yogurt and salt for 30 minutes.",
            "Heat ghee in a heavy-bottomed pot over medium-high heat.",
            "Add marinated lamb and brown on all sides, about 8-10 minutes. Remove and set aside.",
            "In the same pot, fry sliced onions until deep golden brown. Remove and drain on paper towels.",
            "Add whole spices (cardamom, bay leaves, cinnamon) to the remaining oil and let them splutter.",
            "Add ginger-garlic paste and cook for 1 minute until fragrant.",
            "Add browned lamb back to the pot and mix well.",
            "Add fennel powder, Kashmiri chili powder, regular chili powder, and turmeric. Cook for 2 minutes.",
            "Add remaining yogurt gradually, stirring continuously to prevent curdling.",
            "Add fried onions (reserve some for garnish), asafoetida, and warm water.",
            "Bring to a boil, then reduce heat to low, cover, and simmer for 1.5-2 hours until meat is tender.",
            "Stir occasionally and add water if needed to prevent sticking.",
            "Add garam masala in the last 10 minutes of cooking.",
            "Garnish with reserved fried onions, mint leaves, and saffron milk.",
            "Serve hot with steamed basmati rice or naan."
        ],
        tips: "Authentic Rogan Josh gets its red color from Kashmiri chilies, not tomatoes. Slow cooking is key for tender meat. Use mustard oil for traditional flavor.",
        nutrition: {
            calories: "520",
            protein: "45g",
            carbs: "8g",
            fat: "34g"
        }
    },
    "Chole": {
        image: "../images/Home page dishes/Chole.webp",
        description: "Popular Punjabi chickpea curry with bold spices, tangy flavors, and robust gravy - perfect with bhature or rice.",
        cookTime: "75 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "2 cups dried chickpeas, soaked overnight",
            "2 large onions, finely chopped",
            "4 large tomatoes, chopped",
            "1 tbsp ginger-garlic paste",
            "2 green chilies, slit",
            "3 tbsp oil or ghee",
            "1 tsp cumin seeds",
            "2 bay leaves",
            "1 black cardamom",
            "1 inch cinnamon stick",
            "2 tsp chole masala powder",
            "1 tsp coriander powder",
            "1 tsp red chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp garam masala powder",
            "2 tsp dried pomegranate seeds (anardana), crushed",
            "1 tsp salt (or to taste)",
            "1 tsp sugar",
            "2 black tea bags (for color)",
            "Fresh cilantro and ginger julienne for garnish",
            "1 large onion, thinly sliced for garnish"
        ],
        instructions: [
            "Pressure cook soaked chickpeas with tea bags, 1 tsp salt, and 4 cups water for 20 minutes until very soft. Discard tea bags, reserve liquid.",
            "Heat oil in a heavy pan. Add cumin seeds, bay leaves, cardamom, and cinnamon. Let splutter.",
            "Add chopped onions and cook until golden brown, about 10 minutes.",
            "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
            "Add chopped tomatoes and cook until completely broken down, about 8-10 minutes.",
            "Add chole masala, coriander powder, red chili powder, and turmeric. Cook for 2 minutes.",
            "Add cooked chickpeas along with 1.5 cups of cooking liquid.",
            "Add crushed anardana, salt, and sugar. Bring to a boil.",
            "Simmer on medium heat for 15-20 minutes, mashing some chickpeas to thicken gravy.",
            "Add garam masala in the last 5 minutes. Adjust consistency with more cooking liquid if needed.",
            "Let it rest for 5 minutes for flavors to develop.",
            "Garnish with fresh cilantro, ginger julienne, and raw onion slices.",
            "Serve hot with bhature, kulcha, or steamed rice."
        ],
        tips: "Tea bags give authentic dark color. Anardana (pomegranate seeds) adds essential tanginess. Mash some chickpeas for proper thick consistency.",
        nutrition: {
            calories: "290",
            protein: "16g",
            carbs: "44g",
            fat: "8g"
        }
    },
    "Malai Kofta": {
        image: "../images/Home page dishes/Malai Kofta.webp",
        description: "Decadent vegetarian dish featuring fried paneer and potato dumplings in a rich, creamy tomato-cashew gravy.",
        cookTime: "60 mins",
        difficulty: "Hard",
        servings: "4 servings",
        ingredients: [
            "For koftas:",
            "200g paneer, grated",
            "2 large potatoes, boiled and mashed",
            "2 tbsp cornstarch",
            "1 tsp salt",
            "1/2 tsp black pepper",
            "1 green chili, finely chopped",
            "2 tbsp fresh cilantro, chopped",
            "Oil for deep frying",
            "For gravy:",
            "2 large onions, chopped",
            "4 large tomatoes, chopped",
            "1/4 cup cashews",
            "1 tbsp ginger-garlic paste",
            "3 tbsp ghee or oil",
            "1 tsp cumin seeds",
            "2 bay leaves",
            "1 tsp red chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp coriander powder",
            "1 tsp garam masala powder",
            "1/2 cup heavy cream",
            "1 tsp salt",
            "1 tsp sugar",
            "Fresh cilantro for garnish"
        ],
        instructions: [
            "For koftas: Mix grated paneer, mashed potatoes, cornstarch, salt, pepper, green chili, and cilantro.",
            "Form into small balls (about 16-18 pieces). Refrigerate for 15 minutes to firm up.",
            "Heat oil to 350°F (175°C). Deep fry koftas until golden brown. Drain on paper towels.",
            "For gravy: Heat 1 tbsp oil in a pan. Sauté onions until golden. Add cashews and cook for 2 minutes.",
            "Add tomatoes and cook until soft. Cool completely, then blend to smooth puree.",
            "Heat ghee in the same pan. Add cumin seeds and bay leaves. Let splutter.",
            "Add ginger-garlic paste and cook for 1 minute.",
            "Add the onion-tomato puree and cook for 5 minutes.",
            "Add red chili powder, turmeric, coriander powder. Cook for 2 minutes.",
            "Add 1 cup water, salt, and sugar. Simmer for 10 minutes until thickened.",
            "Add cream and garam masala. Simmer for 3-4 minutes.",
            "Strain the gravy for ultra-smooth texture (optional but recommended).",
            "Add fried koftas just before serving to prevent them from becoming soggy.",
            "Garnish with fresh cilantro and serve hot with rice or naan."
        ],
        tips: "Keep koftas light by not over-mixing. Fry just before serving to maintain crispness. Strain gravy for restaurant-style smoothness.",
        nutrition: {
            calories: "450",
            protein: "18g",
            carbs: "22g",
            fat: "35g"
        }
    },
    "Vada Pav": {
        image: "../images/Home page dishes/Vada Pav.webp",
        description: "Mumbai's iconic street food - spiced potato fritter in a soft bun with chutneys, known as the Indian burger.",
        cookTime: "45 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "For vada:",
            "4 large potatoes, boiled and mashed",
            "2 green chilies, finely chopped",
            "1 inch ginger, grated",
            "1/2 tsp turmeric powder",
            "1 tsp mustard seeds",
            "8-10 curry leaves",
            "2 tbsp oil",
            "1 tsp salt",
            "2 tbsp fresh cilantro, chopped",
            "For batter:",
            "1 cup gram flour (besan)",
            "1/4 tsp turmeric powder",
            "1/2 tsp red chili powder",
            "Salt to taste",
            "Water as needed",
            "Oil for deep frying",
            "4 pav buns (or burger buns)",
            "Green chutney (mint-cilantro)",
            "Sweet tamarind chutney",
            "Fried green chilies for serving"
        ],
        instructions: [
            "Heat 2 tbsp oil in a pan. Add mustard seeds and curry leaves. Let them splutter.",
            "Add chopped green chilies and ginger. Sauté for 1 minute.",
            "Add mashed potatoes, turmeric, and salt. Mix well and cook for 2-3 minutes.",
            "Add cilantro and mix. Let the mixture cool completely.",
            "Shape the potato mixture into 8 small balls.",
            "For batter: Mix gram flour, turmeric, red chili powder, and salt. Add water gradually to make smooth, thick batter.",
            "Heat oil to 350°F (175°C) for deep frying.",
            "Dip each potato ball in batter and deep fry until golden brown and crispy.",
            "Drain on paper towels.",
            "Slice pav buns horizontally, keeping them attached at one side.",
            "Lightly toast the buns on a griddle with a little oil.",
            "Spread green chutney on one side and sweet chutney on the other.",
            "Place one hot vada inside each bun.",
            "Serve immediately with fried green chilies and extra chutneys."
        ],
        tips: "Keep potato mixture simple - the flavor comes from the chutneys. Batter should coat the vada well but not be too thick. Serve hot for best taste.",
        nutrition: {
            calories: "380",
            protein: "12g",
            carbs: "58g",
            fat: "12g"
        }
    },
    "Pani Puri": {
        image: "../images/Home page dishes/Pani Puri.webp",
        description: "Popular Indian street snack of crispy hollow shells filled with spiced water, chutneys, and various fillings.",
        cookTime: "30 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "24 ready-made puris (or golgappa shells)",
            "For pani (spiced water):",
            "1 cup fresh mint leaves",
            "1/2 cup cilantro leaves",
            "2 green chilies",
            "1 inch ginger",
            "1 tsp black salt",
            "1/2 tsp regular salt",
            "1 tsp chaat masala",
            "2 tbsp tamarind pulp",
            "1 tbsp jaggery or sugar",
            "4 cups chilled water",
            "For filling:",
            "1 cup boiled chickpeas",
            "2 medium potatoes, boiled and diced",
            "1/2 cup fine sev (gram flour noodles)",
            "2 tbsp sweet tamarind chutney",
            "1 tbsp green chutney",
            "1/2 tsp chaat masala",
            "Finely chopped onions (optional)"
        ],
        instructions: [
            "For pani: Blend mint, cilantro, green chilies, and ginger with 1/2 cup water to make smooth paste.",
            "In a large bowl, mix this paste with remaining water, black salt, regular salt, chaat masala, tamarind pulp, and jaggery.",
            "Taste and adjust flavors - it should be tangy, spicy, and slightly sweet. Chill for 30 minutes.",
            "Prepare filling by mixing boiled chickpeas, diced potatoes, and chaat masala.",
            "To serve: Gently crack the top of each puri to make a small hole.",
            "Fill each puri with 1 tsp of the chickpea-potato mixture.",
            "Add a few drops of both chutneys.",
            "Fill the puri with the spiced pani using a spoon or squeeze bottle.",
            "Top with sev and finely chopped onions if using.",
            "Eat immediately in one bite to avoid the puri breaking."
        ],
        tips: "Make pani ahead and chill well. Eat immediately after filling to prevent soggy puris. Adjust spice level according to preference.",
        nutrition: {
            calories: "180",
            protein: "6g",
            carbs: "35g",
            fat: "3g"
        }
    },
    "Bhel Puri": {
        image: "../images/Home page dishes/Bhel Puri.webp",
        description: "Mumbai's favorite street snack - a tangy mixture of puffed rice, sev, chutneys, and fresh vegetables.",
        cookTime: "15 mins",
        difficulty: "Easy",
        servings: "4 servings",
        ingredients: [
            "4 cups puffed rice (murmura/bhel)",
            "1 cup fine sev (gram flour noodles)",
            "1/2 cup coarse sev",
            "2 medium onions, finely chopped",
            "2 medium tomatoes, finely chopped",
            "1 large cucumber, finely chopped",
            "2 medium potatoes, boiled and diced",
            "1/4 cup fresh cilantro, chopped",
            "2 tbsp green chutney (mint-cilantro)",
            "3 tbsp sweet tamarind chutney",
            "1 tsp chaat masala",
            "1/2 tsp black salt",
            "Salt to taste",
            "2 tbsp roasted peanuts (optional)",
            "Fresh mint leaves for garnish",
            "Lemon wedges for serving"
        ],
        instructions: [
            "In a large mixing bowl, add puffed rice (ensure it's fresh and crispy).",
            "Add chopped onions, tomatoes, cucumber, and boiled potatoes.",
            "Add green chutney and sweet tamarind chutney. Mix gently.",
            "Add chaat masala, black salt, and regular salt. Toss well.",
            "Add half of the fine sev and roasted peanuts if using.",
            "Mix everything gently but thoroughly, ensuring all ingredients are well combined.",
            "Taste and adjust chutneys and seasonings as needed.",
            "Transfer to serving plates or bowls.",
            "Top with remaining fine sev, coarse sev, and fresh cilantro.",
            "Garnish with fresh mint leaves.",
            "Serve immediately with lemon wedges for extra tanginess."
        ],
        tips: "Use fresh, crispy puffed rice for best texture. Don't add wet ingredients too early to prevent sogginess. Adjust chutney quantities to taste preference.",
        nutrition: {
            calories: "220",
            protein: "8g",
            carbs: "42g",
            fat: "4g"
        }
    },
    "Samosa": {
        image: "../images/Home page dishes/Samosa.webp",
        description: "Crispy triangular pastries filled with spiced potatoes and peas - India's most beloved snack served with chutneys.",
        cookTime: "90 mins",
        difficulty: "Hard",
        servings: "6 servings (18 samosas)",
        ingredients: [
            "For dough:",
            "2 cups all-purpose flour",
            "1/2 tsp salt",
            "4 tbsp oil or ghee",
            "6-7 tbsp water",
            "For filling:",
            "4 large potatoes, boiled and diced",
            "1/2 cup green peas",
            "2 green chilies, finely chopped",
            "1 inch ginger, grated",
            "1 tsp cumin seeds",
            "1 tsp coriander seeds, crushed",
            "1/2 tsp turmeric powder",
            "1 tsp red chili powder",
            "1 tsp garam masala powder",
            "1 tsp amchur (dry mango powder)",
            "2 tbsp oil",
            "Salt to taste",
            "2 tbsp fresh cilantro, chopped",
            "Oil for deep frying"
        ],
        instructions: [
            "For dough: Mix flour and salt. Add oil and rub into flour until mixture resembles breadcrumbs.",
            "Add water gradually to form a firm dough. Knead well for 5 minutes. Cover and rest for 30 minutes.",
            "For filling: Heat oil in a pan. Add cumin seeds and let them splutter.",
            "Add ginger and green chilies. Sauté for 1 minute.",
            "Add peas and cook for 2-3 minutes.",
            "Add diced potatoes, turmeric, red chili powder, coriander, garam masala, amchur, and salt.",
            "Mix well and cook for 5 minutes. Add cilantro and let filling cool completely.",
            "Divide dough into 9 portions. Roll each into an oval, then cut in half.",
            "Take one semicircle, wet the edges, and form a cone.",
            "Fill with 1 tbsp of potato filling. Seal the edges by pressing and pleating.",
            "Ensure there are no air bubbles and edges are well sealed.",
            "Heat oil to 325°F (160°C). Fry samosas in batches until golden brown and crispy.",
            "Drain on paper towels and serve hot with mint chutney and tamarind chutney."
        ],
        tips: "Rest the dough for best texture. Don't overfill samosas. Fry on medium heat for even cooking. Seal edges properly to prevent opening during frying.",
        nutrition: {
            calories: "180",
            protein: "4g",
            carbs: "28g",
            fat: "6g"
        }
    },
    "Masala Dosa": {
        image: "../images/Home page dishes/Masala Dosa.webp",
        description: "South Indian crispy crepe made from fermented rice and lentil batter, filled with spiced potato curry and served with chutneys.",
        cookTime: "48 hours (including fermentation)",
        difficulty: "Hard",
        servings: "6 servings",
        ingredients: [
            "For dosa batter:",
            "3 cups parboiled rice",
            "1 cup urad dal (black gram)",
            "1/2 tsp fenugreek seeds",
            "Salt to taste",
            "Water as needed",
            "For potato filling:",
            "6 large potatoes, boiled and cubed",
            "2 large onions, sliced",
            "2 green chilies, slit",
            "1 inch ginger, chopped",
            "10-12 curry leaves",
            "1 tsp mustard seeds",
            "1/2 tsp turmeric powder",
            "1 tsp salt",
            "3 tbsp oil",
            "Fresh cilantro for garnish",
            "Oil for cooking dosas"
        ],
        instructions: [
            "Soak rice and urad dal with fenugreek seeds separately for 4-6 hours.",
            "Grind urad dal to smooth, fluffy batter. Grind rice to slightly coarse batter.",
            "Mix both batters, add salt, and ferment for 8-12 hours until doubled.",
            "For filling: Heat oil in a pan. Add mustard seeds and curry leaves.",
            "Add onions, green chilies, and ginger. Sauté until onions are translucent.",
            "Add turmeric and cubed potatoes. Mix well and cook for 5 minutes.",
            "Add salt and cilantro. Mix and keep warm.",
            "Heat a non-stick pan or cast iron griddle over medium heat.",
            "Pour a ladle of batter in center and spread in circular motion to make thin crepe.",
            "Drizzle oil around edges and cook until bottom is golden and crispy.",
            "Place 2-3 tbsp potato filling on one half of the dosa.",
            "Fold the dosa in half and slide onto serving plate.",
            "Serve hot with coconut chutney, sambar, and tomato chutney."
        ],
        tips: "Proper fermentation is key - batter should be bubbly and smell slightly sour. Use a well-seasoned pan for best results. Practice makes perfect for spreading thin dosas.",
        nutrition: {
            calories: "320",
            protein: "8g",
            carbs: "58g",
            fat: "8g"
        }
    },
    "Pav Bhaji": {
        image: "../images/Home page dishes/Pav Bhaji.webp",
        description: "Mumbai's famous street food - thick spiced vegetable curry served with buttered and toasted bread rolls.",
        cookTime: "45 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "8 pav buns (or dinner rolls)",
            "For bhaji:",
            "3 large potatoes, boiled and mashed",
            "1 cup green peas, boiled",
            "1 large onion, finely chopped",
            "2 large tomatoes, finely chopped",
            "1 capsicum (bell pepper), finely chopped",
            "1 tbsp ginger-garlic paste",
            "2 green chilies, finely chopped",
            "4 tbsp butter",
            "2 tbsp pav bhaji masala",
            "1 tsp red chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp salt",
            "2 tbsp oil",
            "1/2 cup water",
            "For serving:",
            "Butter for toasting pav",
            "Finely chopped onions",
            "Fresh cilantro",
            "Lemon wedges"
        ],
        instructions: [
            "Heat oil and 2 tbsp butter in a heavy-bottomed pan over medium heat.",
            "Add chopped onions and sauté until golden brown, about 8 minutes.",
            "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
            "Add chopped tomatoes and cook until they break down completely, about 10 minutes.",
            "Add capsicum and cook for 3-4 minutes until soft.",
            "Add pav bhaji masala, red chili powder, turmeric, and salt. Mix well.",
            "Add mashed potatoes and boiled peas. Mix thoroughly.",
            "Add water and let it simmer for 10-15 minutes, mashing occasionally.",
            "The bhaji should be thick but spreadable. Adjust consistency with water if needed.",
            "Add remaining butter and mix well. Taste and adjust seasoning.",
            "For pav: Slice buns horizontally. Heat butter on a griddle.",
            "Toast pav buns cut-side down until golden brown and crispy.",
            "Serve hot bhaji garnished with cilantro, with toasted pav, chopped onions, and lemon wedges."
        ],
        tips: "Mash vegetables well for smooth texture. Don't skip the butter - it's essential for authentic taste. Adjust spice level with pav bhaji masala quantity.",
        nutrition: {
            calories: "420",
            protein: "12g",
            carbs: "68g",
            fat: "14g"
        }
    },
    "Idli Sambhar": {
        image: "../images/Home page dishes/Idli.webp",
        description: "Classic South Indian breakfast of soft steamed rice cakes served with spiced lentil soup and coconut chutney.",
        cookTime: "24 hours (including fermentation)",
        difficulty: "Hard",
        servings: "4 servings",
        ingredients: [
            "For idli:",
            "2 cups parboiled rice",
            "1/2 cup urad dal (black gram)",
            "1/4 tsp fenugreek seeds",
            "Salt to taste",
            "For sambhar:",
            "1 cup toor dal (pigeon peas)",
            "2 tbsp sambhar powder",
            "1 tbsp tamarind paste",
            "2 tomatoes, chopped",
            "1 onion, chopped",
            "1 drumstick, cut into pieces",
            "1 brinjal (eggplant), cubed",
            "10-12 okra, chopped",
            "1 tsp mustard seeds",
            "1 tsp cumin seeds",
            "10-12 curry leaves",
            "2 dry red chilies",
            "1/4 tsp asafoetida (hing)",
            "2 tbsp oil",
            "Salt to taste",
            "Fresh cilantro for garnish"
        ],
        instructions: [
            "For idli: Soak rice and urad dal with fenugreek separately for 4-6 hours.",
            "Grind urad dal to smooth, fluffy batter. Grind rice to slightly coarse batter.",
            "Mix both batters, add salt, ferment for 8-12 hours until doubled and bubbly.",
            "For sambhar: Cook toor dal with turmeric until soft and mushy.",
            "Heat oil in a pan. Add mustard seeds, cumin seeds, red chilies, and curry leaves.",
            "Add onions and sauté until translucent. Add tomatoes and cook until soft.",
            "Add vegetables (drumstick, brinjal, okra) and cook for 5 minutes.",
            "Add cooked dal, sambhar powder, tamarind paste, and 2 cups water.",
            "Add salt and simmer for 15-20 minutes until vegetables are tender.",
            "Add asafoetida and garnish with cilantro.",
            "For idlis: Steam idli batter in idli molds for 10-12 minutes.",
            "Insert a toothpick to check - it should come out clean.",
            "Let cool for 2 minutes before removing from molds.",
            "Serve hot idlis with sambhar and coconut chutney."
        ],
        tips: "Proper fermentation creates fluffy idlis. Use a pressure cooker without whistle for steaming. Sambhar tastes better when vegetables are cooked until tender.",
        nutrition: {
            calories: "280",
            protein: "12g",
            carbs: "52g",
            fat: "4g"
        }
    },
    "Kachori": {
        image: "../images/Home page dishes/Kachori.webp",
        description: "Flaky, crispy deep-fried pastries stuffed with spiced lentil filling - a popular North Indian snack served with chutneys.",
        cookTime: "75 mins",
        difficulty: "Hard",
        servings: "6 servings (18 kachoris)",
        ingredients: [
            "For dough:",
            "2 cups all-purpose flour",
            "1/2 tsp salt",
            "4 tbsp oil",
            "Water as needed",
            "For filling:",
            "1 cup yellow moong dal, soaked 4 hours",
            "1 tsp cumin seeds",
            "1 tsp fennel seeds",
            "1/2 tsp asafoetida (hing)",
            "1 inch ginger, grated",
            "2 green chilies, finely chopped",
            "1 tsp coriander powder",
            "1/2 tsp red chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp garam masala powder",
            "1 tsp amchur (dry mango powder)",
            "Salt to taste",
            "2 tbsp oil for filling",
            "Oil for deep frying"
        ],
        instructions: [
            "For dough: Mix flour and salt. Add oil and rub until mixture resembles breadcrumbs.",
            "Add water gradually to make firm dough. Knead well and rest for 30 minutes.",
            "For filling: Drain moong dal and coarsely grind without water.",
            "Heat oil in a pan. Add cumin seeds, fennel seeds, and asafoetida.",
            "Add ground moong dal and cook on low heat for 8-10 minutes, stirring continuously.",
            "Add ginger, green chilies, and all spice powders. Cook for 5 more minutes.",
            "Add salt and mix well. Let filling cool completely.",
            "Divide dough into 18 small portions.",
            "Roll each portion into a small circle, place 1 tsp filling in center.",
            "Gather edges to seal completely, ensuring no filling is visible.",
            "Gently roll sealed ball into a slightly flattened disc.",
            "Heat oil to 325°F (160°C). Fry kachoris in batches until golden brown and crispy.",
            "They should puff up and cook evenly. Drain on paper towels.",
            "Serve hot with tamarind chutney, mint chutney, or aloo curry."
        ],
        tips: "Don't add water while grinding dal. Cook filling until completely dry. Seal edges properly to prevent bursting during frying. Fry on medium heat for even cooking.",
        nutrition: {
            calories: "165",
            protein: "5g",
            carbs: "22g",
            fat: "7g"
        }
    },
    "Vegetable Biryani": {
        image: "../images/Home page dishes/Vegetable Biriyani.webp",
        description: "Aromatic basmati rice layered with spiced mixed vegetables, herbs, and saffron - a vegetarian masterpiece.",
        cookTime: "75 mins",
        difficulty: "Hard",
        servings: "6 servings",
        ingredients: [
            "2 cups aged basmati rice, soaked for 30 minutes",
            "Mixed vegetables (2 cups): carrots, beans, peas, potatoes, cauliflower",
            "2 large onions, thinly sliced and fried until golden",
            "1/2 cup mint leaves",
            "1/2 cup cilantro leaves",
            "4 tbsp ghee",
            "2 tbsp oil",
            "1 cup plain yogurt",
            "1 tbsp ginger-garlic paste",
            "Whole spices: 4 green cardamom, 2 black cardamom, 4 cloves, 2 bay leaves, 1-inch cinnamon",
            "2 tsp biryani masala powder",
            "1 tsp red chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp garam masala powder",
            "Saffron soaked in 1/4 cup warm milk",
            "Salt to taste",
            "6-8 cups water for cooking rice"
        ],
        instructions: [
            "Cut vegetables into medium pieces. Parboil harder vegetables (potatoes, carrots, cauliflower) until 70% cooked.",
            "Heat oil in a heavy-bottomed pot. Add remaining vegetables and cook until tender. Season with salt.",
            "In a bowl, marinate cooked vegetables with yogurt, ginger-garlic paste, biryani masala, red chili powder, turmeric, and garam masala.",
            "Boil water with whole spices and salt. Add soaked rice and cook until 70% done. Drain.",
            "Layer the biryani: Spread half the rice in the pot, then the marinated vegetables, then remaining rice.",
            "Sprinkle fried onions, mint, cilantro, and saffron milk on top.",
            "Dot with ghee and cover with aluminum foil, then place lid tightly.",
            "Cook on high heat for 3-4 minutes until steam forms, then reduce to lowest heat.",
            "Cook for 45 minutes on lowest heat (dum method).",
            "Turn off heat and let it rest for 10 minutes without opening.",
            "Gently mix before serving. Serve with raita, pickle, and boiled eggs if desired."
        ],
        tips: "Use aged basmati rice for best aroma. Layer properly for distinct flavors. The dum cooking method is crucial - don't open the lid during cooking.",
        nutrition: {
            calories: "420",
            protein: "12g",
            carbs: "78g",
            fat: "8g"
        }
    },
    "Mutton Biryani": {
        image: "../images/Home page dishes/Mutton Biriyani.webp",
        description: "Royal Hyderabadi-style biryani with tender mutton pieces marinated in yogurt and spices, layered with fragrant rice.",
        cookTime: "150 mins",
        difficulty: "Hard",
        servings: "6 servings",
        ingredients: [
            "2 cups aged basmati rice, soaked for 30 minutes",
            "1 kg mutton (goat meat), cut into medium pieces",
            "2 large onions, thinly sliced and deep fried until golden",
            "1 cup plain yogurt",
            "2 tbsp ginger-garlic paste",
            "1/2 cup mint leaves",
            "1/2 cup cilantro leaves",
            "4 tbsp ghee",
            "2 tbsp mustard oil",
            "Whole spices: 6 green cardamom, 3 black cardamom, 6 cloves, 3 bay leaves, 2-inch cinnamon, 1 mace blade",
            "2 tsp red chili powder",
            "1 tsp turmeric powder",
            "2 tsp biryani masala powder",
            "1 tsp garam masala powder",
            "Saffron soaked in 1/4 cup warm milk",
            "Salt to taste",
            "8-10 cups water for cooking rice"
        ],
        instructions: [
            "Marinate mutton with yogurt, ginger-garlic paste, red chili powder, turmeric, biryani masala, and salt for at least 2 hours or overnight.",
            "Heat mustard oil in a heavy-bottomed pot. Add whole spices and let them splutter.",
            "Add marinated mutton and cook on high heat for 10 minutes, stirring occasionally.",
            "Reduce heat to medium-low, cover, and cook for 60-90 minutes until mutton is tender.",
            "Meanwhile, boil water with whole spices and salt. Add soaked rice and cook until 70% done. Drain, reserving the cooking liquid.",
            "Layer the biryani: Spread half the rice over cooked mutton, then remaining rice on top.",
            "Sprinkle fried onions (reserve some for garnish), mint, cilantro, and saffron milk.",
            "Dot with ghee and sprinkle garam masala.",
            "Cover with aluminum foil, then place lid tightly.",
            "Cook on high heat for 4-5 minutes until steam forms, then reduce to lowest heat.",
            "Cook for 45 minutes on lowest heat (dum method).",
            "Turn off heat and let it rest for 15 minutes without opening.",
            "Garnish with reserved fried onions and serve with raita, shorba, and pickle."
        ],
        tips: "Mutton must be tender before layering. Use mustard oil for authentic flavor. Patience is key - don't rush the cooking process.",
        nutrition: {
            calories: "680",
            protein: "45g",
            carbs: "65g",
            fat: "28g"
        }
    },
    "Jeera Rice": {
        image: "../images/Home page dishes/Jeera Rice.webp",
        description: "Fragrant basmati rice tempered with cumin seeds and whole spices - a simple yet elegant accompaniment to curries.",
        cookTime: "25 mins",
        difficulty: "Easy",
        servings: "4 servings",
        ingredients: [
            "1.5 cups basmati rice, soaked for 20 minutes",
            "2 tbsp ghee or oil",
            "1 tsp cumin seeds",
            "4-5 green cardamom pods",
            "2 bay leaves",
            "1-inch cinnamon stick",
            "2-3 cloves",
            "1 small onion, thinly sliced (optional)",
            "2.5 cups water",
            "1 tsp salt",
            "Fresh cilantro for garnish"
        ],
        instructions: [
            "Wash and soak basmati rice for 20 minutes, then drain.",
            "Heat ghee in a heavy-bottomed saucepan over medium heat.",
            "Add cumin seeds and let them splutter and turn golden brown.",
            "Add green cardamom, bay leaves, cinnamon, and cloves. Sauté for 30 seconds.",
            "If using onions, add them now and cook until light golden.",
            "Add drained rice and gently mix with the spices for 2 minutes.",
            "Add water and salt. Bring to a boil over medium-high heat.",
            "Once boiling, reduce heat to lowest setting and cover with a tight-fitting lid.",
            "Cook for 15 minutes without opening the lid.",
            "Turn off heat and let it rest for 5 minutes without opening.",
            "Gently fork the rice to separate grains.",
            "Remove whole spices if desired, garnish with cilantro, and serve hot."
        ],
        tips: "Don't over-mix the rice to prevent breaking grains. Use the absorption method for fluffy rice. Quality basmati rice makes a big difference.",
        nutrition: {
            calories: "280",
            protein: "6g",
            carbs: "58g",
            fat: "4g"
        }
    },
    "Paneer Pulao": {
        image: "../images/Home page dishes/Paneer Pulao.webp",
        description: "Aromatic rice dish with soft paneer cubes, mixed vegetables, and fragrant spices - a complete one-pot meal.",
        cookTime: "40 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "1.5 cups basmati rice, soaked for 20 minutes",
            "200g paneer, cut into 1-inch cubes",
            "1 cup mixed vegetables (peas, carrots, beans)",
            "2 large onions, sliced",
            "3 tbsp ghee",
            "1 tbsp oil",
            "1 tsp cumin seeds",
            "4-5 green cardamom pods",
            "2 bay leaves",
            "1-inch cinnamon stick",
            "3-4 cloves",
            "1 tbsp ginger-garlic paste",
            "1 tsp biryani masala or garam masala",
            "1/2 tsp turmeric powder",
            "3 cups water or vegetable stock",
            "Salt to taste",
            "Fresh mint and cilantro for garnish",
            "Fried onions for topping"
        ],
        instructions: [
            "Heat oil in a pan and lightly fry paneer cubes until golden. Set aside.",
            "In the same oil, fry sliced onions until golden brown. Drain and set aside.",
            "Heat ghee in a heavy-bottomed pot. Add whole spices and cumin seeds.",
            "Add ginger-garlic paste and sauté for 1 minute until fragrant.",
            "Add mixed vegetables and cook for 3-4 minutes until slightly tender.",
            "Add drained rice and gently mix for 2 minutes until each grain is coated.",
            "Add biryani masala, turmeric, and salt. Mix gently.",
            "Add water or stock and bring to a boil.",
            "Add fried paneer and half the fried onions.",
            "Cover and cook on high heat for 2 minutes, then reduce to lowest heat.",
            "Cook covered for 15 minutes without opening the lid.",
            "Turn off heat and let it rest for 5 minutes.",
            "Gently mix and garnish with remaining fried onions, mint, and cilantro.",
            "Serve hot with raita and pickle."
        ],
        tips: "Fry paneer lightly to prevent it from becoming tough. Don't over-mix while cooking to keep rice grains separate. Use vegetable stock for richer flavor.",
        nutrition: {
            calories: "420",
            protein: "18g",
            carbs: "62g",
            fat: "12g"
        }
    },
    "Lemon Rice": {
        image: "../images/Home page dishes/Lemon Rice.webp",
        description: "Tangy South Indian rice dish tempered with mustard seeds, curry leaves, peanuts, and fresh lemon juice.",
        cookTime: "25 mins",
        difficulty: "Easy",
        servings: "4 servings",
        ingredients: [
            "2 cups cooked basmati rice, cooled",
            "3 tbsp fresh lemon juice",
            "2 tbsp sesame oil or coconut oil",
            "1 tsp mustard seeds",
            "1 tsp urad dal (black gram dal)",
            "1 tsp chana dal (bengal gram dal)",
            "2 dry red chilies",
            "1 green chili, slit lengthwise",
            "1 inch ginger, finely chopped",
            "15-20 curry leaves",
            "2 tbsp roasted peanuts",
            "1/4 tsp asafoetida (hing)",
            "1/2 tsp turmeric powder",
            "Salt to taste",
            "2 tbsp fresh cilantro, chopped",
            "2 tbsp grated coconut (optional)"
        ],
        instructions: [
            "Cook rice with a little extra water so grains are separate and not sticky. Cool completely.",
            "Heat oil in a large pan or kadai over medium heat.",
            "Add mustard seeds and let them splutter.",
            "Add urad dal and chana dal. Fry until golden brown.",
            "Add dry red chilies and fry for 10 seconds.",
            "Add green chili, ginger, and curry leaves. Sauté for 1 minute.",
            "Add roasted peanuts and asafoetida. Mix well.",
            "Add turmeric powder and immediately add the cooled rice.",
            "Gently mix the rice with the tempering, being careful not to break the grains.",
            "Add salt and lemon juice. Mix gently but thoroughly.",
            "Cook for 2-3 minutes on low heat to let flavors blend.",
            "Taste and adjust salt and lemon juice as needed.",
            "Garnish with fresh cilantro and grated coconut if using.",
            "Serve warm or at room temperature with pickle and papad."
        ],
        tips: "Use day-old rice for best texture. Add lemon juice gradually to control tanginess. Don't overheat after adding lemon juice to preserve vitamin C.",
        nutrition: {
            calories: "320",
            protein: "8g",
            carbs: "58g",
            fat: "8g"
        }
    },
    "Egg Biryani": {
        image: "../images/Home page dishes/Egg Biriyani.webp",
        description: "Flavorful biryani with perfectly boiled eggs marinated in spices and layered with aromatic basmati rice.",
        cookTime: "60 mins",
        difficulty: "Medium",
        servings: "4 servings",
        ingredients: [
            "1.5 cups basmati rice, soaked for 30 minutes",
            "6 large eggs",
            "2 large onions, thinly sliced and fried until golden",
            "1/2 cup plain yogurt",
            "1 tbsp ginger-garlic paste",
            "1/4 cup mint leaves",
            "1/4 cup cilantro leaves",
            "3 tbsp ghee",
            "2 tbsp oil",
            "Whole spices: 4 green cardamom, 2 black cardamom, 4 cloves, 2 bay leaves, 1-inch cinnamon",
            "1 tsp red chili powder",
            "1/2 tsp turmeric powder",
            "1 tsp biryani masala powder",
            "1/2 tsp garam masala powder",
            "Saffron soaked in 1/4 cup warm milk",
            "Salt to taste",
            "4-5 cups water for cooking rice"
        ],
        instructions: [
            "Boil eggs for 10 minutes, then cool in cold water. Peel and make 2-3 shallow cuts on each egg.",
            "Marinate eggs with yogurt, ginger-garlic paste, red chili powder, turmeric, biryani masala, and salt for 30 minutes.",
            "Heat oil in a heavy-bottomed pot. Lightly fry marinated eggs until golden. Remove and set aside.",
            "In the same oil, add whole spices and let them splutter.",
            "Add the egg marinade and cook for 5 minutes until oil separates.",
            "Return eggs to the pot and mix gently. Cook for 5 more minutes.",
            "Meanwhile, boil water with whole spices and salt. Add soaked rice and cook until 70% done. Drain.",
            "Layer the biryani: Spread cooked eggs in the pot, then layer all the rice on top.",
            "Sprinkle fried onions, mint, cilantro, and saffron milk over the rice.",
            "Dot with ghee and sprinkle garam masala.",
            "Cover with aluminum foil, then place lid tightly.",
            "Cook on high heat for 3-4 minutes until steam forms, then reduce to lowest heat.",
            "Cook for 30 minutes on lowest heat (dum method).",
            "Turn off heat and let it rest for 10 minutes without opening.",
            "Gently mix before serving. Serve with raita and pickle."
        ],
        tips: "Don't overcook eggs initially as they'll cook more during dum. Make shallow cuts for better spice absorption. Layer carefully to maintain distinct flavors.",
        nutrition: {
            calories: "480",
            protein: "22g",
            carbs: "65g",
            fat: "16g"
        }
    },
    "Coconut Rice": {
        image: "../images/Home page dishes/Coconut Rice.webp",
        description: "Kerala-style aromatic rice cooked with fresh coconut milk and tempered with South Indian spices.",
        cookTime: "30 mins",
        difficulty: "Easy",
        servings: "4 servings",
        ingredients: [
            "1.5 cups basmati rice, soaked for 20 minutes",
            "1 cup thick coconut milk",
            "1.5 cups water",
            "2 tbsp coconut oil",
            "1 tsp mustard seeds",
            "1 tsp urad dal (black gram dal)",
            "10-12 curry leaves",
            "2 dry red chilies",
            "1 green chili, slit",
            "1 inch ginger, finely chopped",
            "2 tbsp cashew nuts",
            "1/4 tsp asafoetida (hing)",
            "Salt to taste",
            "2 tbsp fresh grated coconut for garnish",
            "Fresh cilantro for garnish"
        ],
        instructions: [
            "Wash and soak basmati rice for 20 minutes, then drain.",
            "Heat coconut oil in a heavy-bottomed saucepan over medium heat.",
            "Add mustard seeds and let them splutter.",
            "Add urad dal and fry until golden brown.",
            "Add curry leaves, dry red chilies, and green chili. Sauté for 30 seconds.",
            "Add chopped ginger and cashew nuts. Fry until cashews are golden.",
            "Add asafoetida and immediately add the drained rice.",
            "Gently sauté rice with the tempering for 2-3 minutes.",
            "Add coconut milk, water, and salt. Mix gently.",
            "Bring to a boil over medium-high heat.",
            "Once boiling, reduce heat to lowest setting and cover with a tight-fitting lid.",
            "Cook for 15 minutes without opening the lid.",
            "Turn off heat and let it rest for 5 minutes without opening.",
            "Gently fork the rice to separate grains.",
            "Garnish with fresh grated coconut and cilantro.",
            "Serve hot with pickle, papad, or Kerala-style vegetable curry."
        ],
        tips: "Use thick coconut milk for rich flavor. Don't over-mix to prevent rice from becoming sticky. Fresh curry leaves are essential for authentic taste.",
        nutrition: {
            calories: "380",
            protein: "8g",
            carbs: "62g",
            fat: "12g"
        }
    },
    "Gulab Jamun": {
        image: "../images/Home page dishes/Gulab Jamun.webp",
        description: "Soft, spongy milk-based dumplings soaked in aromatic rose and cardamom-flavored sugar syrup - India's most beloved sweet.",
        cookTime: "60 mins",
        difficulty: "Hard",
        servings: "6 servings (18 pieces)",
        ingredients: [
            "For jamuns:",
            "1 cup khoya (mawa), crumbled",
            "1/4 cup paneer, grated",
            "2 tbsp all-purpose flour",
            "1/4 tsp baking soda",
            "1 tbsp milk (if needed)",
            "Ghee for deep frying",
            "For syrup:",
            "2 cups sugar",
            "2 cups water",
            "4-5 green cardamom pods, crushed",
            "1 tsp rose water",
            "Few drops of yellow food color (optional)",
            "1 tbsp lemon juice"
        ],
        instructions: [
            "For syrup: Combine sugar and water in a heavy-bottomed pan. Bring to boil.",
            "Add crushed cardamom and simmer for 8-10 minutes until slightly sticky consistency.",
            "Add rose water and food color. Add lemon juice to prevent crystallization. Keep warm.",
            "For jamuns: Mix crumbled khoya, grated paneer, flour, and baking soda.",
            "Knead gently to form smooth dough. Add milk only if mixture is too dry.",
            "The dough should hold together but not be sticky.",
            "Make 18 small, smooth balls with no cracks. Keep them covered.",
            "Heat ghee to 325°F (160°C) for frying. Oil should be at medium temperature.",
            "Gently slide jamuns into oil. Fry on low-medium heat, turning gently.",
            "Fry for 8-10 minutes until they turn golden brown all over.",
            "They should double in size and become spongy.",
            "Remove and immediately drop into warm syrup.",
            "Let them soak for at least 2 hours for syrup to penetrate completely.",
            "Serve warm or at room temperature, garnished with pistachios."
        ],
        tips: "Maintain oil temperature - too hot will brown outside while inside remains uncooked. Jamuns should be smooth with no cracks. Syrup consistency is crucial.",
        nutrition: {
            calories: "280",
            protein: "6g",
            carbs: "48g",
            fat: "8g"
        }
    },
    "Rasgulla": {
        image: "../images/Home page dishes/Rasgulla.webp",
        description: "Spongy Bengali cottage cheese balls cooked in light sugar syrup - a refreshing and delicate Indian sweet.",
        cookTime: "45 mins",
        difficulty: "Hard",
        servings: "6 servings (15 pieces)",
        ingredients: [
            "For rasgullas:",
            "1 liter full-fat milk",
            "2 tbsp lemon juice or vinegar",
            "1 tsp all-purpose flour",
            "Ice water for washing",
            "For syrup:",
            "1.5 cups sugar",
            "4 cups water",
            "3-4 green cardamom pods",
            "1 tsp rose water (optional)"
        ],
        instructions: [
            "Boil milk in a heavy-bottomed pan. When it comes to rolling boil, add lemon juice gradually.",
            "Stir gently until milk curdles completely and whey separates (greenish liquid).",
            "Strain through muslin cloth. Wash the chenna (cottage cheese) under cold running water for 2 minutes.",
            "Squeeze out excess water and hang for 30 minutes to drain.",
            "Transfer chenna to a clean surface and knead for 8-10 minutes until smooth and soft.",
            "Add flour and knead for 2 more minutes until dough is smooth and non-sticky.",
            "Make 15 small, smooth balls with no cracks. Keep them covered.",
            "For syrup: Boil sugar and water with cardamom in a wide, heavy-bottomed pan.",
            "When syrup boils, gently slide the chenna balls into boiling syrup.",
            "Cover and cook on medium-high heat for 15 minutes. They will double in size.",
            "Add rose water in the last 2 minutes.",
            "Turn off heat and let them cool in the syrup for 1 hour.",
            "Chill in refrigerator for 2-3 hours before serving.",
            "Serve chilled as a refreshing dessert."
        ],
        tips: "Kneading chenna properly is crucial for spongy texture. Don't open lid while cooking - steam is important. Quality of milk affects final result.",
        nutrition: {
            calories: "120",
            protein: "5g",
            carbs: "22g",
            fat: "2g"
        }
    },
    "Jalebi": {
        image: "../images/Home page dishes/Jalebi.webp",
        description: "Crispy, spiral-shaped deep-fried batter soaked in saffron sugar syrup - a popular festive sweet with crunchy exterior and syrupy interior.",
        cookTime: "90 mins (including fermentation)",
        difficulty: "Hard",
        servings: "6 servings (20 pieces)",
        ingredients: [
            "For batter:",
            "1 cup all-purpose flour",
            "2 tbsp gram flour (besan)",
            "1/4 tsp baking soda",
            "1 tbsp yogurt",
            "1 tsp lemon juice",
            "Water as needed",
            "For syrup:",
            "2 cups sugar",
            "1.5 cups water",
            "Pinch of saffron",
            "4-5 green cardamom pods",
            "1 tsp lemon juice",
            "Ghee for deep frying"
        ],
        instructions: [
            "Mix both flours, baking soda, yogurt, and lemon juice in a bowl.",
            "Add water gradually to make smooth, thick batter (consistency of thick cream).",
            "Cover and ferment for 4-6 hours or overnight until slightly sour.",
            "For syrup: Boil sugar and water with saffron and cardamom for 10 minutes.",
            "Syrup should reach one-string consistency. Add lemon juice and keep warm.",
            "Heat ghee to 375°F (190°C) for frying.",
            "Pour batter into a piping bag or squeeze bottle with medium nozzle.",
            "Squeeze batter directly into hot oil in spiral or pretzel shapes.",
            "Fry 3-4 jalebis at a time, turning once, until golden and crispy (2-3 minutes).",
            "Immediately transfer hot jalebis to warm syrup.",
            "Let them soak for 30 seconds, turning once to coat evenly.",
            "Remove and place on serving plate.",
            "Serve immediately while warm and crispy.",
            "Garnish with chopped pistachios or almonds if desired."
        ],
        tips: "Batter fermentation is essential for texture. Maintain oil temperature for even cooking. Syrup should be warm when adding jalebis. Serve immediately for best texture.",
        nutrition: {
            calories: "240",
            protein: "3g",
            carbs: "45g",
            fat: "6g"
        }
    },
    "Rice Kheer": {
        image: "../images/Home page dishes/Rice Kheer.webp",
        description: "Creamy, aromatic rice pudding slow-cooked with milk, sugar, and flavored with cardamom, saffron, and nuts.",
        cookTime: "75 mins",
        difficulty: "Medium",
        servings: "6 servings",
        ingredients: [
            "1/2 cup basmati rice, washed and soaked for 30 minutes",
            "1 liter full-fat milk",
            "1/2 cup sugar (adjust to taste)",
            "4-5 green cardamom pods, crushed",
            "Pinch of saffron soaked in 2 tbsp warm milk",
            "2 tbsp ghee",
            "2 tbsp cashews, chopped",
            "2 tbsp almonds, sliced",
            "2 tbsp raisins",
            "1 tbsp pistachios, chopped",
            "1/2 tsp rose water (optional)"
        ],
        instructions: [
            "Heat ghee in a heavy-bottomed pan. Add cashews, almonds, and raisins.",
            "Fry until nuts are golden and raisins puff up. Remove and set aside.",
            "In the same pan, add drained rice and sauté for 2-3 minutes until fragrant.",
            "Add milk and bring to boil over medium heat, stirring occasionally.",
            "Reduce heat to low and simmer for 45-60 minutes, stirring frequently.",
            "Stir regularly to prevent sticking and burning at the bottom.",
            "Rice should break down and milk should reduce to creamy consistency.",
            "Add sugar and crushed cardamom. Cook for 10 more minutes.",
            "Add saffron milk and mix well. Cook for 5 minutes.",
            "Add three-quarters of the fried nuts and mix.",
            "Add rose water if using and mix gently.",
            "Turn off heat and let it cool slightly. Kheer will thicken as it cools.",
            "Garnish with remaining nuts and pistachios.",
            "Serve warm or chilled according to preference."
        ],
        tips: "Constant stirring prevents milk from burning. Full-fat milk gives rich texture. Kheer thickens upon cooling, so adjust consistency accordingly.",
        nutrition: {
            calories: "320",
            protein: "12g",
            carbs: "48g",
            fat: "10g"
        }
    },
    "Besan Laddu": {
        image: "../images/Home page dishes/Besan Lddu.webp",
        description: "Traditional gram flour sweet balls made with roasted besan, ghee, sugar, and aromatic spices - a festival favorite.",
        cookTime: "45 mins",
        difficulty: "Medium",
        servings: "6 servings (20 laddus)",
        ingredients: [
            "2 cups gram flour (besan)",
            "3/4 cup ghee",
            "3/4 cup powdered sugar",
            "1/2 tsp green cardamom powder",
            "2 tbsp chopped almonds",
            "2 tbsp chopped cashews",
            "1 tbsp raisins",
            "1 tbsp desiccated coconut (optional)",
            "Pinch of edible camphor (optional)"
        ],
        instructions: [
            "Heat 1/2 cup ghee in a heavy-bottomed pan over low heat.",
            "Add gram flour and roast continuously for 15-20 minutes, stirring constantly.",
            "Roast until besan turns golden brown and releases nutty aroma.",
            "The color should change from pale yellow to deep golden.",
            "Turn off heat and let it cool for 5 minutes while stirring occasionally.",
            "Meanwhile, heat remaining ghee and fry nuts and raisins until golden. Set aside.",
            "Add powdered sugar to the roasted besan while it's still warm.",
            "Mix thoroughly, breaking any lumps.",
            "Add cardamom powder, fried nuts, raisins, and coconut if using.",
            "Add camphor if using and mix well.",
            "While mixture is still warm (not hot), take portions and shape into small balls.",
            "Press firmly while shaping to bind the laddus properly.",
            "If mixture is too dry, add a little more melted ghee.",
            "Let them cool completely before storing in airtight container.",
            "Store at room temperature for up to 2 weeks."
        ],
        tips: "Roast besan on low heat to avoid burning. Proper roasting removes raw taste. Shape laddus while warm for better binding. Don't add sugar to hot besan.",
        nutrition: {
            calories: "180",
            protein: "6g",
            carbs: "18g",
            fat: "10g"
        }
    },
    "Kaju Barfi": {
        image: "../images/Home page dishes/Kaju Barfi.webp",
        description: "Rich, diamond-shaped cashew fudge made with cashew paste and sugar - a premium Indian sweet often served at celebrations.",
        cookTime: "30 mins",
        difficulty: "Hard",
        servings: "8 servings (16 pieces)",
        ingredients: [
            "2 cups raw cashews",
            "1/2 cup sugar",
            "1/4 cup water",
            "2 tbsp ghee",
            "1/4 tsp green cardamom powder",
            "Silver leaf (varak) for garnish (optional)",
            "Few cashews for topping"
        ],
        instructions: [
            "Soak cashews in warm water for 2 hours to soften.",
            "Drain and grind to smooth, fine paste without adding water. Set aside.",
            "Grease an 8-inch square pan or plate with ghee.",
            "In a heavy-bottomed pan, make sugar syrup with sugar and water.",
            "Cook until syrup reaches one-string consistency (about 8-10 minutes).",
            "Add cashew paste to the syrup and mix continuously.",
            "Cook on low heat, stirring constantly for 8-10 minutes.",
            "The mixture will start leaving the sides of the pan.",
            "Add ghee and cardamom powder. Mix well.",
            "Continue cooking for 2-3 more minutes until mixture thickens further.",
            "Pour the mixture into greased pan and spread evenly.",
            "Tap the pan gently to remove air bubbles.",
            "Garnish with cashews and silver leaf if using.",
            "Let it cool for 30 minutes until set but not completely hard.",
            "Cut into diamond or square shapes while still slightly warm.",
            "Let it set completely before removing from pan."
        ],
        tips: "Don't add water while grinding cashews. Watch sugar syrup carefully - overcooking makes barfi hard. Cut while warm for clean edges.",
        nutrition: {
            calories: "220",
            protein: "6g",
            carbs: "18g",
            fat: "15g"
        }
    },
    "Kulfi": {
        image: "../images/Home page dishes/Kulfi.webp",
        description: "Traditional Indian ice cream made with reduced milk, cardamom, and nuts - denser and creamier than regular ice cream.",
        cookTime: "6 hours (including freezing)",
        difficulty: "Medium",
        servings: "6 servings",
        ingredients: [
            "1 liter full-fat milk",
            "1/3 cup sugar",
            "1/4 tsp green cardamom powder",
            "2 tbsp cornstarch mixed with 3 tbsp milk",
            "2 tbsp chopped almonds",
            "2 tbsp chopped pistachios",
            "1 tbsp rose water (optional)",
            "Pinch of saffron soaked in 1 tbsp warm milk"
        ],
        instructions: [
            "Pour milk into a heavy-bottomed pan and bring to boil over medium heat.",
            "Reduce heat to low and simmer, stirring frequently, for 45 minutes.",
            "Milk should reduce to about half its original quantity.",
            "Add cornstarch mixture and cook for 5 minutes, stirring continuously.",
            "Add sugar and cardamom powder. Cook until sugar dissolves completely.",
            "Add saffron milk and mix well.",
            "Add half the chopped nuts and rose water if using.",
            "Cook for 5 more minutes until mixture coats the back of a spoon.",
            "Turn off heat and let it cool completely to room temperature.",
            "Pour into kulfi molds or small glasses/cups.",
            "Cover with aluminum foil and insert ice cream sticks.",
            "Freeze for at least 4-6 hours or overnight until completely set.",
            "To serve, dip molds in warm water for 10 seconds and gently remove kulfi.",
            "Garnish with remaining chopped nuts and serve immediately.",
            "Can also be served in glasses without unmolding."
        ],
        tips: "Constant stirring prevents milk from burning. Reduce milk properly for rich texture. Kulfi should be dense and creamy, not icy. Use traditional kulfi molds for authentic shape.",
        nutrition: {
            calories: "280",
            protein: "10g",
            carbs: "28g",
            fat: "14g"
        }
    },
    "Sandesh": {
        image: "../images/Home page dishes/Sandesh.webp",
        description: "Delicate Bengali sweet made with fresh cottage cheese, sugar, and cardamom - soft, melt-in-mouth texture with subtle sweetness.",
        cookTime: "30 mins",
        difficulty: "Medium",
        servings: "6 servings (12 pieces)",
        ingredients: [
            "1 liter full-fat milk",
            "2 tbsp lemon juice",
            "1/3 cup powdered sugar",
            "1/4 tsp green cardamom powder",
            "1 tbsp ghee",
            "2 tbsp pistachios, finely chopped",
            "Rose petals for garnish (optional)"
        ],
        instructions: [
            "Boil milk in a heavy-bottomed pan. Add lemon juice gradually while stirring.",
            "Continue stirring until milk curdles completely and whey separates.",
            "Strain through muslin cloth and wash chenna under cold running water.",
            "Squeeze out excess water and hang for 20 minutes to drain.",
            "Transfer chenna to a clean surface and knead for 5-6 minutes until smooth.",
            "The chenna should be soft and smooth without any grains.",
            "Heat a non-stick pan over low heat and add the kneaded chenna.",
            "Cook for 3-4 minutes, stirring continuously to remove moisture.",
            "Add powdered sugar and cook for 2-3 minutes, stirring constantly.",
            "Add cardamom powder and ghee. Mix well.",
            "Cook until mixture starts leaving the sides of the pan (about 5 minutes).",
            "Turn off heat and let it cool for 10 minutes.",
            "While still warm, shape into small rounds or traditional boat shapes.",
            "Garnish with chopped pistachios and rose petals if using.",
            "Chill in refrigerator for 2 hours before serving.",
            "Serve chilled as a delicate dessert."
        ],
        tips: "Don't over-knead chenna or it will become hard. Cook on low heat to avoid burning. Shape while warm for best results. Serve fresh for best texture.",
        nutrition: {
            calories: "140",
            protein: "8g",
            carbs: "15g",
            fat: "6g"
        }
    }
};

// Initialize home page
function initHomePage() {
    console.log('Home page initialized');
    
    // Get DOM elements
    const profileButton = document.querySelector('.profile-button');
    const scanButton = document.getElementById('scan-button');
    const scanIcon = document.querySelector('.scan-icon');
    const scanCard = document.querySelector('.scan-card');
    const recipeCarousels = document.querySelectorAll('.carousel-container');
    const recipeCards = document.querySelectorAll('.recipe-card');
    const navItems = document.querySelectorAll('.nav-item');
    const recipeDetailPage = document.getElementById('recipe-detail');
    const backButton = document.getElementById('back-button');
    
    // Profile button functionality
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            console.log('Profile button clicked');
            window.location.href = 'profile.html';
        });
    }
    
    // Scan button functionality
    if (scanButton) {
        scanButton.addEventListener('click', () => {
            console.log('Scan button clicked');
            window.location.href = 'scan.html';
        });
    }
    
    // Scan icon functionality (camera icon)
    if (scanIcon) {
        scanIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            console.log('Scan icon clicked');
            window.location.href = 'scan.html';
        });
        
        // Make the scan icon appear clickable
        scanIcon.style.cursor = 'pointer';
    }
    
    // Scan card functionality (entire card clickable)
    if (scanCard) {
        scanCard.addEventListener('click', (e) => {
            // Don't trigger if clicking on button or icon (they have their own handlers)
            if (e.target.closest('#scan-button') || e.target.closest('.scan-icon')) {
                return;
            }
            console.log('Scan card clicked');
            window.location.href = 'scan.html';
        });
        
        // Make the entire card appear clickable
        scanCard.style.cursor = 'pointer';
    }
    
    // Recipe card click handlers
    console.log('Found', recipeCards.length, 'recipe cards');
    recipeCards.forEach((card, index) => {
        const recipeName = card.querySelector('h3')?.textContent || 'Unknown Recipe';
        console.log(`Setting up click handler for card ${index + 1}:`, recipeName);
        
        card.addEventListener('click', (e) => {
            // Prevent navigation if clicking on save button
            if (e.target.closest('.save-recipe-btn')) return;
            
            console.log('Recipe card clicked:', recipeName);
            
            // Show recipe details
            showRecipeDetail(recipeName);
        });
        
        // Add cursor pointer to make cards appear clickable
        card.style.cursor = 'pointer';
        
        // Add a subtle hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 3px 10px rgba(0,0,0,0.08)';
        });
    });
    
    // Save button functionality
    const saveButtons = document.querySelectorAll('.save-recipe-btn');
    console.log('Found', saveButtons.length, 'save buttons');
    
    saveButtons.forEach(button => {
        const recipeName = button.getAttribute('data-recipe');
        
        // Check if recipe is already saved
        if (isRecipeSaved(recipeName)) {
            button.classList.add('saved');
            button.querySelector('i').classList.remove('far');
            button.querySelector('i').classList.add('fas');
        }
        
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            e.preventDefault();
            
            const isSaved = button.classList.contains('saved');
            const heartIcon = button.querySelector('i');
            
            if (isSaved) {
                // Remove from saved
                removeFromSaved(recipeName);
                button.classList.remove('saved');
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                console.log('Removed from saved:', recipeName);
            } else {
                // Add to saved
                addToSaved(recipeName);
                button.classList.add('saved');
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                console.log('Added to saved:', recipeName);
                
                // Show a brief confirmation
                showSavedConfirmation();
            }
        });
    });
    
    // Back button functionality
    if (backButton) {
        backButton.addEventListener('click', () => {
            hideRecipeDetail();
        });
    }
    
    // Carousel scroll functionality
    recipeCarousels.forEach(carousel => {
        const scrollContainer = carousel.querySelector('.recipe-carousel');
        if (!scrollContainer) return;
        
        let isScrolling = false;
        let startX;
        let scrollLeft;
        
        // Touch/mouse drag scrolling
        scrollContainer.addEventListener('mousedown', (e) => {
            isScrolling = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            scrollContainer.style.cursor = 'grabbing';
        });
        
        scrollContainer.addEventListener('mouseleave', () => {
            isScrolling = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mouseup', () => {
            isScrolling = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        scrollContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        
        scrollContainer.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Navigation active state management
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            const href = item.getAttribute('href');
            if (href && href.includes('home.html')) {
                item.classList.add('active');
            }
        });
    });
}

// Show recipe detail page
function showRecipeDetail(recipeName) {
    const recipe = recipeDatabase[recipeName];
    const recipeDetailPage = document.getElementById('recipe-detail');
    
    if (!recipeDetailPage) {
        console.error('Recipe detail page element not found');
        return;
    }
    
    if (!recipe) {
        // Create a default recipe for dishes not in database
        console.log('Recipe not found in database, creating default for:', recipeName);
        showDefaultRecipe(recipeName);
        return;
    }
    
    // Populate recipe data
    document.getElementById('recipe-hero-img').src = recipe.image;
    document.getElementById('recipe-title').textContent = recipeName;
    document.getElementById('cook-time').textContent = recipe.cookTime;
    document.getElementById('difficulty').textContent = recipe.difficulty;
    document.getElementById('servings').textContent = recipe.servings;
    document.getElementById('recipe-description').textContent = recipe.description;
    
    // Populate ingredients
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Populate instructions
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(instruction => {
        const div = document.createElement('div');
        div.className = 'instruction-step';
        div.textContent = instruction;
        instructionsList.appendChild(div);
    });
    
    // Populate tips
    document.getElementById('chef-tips').textContent = recipe.tips;
    
    // Populate nutrition
    const nutritionInfo = document.getElementById('nutrition-info');
    nutritionInfo.innerHTML = '';
    Object.entries(recipe.nutrition).forEach(([key, value]) => {
        const div = document.createElement('div');
        div.className = 'nutrition-item';
        div.innerHTML = `
            <div class="nutrition-value">${value}</div>
            <div class="nutrition-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
        `;
        nutritionInfo.appendChild(div);
    });
    
    // Show recipe detail page
    recipeDetailPage.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Show default recipe for dishes not in database
function showDefaultRecipe(recipeName) {
    const recipeDetailPage = document.getElementById('recipe-detail');
    
    // Find the recipe card to get the image
    let imageSrc = "../images/vegies.webp"; // Default fallback image
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        const cardTitle = card.querySelector('h3')?.textContent;
        if (cardTitle === recipeName) {
            const img = card.querySelector('img');
            if (img && img.src) {
                imageSrc = img.src.replace(window.location.origin, '');
                if (imageSrc.startsWith('/')) {
                    imageSrc = '..' + imageSrc;
                }
            }
        }
    });
    
    // Populate with default recipe data
    document.getElementById('recipe-hero-img').src = imageSrc;
    document.getElementById('recipe-title').textContent = recipeName;
    document.getElementById('cook-time').textContent = "30 mins";
    document.getElementById('difficulty').textContent = "Medium";
    document.getElementById('servings').textContent = "4 servings";
    document.getElementById('recipe-description').textContent = `Delicious ${recipeName} recipe coming soon! This traditional dish is loved for its amazing flavors and authentic taste.`;
    
    // Default ingredients
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    const defaultIngredients = [
        "Main ingredients as per traditional recipe",
        "Fresh herbs and spices",
        "Quality cooking oil or ghee",
        "Salt and pepper to taste",
        "Additional seasonings as needed"
    ];
    defaultIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Default instructions
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    const defaultInstructions = [
        "Prepare all ingredients according to traditional methods.",
        "Heat oil or ghee in a suitable cooking vessel.",
        "Follow the authentic cooking process for this dish.",
        "Add spices and seasonings at the right time.",
        "Cook until the dish reaches perfect consistency.",
        "Garnish appropriately and serve hot.",
        "Enjoy this delicious traditional recipe!"
    ];
    defaultInstructions.forEach(instruction => {
        const div = document.createElement('div');
        div.className = 'instruction-step';
        div.textContent = instruction;
        instructionsList.appendChild(div);
    });
    
    // Default tips
    document.getElementById('chef-tips').textContent = `For the best ${recipeName}, use fresh ingredients and follow traditional cooking methods. Adjust spices according to your taste preference.`;
    
    // Default nutrition
    const nutritionInfo = document.getElementById('nutrition-info');
    nutritionInfo.innerHTML = '';
    const defaultNutrition = {
        calories: "350",
        protein: "15g",
        carbs: "45g",
        fat: "12g"
    };
    Object.entries(defaultNutrition).forEach(([key, value]) => {
        const div = document.createElement('div');
        div.className = 'nutrition-item';
        div.innerHTML = `
            <div class="nutrition-value">${value}</div>
            <div class="nutrition-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
        `;
        nutritionInfo.appendChild(div);
    });
    
    // Show recipe detail page
    recipeDetailPage.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Hide recipe detail page
function hideRecipeDetail() {
    const recipeDetailPage = document.getElementById('recipe-detail');
    if (recipeDetailPage) {
        recipeDetailPage.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
}

// Check URL parameters for recipe navigation
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = urlParams.get('recipe');
    
    if (recipeName) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
            showRecipeDetail(recipeName);
        }, 500);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing home page...');
    try {
        initHomePage();
        checkUrlParameters();
        console.log('Home page initialization completed successfully');
    } catch (error) {
        console.error('Error initializing home page:', error);
    }
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('DOM is still loading...');
} else {
    console.log('DOM already loaded, initializing immediately...');
    try {
        initHomePage();
    } catch (error) {
        console.error('Error initializing home page:', error);
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Home page became visible');
        // Refresh data if needed
    }
});

// Handle back button navigation
window.addEventListener('popstate', (event) => {
    console.log('Back button pressed on home page');
    // Handle any cleanup if needed
});

// Add error handling for uncaught errors
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
});

// Saved recipes management functions
function getSavedRecipes() {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
}

function addToSaved(recipeName) {
    const savedRecipes = getSavedRecipes();
    if (!savedRecipes.includes(recipeName)) {
        savedRecipes.push(recipeName);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
}

function removeFromSaved(recipeName) {
    const savedRecipes = getSavedRecipes();
    const index = savedRecipes.indexOf(recipeName);
    if (index > -1) {
        savedRecipes.splice(index, 1);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
}

function isRecipeSaved(recipeName) {
    const savedRecipes = getSavedRecipes();
    return savedRecipes.includes(recipeName);
}

function showSavedConfirmation() {
    // Create and show a temporary confirmation message
    const confirmation = document.createElement('div');
    confirmation.className = 'save-confirmation';
    confirmation.innerHTML = `
        <i class="fas fa-heart"></i>
        <span>Recipe saved!</span>
    `;
    
    // Style the confirmation
    confirmation.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #FF6B00;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
        animation: slideInDown 0.3s ease-out;
    `;
    
    document.body.appendChild(confirmation);
    
    // Remove after 2 seconds
    setTimeout(() => {
        confirmation.style.animation = 'slideOutUp 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(confirmation);
        }, 300);
    }, 2000);
}

// Add CSS animations for confirmation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Test function to manually trigger recipe detail (for debugging)
window.testRecipeDetail = function(recipeName) {
    console.log('Testing recipe detail for:', recipeName);
    showRecipeDetail(recipeName || 'Chicken Caprese');
};

// Test function to check saved recipes (for debugging)
window.testSavedRecipes = function() {
    console.log('Saved recipes:', getSavedRecipes());
};