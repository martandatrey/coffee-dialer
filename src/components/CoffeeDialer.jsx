import React, { useState, useEffect } from 'react';
import { Coffee, Droplets, Thermometer, Timer, Settings, Lock, Unlock, RotateCcw, Menu, Share, Star, BookOpen, PenLine, Filter, Plus, Minus, Play, Pause, Square, Bean } from 'lucide-react';

import SliderControl from './SliderControl';
import CoffeeService from '../services/CoffeeService';
import { PRESETS, GRINDERS } from '../constants/coffeeData';
import { SLIDER_CONFIG, STORAGE_KEYS } from '../config/appConfig';
import { formatTime, getGrindDescription } from '../utils/formatters';

const CoffeeDialer = () => {
    // State
    const [method, setMethod] = useState('V60');
    const [dose, setDose] = useState(PRESETS['V60'].dose); // grams
    const [water, setWater] = useState(PRESETS['V60'].water); // ml/grams
    const [roast, setRoast] = useState('Medium'); // Light, Medium, Dark
    const [ratioLocked, setRatioLocked] = useState(true);
    const [temp, setTemp] = useState(PRESETS['V60'].temp); // Celsius
    const [time, setTime] = useState(PRESETS['V60'].time); // Seconds
    const [grind, setGrind] = useState(PRESETS['V60'].grind); // Microns
    const [copySuccess, setCopySuccess] = useState(false);

    // Brew Timer State
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [wakeLock, setWakeLock] = useState(null);
    // Grinder State
    const [selectedGrinder, setSelectedGrinder] = useState('NONE');

    // AeroPress Specific State
    const [filterType, setFilterType] = useState('Paper'); // Paper, Metal, Both

    // Brew Log State
    const [rating, setRating] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.RATING);
        return saved ? parseInt(saved) : 0;
    });
    const [personalNotes, setPersonalNotes] = useState(() => {
        return localStorage.getItem(STORAGE_KEYS.NOTES) || "";
    });

    const [coffeeName, setCoffeeName] = useState(""); // Name & Brand of beans

    // Derived State for Ratio
    const currentPresetRatio = PRESETS[method].ratio;

    // URL Hydration Logic
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const m = searchParams.get('m');
        const d = parseFloat(searchParams.get('d'));
        const w = parseFloat(searchParams.get('w'));
        const tm = parseFloat(searchParams.get('tm'));
        const ti = parseInt(searchParams.get('ti'));
        const g = parseInt(searchParams.get('g'));

        if (m && PRESETS[m]) setMethod(m);
        // Note: Filter type is not hydrated for simplicity/lack of explicit request, but we could add it.
        // For now, it will default to 'Paper' on load which is safe.
        if (!isNaN(d)) setDose(d);
        if (!isNaN(w)) setWater(w);
        if (!isNaN(tm)) setTemp(tm);
        if (!isNaN(ti)) setTime(ti);
        if (!isNaN(g)) setGrind(g);

        // If specific water/dose override provided, we might need to apply them
    }, []);

    // Ratio Lock Logic
    useEffect(() => {
        if (ratioLocked) {
            const newWater = CoffeeService.calculateWater(dose, currentPresetRatio);
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
        setFilterType('Paper'); // Reset filter when changing method
        setRatioLocked(true); // Re-lock when changing method
    };

    const handleFilterChange = (newFilter) => {
        setFilterType(newFilter);
        const newGrind = CoffeeService.getFilterAdjustment(method, newFilter);
        setGrind(newGrind);
    };

    const handleRoastChange = (newRoast) => {
        setRoast(newRoast);
        const adjustment = CoffeeService.getRoastAdjustment(newRoast);
        const basePreset = PRESETS[method];

        // Reset to base + adjustment
        setTemp(Math.min(100, Math.max(80, basePreset.temp + adjustment.temp)));

        // Handle Grind (careful not to overwrite filter logic if AP)
        let baseGrind = basePreset.grind;
        if (method.includes('AeroPress')) {
            baseGrind = CoffeeService.getFilterAdjustment(method, filterType);
        }
        setGrind(Math.max(100, Math.min(1600, baseGrind + adjustment.grind)));
    };

    const handleDoseChange = (newDose) => {
        setDose(newDose);
        if (ratioLocked) {
            setWater(CoffeeService.calculateWater(newDose, currentPresetRatio));
        }
    };

    const handleWaterChange = (newWater) => {
        setWater(newWater);
        if (ratioLocked) {
            setDose(CoffeeService.calculateDose(newWater, currentPresetRatio));
        }
    };

    // Timer Logic & Wake Lock
    useEffect(() => {
        let interval = null;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimerSeconds((seconds) => seconds + 1);
            }, 1000);

            // Request Wake Lock
            if ('wakeLock' in navigator && !wakeLock) {
                navigator.wakeLock.request('screen')
                    .then((lock) => setWakeLock(lock))
                    .catch((err) => console.log('Wake Lock Error:', err));
            }
        } else {
            clearInterval(interval);
            // Release Wake Lock
            if (wakeLock) {
                wakeLock.release().then(() => setWakeLock(null));
            }
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, wakeLock]);



    // Taste Profiler Logic
    const handleTasteAdjust = (type, intensity) => {
        const currentParams = { grind, temp, time };
        const newParams = CoffeeService.adjustTasteProfile(type, currentParams, intensity);

        setGrind(newParams.grind);
        setTemp(newParams.temp);
        setTime(newParams.time);
    };

    // Persistence Logic
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.RATING, rating);
    }, [rating]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.NOTES, personalNotes);
    }, [personalNotes]);

    const handleShare = async () => {
        const params = { method, dose, water, temp, time, grind };
        const extraData = { rating, notes: personalNotes, shareUrl: CoffeeService.generateShareUrl(params), filterType, selectedGrinder, roast, coffeeName };

        const clipboardText = CoffeeService.generateClipboardText(params, extraData);

        try {
            await navigator.clipboard.writeText(clipboardText);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const currentRatio = water > 0 && dose > 0 ? (water / dose).toFixed(1) : '0';

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center font-sans text-slate-850">
            <header className="mb-8 text-center w-full max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-coffee-100">
                <h1 className="text-3xl font-bold text-coffee-800 flex items-center justify-center gap-3 mb-4">
                    <Coffee className="w-8 h-8" />
                    Coffee Dialing Calculator
                </h1>

                {/* Method Selector */}
                <div className="flex gap-2 justify-center items-center mb-4">
                    <div className="bg-coffee-50 p-2 rounded-xl shadow-inner border border-coffee-100 flex-1">
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
                    <button
                        onClick={() => { handleMethodChange(method); setRoast('Medium'); }}
                        className="bg-white p-3 rounded-xl shadow-md border border-coffee-100 text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                        title="Reset to Defaults"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>

                {/* Roast Selector */}
                <div className="flex items-center justify-center gap-2 bg-coffee-50 p-1 rounded-xl overflow-x-auto">
                    {['Light', 'Medium', 'Medium Dark', 'Dark'].map((r) => (
                        <button
                            key={r}
                            onClick={() => handleRoastChange(r)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${roast === r
                                ? 'bg-white text-coffee-800 shadow-sm ring-1 ring-coffee-100'
                                : 'text-coffee-400 hover:text-coffee-600'
                                }`}
                        >
                            <Bean size={14} className={
                                r === 'Light' ? 'text-amber-300' :
                                    r === 'Medium' ? 'text-amber-600' :
                                        r === 'Medium Dark' ? 'text-amber-900' :
                                            'text-slate-800'
                            } fill="currentColor" />
                            {r}
                        </button>
                    ))}
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

                    {/* Share Button */}
                    <button
                        onClick={handleShare}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold bg-coffee-600 text-white hover:bg-coffee-700 transition-colors shadow-lg active:scale-95"
                    >
                        {copySuccess ? (
                            <>✅ Copied!</>
                        ) : (
                            <>
                                <Share size={18} /> Share Recipe
                            </>
                        )}
                    </button>
                </div>

                {/* AeroPress Filter Selector */}
                {method.includes('AeroPress') && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-coffee-100 animate-fade-in">
                        <label className="flex items-center gap-2 font-semibold text-coffee-800 mb-3">
                            <Filter size={18} /> Filter Type
                        </label>
                        <div className="flex bg-coffee-50 p-1 rounded-xl">
                            {['Paper', 'Metal', 'Both'].map((ft) => (
                                <button
                                    key={ft}
                                    onClick={() => handleFilterChange(ft)}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${filterType === ft
                                        ? 'bg-white text-coffee-700 shadow-sm'
                                        : 'text-coffee-400 hover:text-coffee-600'
                                        }`}
                                >
                                    {ft}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-coffee-400 mt-2 text-center italic">
                            {filterType === 'Metal' ? 'Grind adjusted finer (-50µm) for metal flow.' :
                                filterType === 'Both' ? 'Grind adjusted coarser (+50µm) for higher resistance.' :
                                    'Standard grind for paper filter.'}
                        </p>
                    </div>
                )}

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8 border border-coffee-100">

                    {/* Dose */}
                    <SliderControl
                        label="Dose"
                        icon={Settings}
                        value={dose}
                        onChange={handleDoseChange}
                        {...SLIDER_CONFIG.DOSE}
                    />

                    {/* Water */}
                    <SliderControl
                        label="Water"
                        icon={Droplets}
                        value={water}
                        onChange={handleWaterChange}
                        {...SLIDER_CONFIG.WATER}
                    />

                    {/* Grind Size (Microns) */}
                    <div className="space-y-2">
                        <div className="flex justify-end">
                            <select
                                value={selectedGrinder}
                                onChange={(e) => setSelectedGrinder(e.target.value)}
                                className="text-xs bg-white border border-coffee-200 text-coffee-600 rounded-lg px-2 py-1 outline-none font-medium cursor-pointer hover:border-coffee-400 focus:border-coffee-500 transition-colors"
                            >
                                {Object.entries(GRINDERS).map(([key, data]) => (
                                    <option key={key} value={key}>{data.name}</option>
                                ))}
                            </select>
                        </div>
                        <SliderControl
                            label="Grind Size"
                            icon={Settings}
                            value={grind}
                            onChange={setGrind}
                            {...SLIDER_CONFIG.GRIND}
                            description={
                                selectedGrinder === 'NONE'
                                    ? getGrindDescription(grind)
                                    : `${CoffeeService.convertGrindSize(grind, selectedGrinder)} (${getGrindDescription(grind)})`
                            }
                        />
                    </div>

                    {/* Temperature */}
                    <SliderControl
                        label="Temperature"
                        icon={Thermometer}
                        value={temp}
                        onChange={setTemp}
                        {...SLIDER_CONFIG.TEMP}
                    />

                    {/* Brew Time */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 font-semibold text-coffee-800">
                                <Timer size={18} /> Brew Time
                            </label>
                            <span className="text-xl font-bold text-coffee-600">{formatTime(time)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setTime(Math.max(SLIDER_CONFIG.TIME.min, time - SLIDER_CONFIG.TIME.step))}
                                className="p-2 rounded-full bg-coffee-100 text-coffee-700 hover:bg-coffee-200 transition-colors active:scale-95"
                            >
                                <Minus size={16} />
                            </button>
                            <input
                                type="range"
                                min={SLIDER_CONFIG.TIME.min}
                                max={SLIDER_CONFIG.TIME.max}
                                step={SLIDER_CONFIG.TIME.step}
                                value={time}
                                onChange={(e) => setTime(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-coffee-100 rounded-lg appearance-none cursor-pointer accent-coffee-600"
                            />
                            <button
                                onClick={() => setTime(Math.min(SLIDER_CONFIG.TIME.max, time + SLIDER_CONFIG.TIME.step))}
                                className="p-2 rounded-full bg-coffee-100 text-coffee-700 hover:bg-coffee-200 transition-colors active:scale-95"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Brew Timer Button */}
                        <button
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all shadow-md ${isTimerRunning
                                ? 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200'
                                : 'bg-coffee-100 text-coffee-800 hover:bg-coffee-200 border border-coffee-200'
                                }`}
                        >
                            {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
                            {isTimerRunning ? 'Stop Timer' : 'Start Brew Timer'}
                        </button>

                        {/* Active Timer Overlay */}
                        {timerSeconds > 0 && (
                            <div className="mt-4 bg-coffee-900 rounded-xl p-4 text-center text-white border border-coffee-700 animate-fade-in relative overflow-hidden">
                                <p className="text-xs text-coffee-300 uppercase tracking-widest font-bold mb-1">Elapsed Time</p>
                                <div className="text-4xl font-mono font-bold tracking-wider tabular-nums">
                                    {formatTime(timerSeconds)}
                                </div>
                                <div className="flex justify-center gap-4 mt-3">
                                    <button
                                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                                    </button>
                                    <button
                                        onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
                                        className="p-2 rounded-full bg-white/10 hover:bg-red-500/50 transition-colors"
                                    >
                                        <Square size={20} />
                                    </button>
                                </div>
                                <div className="absolute top-2 right-2">
                                    {wakeLock ? <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30">Screen Awake</span> : null}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Taste Profiler */}
                <div className="bg-coffee-800 rounded-2xl shadow-xl p-6 text-white">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <RotateCcw size={20} /> Dial In Your Taste
                    </h2>
                    <p className="text-coffee-100 mb-6 text-sm">
                        How did it taste? Select intensity to adjust your next brew.
                    </p>

                    <div className="space-y-4">
                        {/* Sour Group */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-cream uppercase tracking-wider">Too Sour (Under-extracted)</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleTasteAdjust('sour', 'low')}
                                    className="bg-coffee-700 hover:bg-coffee-600 text-coffee-100 py-2 rounded-lg text-sm font-semibold transition-colors border border-coffee-600"
                                >
                                    Slightly (+20µm)
                                </button>
                                <button
                                    onClick={() => handleTasteAdjust('sour', 'high')}
                                    className="bg-coffee-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-coffee-500 transition-colors shadow-lg border border-coffee-500"
                                >
                                    Very Sour (+75µm)
                                </button>
                            </div>
                        </div>

                        {/* Bitter Group */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-coffee-300 uppercase tracking-wider">Too Bitter (Over-extracted)</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleTasteAdjust('bitter', 'low')}
                                    className="bg-coffee-700 hover:bg-coffee-600 text-coffee-100 py-2 rounded-lg text-sm font-semibold transition-colors border border-coffee-600"
                                >
                                    Slightly (-20µm)
                                </button>
                                <button
                                    onClick={() => handleTasteAdjust('bitter', 'high')}
                                    className="bg-coffee-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-coffee-500 transition-colors shadow-lg border border-coffee-500"
                                >
                                    Very Bitter (-75µm)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brew Log Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-coffee-100 space-y-6">
                    <h2 className="text-xl font-bold text-coffee-800 flex items-center gap-2">
                        <BookOpen size={20} /> Brew Log
                    </h2>

                    {/* Pro Tip */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
                        <h3 className="font-bold text-blue-800 text-sm mb-1 uppercase tracking-wider">💡 Pro Tip for {method}</h3>
                        <p className="text-blue-700 text-sm italic">
                            "{CoffeeService.getProTip(method)}"
                        </p>
                    </div>

                    {/* Coffee Name Input */}
                    <div className="space-y-2">
                        <label className="font-semibold text-coffee-800 flex items-center gap-2">
                            <Bean size={18} /> Coffee Beans
                        </label>
                        <input
                            type="text"
                            value={coffeeName}
                            onChange={(e) => setCoffeeName(e.target.value)}
                            placeholder="e.g. Ethiopia Yirgacheffe (Blue Tokai)"
                            className="w-full p-3 rounded-xl border border-coffee-200 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none bg-coffee-50 text-coffee-900 placeholder:text-coffee-300 text-sm font-medium"
                        />
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                        <label className="font-semibold text-coffee-800 flex items-center gap-2">
                            Rate this Brew
                        </label>
                        <div className="flex gap-1 flex-wrap justify-center">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-xl transition-transform hover:scale-110 focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                >
                                    <Star size={20} fill={star <= rating ? "currentColor" : "none"} strokeWidth={star <= rating ? 0 : 2} />
                                </button>
                            ))}
                            <div className="w-full text-center mt-1">
                                <span className="text-sm font-medium text-coffee-500">
                                    {rating > 0 ? `${rating}/10` : 'No rating'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <label className="font-semibold text-coffee-800 flex items-center gap-2">
                            <PenLine size={18} /> Tasting Notes
                        </label>
                        <textarea
                            value={personalNotes}
                            onChange={(e) => setPersonalNotes(e.target.value)}
                            placeholder="Fruity acidity, heavy body, slightly bitter finish..."
                            className="w-full h-24 p-3 rounded-xl border border-coffee-200 focus:border-coffee-500 focus:ring-2 focus:ring-coffee-200 outline-none resize-none bg-coffee-50 text-coffee-900 placeholder:text-coffee-300 text-sm"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoffeeDialer;
