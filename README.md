# Coffee Dialing Calculator ☕️

A premium, interactive tool to help you dial in the perfect cup of coffee. Built with React, Tailwind CSS, and Lucide icons.

**[Launch App](https://martandatrey.github.io/coffee-dialer/)**

## ✨ Features

### 🎛️ Interactive Controls
- **Precision Sliders**: Fine-tune Dose, Water, Temperature, Time, and Grind Size.
- **Grind Precision**: Adjustment steps of **15µm** (microns) for exact dialing.
- **Micro-Adjustments**: Plus (+) and Minus (-) buttons for every parameter.
- **Golden Ratio Lock**: Automatically adjusts water when you change the dose (and vice versa) to maintain the perfect specified ratio.

### ☕️ Brewing Methods & Presets
Intelligent defaults for popular brewing styles:
- **Espresso**
- **V60**
- **French Press**
- **Cold Brew**
- **AeroPress**: Standard and Flow Control variants.

### 🔍 AeroPress Advanced Mode
Specialized tools for AeroPress users:
- **Flow Control Preset**: Optimized for Prismo/Joepresso attachments.
- **Filter Type Toggle**:
    - **Paper**: Standard grind profile.
    - **Metal**: Auto-adjusts grind **finer** (-50µm) for cleaner body.
    - **Both**: Auto-adjusts grind **coarser** (+50µm) for higher pressure resistance.

### 👅 Taste Profiler
Dial in your brew based on taste:
- **Too Sour?**: One-click adjustment to extract MORE (Finer grind, hotter temp, or longer time).
- **Too Bitter?**: One-click adjustment to extract LESS (Coarser grind, cooler temp, or shorter time).

### 📖 Brew Log & Persistence
- **Rating System**: Rate your brews from 1 to 5 stars.
- **Tasting Notes**: Personal journal for flavor notes (e.g., "Fruity acidity, heavy body").
- **Pro Tips**: Method-specific advice displayed for every brew.
- **Auto-Save**: Ratings and notes are persisted locally so you never lose them.

### 🚀 Smart Sharing
- **Deep Linking**: Share exact recipes via URL (e.g., `?m=V60&d=20&w=320`).
- **Rich Clipboard Copy**: Generates a detailed text summary with your recipe, rating, notes, and a direct link to the app.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Deploy to GitHub Pages**:
    ```bash
    npm run deploy
    ```
