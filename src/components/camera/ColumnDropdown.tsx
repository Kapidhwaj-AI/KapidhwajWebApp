import { useState } from "react";
const DropdownMenu = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu),
    { ssr: false });
const DropdownMenuContent = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuContent),
    { ssr: false });
const DropdownMenuItem = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem),
    { ssr: false });
const DropdownMenuTrigger = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuTrigger),
    { ssr: false });

const IconChevronDown = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconChevronDown),
    { ssr: false });

const IconChevronUp = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconChevronUp),
    { ssr: false });


import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { RootActions, RootState, useStore } from "@/store";

const ColumnDropdown = () => {
    const setToggleColumns = useStore((state: RootActions) => state.setToggleColumns);
    const toggleColumnValue = useStore((state: RootState) => state.camera.toogleColumns);

    const t = useTranslations()
    const columns = [
        { label: `2 ${t('columns')}`, value: 2 },
        { label: `3 ${t('columns')}`, value: 3 },
        { label: `4 ${t('columns')}`, value: 4 },
        { label: `5 ${t('columns')}`, value: 5 },
    ];
    const [selected, setSelected] = useState(columns.find(col => col.value === toggleColumnValue)?.label || `3 ${t('columns')}`);

    const handleChange = (colValue: number) => {
        setSelected(columns.find(col => col.value === colValue)?.label || `3 ${t('columns')}`);
        setToggleColumns(colValue)
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center justify-between w-36 px-4 py-2 rounded-full text-[#888888] bg-[var(--surface-100)] outline-none focus:ring-0 focus:outline-none"
                >
                    <span>{selected}</span>
                    <div className="flex flex-col">
                        <IconChevronUp size={14} className="text-[var(--foreground-muted)]" />
                        <IconChevronDown size={14} className="text-[var(--foreground-muted)] -mt-1" />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-36 bg-[var(--surface-100)] rounded-md shadow-lg outline-none border-0"
            >
                {columns.map((col) => (
                    <DropdownMenuItem
                        key={col.value}
                        onClick={() => handleChange(col.value)}
                        className="cursor-pointer hover:bg-[var(--surface-200)] text-[var(--foreground)] outline-none border-0"
                    >
                        {col.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ColumnDropdown;
