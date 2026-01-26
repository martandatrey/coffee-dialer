import { PRESETS, PRO_TIPS, GRINDERS } from '../constants/coffeeData';
import { formatTime } from '../utils/formatters';

class CoffeeService {
    calculateWater(dose, ratio) {
        return Math.round(dose * ratio);
    }

    calculateDose(water, ratio) {
        return Math.round(water / ratio);
    }

    getPreset(method) {
        return PRESETS[method];
    }

    getProTip(method) {
        return PRO_TIPS[method] || "Enjoy your coffee!";
    }

    getFilterAdjustment(method, filterType) {
        const baseGrind = PRESETS[method].grind;
        if (filterType === 'Metal') {
            return Math.max(100, baseGrind - 50); // Finer
        } else if (filterType === 'Both') {
            return Math.min(1600, baseGrind + 50); // Coarser
        }
        return baseGrind;
    }

    convertGrindSize(microns, grinderId) {
        const grinder = GRINDERS[grinderId];
        if (!grinder || grinderId === 'NONE') return null;

        const value = grinder.convert(microns);

        // Format based on type
        switch (grinder.type) {
            case 'clicks': return `${value} Clicks`;
            case 'setting': return `Setting ${value}`;
            case 'dial': return `Dial ~${value}`;
            default: return `${value}`;
        }
    }

    adjustTasteProfile(type, params) {
        const { grind, temp, time } = params;
        const newParams = { ...params };

        if (type === 'sour') {
            // Too Sour (Under-extracted) -> Extract MORE
            if (grind > 100) {
                newParams.grind = Math.max(100, grind - 50);
            } else if (temp < 100) {
                newParams.temp = temp + 2;
            } else {
                newParams.time = time + 15;
            }
        } else if (type === 'bitter') {
            // Too Bitter (Over-extracted) -> Extract LESS
            if (grind < 1600) {
                newParams.grind = Math.min(1600, grind + 50);
            } else if (temp > 80) {
                newParams.temp = temp - 2;
            } else {
                newParams.time = time - 15;
            }
        }
        return newParams;
    }

    generateShareUrl(params) {
        const { method, dose, water, temp, time, grind } = params;
        return `${window.location.origin}${window.location.pathname}?m=${encodeURIComponent(method)}&d=${dose}&w=${water}&tm=${temp}&ti=${time}&g=${grind}`;
    }

    generateClipboardText(params, extraData) {
        const { method, dose, water, temp, time, grind } = params;
        const { rating, notes, shareUrl, filterType } = extraData;


        const stars = "⭐".repeat(rating);
        const proTip = this.getProTip(method);
        const filterInfo = method.includes('AeroPress') ? `\n🔍 Filter: ${filterType}` : '';

        return `☕ Coffee Recipe: ${method}
---------------------------
🔹 Dose: ${dose}g
💧 Water: ${water}ml (Ratio 1:${(water / dose).toFixed(1)})
🔥 Temp: ${temp}°C
⏳ Time: ${formatTime(time)}
⚙️ Grind: ${grind}µm${filterInfo}
---------------------------
📊 Rating: ${stars} (${rating}/5)
📝 Notes: ${notes}
💡 Pro Tip: ${proTip}
---------------------------
🔗 Open App: ${shareUrl}`;
    }
}

export default new CoffeeService();
