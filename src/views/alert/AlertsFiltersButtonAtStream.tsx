import { cn } from '@/lib/utils';
import { IconBounceRight, IconFireExtinguisher, IconFriends, IconLayoutDashboard, IconLicense, IconTreadmill, IconUserScan } from '@tabler/icons-react';
import React from 'react'
import { useTranslations } from "next-intl";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
function AlertsFiltersButtonAtStream({ selectedTab, changeTab, }: { selectedTab: string, changeTab: (val: string) => void }) {
    const t = useTranslations()
    const isPeople = useSelector(
        (state: RootState) => state.singleCamera.isPeople,
    );
    const peopleCount = useSelector(
        (state: RootState) => state.singleCamera.peopleCount,
    );
    const tabFilters = [
        { id: 0, label: `${t("alerts.all")}`, value: 'all', icon: <IconLayoutDashboard stroke={2} /> },
        { id: 1, label: `${t("alerts.intrusion_detection")}`, value: 'INTRUSION_DETECTION', icon: <IconTreadmill stroke={2} /> },
        { id: 2, label: `${t("alerts.motion_detection")}`, value: 'MOTION_DETECTION', icon: <IconBounceRight stroke={2} /> },
        { id: 3, label: `${t("alerts.people_count")}`, value: 'PEOPLE_COUNT', icon: <IconFriends stroke={2} /> },
        { id: 4, label: `${t("alerts.face_detection")}`, value: 'FACE_DETECTION', icon: <IconUserScan stroke={2} /> },
        { id: 5, label: `${t("alerts.license_plate_detection")}`, value: 'LICENSE_PLATE_DETECTION', icon: <IconLicense stroke={2} /> },
        { id: 6, label: `${t("alerts.fire_smoke_detection")}`, value: 'FIRE_SMOKE_DETECTION', icon: <IconFireExtinguisher stroke={2} /> },
    ];
    return (
        <div className="flex gap-2 md:gap-4 min-h-min overflow-x-auto w-full  p-2 pb-4 px-4 justify-start md:justify-normal">
            {tabFilters.map((tf, index) => (
                <button
                    key={index}
                    onClick={() => changeTab(tf.value)}
                    className={cn(
                        'flex  items-center justify-center gap-2',
                        'px-3 rounded-lg md:rounded-xl hover:bg-white hover:text-black',
                        selectedTab === tf.value
                            ? 'bg-[#2B4C88] text-white'
                            : 'bg-[var(--surface-350)] text-[#888888]'
                    )}
                >
                    <div className="flex items-center flex-col justify-center">
                        {React.cloneElement(tf.icon, { size: 16 })}
                    <span className="text-xs mt-1">{tf.label}</span>
                    </div>
                    {tf.value === 'PEOPLE_COUNT' && isPeople && (<div className={`rounded-full flex px-1 justify-center items-center ${selectedTab === tf.value
                        ? ' bg-[#888888]'
                        : ' bg-white'}`}>
                        <span className="text-xs text-center self-center "> {  peopleCount?.people_count }</span>
                    </div>)}
                </button>
            ))}
        </div>
    )
}

export default AlertsFiltersButtonAtStream
