import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export const DOBPicker =({
    date,
    setDate,
    placeholder
}: {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    placeholder: string
}) => {
    return (
        <Popover>
            <PopoverTrigger className="w-full min-h-[35px] sm:min-h-[40px] md:min-h-[45px] bg-transparent  px-4  rounded-full border-none focus:outline-none ring-2 ring-[#2B4C88] dark:text-gray-400" asChild>
                <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    // 🎯 Enable year + month dropdowns
                    captionLayout="dropdown"
                    fromYear={1920}
                    toYear={new Date().getFullYear()}
                    disabled={(date) => date > new Date()}
                />
            </PopoverContent>
        </Popover>
    );
}
