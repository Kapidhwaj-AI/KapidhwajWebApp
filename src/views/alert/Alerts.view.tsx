import { TimeFiltersDialogue } from '@/components/dialogue/TimeFiltersDialogue';
import { IconFilter, IconFilterX } from '@tabler/icons-react';
import React from 'react'
import AlertsFiltersButtons from './AlertsFiltersButtons';
import Spinner from '@/components/ui/Spinner';
import InfiniteScrolling from '@/components/ui/InfiniteScrolling';
import { Alert, AlertViewProps } from '@/models/alert';
import { AlertCard } from './AlertCard';
import SearchBar from '@/components/common/Searchbar';
import { useTranslations } from 'next-intl';
import { filterButtonClassname } from '@/styles/tailwind-class';

const AlertsView: React.FC<AlertViewProps> = ({ err, setAlerts, serviceType, filteredAlerts, changeTab, setAlertOffset, alertOffset, setFilterDial, isDateFiltered, setIsDateFiltered, isLoading, fetchAlerts, filterDial, setDate, setEndTime, setIsLoading, setStartTime, handleApplyFilter, date, startTime, endTime, alertEndRef, alerts, alertsLoading, hasMore, selectedTab, setHasMore, setAlertsLoading }) => {
    const t = useTranslations()
    return (
        <div className="h-full flex flex-col gap-4 min-h-0 md:p-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{t('alerts.title')}</h1>
                <div className="flex items-center gap-4">
                    <SearchBar search="" setSearch={() => { }} placeholder={t("alerts.search_alerts")} />
                    <button
                        className={filterButtonClassname}
                        onClick={() => { setFilterDial(true); setAlertOffset(0) }}
                    >
                        <IconFilter stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('alerts.filter')}</span>
                    </button>
                    {isDateFiltered && <button onClick={async () => {
                        setDate(undefined);
                        setStartTime(undefined);
                        setEndTime(undefined);
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
            <AlertsFiltersButtons changeTab={changeTab} selectedTab={selectedTab} />
            <div className="flex-1 flex flex-col gap-2 mb-2 overflow-y-auto scrollbar-hide">
                {isLoading ? <Spinner /> :
                    <div className='flex-1 md:max-h-[59vh] max-h-[35vh] overflow-auto scrollbar-hide'>
                        <div className={filteredAlerts.length > 0 ? `grid md:grid-cols-3 grid-cols-1 gap-3 md:gap-6 w-full ` : 'w-full h-full'}>
                            <InfiniteScrolling<Alert>
                                setData={setAlerts}
                                setOffset={setAlertOffset}
                                offset={alertOffset}
                                divRef={alertEndRef}
                                data={alerts}
                                serviceType={serviceType}
                                fetchData={fetchAlerts}
                                isLoading={alertsLoading}
                                setIsLoading={setAlertsLoading}
                                setHasMore={setHasMore}
                                hasMore={hasMore}
                            >
                                {filteredAlerts.length > 0 ? (
                                    filteredAlerts.map((item, index) => (
                                        <AlertCard alert={item} key={index} />
                                    ))
                                ) : (
                                    <p className="text-center h-full w-full flex items-center justify-center">
                                        {t("alerts.no_found")}
                                    </p>
                                )}
                                <div ref={alertEndRef} className="h-3" />
                            </InfiniteScrolling>

                        </div>
                        {alertsLoading && <div className="text-center"><Spinner /></div>}
                        {!alertsLoading && !hasMore && filteredAlerts.length > 0 && (
                            <p className="text-center">{t("no_more_data")}</p>
                        )}
                    </div>
                }
            </div>
            <TimeFiltersDialogue

                date={date}
                startTime={startTime}
                endTime={endTime}
                setDate={setDate}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                isOpen={filterDial}
                onClose={() => setFilterDial(false)}
                handleApplyFilter={handleApplyFilter}
            />
        </div >
    )
}

export default AlertsView