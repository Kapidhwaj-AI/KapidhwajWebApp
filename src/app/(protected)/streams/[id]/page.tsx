"use client";

import { AlertCard } from "@/components/alert/AlertCard";
import AlertsFiltersButtonAtStream from "@/components/alert/AlertsFiltersButtonAtStream";
import CameraStreamCardMedium from "@/components/camera/CameraStreamCardMedium";
import CameraStreamRecordingCard from "@/components/camera/CameraStreamRecordingCard";
import { BackButton } from "@/components/common/BackButton";
import { TimeFiltersDialogue } from "@/components/dialogue/TimeFiltersDialogue";
import { StreamSettingsDialogue } from "@/components/dialogue/StreamSettingsDialogue";
import InfiniteScrolling from "@/components/ui/InfiniteScrolling";
import Spinner from "@/components/ui/Spinner";
import { protectApi } from "@/lib/protectApi";
import { Alert } from "@/models/alert";
import { Camera } from "@/models/camera";
import { RecordedClip } from "@/models/clip";
import { filterButtonClassname } from "@/styles/tailwind-class";
import {
  IconFilter,
  IconHeart,
  IconPencil,
  IconSettings,
  IconVideo,
} from "@tabler/icons-react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useMemo, useRef, useState } from "react";

function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [filterDial, setFilterDial] = useState(false);
  const [settingDial, setSettingDial] = useState(false);
  const [loading, setLoading] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [alertsError, setAlertsError] = useState('')
  const [recordingsError, setRecordingsError] = useState('')
  const [recordingOffset, setRecordingOffset] = useState(0)
  const [alertOffset, setAlertOffset] = useState(0)
  const [makeFav, setMakeFav] = useState(false);
  const [camera, setCamera] = useState<Camera>()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [recordings, setRecordings] = useState<RecordedClip[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [alertsLoading, setAlertsLoading] = useState(false)
  const alertEndRef = useRef(null)
  const [hasRecordingMore, setHasRecordingMore] = useState(true)
  const [recordingLoading, setRecordingLoading] = useState(false)
  const recordingref = useRef(null)
  const [selectedTab, setSelectedTab] = useState('all')
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const router = useRouter();
  const fetchCamera = async (id: string) => {
    const res = await protectApi(`/camera?cameraId=${id}`)
    return res.data.data
  }
  const fetchAlerts = async (offset: number, startTime?: number, endTime?: number) => {
    const endpoint = startTime ? `/alert/recent?offset=${offset}?cameraId=${id}?startUTCTimestamp=${startTime}?endUTCTimestamp=${endTime}` : `/alert/recent?offset=${offset}?cameraId=${id}`
    const res = await protectApi(endpoint)
    return res.data.data
  }
  const fetchRecordings = async (offset: number) => {
    const res = await protectApi(`/recorded-clip?cameraId=${id}?offset=${offset}`)
    return res.data.data
  }
  const fetchIsFav = async (id: string) => {
    const res = await protectApi(`/camera/fav-status?cameraId=${id}`)
    return res.data.data
  }
  function getUTCTimestamps(selectedDate: Date, time: Date,) {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const date = selectedDate.getDate();
    const UTCTime = new Date(
      year,
      month,
      date,
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );
    return UTCTime.getTime();
  }
  useEffect(() => {
    setLoading(true);
    setCameraError("");
    setAlertsError("")
    setRecordingsError("")
    Promise.allSettled([
      fetchCamera(id),
      fetchAlerts(alertOffset),
      fetchRecordings(recordingOffset),
      fetchIsFav(id)
    ])
      .then(([camRes, alertsRes, recRes, isFav]) => {
        if (camRes.status === "fulfilled") { setCamera(camRes.value) }
        else { setCameraError("Error while fetching camera data") }
        if (alertsRes.status === "fulfilled") setAlerts(alertsRes.value);
        else { setAlertsError("Error while fetching Alerts data") }

        if (recRes.status === "fulfilled") setRecordings(recRes.value);
        else { setRecordingsError("Error while fetching camera data") }
        if (isFav.status === "fulfilled") setMakeFav(isFav.value.is_fav);
      })
      .finally(() => setLoading(false));
  }, [id]);



  const filteredAlerts = useMemo(() => {
    if (selectedTab === "all") return alerts;

    return alerts.filter((alert) => alert.alertType === selectedTab);
  }, [alerts, selectedTab]);

  const toggleStreamFav = async () => {
    const res = await protectApi(`/camera/fav?cameraId=${id}`, makeFav ? 'DELETE' : 'POST', { cameraId: Number(id) })
    if (res.status === 200) {
      setMakeFav((prev) => !prev)
    }
  };
  const handleAiToggle = async (key: 'intrusion_detection' | 'people_count' | 'license_plate_detection', toggleValue: boolean,) => {

    const endpoint = toggleValue ? `/camera/stream/start?action=add&organizationId=${camera?.organization_id}`
      : `/camera/stream/stop?action=remove&organizationId=${camera?.organization_id}`;

    const res = await protectApi(endpoint, 'POST', { cameraId: Number(camera?.camera_id), serviceType: key })
    return res
  }
  const handleMotionToggle = async (toggleValue: boolean) => {
    const endpoint = toggleValue ? '/camera/motion/start' : '/camera/motion/stop'
    const res = await protectApi(endpoint, "POST", { camId: Number(camera?.camera_id) })
    return res
  }

  const handleRecordinToggle = async (isRecord: boolean) => {
    console.log(isRecord, "val")
    const url = isRecord
      ? `/camera/recording/start?action=add&organizationId=${camera?.organization_id}`
      : `/camera/recording/stop?action=remove&organizationId=${camera?.organization_id}`

    const res = await protectApi(url, "POST", { cameraId: Number(camera?.camera_id), serviceType: 'cloud_storage' })
    return res
  }
  const handleApplyFilter = async (startTime: Date, endTime: Date, date: Date) => {
    const start = getUTCTimestamps(date, startTime)
    const end = getUTCTimestamps(date, endTime)
    const res = await fetchAlerts(alertOffset, start, end)
    setAlerts(res)
    setFilterDial(false)
  }

  if (loading) return <Spinner />
  return (
    <div className="h-full flex flex-col gap-3 md:gap-5 min-h-0 px-2 md:px-4 pt-2 md:pt-3">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-light ml-2 md:ml-5 whitespace-nowrap">
          {camera?.name}
        </h1>

        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          <button className={filterButtonClassname} onClick={toggleStreamFav}>
            <IconHeart
              stroke={makeFav ? 0 : 1}
              size={24}
              fill={makeFav ? "red" : "transparent"}
            />
            <span className="hidden sm:inline">Favourite</span>
          </button>
          <button className={filterButtonClassname}>
            <IconPencil stroke={1} size={24} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            className={filterButtonClassname}
            onClick={() => setSettingDial(true)}
          >
            <IconSettings stroke={1} size={24} />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button
            className={filterButtonClassname}
            onClick={() => {setFilterDial(true); setAlertOffset(0)}}
          >
            <IconFilter stroke={1} size={24} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 md:gap-4 min-h-0">
        {/* Left Column */}
        <div className="lg:col-span-4  flex flex-col gap-3 md:gap-5 h-full overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-3 md:gap-5 h-full ">
            <CameraStreamCardMedium camera={camera} />

            <div className="flex  flex-col p-3 md:p-6 rounded-2xl md:rounded-4xl bg-[var(--surface-100)]">
              <h3 className="text-sm md:text-md flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <IconVideo stroke={2} size={18} />
                <span>Recording</span>
              </h3>
              <InfiniteScrolling<RecordedClip> setData={setRecordings} fetchData={fetchRecordings} setHasMore={setHasRecordingMore} setIsLoading={setRecordingLoading} setOffset={setRecordingOffset} offset={recordingOffset} isLoading={recordingLoading} data={recordings} divRef={recordingref} hasMore={hasRecordingMore}   >
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                  {recordings.map((item, index) => (
                    <CameraStreamRecordingCard recording={item} key={index} />
                  ))}

                </div>
                <div ref={recordingref} className="h-1" />
              </InfiniteScrolling>
              {recordingLoading && <div className="text-center"><Spinner /></div>}
              {!recordingLoading && !hasRecordingMore && <p className="text-center">No more data.</p>}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col md:p-5 rounded-2xl overflow-y-auto scrollbar-hide md:rounded-4xl bg-[var(--surface-100)]">
          <AlertsFiltersButtonAtStream selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          <div className="grid grid-cols-1 gap-3 md:gap-6">
            <InfiniteScrolling<Alert> setData={setAlerts} setOffset={setAlertOffset} offset={alertOffset} divRef={alertEndRef} data={alerts} fetchData={fetchAlerts} isLoading={alertsLoading} setIsLoading={setAlertsLoading} setHasMore={setHasMore} hasMore={hasMore}>

              {filteredAlerts.length > 0 ? <>

                {filteredAlerts.map((item, index) => (
                  <AlertCard alert={item} key={index} />
                ))}
                <div ref={alertEndRef} className="h-1" />
              </> :
                <p className="text-center">No alerts found</p>
              }
            </InfiniteScrolling>

            {alertsLoading && <div className="text-center"><Spinner /></div>}
            {!alertsLoading && !hasMore && <p className="text-center">No more data.</p>}
          </div>
        </div>
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
      />
      <StreamSettingsDialogue
        isOpen={settingDial}
        onClose={() => setSettingDial(false)}
        recordings={camera?.is_record !== 0}
        people={camera?.is_people_count_active !== 0}
        motion={camera?.is_motion_event_active !== 0}
        license={camera?.is_license_plate_detection_active !== 0}
        intrusion={camera?.is_intrusion_active !== 0}
        handleAiStremToggle={handleAiToggle}
        handleMotionToggle={handleMotionToggle}
        handleRecordingToggle={handleRecordinToggle}
      />
    </div>
  );
}

export default page;
