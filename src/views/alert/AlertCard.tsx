import { Alert } from "@/models/alert";
import Image from "next/image";
import dynamic from 'next/dynamic';

import { getLocalStorageItem } from "@/lib/storage";
import { useState } from "react";
const AlertPreviewDialogue = dynamic(() => import('@/components/dialogue/AlertPreviewDialogue'));
import { GOOGLE_KPH_BUCKET_URL } from "@/services/config";
import Link from "next/link";
import { RootState, useStore } from "@/store";
import { CameraLocation } from "@/models/camera";
const IconBounceRight = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBounceRight),
    { ssr: false });

const IconCalendar = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconCalendar),
    { ssr: false });
const IconClock = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconClock),
    { ssr: false });

const IconFireExtinguisher = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconFireExtinguisher),
    { ssr: false });
const IconFriends = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconFriends),
    { ssr: false });

const IconLayoutDashboard = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconLayoutDashboard),
    { ssr: false });
const IconLicense = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconLicense),
    { ssr: false });

const IconMovie = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconMovie),
    { ssr: false });
const IconTreadmill = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconTreadmill),
    { ssr: false });
const IconChevronRight = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconChevronRight),
    { ssr: false });

export function AlertCard({ alert, cameraLocation }: { alert: Alert; cameraLocation?: CameraLocation }) {
    const [isPreview, setIsPreview] = useState(false);
    const timestamp = alert?.timestamp || 0
    const alertTimestamp = new Date(timestamp * 1000);
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const ports = useStore((state: RootState) => state.singleCamera.ports)
    const staticPort = !Number.isNaN(ports.static_port) ? ports.static_port : remoteHub?.static_port
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    const baseUrl = isValidHub ? remoteHub.id ? `http://turn.kapidhwaj.ai:${staticPort}/` : `http://${localHub.id}.local:3000/` : GOOGLE_KPH_BUCKET_URL
    const formattedDate = alertTimestamp.toLocaleDateString("en-GB");
    const formattedTime = alertTimestamp.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <div className="w-full bg-[var(--surface-200)] rounded-4xl shadow-lg overflow-hidden">
            <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-1 items-start md:items-center p-2 md:px-4 md:pt-4">
                <div className="flex items-center gap-1 md:gap-3">
                    {alert.alertType === 'FACE_DETECTION' && alert?.persons && <Link href={{ pathname: "/person-details", query: { id: alert.person_ids[0] } }}><Image alt={alert?.persons[0].gcp_image_path ?? ''} loading="lazy" priority={false} width={1000} height={1000} className="rounded-full object-cover w-12 h-12 aspect-auto" src={baseUrl + `${alert?.persons[0].gcp_image_path}`} /></Link>}
                    {alert.alertType !== 'FACE_DETECTION' && <div className="p-2 md:p-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {[
                            { value: 'all', icon: <IconLayoutDashboard stroke={'2'} /> },
                            { value: 'INTRUSION_DETECTION', icon: <IconTreadmill stroke={'2'} /> },
                            { value: 'MOTION_DETECTION', icon: <IconBounceRight stroke={'2'} /> },
                            { value: 'PEOPLE_COUNT', icon: <IconFriends stroke={'2'} /> },
                            { value: 'LICENSE_PLATE_DETECTION', icon: <IconLicense stroke={'2'} /> },
                            { value: 'FIRE_SMOKE_DETECTION', icon: <IconFireExtinguisher stroke={'2'} /> },
                        ].find((item) => item.value === alert?.alertType)?.icon}

                    </div>}
                    <div className="flex flex-col gap-1">
                        {alert.alertType === 'FACE_DETECTION' ? <h3 className="text-xs">{alert?.persons?.[0].name} {`(${alert?.persons?.[0].category?.name ?? ' '})`}</h3>
                            : alert.alertType === 'PEOPLE_COUNT' ? <h3 className="text-xs">Crowd Alert: {alert?.meta_data?.PEOPLE_COUNT}</h3>
                                : alert.alertType === 'FIRE_SMOKE_DETECTION' ? <h3 className="text-xs">{alert?.meta_data?.DETECTED_FIRE_SMOKE?.toUpperCase()}</h3>
                                    : alert.alertType === 'LICENSE_PLATE_DETECTION' ? <h3 className="text-xs">{alert?.meta_data?.DETECTED_PLATE}</h3>
                                        :
                                        <h3 className="text-xs">{alert?.alertType}</h3>
                        }
                        <p className="flex text-xs items-center gap-1 font-light whitespace-normal break-words">
                            {cameraLocation?.organization && (
                                <>
                                    <IconChevronRight size={12} className="text-gray-400 text-xs" />
                                    {cameraLocation.organization}
                                </>
                            )}
                            {cameraLocation?.parantFolder !== "NA" &&
                                cameraLocation?.parantFolder !== undefined && (
                                    <div className="flex gap-2 items-center">
                                        {cameraLocation?.parantFolder}
                                        <IconChevronRight size={12} className="text-gray-400 text-xs" />
                                    </div>
                                )}
                            {alert.camera?.name}
                        </p>
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
            <div className="relative aspect-video m-4 rounded-xl flex items-center justify-center"
            >
                {alert?.frame_url && isValidHub ? <Image priority={false} loading="lazy" src={baseUrl + alert?.frame_url} alt={alert?.alertType} width={1000} height={1000} className="object-cover w-auto h-auto rounded-2xl" /> : <Image priority={false} src={baseUrl + alert?.frame_url} alt={alert?.alertType} width={1000} height={1000} className="object-cover w-auto h-auto rounded-2xl" />}

                <button onClick={() => setIsPreview(true)} className="absolute h-14 w-14 rounded-full bg-neutral-400/20 dark:bg-black/20 backdrop-blur-[32px] flex items-center justify-center">
                    <IconMovie stroke={'2'} className="text-gray-600 dark:text-gray-300" size={24} />
                </button>
            </div>
            {isPreview && <AlertPreviewDialogue onClose={() => setIsPreview(false)} imageUrl={baseUrl + alert.frame_url} alertType={alert.alertType === 'FACE_DETECTION' ? `${alert?.persons?.[0].name} ${`(${alert?.persons?.[0].category?.name ?? ' '})`}` : alert.alertType === 'PEOPLE_COUNT' ? `Crowd Alert: ${alert?.meta_data?.PEOPLE_COUNT}` : alert.alertType === 'LICENSE_PLATE_DETECTION' ? `${alert?.meta_data?.DETECTED_PLATE}` : alert.alertType} />}
        </div>
    );
}