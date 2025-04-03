import { useState } from "react";
import { Button } from "@/components/ui/button";

const filters = ["All Streams", "Reception Area", "Office Ground", "Office Second Floor", "Waiting Room", "Main Entrance",
    "Back Entrance",
    "Server Room",
    "Break Room",
    "Conference Hall",
    "Security Desk",
    "Elevator Lobby",
    "Staircase",
    "Warehouse",
    "Loading Dock",
    "Cafeteria",
    "Restrooms",
    "IT Department",
    "Executive Floor"];

const OrganizationFilterButtons = () => {
    const [selected, setSelected] = useState("All Streams");

    return (
        <div className="w-full xl:max-w-250 lg:max-w-200 md:max-w-150 sm:max-w-100 pb-2">
            <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                {filters.map((filter) => (
                    <Button
                        key={filter}
                        variant="ghost"
                        className={`px-4 py-2 rounded-full transition-all ${selected === filter
                            ? "bg-[#2B4C88] text-white shadow-md"
                            : "bg-[var(--surface-400)] text-gray-500"
                            }`}
                        onClick={() => setSelected(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default OrganizationFilterButtons;