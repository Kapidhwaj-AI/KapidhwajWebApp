import { Alert } from "@/models/alert";
import { IconClock, IconCalendar, IconMovie, IconTreadmill, IconLayoutDashboard, IconBounceRight, IconFriends, IconUserScan, IconLicense, IconFireExtinguisher } from "@tabler/icons-react";
import Image from "next/image";

import { getLocalStorageItem } from "@/lib/storage";
import { useState } from "react";
import AlertPreviewDialogue from "@/components/dialogue/AlertPreviewDialogue";
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";
import Link from "next/link";
import { PersonDetails } from "@/models/person-details";

export function AlertCard({ alert }: { alert: Alert }) {
    const [isPreview, setIsPreview] = useState(false);
    const timestamp = alert?.timestamp || 0
    const alertTimestamp = new Date(timestamp * 1000);
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    const baseUrl = isValidHub ? remoteHub.id ? `http://media.kapidhwaj.ai:${remoteHub.static_port}/` : `http://${localHub.id}.local:3000/` : GOOGLE_KPH_BUCKET_URL
    const formattedDate = alertTimestamp.toLocaleDateString("en-GB");
    const formattedTime = alertTimestamp.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <div className="w-full bg-[var(--surface-200)] rounded-4xl shadow-lg overflow-hidden">
            <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-1 items-start md:items-center p-2 md:px-4 md:pt-4">
                <div className="flex items-center gap-1 md:gap-3">
                    {alert.alertType === 'FACE_DETECTION' && alert?.persons && <Link href={{ pathname: "/person-details", query: { id: alert.person_ids[0] } }}><img className="rounded-full object-cover w-10 h-10 aspect-auto" src={baseUrl + `/${alert?.persons[0].gcp_image_path}`} /></Link>}
                    {alert.alertType !== 'FACE_DETECTION' && <div className="p-2 md:p-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {[
                            { value: 'all', icon: <IconLayoutDashboard stroke={2} /> },
                            { value: 'INTRUSION_DETECTION', icon: <IconTreadmill stroke={2} /> },
                            { value: 'MOTION_DETECTION', icon: <IconBounceRight stroke={2} /> },
                            { value: 'PEOPLE_COUNT', icon: <IconFriends stroke={2} /> },
                            { value: 'FACE_DETECTION', icon: <IconUserScan stroke={2} /> },
                            { value: 'LICENSE_PLATE_DETECTION', icon: <IconLicense stroke={2} /> },
                            { value: 'FIRE_SMOKE_DETECTION', icon: <IconFireExtinguisher stroke={2} /> },
                        ].find((item) => item.value === alert?.alertType)?.icon}

                    </div>}
                    <div className="flex flex-col gap-1">
                        {alert.alertType === 'FACE_DETECTION' ? <><h3 className="text-xs">{alert?.persons?.[0].name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{alert?.persons?.[0].category?.name ?? ' '} </p></> : alert.alertType === 'PEOPLE_COUNT' ? <><h3 className="text-xs">{alert?.meta_data?.PEOPLE_COUNT} Peoples Found</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{alert?.camera?.name} </p></> : alert.alertType === 'FIRE_SMOKE_DETECTION' ? <><h3 className="text-xs">{alert?.meta_data?.DETECTED_FIRE_SMOKE?.toUpperCase()}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{alert?.camera?.name} </p></> : alert.alertType === 'LICENSE_PLATE_DETECTION' ? <><h3 className="text-xs">{alert?.meta_data?.DETECTED_PLATE}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{alert?.camera?.name} </p></> : <>
                            <h3 className="text-xs">{alert?.alertType}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{alert?.camera?.name} </p>
                        </>}
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-right text-xs self-end md:self-center ">
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
                {alert?.frame_url && isValidHub ? <img src={baseUrl + alert?.frame_url} alt={alert?.alertType} width={1000} height={1000} className="object-cover w-auto h-auto rounded-2xl" /> : <Image src={baseUrl + alert?.frame_url} alt={alert?.alertType} width={1000} height={1000} className="object-cover w-auto h-auto rounded-2xl" />}

                <button onClick={() => setIsPreview(true)} className="absolute h-14 w-14 rounded-full bg-neutral-400/20 dark:bg-black/20 backdrop-blur-[32px] flex items-center justify-center">
                    <IconMovie stroke={2} className="text-gray-600 dark:text-gray-300" size={24} />
                </button>
            </div>
            {isPreview && <AlertPreviewDialogue onClose={() => setIsPreview(false)} imageUrl={baseUrl + alert.frame_url} alertType={alert.alertType} />}
        </div>
    );
}