const TimeFiltersDialogue = dynamic(() => import("@/components/dialogue/TimeFiltersDialogue").then((mod) => mod.TimeFiltersDialogue),
    { ssr: false });
const IconFilter = dynamic(() =>
    import('@tabler/icons-react').then(m => m.IconFilter)
);
const IconFilterX = dynamic(() =>
    import('@tabler/icons-react').then(m => m.IconFilterX)
);
import React from 'react'
const AlertsFiltersButtons = dynamic(() => import("./AlertsFiltersButtons"),
    { ssr: false });
import Spinner from '@/components/ui/Spinner';

import { Alert, AlertViewProps } from '@/models/alert';
import { AlertCard } from './AlertCard';
const SearchBar = dynamic(() => import("@/components/common/Searchbar"),
    { ssr: false });
import { useTranslations } from 'next-intl';
import { filterButtonClassname } from '@/styles/tailwind-class';
import dynamic from 'next/dynamic';
import InfiniteScrolling from '@/components/ui/InfiniteScrolling';

const AlertsView: React.FC<AlertViewProps> = ({ err, search, setSearch, setAlerts, serviceType, filteredAlerts,setSelectedTab, setAlertOffset, alertOffset, setFilterDial, isDateFiltered, setIsDateFiltered, isLoading, fetchAlerts, filterDial, setDate, setEndTime, setIsLoading, setStartTime, handleApplyFilter, date, startTime, endTime, alertEndRef, alerts, alertsLoading, hasMore, selectedTab, setHasMore,  setAlertsLoading }) => {
    const t = useTranslations()
    return (
        <div className="h-full flex flex-col gap-4 min-h-0 md:p-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{t('alerts.title')}</h1>
                <div className="flex items-center gap-4">
                    <SearchBar search={search} setSearch={setSearch} placeholder={t("alerts.search_alerts")} />
                    {!isDateFiltered && <button
                        className={filterButtonClassname}
                        onClick={() => { setFilterDial(true); setAlertOffset(0) }}
                    >
                        <IconFilter stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('alerts.filter')}</span>
                    </button>}
                    {isDateFiltered && <button onClick={async () => {
                        setDate(new Date())
                        setStartTime(() => {
                            const start = new Date();
                            start.setHours(0, 0, 0, 0);
                            return start;
                        })
                        setEndTime(() => {
                            const end = new Date();
                            end.setHours(23, 59, 0, 0);
                            return end
                        })
                        setIsDateFiltered(false);
                        setAlertOffset(0);
                        setIsLoading(true);
                        try {
                            const freshAlerts = await fetchAlerts(0, serviceType);
                            setAlerts(freshAlerts ?? []);
                        } finally {
                            setIsLoading(false);
                        }
                    }} className="bg-[#2B4C88] text-white font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
                        <IconFilterX stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('common.clear_filter')}</span>
                    </button>}
                </div>
            </div>
            <AlertsFiltersButtons setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
            <div className="flex-1 flex flex-col gap-2 mb-2 overflow-y-auto scrollbar-hide">
                {isLoading ? <Spinner /> :
                    <div className='flex-1 md:max-h-[59vh] max-h-[35vh] overflow-auto scrollbar-hide'>
                        <div className={filteredAlerts.length > 0 ? "grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid grid-cols-1 h-full w-full"}>
                            <InfiniteScrolling<Alert> setData={setAlerts} serviceType={serviceType} setOffset={setAlertOffset} offset={alertOffset} divRef={alertEndRef} data={alerts} fetchData={fetchAlerts} isLoading={alertsLoading} setIsLoading={setAlertsLoading} setHasMore={setHasMore} hasMore={hasMore}>
                                {filteredAlerts.length > 0 ? <>

                                    {filteredAlerts.map((item, index) => (
                                        <AlertCard alert={item} key={index} />
                                    ))}

                                </> :
                                    <p className="text-center h-full flex items-center justify-center w-full text-red-500">{err}</p>
                                }
                                {filteredAlerts.length > 0 && <div ref={alertEndRef} className="h-2" />}
                            </InfiniteScrolling>
                        </div>
                        {alertsLoading && <div className="text-center"><Spinner /></div>}
                        {!alertsLoading && !hasMore && filteredAlerts.length > 0 && <p className="text-center">{t('no_more_data')}</p>}
                    </div>
                }
            </div>
            {filterDial && <TimeFiltersDialogue

                date={date}
                startTime={startTime}
                endTime={endTime}
                setDate={setDate}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                isOpen={filterDial}
                onClose={() => setFilterDial(false)}
                handleApplyFilter={handleApplyFilter}
            />}
        </div >
    )
}

export default AlertsView