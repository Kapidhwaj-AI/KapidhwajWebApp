import Spinner from "../ui/Spinner";
import { ManageHub } from "@/models/settings";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const IconRouter = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconRouter))
const IconRefresh = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconRefresh))
const IconCopyPlus = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconCopyPlus))

interface NearbyHubsProps {
    className?: string;
    isHubLoading: boolean;
    fetchHub: () => Promise<void>;
    nearbyHubs: ManageHub[];
    handleNearbyAdd: (ip: string) => void
}

export const NearbyHubs: React.FC<NearbyHubsProps> = ({ className = "", isHubLoading, fetchHub, nearbyHubs, handleNearbyAdd }) => {
    const t = useTranslations('manage_hubs')

    return (
        <div className={`flex flex-col bg-[var(--surface-100)] h-[36vh] max-h-[36vh]  scrollbar-hide overflow-y-auto px-8 rounded-2xl md:rounded-4xl ${className}`}>
            <div className="flex justify-between items-center pt-4 pb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <IconRouter size={24} className="text-[var(--text-color)]" />
                    <h2 className="text-sm font-bold">{t('nearby_hubs')}</h2>
                </div>
                <button
                    onClick={async() => await fetchHub()}
                    disabled={isHubLoading}
                    className="p-2 hover:bg-[var(--surface-200)] rounded-full transition-colors disabled:opacity-50"
                >
                    <IconRefresh
                        size={20}
                        className={`text-gray-600 ${isHubLoading ? 'animate-spin' : ''}`}
                    />
                </button>
            </div>

            {/* Scrollable Content */}
            {isHubLoading ? <Spinner /> : nearbyHubs.length === 0 ? <div className="flex justify-center items-center w-full h-full">
                {t(`couldn't_get_nearby_hubs`)}
            </div>:
                <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100%-5rem)] pb-4 scrollbar-hide">
                    <div className="space-y-3">
                        {nearbyHubs?.map((hub) => (
                            <div key={hub.ip} className="flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors">
                                <div className="w-10 h-10 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                    <IconRouter size={20} className="text-[#888888]" />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{hub.ip}</p>
                                </div>
                                <button
                                    onClick={() => handleNearbyAdd(hub.name)}
                                    className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                >
                                    <IconCopyPlus size={18} className="text-gray-600" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}; 