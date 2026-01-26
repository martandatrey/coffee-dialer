import React from 'react';
import { Plus, Minus } from 'lucide-react';

const SliderControl = ({ label, icon: Icon, value, onChange, min, max, step, unit, description }) => {
    const handleDecrement = () => {
        const newValue = Math.max(min, value - step);
        // Fix float precision issues for dose
        onChange(step < 1 ? parseFloat(newValue.toFixed(1)) : Math.round(newValue));
    };

    const handleIncrement = () => {
        const newValue = Math.min(max, value + step);
        onChange(step < 1 ? parseFloat(newValue.toFixed(1)) : Math.round(newValue));
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 font-semibold text-coffee-800">
                    <Icon size={18} /> {label}
                </label>
                <span className="text-xl font-bold text-coffee-600">{value}{unit}</span>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleDecrement}
                    className="p-2 rounded-full bg-coffee-100 text-coffee-700 hover:bg-coffee-200 transition-colors active:scale-95"
                    aria-label={`Decrease ${label}`}
                >
                    <Minus size={16} />
                </button>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value))}
                    className="flex-1 h-2 bg-coffee-100 rounded-lg appearance-none cursor-pointer accent-coffee-600"
                />
                <button
                    onClick={handleIncrement}
                    className="p-2 rounded-full bg-coffee-100 text-coffee-700 hover:bg-coffee-200 transition-colors active:scale-95"
                    aria-label={`Increase ${label}`}
                >
                    <Plus size={16} />
                </button>
            </div>
            {description && (
                <div className="text-center text-sm font-medium text-coffee-500 bg-coffee-50 py-1 rounded-md">
                    {description}
                </div>
            )}
        </div>
    );
};

export default SliderControl;
