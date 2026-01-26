export const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const getGrindDescription = (microns) => {
    if (microns <= 400) return "Fine";
    if (microns <= 800) return "Medium-Fine";
    if (microns <= 1100) return "Medium";
    if (microns <= 1400) return "Medium-Coarse";
    return "Coarse";
};
