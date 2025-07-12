"use client";
import { AlertCard } from "@/components/alert/AlertCard";
import AlertsFiltersButtons from "@/components/alert/AlertsFiltersButtons";
import SearchBar from "@/components/common/Searchbar";
import InfiniteScrolling from "@/components/ui/InfiniteScrolling";
import Spinner from "@/components/ui/Spinner";
import { protectApi } from "@/lib/protectApi";
import { Alert } from "@/models/alert";
import { IconFilter } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [alertsLoading, setAlertsLoading] = useState(false)
  const [alertOffset, setAlertOffset] = useState(0)
  const alertEndRef = useRef(null)
  const [selectedTab, setSelectedTab] = useState('all')
  const fetchAlerts = async (offset: number) => {
    const res = await protectApi(`/alert/recent?offset=${offset}`)
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

  if (isLoading) return <Spinner />
  return (
    <div className="h-full flex flex-col gap-4 min-h-0 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <div className="flex items-center gap-4">
          <SearchBar search="" setSearch={() => { }} placeholder="Search Alerts" />
          <div className="bg-[var(--surface-100)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full flex items-center gap-1">
            <IconFilter stroke={2} />
            <span>Filters</span>
          </div>
        </div>
      </div>
      <AlertsFiltersButtons setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <div className="flex-1 flex flex-col gap-2 mb-2 overflow-y-auto scrollbar-hide">
        <InfiniteScrolling<Alert> setData={setAlerts} setOffset={setAlertOffset} offset={alertOffset} divRef={alertEndRef} data={alerts} fetchData={fetchAlerts} isLoading={alertsLoading} setIsLoading={setAlertsLoading} setHasMore={setHasMore} hasMore={hasMore}>

          <div className={filteredAlerts.length > 0 ? "grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid grid-cols-1"}>
            {filteredAlerts.length > 0 ? <>

              {filteredAlerts.map((item, index) => (
                <AlertCard alert={item} key={index} />
              ))}

            </> :
              <p className="text-center w-full">No alerts found</p>
            }
          </div>
          <div ref={alertEndRef} className="h-2" />
        </InfiniteScrolling>
        {alertsLoading && <div className="text-center"><Spinner /></div>}
        {!alertsLoading && !hasMore && filteredAlerts.length > 0 && <p className="text-center">No more data.</p>}
      </div>
    </div >
  );
}
