# Open Graph Preview Image Instructions

## 📷 Replace the OG Preview Image

**File to Replace:** `og-preview.jpg`
**Location:** Place your Canva-created image in the `images/` folder

### 🎨 Canva Design Specifications

**Recommended Dimensions:**
- **Width:** 1200px
- **Height:** 630px
- **Aspect Ratio:** 1.91:1 (Facebook/OG standard)
- **Format:** JPG or PNG (JPG recommended for smaller file size)

### 📱 Platform Requirements

| Platform | Optimal Size | Minimum Size | Notes |
|----------|--------------|--------------|-------|
| **Facebook** | 1200 × 630px | 600 × 315px | Shows as large preview |
| **Twitter** | 1200 × 630px | 600 × 335px | Large card format |
| **WhatsApp** | 1200 × 630px | 300 × 200px | Automatically resized |
| **LinkedIn** | 1200 × 630px | 1080 × 608px | Professional networks |
| **Discord** | 1200 × 630px | 1200 × 630px | Gaming/chat platforms |

### 🎯 Design Recommendations

**Include These Elements:**
- ✅ InstaChef logo prominently displayed
- ✅ App name "InstaChef" clearly visible
- ✅ Tagline: "Snap it, Cook it, Share it, Love it"
- ✅ Food/cooking imagery (ingredients, recipes, phones)
- ✅ Brand colors: Orange (#FF6B35), Blue (#007BFF)
- ✅ Modern, appetizing food photography
- ✅ Mobile app mockup showing the interface

**Design Tips:**
- Use high-quality, appetizing food images
- Keep text large and readable (minimum 24px)
- Ensure important elements are within the "safe zone" (central area)
- Test how it looks when cropped to square (some platforms crop)
- Use contrasting colors for text readability

### 🔄 How to Replace

1. **Create your design in Canva** using the 1200×630px template
2. **Export as JPG** (high quality, smaller file size)
3. **Name the file:** `og-preview.jpg`
4. **Replace the file** in the `images/` folder
5. **Test the preview** using Facebook's Sharing Debugger or Twitter Card Validator

### 🧪 Testing Your OG Image

**Facebook Sharing Debugger:**
https://developers.facebook.com/tools/debug/

**Twitter Card Validator:**
https://cards-dev.twitter.com/validator

**LinkedIn Post Inspector:**
https://www.linkedin.com/post-inspector/

### 📝 Current Meta Tags Set

The following OG tags are already configured in `index.html`:

```html
<!-- Open Graph Tags -->
<meta property="og:image" content="https://instachef.app/images/og-preview.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter Tags -->
<meta name="twitter:image" content="https://instachef.app/images/og-preview.jpg">
```

**Note:** Update the domain `https://instachef.app/` to your actual domain when deploying!