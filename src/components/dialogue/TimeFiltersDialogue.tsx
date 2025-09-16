
import { format, isValid } from "date-fns";
const IconX = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconX),
    { ssr: false });

const IconChevronDown = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconChevronDown),
    { ssr: false });
const Calendar = dynamic(() => import("@/components/ui/calendar").then((mod) => mod.Calendar),
    { ssr: false });
const TimePicker = dynamic(() => import("@/components/ui/time-picker").then((mod) => mod.TimePicker),
    { ssr: false });

const Popover = dynamic(() => import("@/components/ui/popover").then((mod) => mod.Popover),
    { ssr: false });
const PopoverContent = dynamic(() => import("@/components/ui/popover").then((mod) => mod.PopoverContent),
    { ssr: false });

const PopoverTrigger = dynamic(() => import("@/components/ui/popover").then((mod) => mod.PopoverTrigger),
    { ssr: false });

const Button = dynamic(() => import("@/components/ui/button").then((mod) => mod.Button),
    { ssr: false });
import Modal from '../ui/Modal';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useStore } from "@/store";
import Spinner from "../ui/Spinner";

export function TimeFiltersDialogue({ isOpen, onClose, date, startTime, endTime, setDate, setEndTime, setStartTime, handleApplyFilter }: { isOpen: boolean; onClose: () => void; date: Date | undefined, startTime: Date | undefined; endTime: Date | undefined; setDate: (val: Date | undefined) => void; setStartTime: (val: Date | undefined) => void; setEndTime: (val: Date | undefined) => void; handleApplyFilter: (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => void }) {
    const t = useTranslations()
    const filterLoading = useStore(state => state.singleCamera.filterLoading)
    return (
        <Modal onClose={onClose} title={t('alerts.apply_filter')}>
            <form onSubmit={(e) => { e.preventDefault(); handleApplyFilter(date, startTime, endTime) }} className="flex-1 space-y-4 mb-6">

                <div>
                    <label className="block text-md font-medium mb-2">{t('date')}</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full h-[35px] flex items-center justify-between sm:h-[40px] md:h-[45px] p-2 px-4 bg-transparent rounded-full focus:outline-none border-2 border-[#2B4C88] dark:text-white"
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
                                autoFocus
                                className="w-sm shadow-sm rounded-xl "
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-md font-medium mb-2">{t('start_time')}</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-[35px] flex items-center justify-between sm:h-[40px] md:h-[45px] p-2 px-4 bg-transparent rounded-full focus:outline-none border-2 border-[#2B4C88] dark:text-white"
                                    >

                                        {startTime && isValid(startTime)
                                            ? startTime.toLocaleTimeString()
                                            : t('alerts.start_time')}
                                        <IconChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-[var(--surface-200)] rounded-xl">
                                    <TimePicker
                                        value={startTime}
                                        onChange={(val) => {
                                            if (val && isValid(val)) {
                                                setStartTime(val);
                                            } else {
                                                setStartTime(undefined)
                                            }
                                        }}
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
                                        className="w-full h-[35px] flex items-center justify-between sm:h-[40px] md:h-[45px] p-2 px-4 bg-transparent rounded-full focus:outline-none border-2 border-[#2B4C88] dark:text-white"
                                    >
                                        {endTime ? endTime.toLocaleTimeString() : t('alerts.end_time')}
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
                <div className="flex justify-end gap-4 mt-4 pt-4">
                    <button type='button'
                        className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('close')}</span>
                    </button>
                    <button type='submit'
                        className="px-6 py-3 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                    >
                        {filterLoading ? <Spinner /> : t('alerts.apply_filter')}
                    </button>
                </div>
            </form>

        </Modal>

    );
}