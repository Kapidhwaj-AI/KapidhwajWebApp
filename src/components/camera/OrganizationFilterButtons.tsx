import { useState } from "react";
import { Button } from "@/components/ui/button";

const filters = ["All Streams", "Reception Area", "Office Ground", "Office Second Floor", "Waiting Room"];

const OrganizationFilterButtons = () => {
    const [selected, setSelected] = useState("All Streams");

    return (
        <div className="flex gap-2">
            {filters.map((filter) => (
                <Button
                    key={filter}
                    variant="ghost"
                    className={`px-4 py-2 rounded-full transition-all
            ${selected === filter
                            ? "bg-[#2B4C88] text-white shadow-md"
                            : "bg-[var(--surface-400)] text-gray-500"
                        }`}
                    onClick={() => setSelected(filter)}
                >
                    {filter}
                </Button>
            ))}
        </div>
    );
};

export default OrganizationFilterButtons;
