/**
 * Saved Page JavaScript for InstaChef App
 */

// Import recipe database from home.js (we'll make it available globally)
// This will be populated when the page loads

// Saved recipes management
function getSavedRecipes() {
    const saved = localStorage.getItem('savedRecipes');
    const recipes = saved ? JSON.parse(saved) : [];
    
    // Clean up any null, undefined, or invalid entries
    const cleanRecipes = recipes.filter(recipeName => 
        recipeName && 
        recipeName !== 'null' && 
        recipeName !== 'undefined' && 
        typeof recipeName === 'string' && 
        recipeName.trim() !== ''
    );
    
    // If we filtered out any invalid entries, update localStorage
    if (cleanRecipes.length !== recipes.length) {
        localStorage.setItem('savedRecipes', JSON.stringify(cleanRecipes));
    }
    
    return cleanRecipes;
}

function removeFromSaved(recipeName) {
    const savedRecipes = getSavedRecipes();
    const index = savedRecipes.indexOf(recipeName);
    if (index > -1) {
        savedRecipes.splice(index, 1);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        loadSavedRecipes(); // Refresh the display
    }
}

function loadSavedRecipes() {
    const savedRecipes = getSavedRecipes();
    const savedRecipesList = document.getElementById('saved-recipes-list');
    
    if (!savedRecipesList) {
        console.error('Saved recipes list element not found');
        return;
    }
    
    if (savedRecipes.length === 0) {
        savedRecipesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="far fa-heart"></i>
                </div>
                <h3>No Saved Recipes Yet</h3>
                <p>Start exploring recipes and save your favorites!</p>
                <a href="home.html" class="explore-btn">
                    <i class="fas fa-home"></i>
                    Explore Recipes
                </a>
            </div>
        `;
        return;
    }
    
    // Create recipe cards for saved recipes
    const recipeCards = savedRecipes
        .filter(recipeName => recipeName && recipeName !== 'null' && recipeName !== 'undefined')
        .map(recipeName => {
            const recipe = getRecipeData(recipeName);
            if (!recipe || !recipe.image) return '';
            
            return `
            <div class="recipe-card" data-recipe="${recipeName}">
                <div class="recipe-image">
                    <img src="${recipe.image}" alt="${recipeName}">
                    <div class="recipe-actions">
                        <button class="action-btn save-btn saved" data-recipe="${recipeName}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn share-btn">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                    <div class="recipe-badge">
                        <i class="fas fa-clock"></i>
                        <span>${recipe.cookTime}</span>
                    </div>
                </div>
                <div class="recipe-content">
                    <h3>${recipeName}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>4.8</span>
                        </div>
                        <div class="difficulty">
                            <i class="fas fa-signal"></i>
                            <span>${recipe.difficulty}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    savedRecipesList.innerHTML = recipeCards;
    
    // Add event listeners to the new cards
    setupSavedRecipeEventListeners();
}

function getRecipeData(recipeName) {
    // Complete recipe database matching home.js
    const recipeDatabase = {
        "Chicken Caprese": {
            image: "../images/Home page dishes/Chicken Caprese.webp",
            description: "A delightful fusion of classic Italian Caprese salad with tender grilled chicken, creating a perfect harmony of fresh flavors and textures.",
            cookTime: "25 mins",
            difficulty: "Easy"
        },
        "Spicy Garlic Noodles": {
            image: "../images/Home page dishes/Spicy garlic Noodles.webp",
            description: "Fiery Asian-inspired noodles wok-tossed in an aromatic garlic sauce with the perfect balance of heat and umami flavors.",
            cookTime: "18 mins",
            difficulty: "Easy"
        },
        "Avocado Toast": {
            image: "../images/Home page dishes/Avocardo Toast.webp",
            description: "Creamy avocado spread on perfectly toasted bread, topped with fresh ingredients for a nutritious and delicious meal.",
            cookTime: "10 mins",
            difficulty: "Easy"
        },
        "Butter Paneer Masala": {
            image: "../images/Home page dishes/Butter Paneer Masala.webp",
            description: "Rich and creamy Indian curry featuring soft paneer cubes in a luscious tomato-based sauce with aromatic spices.",
            cookTime: "35 mins",
            difficulty: "Medium"
        },
        "Chicken Burger": {
            image: "../images/Home page dishes/Chicken Burger.webp",
            description: "Juicy grilled chicken burger with fresh lettuce, tomatoes, and special sauce on a toasted bun.",
            cookTime: "20 mins",
            difficulty: "Easy"
        },
        "Chilli Chicken": {
            image: "../images/Home page dishes/Chilli Chiken Gravy.webp",
            description: "Spicy Indo-Chinese chicken dish with bell peppers and onions in a flavorful sauce.",
            cookTime: "30 mins",
            difficulty: "Medium"
        },
        "Pasta Carbonara": {
            image: "../images/Home page dishes/Pasta Crbonara.webp",
            description: "Classic Italian pasta with eggs, cheese, pancetta, and black pepper creating a creamy sauce.",
            cookTime: "20 mins",
            difficulty: "Medium"
        },
        "Shrimp Scampi": {
            image: "../images/Home page dishes/Shrimp Scampi.webp",
            description: "Classic Italian-American dish featuring succulent shrimp sautéed in garlic, white wine, and butter, finished with fresh herbs and lemon.",
            cookTime: "20 mins",
            difficulty: "Easy"
        },
        "Vegetarian Chili": {
            image: "../images/Home page dishes/vegetarian Chilli.webp",
            description: "Hearty and satisfying plant-based chili loaded with beans, vegetables, and warming spices that deliver rich, complex flavors.",
            cookTime: "45 mins",
            difficulty: "Easy"
        },
        "Chicken Tikka Masala": {
            image: "../images/Home page dishes/CHicken tikka masala.webp",
            description: "Britain's favorite curry featuring tender marinated chicken in a rich, creamy tomato-based sauce with aromatic Indian spices.",
            cookTime: "60 mins",
            difficulty: "Medium"
        },
        "Palak Paneer": {
            image: "../images/Home page dishes/Palak paneer.webp",
            description: "Classic North Indian curry featuring soft paneer cubes in a vibrant, creamy spinach gravy spiced with traditional Indian aromatics.",
            cookTime: "35 mins",
            difficulty: "Medium"
        },
        "Paneer Masala": {
            image: "../images/Home page dishes/Butter Paneer Masala.webp",
            description: "Rich and creamy Indian curry featuring soft paneer cubes in a luscious tomato-based sauce with aromatic spices.",
            cookTime: "35 mins",
            difficulty: "Medium"
        },
        "Rajma Cury": {
            image: "../images/Home page dishes/Rajma Cury.webp",
            description: "Hearty Punjabi kidney bean curry in a rich, spiced tomato gravy - a beloved comfort food from North India perfect with rice.",
            cookTime: "90 mins",
            difficulty: "Medium"
        },
        "Rogan Josh": {
            image: "../images/Home page dishes/Rogan Josh.webp",
            description: "Aromatic Kashmiri lamb curry with a rich, deep red gravy infused with traditional spices like fennel, cardamom, and Kashmiri chilies.",
            cookTime: "120 mins",
            difficulty: "Hard"
        },
        "Chole": {
            image: "../images/Home page dishes/Chole.webp",
            description: "Popular Punjabi chickpea curry with bold spices, tangy flavors, and robust gravy - perfect with bhature or rice.",
            cookTime: "75 mins",
            difficulty: "Medium"
        },
        "Malai Kofta": {
            image: "../images/Home page dishes/Malai Kofta.webp",
            description: "Decadent vegetarian dish featuring fried paneer and potato dumplings in a rich, creamy tomato-cashew gravy.",
            cookTime: "60 mins",
            difficulty: "Hard"
        },
        "Butter Chicken": {
            image: "../images/Home page dishes/Butter Chicken.webp",
            description: "Creamy and rich Indian curry with tender chicken in a smooth tomato-based sauce.",
            cookTime: "45 mins",
            difficulty: "Medium"
        },
        "Dal Makhani": {
            image: "../images/Home page dishes/Dal Makhai.webp",
            description: "Rich and creamy black lentil curry slow-cooked with butter and cream.",
            cookTime: "60 mins",
            difficulty: "Medium"
        },
        "Chicken Biryani": {
            image: "../images/Home page dishes/Chicken Biriyani.webp",
            description: "Aromatic basmati rice layered with spiced chicken and cooked to perfection.",
            cookTime: "90 mins",
            difficulty: "Hard"
        },
        "Vada Pav": {
            image: "../images/Home page dishes/Vada Pav.webp",
            description: "Mumbai's iconic street food - spiced potato fritter in a soft bun with chutneys, known as the Indian burger.",
            cookTime: "45 mins",
            difficulty: "Medium"
        },
        "Pani Puri": {
            image: "../images/Home page dishes/Pani Puri.webp",
            description: "Popular Indian street snack of crispy hollow shells filled with spiced water, chutneys, and various fillings.",
            cookTime: "30 mins",
            difficulty: "Medium"
        },
        "Bhel Puri": {
            image: "../images/Home page dishes/Bhel Puri.webp",
            description: "Mumbai's favorite street snack - a tangy mixture of puffed rice, sev, chutneys, and fresh vegetables.",
            cookTime: "15 mins",
            difficulty: "Easy"
        },
        "Samosa": {
            image: "../images/Home page dishes/Samosa.webp",
            description: "Crispy triangular pastries filled with spiced potatoes and peas - India's most beloved snack served with chutneys.",
            cookTime: "90 mins",
            difficulty: "Hard"
        },
        "Masala Dosa": {
            image: "../images/Home page dishes/Masala Dosa.webp",
            description: "South Indian crispy crepe made from fermented rice and lentil batter, filled with spiced potato curry and served with chutneys.",
            cookTime: "48 hours",
            difficulty: "Hard"
        },
        "Pav Bhaji": {
            image: "../images/Home page dishes/Pav Bhaji.webp",
            description: "Mumbai's famous street food - thick spiced vegetable curry served with buttered and toasted bread rolls.",
            cookTime: "45 mins",
            difficulty: "Medium"
        },
        "Idli Sambhar": {
            image: "../images/Home page dishes/Idli.webp",
            description: "Classic South Indian breakfast of soft steamed rice cakes served with spiced lentil soup and coconut chutney.",
            cookTime: "24 hours",
            difficulty: "Hard"
        },
        "Kachori": {
            image: "../images/Home page dishes/Kachori.webp",
            description: "Flaky, crispy deep-fried pastries stuffed with spiced lentil filling - a popular North Indian snack served with chutneys.",
            cookTime: "75 mins",
            difficulty: "Hard"
        },
        "Vegetable Biryani": {
            image: "../images/Home page dishes/Vegetable Biriyani.webp",
            description: "Aromatic basmati rice layered with spiced mixed vegetables, herbs, and saffron - a vegetarian masterpiece.",
            cookTime: "75 mins",
            difficulty: "Hard"
        },
        "Mutton Biryani": {
            image: "../images/Home page dishes/Mutton Biriyani.webp",
            description: "Royal Hyderabadi-style biryani with tender mutton pieces marinated in yogurt and spices, layered with fragrant rice.",
            cookTime: "150 mins",
            difficulty: "Hard"
        },
        "Jeera Rice": {
            image: "../images/Home page dishes/Jeera Rice.webp",
            description: "Fragrant basmati rice tempered with cumin seeds and whole spices - a simple yet elegant accompaniment to curries.",
            cookTime: "25 mins",
            difficulty: "Easy"
        },
        "Paneer Pulao": {
            image: "../images/Home page dishes/Paneer Pulao.webp",
            description: "Aromatic rice dish with soft paneer cubes, mixed vegetables, and fragrant spices - a complete one-pot meal.",
            cookTime: "40 mins",
            difficulty: "Medium"
        },
        "Lemon Rice": {
            image: "../images/Home page dishes/Lemon Rice.webp",
            description: "Tangy South Indian rice dish tempered with mustard seeds, curry leaves, peanuts, and fresh lemon juice.",
            cookTime: "25 mins",
            difficulty: "Easy"
        },
        "Egg Biryani": {
            image: "../images/Home page dishes/Egg Biriyani.webp",
            description: "Flavorful biryani with perfectly boiled eggs marinated in spices and layered with aromatic basmati rice.",
            cookTime: "60 mins",
            difficulty: "Medium"
        },
        "Coconut Rice": {
            image: "../images/Home page dishes/Coconut Rice.webp",
            description: "Kerala-style aromatic rice cooked with fresh coconut milk and tempered with South Indian spices.",
            cookTime: "30 mins",
            difficulty: "Easy"
        },
        "Gulab Jamun": {
            image: "../images/Home page dishes/Gulab Jamun.webp",
            description: "Soft, spongy milk-based dumplings soaked in aromatic rose and cardamom-flavored sugar syrup - India's most beloved sweet.",
            cookTime: "60 mins",
            difficulty: "Hard"
        },
        "Rasgulla": {
            image: "../images/Home page dishes/Rasgulla.webp",
            description: "Spongy Bengali cottage cheese balls cooked in light sugar syrup - a refreshing and delicate Indian sweet.",
            cookTime: "45 mins",
            difficulty: "Hard"
        },
        "Jalebi": {
            image: "../images/Home page dishes/Jalebi.webp",
            description: "Crispy, spiral-shaped deep-fried batter soaked in saffron sugar syrup - a popular festive sweet with crunchy exterior and syrupy interior.",
            cookTime: "90 mins",
            difficulty: "Hard"
        },
        "Rice Kheer": {
            image: "../images/Home page dishes/Rice Kheer.webp",
            description: "Creamy, aromatic rice pudding slow-cooked with milk, sugar, and flavored with cardamom, saffron, and nuts.",
            cookTime: "75 mins",
            difficulty: "Medium"
        },
        "Besan Laddu": {
            image: "../images/Home page dishes/Besan Lddu.webp",
            description: "Traditional gram flour sweet balls made with roasted besan, ghee, sugar, and aromatic spices - a festival favorite.",
            cookTime: "45 mins",
            difficulty: "Medium"
        },
        "Kaju Barfi": {
            image: "../images/Home page dishes/Kaju Barfi.webp",
            description: "Rich, diamond-shaped cashew fudge made with cashew paste and sugar - a premium Indian sweet often served at celebrations.",
            cookTime: "30 mins",
            difficulty: "Hard"
        },
        "Kulfi": {
            image: "../images/Home page dishes/Kulfi.webp",
            description: "Traditional Indian ice cream made with reduced milk, cardamom, and nuts - denser and creamier than regular ice cream.",
            cookTime: "6 hours",
            difficulty: "Medium"
        },
        "Sandesh": {
            image: "../images/Home page dishes/Sandesh.webp",
            description: "Delicate Bengali sweet made with fresh cottage cheese, sugar, and cardamom - soft, melt-in-mouth texture with subtle sweetness.",
            cookTime: "30 mins",
            difficulty: "Medium"
        }
    };
    
    return recipeDatabase[recipeName] || {
        image: "../images/vegies.webp",
        description: `Delicious ${recipeName} recipe with authentic flavors.`,
        cookTime: "30 mins",
        difficulty: "Medium"
    };
}

function setupSavedRecipeEventListeners() {
    // Recipe card clicks
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.recipe-actions')) return;
            
            const recipeName = card.getAttribute('data-recipe');
            // Navigate to recipe detail (could open modal or navigate to detail page)
            console.log('Viewing recipe:', recipeName);
            // For now, we'll just redirect to home page to view the recipe
            window.location.href = `home.html?recipe=${encodeURIComponent(recipeName)}`;
        });
    });
    
    // Save button clicks
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const recipeName = button.getAttribute('data-recipe');
            removeFromSaved(recipeName);
            showRemovedConfirmation();
        });
    });
    
    // Share button clicks
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const recipeName = button.closest('.recipe-card').getAttribute('data-recipe');
            shareRecipe(recipeName);
        });
    });
}

function showRemovedConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'remove-confirmation';
    confirmation.innerHTML = `
        <i class="fas fa-heart-broken"></i>
        <span>Recipe removed from saved</span>
    `;
    
    confirmation.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #dc3545;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        animation: slideInDown 0.3s ease-out;
    `;
    
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.style.animation = 'slideOutUp 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(confirmation)) {
                document.body.removeChild(confirmation);
            }
        }, 300);
    }, 2000);
}

function shareRecipe(recipeName) {
    if (navigator.share) {
        navigator.share({
            title: `${recipeName} Recipe - InstaChef`,
            text: `Check out this delicious ${recipeName} recipe!`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const recipeUrl = `${window.location.origin}/pages/home.html?recipe=${encodeURIComponent(recipeName)}`;
        navigator.clipboard.writeText(recipeUrl).then(() => {
            alert('Recipe link copied to clipboard!');
        });
    }
}

function initSavedPage() {
    console.log('Saved page initialized');
    
    // Load saved recipes
    loadSavedRecipes();
    
    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const filter = tab.getAttribute('data-filter');
            // For now, we'll just reload all recipes
            // In a full implementation, you could filter by categories
            loadSavedRecipes();
        });
    });
    
    // Profile button functionality
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing saved page...');
    try {
        initSavedPage();
        console.log('Saved page initialization completed successfully');
    } catch (error) {
        console.error('Error initializing saved page:', error);
    }
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('DOM is still loading...');
} else {
    console.log('DOM already loaded, initializing immediately...');
    try {
        initSavedPage();
    } catch (error) {
        console.error('Error initializing saved page:', error);
    }
}

// Add CSS animations for confirmations
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
    
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #666;
    }
    
    .empty-icon {
        font-size: 64px;
        color: #ddd;
        margin-bottom: 20px;
    }
    
    .empty-state h3 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #333;
    }
    
    .empty-state p {
        font-size: 16px;
        margin-bottom: 30px;
    }
    
    .explore-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: #FF6B00;
        color: white;
        text-decoration: none;
        border-radius: 25px;
        font-weight: 500;
        transition: background-color 0.3s ease;
    }
    
    .explore-btn:hover {
        background: #e55a00;
    }
`;
document.head.appendChild(style);

// Debug functions
window.testSavedRecipes = function() {
    console.log('Saved recipes:', getSavedRecipes());
    loadSavedRecipes();
};