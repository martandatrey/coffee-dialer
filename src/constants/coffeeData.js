export const PRESETS = {
    'Espresso': { dose: 18, water: 36, ratio: 2, temp: 93, time: 30, grind: 300 },
    'AeroPress': { dose: 15, water: 250, ratio: 16.6, temp: 90, time: 150, grind: 600 },
    'AeroPress + Flow Control': { dose: 15, water: 250, ratio: 16.7, temp: 99, time: 120, grind: 600 },
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


const GRIND_CHART = [
    { m: 200, k_max: 0.25, k6: 0.33, df54: 10, c40: 7, c3: 7 },
    { m: 210, k_max: 0.26, k6: 0.35, df54: 11, c40: 7, c3: 7 },
    { m: 220, k_max: 0.27, k6: 0.37, df54: 12, c40: 7, c3: 7 },
    { m: 230, k_max: 0.29, k6: 0.38, df54: 13, c40: 8, c3: 8 },
    { m: 240, k_max: 0.30, k6: 0.40, df54: 14, c40: 8, c3: 8 },
    { m: 250, k_max: 0.31, k6: 0.42, df54: 15, c40: 8, c3: 8 },
    { m: 260, k_max: 0.32, k6: 0.43, df54: 15.5, c40: 9, c3: 8 },
    { m: 270, k_max: 0.34, k6: 0.45, df54: 16, c40: 9, c3: 9 },
    { m: 280, k_max: 0.35, k6: 0.47, df54: 17, c40: 9, c3: 9 },
    { m: 290, k_max: 0.36, k6: 0.48, df54: 18, c40: 10, c3: 9 },
    { m: 300, k_max: 0.38, k6: 0.50, df54: 19, c40: 10, c3: 9 },
    { m: 310, k_max: 0.39, k6: 0.52, df54: 20, c40: 10, c3: 10 },
    { m: 320, k_max: 0.40, k6: 0.53, df54: 21, c40: 11, c3: 10 },
    { m: 330, k_max: 0.41, k6: 0.55, df54: 22, c40: 11, c3: 10 },
    { m: 340, k_max: 0.42, k6: 0.57, df54: 22.5, c40: 11, c3: 10 },
    { m: 350, k_max: 0.44, k6: 0.58, df54: 23, c40: 12, c3: 10 },
    { m: 360, k_max: 0.45, k6: 0.60, df54: 24, c40: 12, c3: 11 },
    { m: 370, k_max: 0.46, k6: 0.62, df54: 25, c40: 12, c3: 11 },
    { m: 380, k_max: 0.47, k6: 0.63, df54: 26, c40: 13, c3: 11 },
    { m: 390, k_max: 0.49, k6: 0.65, df54: 27, c40: 13, c3: 11 },
    { m: 400, k_max: 0.50, k6: 0.67, df54: 28, c40: 13, c3: 11 },
    { m: 410, k_max: 0.51, k6: 0.68, df54: 29, c40: 14, c3: 12 },
    { m: 420, k_max: 0.52, k6: 0.70, df54: 30, c40: 14, c3: 12 },
    { m: 430, k_max: 0.54, k6: 0.72, df54: 31, c40: 14, c3: 12 },
    { m: 440, k_max: 0.55, k6: 0.73, df54: 32, c40: 15, c3: 12 },
    { m: 450, k_max: 0.56, k6: 0.75, df54: 33, c40: 15, c3: 12 },
    { m: 460, k_max: 0.57, k6: 0.77, df54: 34, c40: 15, c3: 13 },
    { m: 470, k_max: 0.59, k6: 0.78, df54: 35, c40: 16, c3: 13 },
    { m: 480, k_max: 0.60, k6: 0.80, df54: 36, c40: 16, c3: 13 },
    { m: 490, k_max: 0.61, k6: 0.82, df54: 37, c40: 16, c3: 13 },
    { m: 500, k_max: 0.63, k6: 0.83, df54: 38, c40: 17, c3: 13 },
    { m: 520, k_max: 0.65, k6: 0.87, df54: 40, c40: 17, c3: 14 },
    { m: 540, k_max: 0.67, k6: 0.90, df54: 42, c40: 18, c3: 14 },
    { m: 560, k_max: 0.70, k6: 0.93, df54: 44, c40: 19, c3: 14 },
    { m: 580, k_max: 0.72, k6: 0.97, df54: 46, c40: 19, c3: 15 },
    { m: 600, k_max: 0.75, k6: 1.00, df54: 48, c40: 20, c3: 15 },
    { m: 620, k_max: 0.77, k6: 1.03, df54: 50, c40: 21, c3: 15 },
    { m: 640, k_max: 0.80, k6: 1.07, df54: 52, c40: 21, c3: 16 },
    { m: 660, k_max: 0.82, k6: 1.10, df54: 54, c40: 22, c3: 16 },
    { m: 680, k_max: 0.85, k6: 1.13, df54: 56, c40: 23, c3: 16 },
    { m: 700, k_max: 0.87, k6: 1.17, df54: 58, c40: 23, c3: 17 },
    { m: 750, k_max: 0.94, k6: 1.25, df54: 62, c40: 25, c3: 18 },
    { m: 800, k_max: 1.00, k6: 1.33, df54: 67, c40: 27, c3: 19 }
];

const lookup = (microns, key, transform = (v) => v) => {
    const row = GRIND_CHART.reduce((prev, curr) =>
        Math.abs(curr.m - microns) < Math.abs(prev.m - microns) ? curr : prev
    );
    return transform(row[key]);
};

export const GRINDERS = {
    'NONE': { name: 'Microns (Default)', type: 'microns', convert: (m) => m },

    // 1Zpresso
    'KMAX': { name: '1Zpresso K-Max', type: 'setting', convert: (m) => lookup(m, 'k_max', v => (v * 10).toFixed(1)) },
    'Q_AIR': { name: '1Zpresso Q Air', type: 'clicks', convert: (m) => Math.round(m / 10.8) },

    // Baratza
    'ENCORE': { name: 'Baratza Encore', type: 'setting', convert: (m) => Math.min(40, Math.max(1, Math.round(m / 40))) },

    // Comandante
    'C40': { name: 'Comandante C40', type: 'clicks', convert: (m) => lookup(m, 'c40') },

    // DF Series
    'DF54': { name: 'DF54 / DF64', type: 'setting', convert: (m) => lookup(m, 'df54') },

    // Fellow
    'ODE': { name: 'Fellow Ode', type: 'setting', convert: (m) => Math.min(11, Math.max(1, (m / 100).toFixed(0))) },

    // Hibrew
    'HIBREW_G5': { name: 'Hibrew G5', type: 'setting', convert: (m) => Math.max(0, ((m / 21) - 9)).toFixed(1) },

    // Kingrinder
    'K1': { name: 'Kingrinder K1', type: 'clicks', convert: (m) => Math.round(m / 8.6) },
    'K6': { name: 'Kingrinder K6', type: 'clicks', convert: (m) => lookup(m, 'k6', v => Math.round(v * 60)) },
    'K_SERIES': { name: 'Kingrinder K0-K5', type: 'clicks', convert: (m) => Math.round(m / 18) },

    // Timemore
    'C2': { name: 'Timemore C2', type: 'clicks', convert: (m) => Math.round(m / 35.2) },
    'C3': { name: 'Timemore C3/C3S', type: 'clicks', convert: (m) => lookup(m, 'c3') },
    'C3_ESP': { name: 'Timemore C3 ESP', type: 'clicks', convert: (m) => Math.round(m / 20) },
};
