import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setToggleColumns } from "@/redux/slices/cameraSlice";

const columns = [
    { label: "2 columns", value: 2 },
    { label: "3 columns", value: 3 },
    { label: "4 columns", value: 4 },
    { label: "5 columns", value: 5 },
];

const ColumnDropdown = () => {
    const dispatch = useDispatch<AppDispatch>();
    const toggleColumnValue = useSelector((state: RootState) => state.camera.toogleColumns);

    const [selected, setSelected] = useState(columns.find(col => col.value === toggleColumnValue)?.label || "3 columns");

    const handleChange = (colValue: number) => {
        setSelected(columns.find(col => col.value === colValue)?.label || "3 columns");
        dispatch(setToggleColumns(colValue)); // Dispatch action to Redux
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center justify-between w-36 px-4 py-2 rounded-full text-[#888888] bg-[var(--surface-100)] outline-none focus:ring-0 focus:outline-none"
                >
                    <span>{selected}</span>
                    <div className="flex flex-col">
                        <ChevronUp size={14} className="text-[var(--foreground-muted)]" />
                        <ChevronDown size={14} className="text-[var(--foreground-muted)] -mt-1" />
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
