import * as React from "react";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("./slider").then((mod) => mod.Slider),
    { ssr: false });
const Input = dynamic(() => import("@/components/ui/input").then((mod) => mod.Input),
    { ssr: false });
const CustomSlider = ({
    label,
    value,
    setValue,
    min,
    max,
    step,
}: {
    label: string;
    value: number;
    setValue: (val: number) => void;
    min: number;
    max: number;
    step?: number;
}) => {
    return (
        <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col flex-1">
                <label className="text-sm font-medium mb-1">{label}</label>
                <Slider
                    value={[value]}
                    min={min}
                    max={max}
                    step={step ?? 0.1}
                    onValueChange={(val) => setValue(val[0])}
                    className="[&_.bg-primary]:bg-[#2B4C88]"
                />
            </div>
            <Input
                type="number"
                value={value}
                onChange={(e) => {
                    let newVal = parseFloat(e.target.value);
                    if (isNaN(newVal)) newVal = min;
                    if (newVal < min) newVal = min;
                    if (newVal > max) newVal = max;
                    setValue(newVal);
                }}
                className="w-20 text-center border-[#2B4C88]  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
        </div>
    ); 
};

export default CustomSlider