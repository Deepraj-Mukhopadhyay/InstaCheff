import re

# Read the current home.html file
with open('e:/Insta-Chef app/pages/home.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match recipe cards that don't have save buttons yet
pattern = r'<div class="recipe-card">\s*<img src="([^"]+)" alt="([^"]+)">\s*<h3>([^<]+)</h3>\s*<p>([^<]+)</p>\s*</div>'

def replace_recipe_card(match):
    img_src = match.group(1)
    img_alt = match.group(2)
    recipe_name = match.group(3)
    description = match.group(4)
    
    return f'''<div class="recipe-card" data-recipe="{recipe_name}">
          <div class="recipe-image-container">
            <img src="{img_src}" alt="{img_alt}">
            <button class="save-recipe-btn" data-recipe="{recipe_name}">
              <i class="far fa-heart"></i>
            </button>
          </div>
          <h3>{recipe_name}</h3>
          <p>{description}</p>
        </div>'''

# Replace all matching patterns
updated_content = re.sub(pattern, replace_recipe_card, content)

# Write the updated content back
with open('e:/Insta-Chef app/pages/home.html', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Updated all recipe cards with save buttons!")