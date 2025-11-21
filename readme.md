# InstaChef - AI-Powered Recipe Generation App

> **Copyright © 2025 Culinary Coders Team - All Rights Reserved**

A sophisticated web-based recipe application that uses AI to generate recipes from food images. Designed and developed by the Culinary Coders team.

## 👥 Team Members & Credits

**Culinary Coders Team:**
- **🎨 Deepraj Mukhopadhyay** - *Team Leader & Lead Designer*
  - All UI/UX designs and animations
  - Creative direction and visual identity
  - Frontend architecture
- **👨‍💻 Anant Kumar Thakur** - *Member*
- **👩‍💻 Oishee Banerjee** - *Member*  
- **👨‍💻 Dipanjan Roy** - *Member*

## 📄 License & Copyright

**All Rights Reserved** - This application and all its components are the exclusive intellectual property of the Culinary Coders team.

- **Designs & Animations:** Created by Deepraj Mukhopadhyay
- **Code & Implementation:** Collaborative effort by the entire team
- **Concept & Innovation:** Culinary Coders original work

**⚠️ Important:** This software is proprietary. Unauthorized copying, distribution, or modification is strictly prohibited. See [LICENSE](LICENSE) file for complete terms.

## Features

- **Splash Screen:** The app starts with a splash screen that automatically transitions to the login page after 3 seconds.
- **Onboarding:** First-time users see an onboarding tutorial.
- **Authentication:** Login/signup functionality with email or Google options.
- **Home Feed:** Browse trending recipes and categories.
- **Scan Ingredients:** Take a photo or upload an image of ingredients to get recipe suggestions.
- **Recipe Details:** View detailed recipes with ingredients, instructions, and nutritional information.
- **Saved Recipes:** Save favorite recipes for quick access later.
- **Profile:** User profile with personal recipes and settings.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Responsive Design

## Screens

1. **Splash Screen:** Initial loading screen with app logo
2. **Onboarding:** Tutorial screens for first-time users
3. **Login/Signup:** Authentication screens
4. **Home:** Main feed with trending recipes and categories
5. **Scan:** Camera/upload interface for ingredient recognition
6. **Recipe Detail:** Detailed view of recipes with ingredients and instructions
7. **Saved Recipes:** Collection of user's saved recipes
8. **Profile/Settings:** User profile and app settings

## How to Run

Simply open the `index.html` file in a web browser to run the app.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## CSS Architecture Documentation

### 📁 Organized Folder Structure

```
css/
├── main.css                    # Main CSS entry point (imports all common styles)
├── index.css                   # CSS for index.html (splash screen)
├── print.css                   # Print-specific styles
├── 
├── common/                     # Shared styles across all pages
│   ├── base.css               # CSS reset, variables, body styles
│   ├── components.css         # Reusable components (buttons, cards, forms)
│   └── navigation.css         # Header and bottom navigation styles
│   
├── utilities/                  # Small helper classes
│   └── helpers.css            # Utility classes (margins, flex, colors, etc.)
│   
├── responsive/                 # Device and orientation specific styles
│   ├── breakpoints.css        # Screen size responsive rules
│   ├── portrait.css           # Portrait orientation optimizations
│   ├── landscape.css          # Landscape orientation optimizations
│   └── device-fixes.css       # iOS/Android specific fixes
│   
└── pages/                     # Page-specific styles
    ├── splash.css             # Splash screen styles
    ├── home.css               # Home page specific styles
    ├── login.css              # Login page specific styles
    ├── onboarding.css         # Onboarding page specific styles
    ├── scan.css               # Scan page specific styles
    ├── saved.css              # Saved recipes page styles
    ├── profile.css            # Profile page specific styles
    └── [other pages].css      # Additional page-specific styles
```

### 🎯 CSS Loading Strategy

**For Main Index Page (index.html):**
```html
<link rel="stylesheet" href="css/index.css">
```

**For All Other Pages:**
```html
<!-- Main organized CSS -->
<link rel="stylesheet" href="../css/main.css">
<!-- Page-specific CSS -->
<link rel="stylesheet" href="../css/pages/[page-name].css">
```

### 🧩 Architecture Breakdown

- **Common Styles** (`css/common/`): Shared across all pages
- **Utilities** (`css/utilities/`): Small, reusable utility classes  
- **Responsive** (`css/responsive/`): Device and orientation handling
- **Pages** (`css/pages/`): Page-specific styles only

### 📏 Naming Conventions

- **Component classes**: `.button`, `.card`, `.recipe-card`
- **Page-specific classes**: `.home-container`, `.login-title`
- **Utility classes**: `.flex`, `.text-center`, `.mt-20`
- **File names**: kebab-case (`home-page.css`)

### 🎨 CSS Variables (Available Globally)

```css
--primary-color: #7aba40;    /* Green from logo */
--accent-color: #f37b20;     /* Orange from logo */
--text-color: #333;          /* Main text color */
--secondary-color: #f8f8f8;  /* Light background */
```

This organized structure ensures maintainable, scalable CSS that's easy to understand and modify.

## Future Improvements

- Backend integration with a real database
- User authentication with secure storage
- Real image recognition for ingredients
- Social sharing features
- Recipe rating and comments system

## Project Structure

```
insta-chef/
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   ├── app.js
│   └── router.js
├── images/
│   ├── icons/
│   ├── recipes/
│   └── ...
├── pages/
│   ├── home.html
│   ├── login.html
│   ├── signup.html
│   ├── onboarding.html
│   ├── scan.html
│   ├── saved.html
│   └── profile.html
└── index.html
```

## Credits

Created as a demonstration project for a modern, responsive web application.