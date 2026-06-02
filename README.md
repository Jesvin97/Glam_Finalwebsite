# Glammore Premium Unisex Salon — Official Web Platform

An elite, high-end web experience crafted for **Glammore Premium Unisex Salon**, located at Club 7 Junction, MC Road, Thiruvalla, Kerala. This platform is built with modern web technologies, boasting a dark gold glassmorphic aesthetic, interactive service packages, and a robust headless CMS architecture.

---

## ✨ Features Implemented

### 1. Dedicated & Interactive Services Showcase (`/services`)
- **Complete 19+ Service Grid:** Showcases every treatment with customized descriptions, curated visual banners, and dynamic add-to-booking selectors.
- **Category Filter Tabs:** Smooth filter transitions for Hair Styling, Nail Care, Grooming & Waxing, Skin & Wellness, and Weddings & Events.
- **Dynamic Bottom Booking Console:** A full-width, glassmorphic bottom panel that slides up elegantly once a service is selected.
- **Conversational WhatsApp Integration:** Multi-select state compiler that compiles appointment preferences, stylist notes, and selections into a clean conversational template sent straight to WhatsApp (`+91 9645915329`).

### 2. Live Content Management (Sanity.io Studio at `/studio`)
An embedded administration studio connected to project ID `oewfkbvj`, fully supporting 100% free-tier limits:
- **Testimonial Manager:** Add and edit customer cards and avatars.
- **Service Menu Editor:** Control title, description, and dynamic image pathways.
- **FAQ Accordion Handler:** Update and order accordion cards.
- **Lifestyle Journal (Blogs) Schema:** Write and publish styling blogs.
- *Resilient local mock data fallbacks are integrated to guarantee absolute site visual performance even if offline or database empty.*

### 3. Sleek Homepage & Sizing Optimizations
- **Typography-Based Footer Branding:** Features a luxurious gold serif brand header: `"Glammore Premium Unisex Salon"` with wide tracking and letters.
- **Unified Visual Flow:** Tightened vertical paddings between the homepage services card grid and the rolling Testimonial marquee decks, making them feel like a single, cohesive experience.
- **Low-Profile FAQ accordion:** Tighter margins, smaller, clean headers, and centered alignment formatted exactly like the other core sections.
- **Fully Centered Mobile Footer:** Overrides align copyright notices, links, and powered taglines cleanly on phones.

---

## 🛠️ Technology Stack

- **Core Framework:** Next.js 15+ (App Router, Turbopack dev, React 19)
- **Styling Engine:** PostCSS with custom variables and Vanilla CSS utility classes (dark gold glassmorphism, responsive grids, Webkit blurs)
- **Headless CMS:** Sanity.io Studio v3 & `@sanity/image-url` optimization engines
- **Icons Kit:** React Icons (`fa` / FontAwesome suite)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
Navigate to the project root and run:
```bash
npm install
```

### 2. Configure Environment variables
Ensure you have a `.env.local` file containing the Sanity Project configurations:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="oewfkbvj"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### 3. Run Development Server
Start the Turbopack dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it live in your browser with Fast Refresh!

### 4. Build for Production
Verify typescript compilation, CSS rules, and static routing generations:
```bash
npm run build
```
This produces an extremely compact, high-speed production bundle with dynamic routes and optimized pre-rendered static pages.

---

## 📍 Location & Contact
- **Address:** 📍 Club 7 Junction, MC Road, Thiruvalla, Kerala, India
- **WhatsApp Support:** 📞 [+91 9645915329](https://wa.me/919645915329)
- **Facebook:** [Glammore Salon Official](https://www.facebook.com/glammoresalon/)
- **YouTube:** [@Glammoreunisexsalon](https://www.youtube.com/@Glammoreunisexsalon)

---
*Created and maintained by **Raphael Group** — [raphaelgroup.in](https://raphaelgroup.in)*
