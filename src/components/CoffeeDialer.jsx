import React, { useState, useEffect } from 'react';
import { Coffee, Droplets, Thermometer, Timer, Settings, Lock, Unlock, RotateCcw, Menu } from 'lucide-react';

const PRESETS = {
    'Espresso': { dose: 18, water: 36, ratio: 2, temp: 93, time: 30, grind: 300 },
    'AeroPress': { dose: 15, water: 250, ratio: 16.6, temp: 90, time: 150, grind: 600 },
    'V60': { dose: 20, water: 320, ratio: 16, temp: 96, time: 180, grind: 800 },
    'French Press': { dose: 30, water: 500, ratio: 16.6, temp: 95, time: 240, grind: 1200 },
    'Cold Brew': { dose: 80, water: 800, ratio: 10, temp: 20, time: 43200, grind: 1600 },
};

const CoffeeDialer = () => {
    // State
    const [method, setMethod] = useState('V60');
    const [dose, setDose] = useState(PRESETS['V60'].dose); // grams
    const [water, setWater] = useState(PRESETS['V60'].water); // ml/grams
    const [ratioLocked, setRatioLocked] = useState(true);
    const [temp, setTemp] = useState(PRESETS['V60'].temp); // Celsius
    const [time, setTime] = useState(PRESETS['V60'].time); // Seconds
    const [grind, setGrind] = useState(PRESETS['V60'].grind); // Microns

    // Derived State for Ratio
    const currentPresetRatio = PRESETS[method].ratio;

    // Ratio Lock Logic
    useEffect(() => {
        if (ratioLocked) {
            const newWater = Math.round(dose * currentPresetRatio);
            if (Math.abs(newWater - water) > 1) {
                setWater(newWater);
            }
        }
    }, [dose, ratioLocked, currentPresetRatio]);

    const handleMethodChange = (newMethod) => {
        setMethod(newMethod);
        const p = PRESETS[newMethod];
        setDose(p.dose);
        setWater(p.water);
        setTemp(p.temp);
        setTime(p.time);
        setGrind(p.grind);
        setRatioLocked(true); // Re-lock when changing method
    };

    const handleDoseChange = (newDose) => {
        setDose(newDose);
        if (ratioLocked) {
            setWater(Math.round(newDose * currentPresetRatio));
        }
    };

    const handleWaterChange = (newWater) => {
        setWater(newWater);
        if (ratioLocked) {
            setDose(Math.round(newWater / currentPresetRatio));
        }
    };

    // Taste Profiler Logic
    const handleTasteAdjust = (type) => {
        if (type === 'sour') {
            // Too Sour (Under-extracted) -> Extract MORE
            // Priority: 1. Finer Grind (-50um), 2. Higher Temp, 3. Longer Time
            if (grind > 200) {
                setGrind(prev => Math.max(200, prev - 50));
            } else if (temp < 100) {
                setTemp(prev => prev + 2);
            } else {
                setTime(prev => prev + 15);
            }
        } else if (type === 'bitter') {
            // Too Bitter (Over-extracted) -> Extract LESS
            // Priority: 1. Coarser Grind (+50um), 2. Lower Temp, 3. Shorter Time
            if (grind < 1600) {
                setGrind(prev => Math.min(1600, prev + 50));
            } else if (temp > 80) {
                setTemp(prev => prev - 2);
            } else {
                setTime(prev => prev - 15);
            }
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const getGrindDescription = (microns) => {
        if (microns <= 400) return "Fine";
        if (microns <= 800) return "Medium-Fine";
        if (microns <= 1100) return "Medium";
        if (microns <= 1400) return "Medium-Coarse";
        return "Coarse";
    };

    const currentRatio = water > 0 && dose > 0 ? (water / dose).toFixed(1) : '0';

    return (
        <div className="min-h-screen bg-coffee-50 p-4 md:p-8 flex flex-col items-center font-sans text-slate-850">
            <header className="mb-8 text-center w-full max-w-md">
                <h1 className="text-3xl font-bold text-coffee-800 flex items-center justify-center gap-3 mb-4">
                    <Coffee className="w-8 h-8" />
                    Coffee Dialing Calculator
                </h1>

                {/* Method Selector */}
                <div className="bg-white p-2 rounded-xl shadow-md border border-coffee-100 flex justify-center">
                    <select
                        value={method}
                        onChange={(e) => handleMethodChange(e.target.value)}
                        className="w-full bg-transparent text-center font-bold text-coffee-700 text-lg outline-none cursor-pointer"
                    >
                        {Object.keys(PRESETS).map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="w-full max-w-md space-y-6">
                {/* Ratio Display */}
                <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-coffee-100">
                    <p className="text-sm uppercase tracking-wide text-coffee-500 font-semibold mb-1">Current Ratio</p>
                    <div className="text-5xl font-bold text-coffee-900">
                        1 : {currentRatio}
                    </div>
                    <button
                        onClick={() => setRatioLocked(!ratioLocked)}
                        className={`mt-4 flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full text-sm font-medium transition-colors ${ratioLocked
                                ? 'bg-coffee-100 text-coffee-800'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {ratioLocked ? <Lock size={16} /> : <Unlock size={16} />}
                        {ratioLocked ? `Locked to ${method} (1:${currentPresetRatio})` : 'Ratio Unlocked'}
                    </button>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8 border border-coffee-100">

                    {/* Dose */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 font-semibold text-coffee-800">
                                <Settings size={18} /> Dose
                            </label>
                            <span className="text-xl font-bold text-coffee-600">{dose}g</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            step="0.5"
                            value={dose}
                            onChange={(e) => handleDoseChange(parseFloat(e.target.value))}
                            className="w-full h-2 bg-coffee-100 rounded-lg appearance-none cursor-pointer accent-coffee-600"
                        />
                    </div>

                    {/* Water */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 font-semibold text-coffee-800">
                                <Droplets size={18} /> Water
                            </label>
                            <span className="text-xl font-bold text-coffee-600">{water}ml</span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="1500"
                            step="5"
                            value={water}
                            onChange={(e) => handleWaterChange(parseFloat(e.target.value))}
                            className="w-full h-2 bg-coffee-100 rounded-lg appearance-none cursor-pointer accent-coffee-600"
                        />
                    </div>

                    {/* Grind Size (Microns) */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 font-semibold text-coffee-800">
                                <Settings size={18} /> Grind Size
                            </label>
                            <span className="text-xl font-bold text-coffee-600">{grind}µm</span>
                        </div>
                        <input
                            type="range"
                            min="200"
                            max="1600"
                            step="50"
                            value={grind}
                            onChange={(e) => setGrind(parseInt(e.target.value))}
                            className="w-full h-2 bg-coffee-100 rounded-lg appearance-none cursor-pointer accent-coffee-600"
                        />
                        <div className="text-center text-sm font-medium text-coffee-500 bg-coffee-50 py-1 rounded-md">
                            {getGrindDescription(grind)}
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 font-semibold text-coffee-800">
                                <Thermometer size={18} /> Temperature
                            </label>
                            <span className="text-xl font-bold text-coffee-600">{temp}°C</span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            step="1"
                            value={temp}
                            onChange={(e) => setTemp(parseInt(e.target.value))}
                            className="w-full h-2 bg-coffee-100 rounded-lg appearance-none cursor-pointer accent-coffee-600"
                        />
                    </div>

                    {/* Brew Time */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 font-semibold text-coffee-800">
                                <Timer size={18} /> Brew Time
                            </label>
                            <span className="text-xl font-bold text-coffee-600">{formatTime(time)}</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="600"
                            step="5"
                            value={time}
                            onChange={(e) => setTime(parseInt(e.target.value))}
                            className="w-full h-2 bg-coffee-100 rounded-lg appearance-none cursor-pointer accent-coffee-600"
                        />
                    </div>

                </div>

                {/* Taste Profiler */}
                <div className="bg-coffee-800 rounded-2xl shadow-xl p-6 text-white">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <RotateCcw size={20} /> Dial In Your Taste
                    </h2>
                    <p className="text-coffee-100 mb-6 text-sm">
                        Tasted your brew? Let us adjust the parameters for your next cup.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleTasteAdjust('sour')}
                            className="bg-cream text-coffee-900 py-3 px-4 rounded-xl font-bold hover:bg-white transition-colors shadow-lg active:scale-95"
                        >
                            Too Sour
                            <span className="block text-xs font-normal text-coffee-700 mt-1">Under-extracted</span>
                        </button>
                        <button
                            onClick={() => handleTasteAdjust('bitter')}
                            className="bg-coffee-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-coffee-500 transition-colors shadow-lg border border-coffee-500 active:scale-95"
                        >
                            Too Bitter
                            <span className="block text-xs font-normal text-coffee-200 mt-1">Over-extracted</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoffeeDialer;
