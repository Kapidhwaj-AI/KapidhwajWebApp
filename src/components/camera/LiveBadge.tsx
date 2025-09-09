import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";

const LiveBadge = () => {
    return (
        <Badge className="flex items-center gap-1 backdrop-blur-xs bg-[#FF6868] opacity-80 text-white px-2 py-1 rounded-full text-xs font-bold">
            <Video stroke={'2'} size="sm" />
            LIVE
        </Badge>
    );
};

export default LiveBadge;
