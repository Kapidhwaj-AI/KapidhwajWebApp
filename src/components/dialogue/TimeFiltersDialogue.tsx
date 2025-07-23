'use client';
import { useState } from 'react';
import { IconX, IconCheck, IconSquare, IconSquareCheck, IconChevronDown } from '@tabler/icons-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { TimePicker } from "@/components/ui/time-picker";
import Modal from '../ui/Modal';
import { useTranslations } from 'next-intl';

export function TimeFiltersDialogue({ isOpen, onClose, date, startTime, endTime, setDate, setEndTime, setStartTime, handleApplyFilter }: { isOpen: boolean; onClose: () => void; date: Date | undefined, startTime: Date | undefined; endTime: Date | undefined; setDate: (val: Date | undefined) => void; setStartTime: (val: Date | undefined) => void; setEndTime: (val: Date | undefined) => void; handleApplyFilter: (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => void }) {
    if (!isOpen) return null;
    const t = useTranslations()
    return (
        <Modal onClose={onClose} title={t('alerts.apply_filter')}>
            {/* Content Area */}
            <div className="flex-1 space-y-4 mb-6">
            
                <div>
                    <label className="block text-md font-medium mb-2">{t('date')}</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full h-[35px] flex items-center justify-between sm:h-[40px] md:h-[45px] p-2 px-4 bg-transparent rounded-full border-none focus:outline-none ring-2 ring-[#2B4C88] dark:text-white"
                            >
                                {date ? format(date, "PPP") : t("alerts.select_date")}
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
                            <label className="block text-md font-medium mb-2">{t('start_time')}</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-[35px] flex items-center justify-between sm:h-[40px] md:h-[45px] p-2 px-4 bg-transparent rounded-full border-none focus:outline-none ring-2 ring-[#2B4C88] dark:text-white"
                                    >
                                        {startTime ? format(startTime, "h:mm a") : t('alerts.start_time') }
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
                            <label className="block text-md font-medium mb-2">{t('start_time')}</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-[35px] flex items-center justify-between sm:h-[40px] md:h-[45px] p-2 px-4 bg-transparent rounded-full border-none focus:outline-none ring-2 ring-[#2B4C88] dark:text-white"
                                    >
                                        {endTime ? format(endTime, "h:mm a") : t('alerts.end_time') }
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
                    <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('close')}</span>
                </button>
                <button
                    className="px-6 py-3 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                    onClick={() => {
                        handleApplyFilter(date, startTime, endTime)

                    }}
                >
                    {t('alerts.apply_filter')}
                </button>
            </div>
        </Modal>

    );
}