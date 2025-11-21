/**
 * InstaChef - AI-Powered Recipe Generation App
 * Main Application JavaScript
 * 
 * Copyright (c) 2025 Culinary Coders Team
 * All Rights Reserved
 * 
 * Team Members:
 * • Deepraj Mukhopadhyay - Team Leader & Lead Designer
 * • Anant Kumar Thakur - Developer  
 * • Oishee Banerjee - Developer
 * • Dipanjan Roy - Developer
 * 
 * All code, animations, and interactive features are the exclusive
 * intellectual property of the Culinary Coders team.
 * 
 * License: All Rights Reserved
 * Version: 1.0.0
 * Created: 2025
 */

// Global app controller
const App = {
    // Store app state
    state: {
        currentPage: '',
        user: null,
        recipes: [],
        savedRecipes: [],
        currentRecipe: null,
        splashScreenShown: false,
        onboardingComplete: false,
    },
    
    // Register a new user
    registerUser: function(user) {
        // In a real app, this would send a request to an API
        console.log('Registering user:', user);
        
        // Save user to local storage
        localStorage.setItem('instaChefUser', JSON.stringify(user));
        
        // Update state
        this.state.user = user;
        
        return user;
    },
    
    // Login a user
    loginUser: function(user) {
        // In a real app, this would send a request to an API
        console.log('Logging in user:', user);
        
        // Save user to local storage
        localStorage.setItem('instaChefUser', JSON.stringify(user));
        
        // Update state
        this.state.user = user;
        
        return user;
    },
    
    // Logout the current user
    logoutUser: function() {
        // In a real app, this would send a request to an API
        console.log('Logging out user');
        
        // Remove user from local storage
        localStorage.removeItem('instaChefUser');
        
        // Update state
        this.state.user = null;
        
        // Navigate to login
        Router.navigateTo('login');
    },
    
    // Initialize the application
    init: function() {
        console.log('InstaChef app initialized');
        
        // Handle splash screen
        this.handleSplashScreen();
        
        // Initialize the router
        Router.init();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadInitialData();
    },
    
    // Handle splash screen display and transition
    handleSplashScreen: function() {
        const splashScreen = document.getElementById('splash-screen');
        const appContainer = document.querySelector('.app-container');
        const getStartedBtn = document.getElementById('get-started-btn');
        
        // If splash screen already shown in this session, skip it
        if (sessionStorage.getItem('splashScreenShown')) {
            splashScreen.style.display = 'none';
            appContainer.style.display = 'block';
            return;
        }
        
        // Handle Get Started button click - ONLY way to proceed past splash screen
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                this.hideSplashScreen(splashScreen, appContainer);
            });
        }
    },
    
    // Hide splash screen and show app
    hideSplashScreen: function(splashScreen, appContainer) {
        // Don't do anything if transition is already happening
        if (this.state.splashScreenShown) return;
        this.state.splashScreenShown = true;
        
        // Mark splash screen as shown in session storage
        sessionStorage.setItem('splashScreenShown', 'true');
        
        // Add fade-out class to create transition
        splashScreen.classList.add('fade-out');
        
        // After transition, hide splash screen and show app
        setTimeout(() => {
            splashScreen.style.display = 'none';
            appContainer.style.display = 'block';
            
            // Always navigate to onboarding page when Get Started is clicked
            Router.navigateTo('onboarding');
            
        }, 500);
    },
    
    // Set up global event listeners
    setupEventListeners: function() {
        // Global profile button functionality
        document.addEventListener('click', (e) => {
            // Handle profile button clicks
            if (e.target.closest('.profile-button')) {
                e.preventDefault();
                console.log('Profile button clicked - navigating to profile page');
                Router.navigateTo('profile');
                return;
            }
            
            // Handle navigation clicks if has data-nav attribute
            if (e.target.hasAttribute('data-nav')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-nav');
                Router.navigateTo(page);
            }
        });
    },
    
    // Load any initial data needed
    loadInitialData: function() {
        // This would load any necessary data from localStorage or an API
        // For now, just checking if user is logged in from localStorage
        const savedUser = localStorage.getItem('instaChefUser');
        if (savedUser) {
            try {
                this.state.user = JSON.parse(savedUser);
                console.log('User loaded from storage:', this.state.user.username);
            } catch (e) {
                console.error('Error parsing saved user data:', e);
                localStorage.removeItem('instaChefUser');
            }
        }
        
        // Load saved recipes if user is logged in
        if (this.state.user) {
            this.loadSavedRecipes();
        }
        
        // Check if onboarding is complete
        if (localStorage.getItem('onboardingComplete')) {
            this.state.onboardingComplete = true;
        }
        
        // Load sample recipes (in a real app, these would come from an API)
        this.loadSampleRecipes();
    },
    
    // Load sample recipes
    loadSampleRecipes: function() {
        this.state.recipes = [
            {
                id: 1,
                title: 'Spaghetti Bolognese',
                description: 'A classic Italian favorite.',
                image: 'images/spaghetti-bolognese.jpg',
                prepTime: '20 min',
                cookTime: '40 min',
                calories: '550 kcal',
                ingredients: [
                    { name: 'Ground Beef', quantity: '500g', image: 'images/ingredients/beef.jpg' },
                    { name: 'Tomato Sauce', quantity: '400g', image: 'images/ingredients/tomato-sauce.jpg' },
                    { name: 'Onion', quantity: '1 medium', image: 'images/ingredients/onion.jpg' },
                    { name: 'Garlic', quantity: '2 cloves', image: 'images/ingredients/garlic.jpg' },
                    { name: 'Parmesan', quantity: '30g', image: 'images/ingredients/parmesan.jpg' }
                ],
                instructions: [
                    'Brown the beef...',
                    'Add sauce and simmer...',
                    'Cook pasta...',
                    'Combine and serve with cheese'
                ],
                author: 'Chef Mario'
            },
            {
                id: 2,
                title: 'Chicken Caprese',
                description: 'Fresh tomato, mozzarella, and basil',
                image: 'images/chicken-caprese.jpg',
                prepTime: '15 min',
                cookTime: '25 min',
                calories: '420 kcal',
                author: 'Chef Emma'
            },
            {
                id: 3,
                title: 'Spicy Garlic Noodles',
                description: 'Simple Asian-inspired noodles',
                image: 'images/garlic-noodles.jpg',
                prepTime: '10 min',
                cookTime: '15 min',
                calories: '380 kcal',
                author: 'Chef Lee'
            }
        ];
    },
    
    // Load saved recipes from localStorage
    loadSavedRecipes: function() {
        const savedRecipes = localStorage.getItem('instaChefSavedRecipes');
        if (savedRecipes) {
            try {
                this.state.savedRecipes = JSON.parse(savedRecipes);
                console.log('Saved recipes loaded:', this.state.savedRecipes.length);
            } catch (e) {
                console.error('Error parsing saved recipes:', e);
                localStorage.removeItem('instaChefSavedRecipes');
            }
        }
    },
    
    // Save or unsave a recipe
    toggleSaveRecipe: function(recipeId) {
        // Check if recipe is already saved
        const savedIndex = this.state.savedRecipes.findIndex(id => id === recipeId);
        
        if (savedIndex !== -1) {
            // Remove from saved
            this.state.savedRecipes.splice(savedIndex, 1);
            console.log('Recipe removed from saved:', recipeId);
        } else {
            // Add to saved
            this.state.savedRecipes.push(recipeId);
            console.log('Recipe saved:', recipeId);
        }
        
        // Save to localStorage
        localStorage.setItem('instaChefSavedRecipes', JSON.stringify(this.state.savedRecipes));
        
        return savedIndex === -1;
    },
    
    // Get current recipe
    getCurrentRecipe: function() {
        return this.state.currentRecipe;
    },
    
    // Set current recipe
    setCurrentRecipe: function(recipe) {
        this.state.currentRecipe = recipe;
    },
    
    // Complete onboarding
    completeOnboarding: function() {
        localStorage.setItem('onboardingComplete', 'true');
        this.state.onboardingComplete = true;
    },
    
    // Check if user is logged in
    isLoggedIn: function() {
        return this.state.user !== null || localStorage.getItem('instaChefUser') !== null;
    }
};

// Simple Router implementation
const Router = {
    // Initialize the router
    init: function() {
        console.log('Router initialized');
    },
    
    // Navigate to a specific page
    navigateTo: function(page, params) {
        console.log('Navigating to:', page, params);
        
        // Map page names to file paths
        const pageMap = {
            'home': 'home.html',
            'explore': 'explore.html',
            'scan': 'scan.html',
            'scan-result': 'scan-result.html',
            'scan-history': 'scan-history.html',
            'saved': 'saved.html',
            'profile': 'profile.html',
            'login': 'login.html',
            'onboarding': 'onboarding.html'
        };
        
        // Get the target page
        const targetPage = pageMap[page] || page + '.html';
        
        // Navigate to the page
        if (targetPage.includes('.html')) {
            // Check if we're in the pages directory by looking at current path
            const currentPath = window.location.pathname;
            if (currentPath.includes('/pages/')) {
                // We're in pages directory, navigate to another page in the same directory
                window.location.href = targetPage;
            } else {
                // We're in root directory, navigate to pages directory
                window.location.href = 'pages/' + targetPage;
            }
        } else {
            console.error('Unknown page:', page);
        }
    },
    
    // Navigate back (simple implementation)
    navigateBack: function() {
        window.history.back();
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});