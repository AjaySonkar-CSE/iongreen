# 📄 Ion Green - Pages Guide (पेज गाइड)

यह document Ion Green project के सभी pages और उनके file paths की जानकारी देता है।

## 🗂️ Project Structure

यह एक **Next.js 16** application है जो **App Router** का उपयोग करती है।

- **Base Directory**: `c:\Users\Raigarh SM\Documents\GitHub1\iongreen\docs`
- **Pages Location**: `src/app/`
- **Port**: `3005` (Development)

---

## 📋 सभी Pages की List

### 1️⃣ **Home Page (मुख्य पेज)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/` | `src/app/page.tsx` | मुख्य होम पेज |

**Edit करने के लिए**: `src/app/page.tsx` file को edit करें

---

### 2️⃣ **About Page (हमारे बारे में)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/about` | `src/app/about/page.tsx` | About Us पेज |

**Edit करने के लिए**: `src/app/about/page.tsx` file को edit करें

---

### 3️⃣ **Contact Page (संपर्क)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/contact` | `src/app/contact/page.tsx` | Contact Us पेज |

**Edit करने के लिए**: `src/app/contact/page.tsx` file को edit करें

---

### 4️⃣ **Support Page (सहायता)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/support` | `src/app/support/page.tsx` | Support/Help पेज |

**Edit करने के लिए**: `src/app/support/page.tsx` file को edit करें

---

### 5️⃣ **Products Pages (उत्पाद पेज)**

#### Main Products Page
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/products` | `src/app/products/page.tsx` | सभी products की list |

#### Specific Product Pages
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/products/ion-green` | `src/app/products/ion-green/page.tsx` | Ion Green product |
| `/products/commercial-industrial-ess` | `src/app/products/commercial-industrial-ess/page.tsx` | Commercial & Industrial ESS |
| `/products/residential-energy-storage` | `src/app/products/residential-energy-storage/page.tsx` | Residential Energy Storage |
| `/products/large-scale-energy-storage` | `src/app/products/large-scale-energy-storage/page.tsx` | Large Scale Energy Storage |
| `/products/hybrid-energy-storage-cabinets` | `src/app/products/hybrid-energy-storage-cabinets/page.tsx` | Hybrid Energy Storage Cabinets |
| `/products/mobile-ev-charging-storage` | `src/app/products/mobile-ev-charging-storage/page.tsx` | Mobile EV Charging Storage |
| `/products/rack-mounted-batteries` | `src/app/products/rack-mounted-batteries/page.tsx` | Rack Mounted Batteries |
| `/products/flipkart-amazon` | `src/app/products/flipkart-amazon/page.tsx` | Flipkart/Amazon products |

#### Dynamic Product Category Page
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/products/[category]` | `src/app/products/[category]/page.tsx` | Dynamic category page |

**Layout File**: `src/app/products/layout.tsx`

**Edit करने के लिए**: 
- किसी specific product को edit करने के लिए उसकी `page.tsx` file को edit करें
- सभी products pages के common layout को edit करने के लिए `src/app/products/layout.tsx` को edit करें

---

### 6️⃣ **Solutions Pages (समाधान पेज)**

#### Main Solutions Page
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/solutions` | `src/app/solutions/page.tsx` | सभी solutions की list |

#### Dynamic Solution Pages
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/solutions/[solution]` | `src/app/solutions/[solution]/page.tsx` | Specific solution का main page |
| `/solutions/[solution]/features` | `src/app/solutions/[solution]/features/page.tsx` | Solution की features |
| `/solutions/[solution]/advantages` | `src/app/solutions/[solution]/advantages/page.tsx` | Solution के advantages |
| `/solutions/[solution]/applications` | `src/app/solutions/[solution]/applications/page.tsx` | Solution के applications |
| `/solutions/[solution]/projects` | `src/app/solutions/[solution]/projects/page.tsx` | Related projects |

**Layout File**: `src/app/solutions/layout.tsx`

**Edit करने के लिए**: 
- किसी specific solution section को edit करने के लिए उसकी `page.tsx` file को edit करें
- सभी solutions pages के common layout को edit करने के लिए `src/app/solutions/layout.tsx` को edit करें

---

### 7️⃣ **News Pages (समाचार पेज)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/news` | `src/app/news/page.tsx` | सभी news articles की list |
| `/news/[slug]` | `src/app/news/[slug]/page.tsx` | Individual news article |

**Edit करने के लिए**: 
- News listing page: `src/app/news/page.tsx`
- Individual news article: `src/app/news/[slug]/page.tsx`

---

### 8️⃣ **Lab Equipment Pages (प्रयोगशाला उपकरण)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/lab-equipment` | `src/app/lab-equipment/page.tsx` | सभी lab equipment की list |
| `/lab-equipment/[slug]` | `src/app/lab-equipment/[slug]/page.tsx` | Individual equipment details |

**Edit करने के लिए**: 
- Equipment listing: `src/app/lab-equipment/page.tsx`
- Individual equipment: `src/app/lab-equipment/[slug]/page.tsx`

---

### 9️⃣ **Case Studies Page (केस स्टडी)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/case` | `src/app/case/page.tsx` | Case studies page |

**Edit करने के लिए**: `src/app/case/page.tsx` file को edit करें

---

### 🔟 **Dynamic Slug Page (डायनामिक पेज)**

| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/[slug]` | `src/app/[slug]/page.tsx` | Any dynamic content page |

**Edit करने के लिए**: `src/app/[slug]/page.tsx` file को edit करें

---

## 🔐 Admin Panel Pages (एडमिन पैनल)

### Admin Dashboard
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/admin` | `src/app/admin/page.tsx` | Admin dashboard |

**Layout File**: `src/app/admin/layout.tsx`

### Products Management
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/admin/products` | `src/app/admin/products/page.tsx` | Products list |
| `/admin/products/new` | `src/app/admin/products/new/page.tsx` | Add new product |
| `/admin/products/[id]` | `src/app/admin/products/[id]/page.tsx` | Edit product |

### Solutions Management
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/admin/solutions` | `src/app/admin/solutions/page.tsx` | Solutions list |
| `/admin/solutions/new` | `src/app/admin/solutions/new/page.tsx` | Add new solution |
| `/admin/solutions/[id]` | `src/app/admin/solutions/[id]/page.tsx` | Edit solution |

### News Management
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/admin/news` | `src/app/admin/news/page.tsx` | News list |
| `/admin/news/new` | `src/app/admin/news/new/page.tsx` | Add new article |
| `/admin/news/[id]` | `src/app/admin/news/[id]/page.tsx` | Edit article |

### Lab Equipment Management
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/admin/lab-equipment` | `src/app/admin/lab-equipment/page.tsx` | Equipment list |
| `/admin/lab-equipment/new` | `src/app/admin/lab-equipment/new/page.tsx` | Add new equipment |
| `/admin/lab-equipment/[id]` | `src/app/admin/lab-equipment/[id]/page.tsx` | Edit equipment |

### Case Studies Management
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/admin/case-studies` | `src/app/admin/case-studies/page.tsx` | Case studies list |
| `/admin/case-studies/new` | `src/app/admin/case-studies/new/page.tsx` | Add new case study |
| `/admin/case-studies/[id]` | `src/app/admin/case-studies/[id]/page.tsx` | Edit case study |

### Hero Slides Management
| Page URL | File Path | Description |
|----------|-----------|-------------|
| `/admin/hero-slides` | `src/app/admin/hero-slides/page.tsx` | Hero slides list |
| `/admin/hero-slides/new` | `src/app/admin/hero-slides/new/page.tsx` | Add new slide |
| `/admin/hero-slides/[id]` | `src/app/admin/hero-slides/[id]/page.tsx` | View slide |
| `/admin/hero-slides/[id]/edit` | `src/app/admin/hero-slides/[id]/edit/page.tsx` | Edit slide |

---

## 🎨 Global Files (सभी pages पर लागू होने वाली files)

| File | Purpose | Description |
|------|---------|-------------|
| `src/app/layout.tsx` | Root Layout | सभी pages का main layout |
| `src/app/globals.css` | Global Styles | सभी pages की global CSS |
| `src/app/animations.css` | Animations | Animation styles |

---

## 📁 Important Directories

| Directory | Purpose |
|-----------|---------|
| `src/components/` | Reusable components |
| `src/lib/` | Utility functions और helpers |
| `src/hooks/` | Custom React hooks |
| `src/actions/` | Server actions |
| `public/` | Static files (images, etc.) |
| `scripts/` | Database और utility scripts |

---

## 🛠️ Development Commands

```bash
# Development server start करें
npm run dev

# Production build बनाएं
npm run build

# Production server start करें
npm start

# Database initialize करें
npm run db:init

# Database reset करें
npm run db:reset

# Admin user बनाएं
npm run admin:create
```

---

## 📝 Page Edit करने का तरीका

### किसी भी page को edit करने के लिए:

1. **File खोलें**: ऊपर दी गई table से file path देखें
2. **Edit करें**: `page.tsx` file में changes करें
3. **Save करें**: File को save करें
4. **Browser में देखें**: Development server automatically reload हो जाएगा

### Example:
अगर आपको **About Page** edit करना है:
- File: `src/app/about/page.tsx`
- इस file को open करें और changes करें
- Save करने पर browser में automatically update हो जाएगा

---

## 🔗 Dynamic Routes का मतलब

- `[slug]` - यह एक dynamic parameter है
- Example: `/news/my-article` में `my-article` slug है
- File `[slug]/page.tsx` सभी dynamic URLs को handle करती है

---

## 📞 Support

अगर कोई confusion हो तो:
1. Development server चालू रखें: `npm run dev`
2. Browser में `http://localhost:3005` खोलें
3. किसी भी page पर जाएं और उसका URL देखें
4. ऊपर दी गई table में वो URL ढूंढें

---

**Last Updated**: February 10, 2026  
**Project**: Ion Green  
**Framework**: Next.js 16 (App Router)
