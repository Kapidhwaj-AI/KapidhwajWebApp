import { Badge } from "@/components/ui/badge";
import { IconVideo } from '@tabler/icons-react';

const LiveBadge = () => {
    return (
        <Badge className="flex items-center  gap-1 backdrop-blur-xs bg-[#FF6868] opacity-80 text-white px-2 py-1 rounded-full text-xs font-bold">
            <IconVideo stroke={2} />
            LIVE
        </Badge>
    );
};

export default LiveBadge;
