# Coffee Dialing Calculator ☕️

A premium, interactive tool to help you dial in the perfect cup of coffee. Built with React, Tailwind CSS, and Lucide icons.

**[Launch App](https://martandatrey.github.io/coffee-dialer/)**

## ✨ Key Features

### 🎛️ Interactive Dialing
- **Smart Sliders**: Fine-tune **Dose**, **Water**, **Temperature**, **Time**, and **Grind Size**.
- **Golden Ratio Lock 🔒**: Automatically calculates water when you change dose (or vice versa) to maintain the perfect ratio.
- **Roast Level Selector**: 
    - **Light**: Hotter brew, finer grind.
    - **Medium**: Balanced default.
    - **Medium Dark**: Slightly cooler, slightly coarser.
    - **Dark**: Cooler water, coarser grind.

### ⚙️ Grinder Conversions
Stop guessing micron values! Select your specific grinder model to see exact **Clicks**, **Settings**, or **Dial Numbers**:
- **1Zpresso**: K-Max, Q Series, J-Max, X-Pro
- **Baratza**: Encore, Virtuoso+
- **Comandante**: C40
- **Timemore**: C2 / C3 / C3 ESP
- **Kingrinder**: K6, K-Series
- **Fellow**: Ode, Opus
- **Eureka**: Mignon

### ⏱️ Integrated Tools
- **Brew Timer**: Built-in stopwatch for your pour-over.
- **Wake Lock**: Keeps your screen awake while the timer is running so your phone doesn't sleep mid-brew.
- **AeroPress Advanced Mode**: Custom logic for **Metal** vs **Paper** filters (auto-adjusts grind size).

### 👅 Taste Profiler
Fix your coffee based on what you taste.
- **Too Sour?** → One-click fix to extract MORE (Finer grind, hotter temp).
- **Too Bitter?** → One-click fix to extract LESS (Coarser grind, cooler temp).
- **Intensity Control**: Choose between "Slightly" or "Very" adjustments.

### 📖 Journal & Sharing
- **Brew Log**: Rate your cup (1-5 ⭐) and write tasting notes.
- **Bean Tracking**: Input the exact coffee beans you are using.
- **Rich Sharing**: Copies a formatted recipe with **Grinder Settings**, **Roast Level**, **Beans**, and a deep link to the app.

## 🛠️ Configuration
Power users can tune the app's internal logic!
- Edit `src/config/tuningConfig.js` to change adjustment formulas, temperature steps, or filter offsets.

## 💻 Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, PostCSS (Glassmorphism UI)
- **State Management**: React Hooks + LocalStorage Persistence
- **Deployment**: GitHub Pages

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Dev Server**:
    ```bash
    npm run dev
    ```

3.  **Deploy**:
    ```bash
    npm run deploy
    ```
