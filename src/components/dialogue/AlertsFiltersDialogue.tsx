'use client';
import { useState } from 'react';
import { IconX, IconCheck, IconSquare, IconSquareCheck, IconChevronDown } from '@tabler/icons-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { TimePicker } from "@/components/ui/time-picker";

export function AlertFiltersDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
    const [isPersonOpen, setIsPersonOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date | undefined>(undefined);

    const people = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Robert Johnson' },
        { id: '4', name: 'Emily Davis' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
            <div className="bg-[var(--surface-200)] rounded-4xl  w-full max-w-2xl p-8 shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Apply Filter</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-[var(--surface-150)]"
                    >
                        <IconX size={24} color='red' />
                    </button>
                </div>

                {/* Person Filter - Dropdown */}
                <div className="mb-4">
                    <label className="block text-md font-medium mb-2">Person</label>
                    <Popover open={isPersonOpen} onOpenChange={setIsPersonOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between p-4 text-left bg-[var(--surface-150)] hover:bg-[var(--surface-100)] border-none rounded-full"
                            >
                                {selectedPerson || "Select Person"}
                                <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-2 bg-[var(--surface-200)] rounded-xl">
                            {people.map((person) => (
                                <div
                                    key={person.id}
                                    className="p-3 hover:bg-[var(--surface-150)] rounded-lg cursor-pointer"
                                    onClick={() => {
                                        setSelectedPerson(person.name);
                                        setIsPersonOpen(false);
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        {selectedPerson === person.name ? (
                                            <IconSquareCheck className="text-blue-500" size={20} />
                                        ) : (
                                            <IconSquare className="text-gray-500" size={20} />
                                        )}
                                        <span>{person.name}</span>
                                    </div>
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Date Filter - Calendar Popover */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between p-4 text-left bg-[var(--surface-150)] hover:bg-[var(--surface-100)] border-none rounded-full"
                            >
                                {date ? format(date, "PPP") : "Select Date"}
                                <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--surface-200)] rounded-xl">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                className="rounded-xl"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Time Filter - Time Picker */}
                <div className="mb-20">
                    {/* <h3 className="text-lg font-medium mb-2">Time</h3> */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Start Time</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between p-4 text-left bg-[var(--surface-150)] hover:bg-[var(--surface-100)] border-none rounded-full"
                                    >
                                        {startTime ? format(startTime, "h:mm a") : "Select Time"}
                                        <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-[var(--surface-200)] rounded-xl">
                                    <TimePicker
                                        value={startTime}
                                        onChange={setStartTime}
                                        className="rounded-xl"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">End Time</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between p-4 text-left bg-[var(--surface-150)] hover:bg-[var(--surface-100)] border-none rounded-full"
                                    >
                                        {endTime ? format(endTime, "h:mm a") : "Select Time"}
                                        <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-[var(--surface-200)] rounded-xl">
                                    <TimePicker
                                        value={endTime}
                                        onChange={setEndTime}
                                        className="rounded-xl"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        className="px-6 py-3 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-3 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-sm"
                        onClick={() => {
                            // Handle filter application here
                            console.log({
                                person: selectedPerson,
                                date,
                                startTime,
                                endTime
                            });
                            onClose();
                        }}
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    );
}