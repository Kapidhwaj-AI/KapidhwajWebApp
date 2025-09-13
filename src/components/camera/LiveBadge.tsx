
import dynamic from "next/dynamic";

const Badge = dynamic(() => import("@/components/ui/badge").then((mod) => mod.Badge),
    { ssr: false });
const IconVideo = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconVideo),
    { ssr: false });

const LiveBadge = () => {
    return (
        <Badge className="flex items-center gap-1 backdrop-blur-xs bg-[#FF6868] opacity-80 text-white px-2 py-1 rounded-full text-xs font-bold">
            <IconVideo stroke={'2'} size="sm" />
            LIVE
        </Badge>
    );
};

export default LiveBadge;
