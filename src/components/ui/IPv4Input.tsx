import React, { useState, useRef } from "react";

interface IPv4InputProps {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    label: string;
    required?: boolean;
}

const IPv4Input: React.FC<IPv4InputProps> = ({
    value = "",
    onChange,
    disabled,
    label,
    required,
}) => {
    const initial = value.split(".").concat(Array(4).fill("")).slice(0, 4);
    const [segments, setSegments] = useState(initial);

    // Store refs for all 4 inputs
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, val: string) => {
        if (!/^\d*$/.test(val)) return;
        const newSegments = [...segments];
        if (val && parseInt(val) > 255) {
            newSegments[index] = (255).toString()
            setSegments(newSegments);
            return
        };
        newSegments[index] = val;

        setSegments(newSegments);

        if (onChange) {
            onChange(newSegments.filter((s) => s !== "").join("."));
        }
        if (val.length === 3 && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && segments[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "." && index < 3) {
            e.preventDefault();
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <label
                htmlFor={`${label.toLowerCase()}`}
                className="block text-start text-xs sm:text-sm text-black dark:text-white"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div
                className={`w-full flex justify-between items-center h-[40px] px-4 rounded-full 
          ${disabled ? "bg-gray-200" : "bg-transparent"} 
          ring-2 ring-[#2B4C88] text-gray-600 dark:text-white`}
            >
                {segments.map((seg, idx) => (
                    <React.Fragment key={idx}>
                        <input
                            ref={(el) => {
                                inputRefs.current[idx] = el
                            }}
                            type="text"
                            value={seg}
                            disabled={disabled}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            maxLength={3}
                            className="md:w-10 w-5 text-center outline-none bg-transparent
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
                [-moz-appearance:textfield]"
                        />
                        {idx < 3 && <span className="w-[3px] h-[3px] bg-black rounded-full"></span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default IPv4Input;
