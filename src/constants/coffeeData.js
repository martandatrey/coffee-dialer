export const PRESETS = {
    'Espresso': { dose: 18, water: 36, ratio: 2, temp: 93, time: 30, grind: 300 },
    'AeroPress': { dose: 15, water: 250, ratio: 16.6, temp: 90, time: 150, grind: 600 },
    'AeroPress + Flow Control': { dose: 18, water: 250, ratio: 13.9, temp: 95, time: 240, grind: 400 },
    'V60': { dose: 20, water: 320, ratio: 16, temp: 96, time: 180, grind: 800 },
    'French Press': { dose: 30, water: 500, ratio: 16.6, temp: 95, time: 240, grind: 1200 },
    'Cold Brew': { dose: 80, water: 800, ratio: 10, temp: 20, time: 43200, grind: 1600 },
};

export const PRO_TIPS = {
    'Espresso': "Aim for a 25-30s extraction. Flow should look like warm honey/mouse tail.",
    'AeroPress': "Insert plunger just enough to create a vacuum to stop drips. Press gently.",
    'AeroPress + Flow Control': "Use the Prismo/Joepresso attachment. No inversion needed. Press firmly.",
    'V60': "Pour in slow concentric circles. Avoid hitting the paper walls directly.",
    'French Press': "Let the crust form on top. Break it gently at 4:00 before plunging.",
    'Cold Brew': "Steep at room temp for 12-24 hours. Dilute concentrate 1:1 with water/milk.",
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
