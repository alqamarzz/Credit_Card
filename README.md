# Interactive 3D Credit Card Component

A modern, highly polished, and interactive 3D credit card form, built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 📸 Features

- 💳 **Realistic 3D Card Visuals**: 
  - Dual-sided card with smooth 3D flip physics (`transform-style: preserve-3d`).
  - Realistic EMV chip, NFC contactless indicator, and magnetic stripe.
  - Parallax 3D tilt tracking cursor motion.
- 🔄 **Smart Card Type Detection**: 
  - Dynamic detection & animated transitions for **Visa**, **Mastercard**, **American Express**, **Discover**, **Diners Club**, **JCB**, and **UnionPay**.
  - Amex 15-digit (`4-6-5`) and standard 16-digit (`4-4-4-4`) formatting.
- ✨ **Digit & Name Character Slide Animations**:
  - Individual character sliding transitions with custom text shadows as numbers and names are entered.
  - Middle digits masked with `*` and `#` placeholder padding.
  - Automatic smart name truncation and first-initial abbreviation algorithm for long cardholder names.
- 🎯 **Dynamic Focus Frame**:
  - Smoothly gliding focus frame that dynamically highlights the active input field (Card Number, Cardholder, Expiry) across the card surface.
- 🔐 **CVV Focus Auto-Flip**:
  - Automatically flips the card to the back when the CVV input is focused, revealing the security signature panel and masked CVV dots.
- 🎨 **Card Theme Switcher**:
  - Includes the default Ocean Waves texture (`3.jpeg`) + swappable themes (Obsidian Gold, Cyber Violet, Emerald Aurora, Crimson Luxe, Royal Champagne, Carbon Stealth).
- 🚀 **One-Click Card Presets**:
  - Quick-fill preset chips for testing Visa, Mastercard, Amex, and Discover cards instantly.
- 🎉 **Portaled Verification Modal & Confetti**:
  - Full-screen portaled confirmation modal with canvas confetti celebration upon proceeding.

---

## 🛠️ Tech Stack

- **Framework**: React 19 / Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti

---

## 🚀 Getting Started

### 1. Clone or Navigate to the Project

```bash
cd creditcard-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 📂 Project Structure

```
creditcard-app/
├── public/
│   ├── 3.jpeg              # High-res ocean wave card skin
│   ├── chip.png            # EMV chip asset
│   └── visa.png            # Visa logo asset
├── src/
│   ├── components/
│   │   ├── Card/
│   │   │   ├── Card.tsx          # 3D interactive flip card & digit animations
│   │   │   └── CardLogos.tsx     # Vector card brand logos & NFC symbol
│   │   ├── Form/
│   │   │   └── CardForm.tsx      # Form inputs, custom dropdowns & modal
│   │   └── ThemeSelector/
│   │       └── ThemeSelector.tsx # Card background theme toolbar
│   ├── context/
│   │   └── CardContext.tsx       # React Context state management & handlers
│   ├── data/
│   │   └── cardThemes.ts         # Card skin presets & gradients
│   ├── utils/
│   │   └── cardUtils.ts          # Brand detection, Luhn algorithm & masking
│   ├── types.ts                  # TypeScript definitions
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Tailwind directives & base styles
│   └── main.tsx                  # React DOM root entry
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

MIT
