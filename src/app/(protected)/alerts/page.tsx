"use client";
import { AlertCard } from "@/components/views/alert/AlertCard";
import AlertsFiltersButtons from "@/components/views/alert/AlertsFiltersButtons";
import SearchBar from "@/components/common/Searchbar";
import { TimeFiltersDialogue } from "@/components/dialogue/TimeFiltersDialogue";
import InfiniteScrolling from "@/components/ui/InfiniteScrolling";
import Spinner from "@/components/ui/Spinner";
import { protectApi } from "@/lib/protectApi";
import { Alert } from "@/models/alert";
import { filterButtonClassname } from "@/styles/tailwind-class";
import { getUtcTimestamp } from "@/utils/getUTCTimestamp";
import { IconFilter } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [alertsLoading, setAlertsLoading] = useState(false)
  const [alertOffset, setAlertOffset] = useState(0)
  const [filterDial, setFilterDial] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all')
  const [date, setDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();
  const [isDateFiltered, setIsDateFiltered] = useState(false)
  const alertEndRef = useRef(null)
  const t = useTranslations()
  const fetchAlerts = async (offset: number, startTime?: number, endTime?: number) => {
    const endpoint = startTime ? `/alert/recent?offset=${offset}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}` : `/alert/recent?offset=${offset}`
    const res = await protectApi<Alert[], undefined>(endpoint)
    return res.data.data
  }
  useEffect(() => {
    const loaddata = async () => {
      setIsLoading(true)
      try {
        setAlerts(await fetchAlerts(alertOffset))
      } catch (error) {

      } finally {
        setIsLoading(false)
      }

    }
    if (alertOffset === 0) {
      loaddata()
    }
  }, [])
  useEffect(() => {
    const loadAlerts = async () => {
      setAlertsLoading(true)
      try {
        const newAlerts = await fetchAlerts(alertOffset)
        if (newAlerts.length === 0) {
          setHasMore(false);
        } else {
          setAlerts(prev => [...prev, ...newAlerts]);
        }
      } catch (error) {

      }
      finally {
        setAlertsLoading(false)
      }
    }
    if (alertOffset > 0) loadAlerts()
  }, [alertOffset]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setAlertOffset((prev) => prev + 10);
        }
      },
      { threshold: 0.5 }
    );

    if (alertEndRef.current) observer.observe(alertEndRef.current);

    return () => observer.disconnect();
  }, [alertEndRef.current]);
  const filteredAlerts = useMemo(() => {
    if (selectedTab === "all") return alerts;

    return alerts.filter((alert) => alert.alertType === selectedTab);
  }, [alerts, selectedTab]);
  const handleApplyFilter = async (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => {
    if (date && startTime && endTime) {
      const start = getUtcTimestamp(date, startTime)
      const end = getUtcTimestamp(date, endTime)
      const res = await fetchAlerts(alertOffset, start, end)
      setIsDateFiltered(true)
      setAlerts(res)
      setFilterDial(false)
    }
    return
  }
  if (isLoading) return <Spinner />
  return (
    <div className="h-full flex flex-col gap-4 min-h-0 p-5">
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
        </div>
      </div>
      <AlertsFiltersButtons setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <div className="flex-1 flex flex-col gap-2 mb-2 overflow-y-auto scrollbar-hide">
        <InfiniteScrolling<Alert> setData={setAlerts} setOffset={setAlertOffset} offset={alertOffset} divRef={alertEndRef} data={alerts} fetchData={fetchAlerts} isLoading={alertsLoading} setIsLoading={setAlertsLoading} setHasMore={setHasMore} hasMore={hasMore}>

          <div className={filteredAlerts.length > 0 ? "grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid grid-cols-1 h-full w-full"}>
            {filteredAlerts.length > 0 ? <>

              {filteredAlerts.map((item, index) => (
                <AlertCard alert={item} key={index} />
              ))}

            </> :
              <p className="text-center h-full flex items-center justify-center w-full">{t('alerts.no_found')}</p>
            }
          </div>
          {filteredAlerts.length > 0 &&  !isDateFiltered &&<div ref={alertEndRef} className="h-2" />}
        </InfiniteScrolling>
        {alertsLoading && <div className="text-center"><Spinner /></div>}
        {!alertsLoading && !hasMore && filteredAlerts.length > 0 && <p className="text-center">{t('no_more_data')}</p>}
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
  );
}
