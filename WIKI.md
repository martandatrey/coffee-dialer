# Coffee Dialer Wiki 📖

Welcome to the Coffee Dialer user manual. This app is designed to take the guesswork out of brewing specialty coffee.

## 🏁 Getting Started

1.  **Select Method**: Choose your brew method (V60, French Press, AeroPress, etc.) from the top dropdown.
2.  **Select Roast**: Tap **Light**, **Medium**, or **Dark**. The app will automatically shift the temperature and grind targets.
3.  **Choose Beans**: Enter the name of your coffee (e.g., "Ethiopia Guji") in the input field.
4.  **Select Grinder**: Pick your grinder model from the dropdown above the "Grind Size" slider. Now you'll see **Clicks/Numbers** instead of just microns.

---

## 🎯 Dialing In Your Brew

### The Golden Ratio
The "Ratio" button (Lock/Unlock) keeps your brew ratio constant.
- **Locked**: Changing Dose (15g) auto-updates Water (250g) to keep the ratio (e.g., 1:16.7).
- **Unlocked**: Move sliders independently to experiment with ratio.

### AeroPress Filters
If you select **AeroPress**, a filter toggle appears:
- **Paper**: Standard recipe.
- **Metal**: Adjusts grind **finer (-50µm)** to compensate for faster flow.
- **Both**: Adjusts grind **coarser (+50µm)** to handle the extra resistance.

---

## 👅 Taste Profiler Guide

The most powerful feature of this app. Don't guess—taste and adjust.

### "My Coffee is Sour" 🍋
This means **Under-extraction**. The water didn't pull enough flavor.
- **Slightly**: Makes grind finer (-20µm) or hotter (+2°C).
- **Very**: Aggressive change (-75µm) to slow down the brew.

### "My Coffee is Bitter" 🍫
This means **Over-extraction**. The water pulled too many harsh compounds.
- **Slightly**: Makes grind coarser (+20µm) or cooler (-2°C).
- **Very**: Aggressive change (+75µm) to speed up the brew.

---

## ⏱️ Brew Timer
1.  Tap **Start Brew Timer**.
2.  **Screen Wake Lock**: Your phone screen will stay ON while the timer is running. No more tapping with wet hands!

---

## 🛠️ Advanced Configuration

You can customize the math behind the app by editing `src/config/tuningConfig.js`.

### Adding a New Grinder
Open `src/constants/coffeeData.js` and add to the `GRINDERS` object:

```javascript
'MY_GRINDER': {
    name: 'My Custom Grinder',
    type: 'clicks', // or 'setting', 'dial'
    convert: (microns) => Math.round(microns / 30) // Your formula here
},
```

### Changing Taste Adjustment Steps
Open `src/config/tuningConfig.js`:

```javascript
TASTE_ADJUSTMENT: {
    INTENSITY: {
        LOW: 25,    // Change slight adjustment to 25µm
        NORMAL: 50,
        HIGH: 100   // Change aggressive adjustment to 100µm
    }
}
```
