'use client';
import { useState } from 'react';
import { IconX, IconCheck, IconSquare, IconSquareCheck, IconChevronDown } from '@tabler/icons-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { TimePicker } from "@/components/ui/time-picker";
import Modal from '../ui/Modal';

export function TimeFiltersDialogue({ isOpen, onClose, date, startTime, endTime, setDate, setEndTime, setStartTime }: { isOpen: boolean; onClose: () => void; date: Date | undefined, startTime: Date | undefined; endTime: Date | undefined; setDate: (val: Date | undefined) => void; setStartTime: (val: Date | undefined) => void; setEndTime: (val: Date | undefined) => void }) {
    console.log(date, startTime, endTime,"times")
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} title='Apply Filter'>
            {/* Content Area */}
            <div className="flex-1 space-y-4 mb-6">
                {/* Person Filter - Dropdown */}


                {/* Date Filter - Calendar Popover */}
                <div>
                    <label className="block text-md font-medium mb-2">Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full h-[60px] justify-between p-4 text-left bg-[var(--surface-150)] hover:bg-[var(--surface-100)] border-none rounded-full text-base"
                            >
                                {date ? format(date, "PPP") : "Select Date"}
                                <IconChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
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
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-md font-medium mb-2">Start Time</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-[60px] justify-between p-4 text-left bg-[var(--surface-150)] hover:bg-[var(--surface-100)] border-none rounded-full text-base"
                                    >
                                        {startTime ? format(startTime, "h:mm a") : "Select Time"}
                                        <IconChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
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
                            <label className="block text-md font-medium mb-2">End Time</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-[60px] justify-between p-4 text-left bg-[var(--surface-150)] hover:bg-[var(--surface-100)] border-none rounded-full text-base"
                                    >
                                        {endTime ? format(endTime, "h:mm a") : "Select Time"}
                                        <IconChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
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
            </div>

            {/* Action Buttons - Fixed to Bottom */}
            <div className="flex justify-end gap-4 mt-4 pt-4">
                <button
                    className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                    onClick={onClose}
                >
                    <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />Close</span>
                </button>
                <button
                    className="px-6 py-3 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                    onClick={() => {

                        
                    }}
                >
                    Apply Filter
                </button>
            </div>
        </Modal>

    );
}