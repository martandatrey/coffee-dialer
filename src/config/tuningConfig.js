/**
 * Centralized Configuration for Tuning Formulas and Parameters.
 * Adjust these values to customize the brewing logic.
 */
export const TUNING = {
    // Taste Profile Adjustments (microns)
    TASTE_ADJUSTMENT: {
        INTENSITY: {
            LOW: 20,    // 'Slightly'
            NORMAL: 50, // Default/Hidden
            HIGH: 75    // 'Very'
        },
        TEMP_STEP: 2,   // Degrees Celsius
        TIME_STEP: 15   // Seconds
    },

    // Filter Logic (microns)
    FILTERS: {
        METAL_OFFSET: -50, // Finer for metal
        BOTH_OFFSET: 50    // Coarser for both
    },

    // Roast Level Offsets (relative to Medium)
    ROAST_LEVELS: {
        'Light': { temp: 2, grind: -50 },  // Hotter, Finer
        'Medium': { temp: 0, grind: 0 },   // Baseline
        'Dark': { temp: -5, grind: 100 }    // Cooler, Coarser
    },

    // Limits
    LIMITS: {
        MIN_GRIND: 100,
        MAX_GRIND: 1600,
        MIN_TEMP: 80,
        MAX_TEMP: 100
    }
};
