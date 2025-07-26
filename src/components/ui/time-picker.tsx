// components/ui/time-picker.tsx
'use client';
import * as React from 'react';
import { format } from 'date-fns';


interface TimePickerProps {
    value?: Date;
    onChange: (value?: Date) => void;
    className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
    const [time, setTime] = React.useState(value || new Date());

    return (
        <div className={`p-4 ${className}`}>
            <div className="flex items-center justify-center gap-4">
                <input
                    type="time"
                    value={format(time, 'HH:mm')}
                    onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':');
                        const newTime = new Date(time);
                        newTime.setHours(parseInt(hours));
                        newTime.setMinutes(parseInt(minutes));
                        setTime(newTime);
                        onChange(newTime);
                    }}
                    className="bg-[var(--surface-150)] p-2 rounded-lg"
                />
            </div>
            {/* <div className="flex justify-center">
                <Clock className="h-6 w-6 text-gray-500" />
            </div> */}
        </div>
    );
}