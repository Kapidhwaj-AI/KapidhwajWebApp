import {  IconAlertSmall, IconHexagon } from "@tabler/icons-react";

export const HexagonAlertIcon = () => {
    return (
        <div className="relative w-8 h-8">
            {/* Hexagon background */}
            <IconHexagon stroke={2} className="text-white absolute inset-0" size={32} />

            {/* Alert icon inside */}
            <IconAlertSmall stroke={2} className="text-white absolute inset-0 m-auto" size={32} />
        </div>
    );
};