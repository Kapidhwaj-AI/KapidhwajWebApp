import { IconClock, IconCalendar, IconMovie, IconTreadmill, IconPhoto } from "@tabler/icons-react";

export function AlertCard({ alert }: { alert: any }) {
    return (
        <div className="w-full bg-[var(--surface-200)] rounded-4xl shadow-lg overflow-hidden pb-2 ">
            {/* bg-stone-800 */}
            {/* Header */}
            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <IconTreadmill className="text-gray-600 dark:text-gray-400" size={20} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xs">Intrusion</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">HQ &gt; Camera 4</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-right text-xs mr-3">
                    <div className="flex items-center gap-1">
                        <IconCalendar size={14} />
                        <span className="text-gray-500 dark:text-gray-400">24/10/25</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconClock size={14} />
                        <span className="text-gray-500 dark:text-gray-400">07:30</span>
                    </div>
                </div>
            </div>

            {/* single thumbnail */}
            <div className="relative aspect-video m-4 rounded-xl flex items-center justify-center"
                style={{
                    backgroundImage: "url('/assets/images/alert-image.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>

                <div className="absolute h-16 w-16 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <IconMovie stroke={2} className="text-gray-600 dark:text-gray-300" size={24} />
                </div>
            </div>

            {/* card with 2 thumbnails */}
            {/* <div className="flex gap-3 p-3">
                <div
                    className="relative aspect-video w-1/2 h-20 sm:h-25 md:h-30 rounded-xl bg-cover bg-center overflow-hidden"
                    style={{
                        backgroundImage: "url('/assets/images/alert-image.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <IconPhoto className="text-white" size={20} />
                        </div>
                    </div>
                </div>

                <div
                    className="relative aspect-video w-1/2 h-20 sm:h-25 md:h-30 rounded-xl bg-cover bg-center overflow-hidden"
                    style={{
                        backgroundImage: "url('/assets/images/alert-image.png')"
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <IconMovie className="text-white" size={20} />
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="relative aspect-video m-4 rounded-xl flex items-center justify-center"
                style={{
                    backgroundImage: "url('/assets/images/alert-image.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>

                <div className="absolute h-16 w-16 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <IconMovie stroke={2} className="text-gray-600 dark:text-gray-300" size={24} />
                </div>
            </div> */}
        </div>
    );
}