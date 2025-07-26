import { Alert } from "@/models/alert";
import { IconClock, IconCalendar, IconMovie, IconTreadmill, IconLayoutDashboard, IconBounceRight, IconFriends, IconUserScan, IconLicense, IconFireExtinguisher } from "@tabler/icons-react";
import Image from "next/image";

import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";
import { getLocalStorageItem } from "@/lib/storage";
import { useState } from "react";
import AlertPreviewDialogue from "@/components/dialogue/AlertPreviewDialogue";

export function AlertCard({ alert }: { alert: Alert }) {
    const [isPreview, setIsPreview] = useState(false);
    const timestamp = alert?.timestamp || 0
    const alertTimestamp = new Date(timestamp * 1000);
    const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
    let baseUrl = hub ? `http://media.kapidhwaj.ai:${hub.static_port}/` : 'http://media.kapidhwaj.ai:3000/'
    const formattedDate = alertTimestamp.toLocaleDateString("en-GB");
    const formattedTime = alertTimestamp.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const handleDownload = async() => {
        try{

            const response = await fetch(baseUrl + alert.frame_url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = baseUrl + alert.frame_url;
            link.download = `${alert.alertType}_${new Date().toISOString()}.png` ;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        }catch(err){
            console.error(err)
        }
    }
    return (
        <div className="w-full bg-[var(--surface-200)] rounded-4xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {[
                            { value: 'all', icon: <IconLayoutDashboard stroke={2} /> },
                            { value: 'INTRUSION_DETECTION', icon: <IconTreadmill stroke={2} /> },
                            { value: 'MOTION_DETECTION', icon: <IconBounceRight stroke={2} /> },
                            { value: 'PEOPLE_COUNT', icon: <IconFriends stroke={2} /> },
                            { value: 'FACE_DETECTION', icon: <IconUserScan stroke={2} /> },
                            { value: 'LICENSE_PLATE_DETECTION', icon: <IconLicense stroke={2} /> },
                            { value: 'FIRE_SMOKE_DETECTION', icon: <IconFireExtinguisher stroke={2} /> },
                        ].find((item) => item.value === alert?.alertType)?.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xs">{alert?.alertType}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{alert?.camera?.name} </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-right text-xs mr-3">
                    <div className="flex items-center gap-1">
                        <IconCalendar size={14} />
                        <span className="text-gray-500 dark:text-gray-400">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconClock size={14} />
                        <span className="text-gray-500 dark:text-gray-400">{formattedTime}</span>
                    </div>
                </div>
            </div>

            {/* Image Area */}
            <div className="relative aspect-video m-4 rounded-xl flex items-center justify-center"
            >
                {alert?.frame_url && <Image src={baseUrl + alert?.frame_url} alt={alert?.alertType} width={1000} height={1000} className="object-cover w-auto h-auto rounded-2xl" />}

                <button onClick={() => setIsPreview(true)} className="absolute h-14 w-14 rounded-full bg-neutral-400/20 dark:bg-black/20 backdrop-blur-[32px] flex items-center justify-center">
                    <IconMovie stroke={2} className="text-gray-600 dark:text-gray-300" size={24} />
                </button>
            </div>
            {isPreview && <AlertPreviewDialogue handleDownload={handleDownload} onClose={() => setIsPreview(false)} imageUrl={baseUrl + alert.frame_url} alertType={alert.alertType} />}
        </div>
    );
}