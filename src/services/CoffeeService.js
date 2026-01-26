import { PRESETS, PRO_TIPS, GRINDERS } from '../constants/coffeeData';
import { TUNING } from '../config/tuningConfig';
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
            return Math.max(TUNING.LIMITS.MIN_GRIND, baseGrind + TUNING.FILTERS.METAL_OFFSET); // Finer
        } else if (filterType === 'Both') {
            return Math.min(TUNING.LIMITS.MAX_GRIND, baseGrind + TUNING.FILTERS.BOTH_OFFSET); // Coarser
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

    adjustTasteProfile(type, params, intensity = 'normal') {
        const { grind, temp, time } = params;
        const newParams = { ...params };

        // Intensity Modifiers (Microns)
        const adjustments = {
            'low': TUNING.TASTE_ADJUSTMENT.INTENSITY.LOW,
            'normal': TUNING.TASTE_ADJUSTMENT.INTENSITY.NORMAL,
            'high': TUNING.TASTE_ADJUSTMENT.INTENSITY.HIGH
        };
        const delta = adjustments[intensity] || TUNING.TASTE_ADJUSTMENT.INTENSITY.NORMAL;

        if (type === 'sour') {
            // Too Sour (Under-extracted) -> Extract MORE
            if (grind > TUNING.LIMITS.MIN_GRIND) {
                newParams.grind = Math.max(TUNING.LIMITS.MIN_GRIND, grind - delta);
            } else if (temp < TUNING.LIMITS.MAX_TEMP) {
                newParams.temp = temp + TUNING.TASTE_ADJUSTMENT.TEMP_STEP;
            } else {
                newParams.time = time + TUNING.TASTE_ADJUSTMENT.TIME_STEP;
            }
        } else if (type === 'bitter') {
            // Too Bitter (Over-extracted) -> Extract LESS
            if (grind < TUNING.LIMITS.MAX_GRIND) {
                newParams.grind = Math.min(TUNING.LIMITS.MAX_GRIND, grind + delta);
            } else if (temp > TUNING.LIMITS.MIN_TEMP) {
                newParams.temp = temp - TUNING.TASTE_ADJUSTMENT.TEMP_STEP;
            } else {
                newParams.time = time - TUNING.TASTE_ADJUSTMENT.TIME_STEP;
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
        const { rating, notes, shareUrl, filterType, selectedGrinder } = extraData;

        const stars = "⭐".repeat(rating);
        const proTip = this.getProTip(method);
        const filterInfo = method.includes('AeroPress') ? `\n🔍 Filter: ${filterType}` : '';

        let grindInfo = `${grind}µm`;
        if (selectedGrinder && selectedGrinder !== 'NONE') {
            const converted = this.convertGrindSize(grind, selectedGrinder);
            const grinderName = GRINDERS[selectedGrinder]?.name || selectedGrinder;
            grindInfo = `${grinderName}: ${converted} (${grind}µm)`;
        }

        return `☕ Coffee Recipe: ${method}
---------------------------
🔹 Dose: ${dose}g
💧 Water: ${water}ml (Ratio 1:${(water / dose).toFixed(1)})
🔥 Temp: ${temp}°C
⏳ Time: ${formatTime(time)}
⚙️ Grind: ${grindInfo}${filterInfo}
---------------------------
📊 Rating: ${stars} (${rating}/5)
📝 Notes: ${notes}
💡 Pro Tip: ${proTip}
---------------------------
🔗 Open App: ${shareUrl}`;
    }
}

export default new CoffeeService();
