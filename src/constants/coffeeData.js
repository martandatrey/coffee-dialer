export const PRESETS = {
    'Espresso': { dose: 18, water: 36, ratio: 2, temp: 93, time: 30, grind: 300 },
    'AeroPress': { dose: 15, water: 250, ratio: 16.6, temp: 90, time: 150, grind: 600 },
    'AeroPress + Flow Control': { dose: 18, water: 250, ratio: 13.9, temp: 95, time: 240, grind: 400 },
    'V60': { dose: 20, water: 320, ratio: 16, temp: 96, time: 180, grind: 800 },
    'French Press': { dose: 30, water: 500, ratio: 16.6, temp: 95, time: 240, grind: 1200 },
    'Moka Pot': { dose: 18, water: 180, ratio: 10, temp: 99, time: 300, grind: 500 },
    'Cold Brew': { dose: 80, water: 800, ratio: 10, temp: 20, time: 43200, grind: 1600 },
};

export const MOKA_SIZES = {
    '1-cup': { dose: 7, water: 60 },
    '3-cup': { dose: 18, water: 180 },
    '6-cup': { dose: 32, water: 300 },
    '9-cup': { dose: 50, water: 550 },
    '12-cup': { dose: 70, water: 775 },
};

export const PRO_TIPS = {
    'Espresso': [
        "Aim for a 25-30s extraction.",
        "Flow should look like warm honey/mouse tail.",
        "If it flows too fast, grind finer."
    ],
    'AeroPress': [
        "Insert plunger just enough to create a vacuum to stop drips.",
        "Press gently for 30 seconds.",
        "Invert method allows for longer immersion time."
    ],
    'AeroPress + Flow Control': [
        "Use the Prismo/Joepresso attachment.",
        "No inversion needed with flow control cap.",
        "Press firmly to generate more pressure."
    ],
    'V60': [
        "Pour in slow concentric circles.",
        "Avoid hitting the paper walls directly.",
        "Bloom with 2-3x weight of grounds for 45s."
    ],
    'French Press': [
        "Let the crust form on top for 4 minutes.",
        "Break the crust gently before plunging.",
        "Don't plunge all the way down to avoid stirring sediment."
    ],
    'Moka Pot': [
        "Use hot water in the chamber to start.",
        "Don't tamp the coffee, just level it.",
        "Remove from heat as soon as it starts sputtering."
    ],
    'Cold Brew': [
        "Steep at room temp for 12-24 hours.",
        "Dilute concentrate 1:1 with water/milk.",
        "Use coarse grind to avoid bitterness."
    ],
};

export const GRINDERS = {
    'NONE': { name: 'Microns (Default)', type: 'microns', convert: (m) => m },

    // 1Zpresso
    'KMAX': { name: '1Zpresso K-Max', type: 'setting', convert: (m) => (m / 22).toFixed(1) },
    'Q_SERIES': { name: '1Zpresso Q/Q Air', type: 'setting', convert: (m) => (m / 25).toFixed(1) },

    // Baratza
    'ENCORE': { name: 'Baratza Encore', type: 'setting', convert: (m) => Math.min(40, Math.max(1, Math.round(m / 40))) },

    // Comandante
    'C40': { name: 'Comandante C40', type: 'clicks', convert: (m) => Math.round(m / 30) },

    // DF Series
    'DF54': { name: 'DF54 / DF64', type: 'dial', convert: (m) => Math.round((m - 100) / 10) },

    // Fellow
    'ODE': { name: 'Fellow Ode', type: 'setting', convert: (m) => Math.min(11, Math.max(1, (m / 100).toFixed(0))) },

    // Kingrinder
    'K6': { name: 'Kingrinder K6', type: 'clicks', convert: (m) => Math.round(m / 16) },
    'K_SERIES': { name: 'Kingrinder K0-K5', type: 'clicks', convert: (m) => Math.round(m / 18) },

    // Timemore
    'C2_C3': { name: 'Timemore C2/C3/C3S', type: 'clicks', convert: (m) => Math.round(m / 25) },
    'C3_ESP': { name: 'Timemore C3 ESP', type: 'clicks', convert: (m) => Math.round(m / 20) },
};
