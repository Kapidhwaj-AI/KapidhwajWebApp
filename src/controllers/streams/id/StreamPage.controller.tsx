'use client'
import StreamPageView from '@/views/streams/id/StreamPage.view';
import { useOrganizations } from '@/hooks/useOrganizations';
import { protectApi } from '@/lib/protectApi';
import { Alert } from '@/models/alert';
import { Camera, CameraLocation } from '@/models/camera';
import { RecordedClip } from '@/models/clip';

import { StreamFormData } from '@/models/stream';
import { getUtcTimestamp } from '@/utils/getUTCTimestamp';
import React, { use, useEffect, useMemo, useRef, useState } from 'react'

import { showToast } from '@/lib/showToast';
import { RootActions, RootState, useStore } from '@/store';

const StreamPageController = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [filterDial, setFilterDial] = useState(false);
    const [settingDial, setSettingDial] = useState(false);
    const [loading, setLoading] = useState(false)
    const [recordingOffset, setRecordingOffset] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [alertOffset, setAlertOffset] = useState(0)
    const [makeFav, setMakeFav] = useState(false);
    const [camera, setCamera] = useState<Camera>()
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [recordings, setRecordings] = useState<RecordedClip[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [alertsLoading, setAlertsLoading] = useState(false)
    const alertEndRef = useRef<HTMLDivElement>(null)
    const [cameraLocation, setCameraLocation] = useState<CameraLocation>()
    const [hasRecordingMore, setHasRecordingMore] = useState(true)
    const [recordingLoading, setRecordingLoading] = useState(false)
    const recordingref = useRef<HTMLDivElement>(null)
    const topRecordingRef = useRef<HTMLDivElement>(null)
    const [selectedTab, setSelectedTab] = useState('all')
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState<Date | undefined>(() => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        return start;
    });
    const [endTime, setEndTime] = useState<Date | undefined>(() => {
        const end = new Date();
        end.setHours(23, 59, 0, 0);
        return end
    });
    const [isDateFiltered, setIsDateFiltered] = useState(false)
    const [isRecordingFIltered, setIsRecordingFiltered] = useState(false)
    const [serviceType, setServiceType] = useState<string | null>('all')
    const [isMlService, setIsMlService] = useState(false)
    const [isAllAlertLoading, setIsAllAlertLoading] = useState(false)
    const [formData, setFormData] = useState<StreamFormData>({
        name: camera?.name ?? '',
        people_threshold_count: camera?.people_threshold_count ?? NaN,
        organizationId: camera?.organization_id ?? '',
        folderId: cameraLocation?.parantFolderId ?? NaN,
        subfolder: cameraLocation?.folderId ?? NaN,
        detectionSensitivity: 0,
        overlapSensitivity: 0,
        sceneDensity: 0
    });
    const setIsPeople = useStore((state: RootActions) => state.setIsPeople);
    const setCurrentCameraId = useStore((state: RootActions) => state.setCurrentCameraId);
    const setIsFilterLoading = useStore((state: RootActions) => state.setIsFilterLoading);
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [stream, setStream] = useState(false)
    const {
        intrusionDetected,
        peopleDetected,
        peopleCountDetected,
        motionDetected,
        licensePlateDetected,
        fireSmokeDetected,
        faceDetection
    } = useStore((state: RootState) => state.singleCameraSettings);



    const { data: organizations } = useOrganizations();
    const fetchCamera = async (id: string) => {
        const res = await protectApi<Camera, undefined>(`/camera?cameraId=${id}`)
        setIsPeople(res?.data.data.is_people_count_active !== 0)

        return res.data.data
    }
    const fetchCameraLocation = async () => {
        const res = await protectApi<CameraLocation, undefined>(`/camera/cam-details?cameraId=${id}`)
        return res?.data.data
    }
    const fetchAlerts = async (offset: number, serviceType: string | null, startTime?: number, endTime?: number) => {
        const endpoint = serviceType !== null && serviceType !== 'all' && startTime ? `/alert/recent?offset=${offset}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}&serviceType=${serviceType}&cameraId=${id}` : serviceType !== null && serviceType !== 'all' ? `/alert/recent?offset=${offset}&serviceType=${serviceType}&cameraId=${id}` : startTime ? `/alert/recent?offset=${offset}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}&cameraId=${id}` : `/alert/recent?offset=${offset}&cameraId=${id}`
        const res = await protectApi<Alert[]>(endpoint)
        return res?.data.data
    }

    const fetchRecordings = async (offset: number, startTime?: number, endTime?: number) => {
        const url = startTime ? `/recorded-clip?cameraId=${id}&offset=${offset}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}` : `/recorded-clip?cameraId=${id}&offset=${offset}`
        const res = await protectApi<RecordedClip[]>(url)
        return res.data.data
    }
    const fetchIsFav = async (id: string) => {
        const res = await protectApi<{ is_fav: boolean }>(`/camera/fav-status?cameraId=${id}`)
        return res?.data.data
    }
    console.log(formData, "Form data")
    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            fetchCamera(id),
            fetchRecordings(0),
            fetchIsFav(id),
            fetchCameraLocation()
        ])
            .then(([camRes, recRes, isFav, location]) => {
                const newFormData: Partial<StreamFormData> = {};
                if (camRes.status === "fulfilled") {
                    setCamera(camRes.value);
                    setStream(camRes.value.webrtc_url !== null && camRes.value?.rtsp_url !== null);
                    setCurrentCameraId({ id: camRes.value.camera_id })
                    newFormData.name = camRes.value.name ?? '';
                    newFormData.people_threshold_count = camRes.value.people_threshold_count ?? 0;
                    newFormData.organizationId = camRes.value.organization_id ?? '';
                    newFormData.detectionSensitivity = camRes.value.obj_thresh;
                    newFormData.overlapSensitivity = camRes.value.nms_thresh;
                    newFormData.sceneDensity = camRes.value.topk_pre_nms;
                }

                if (recRes.status === "fulfilled") { setRecordings(recRes.value) };
                if (isFav.status === "fulfilled") setMakeFav(isFav?.value?.is_fav ?? false);
                if (location.status === 'fulfilled') {
                    setCameraLocation(location.value);
                    newFormData.folderId =
                        location.value?.parantFolderId !== "NA"
                            ? Number(location.value?.parantFolderId)
                            : null;
                    newFormData.subfolder =
                        location.value?.folderId !== "NA"
                            ? Number(location.value?.folderId)
                            : null;

                }
                setFormData((prev) => ({ ...prev, ...newFormData }));
            })
            .finally(() => setLoading(false));
    }, [id, stream]);



    const filteredAlerts = useMemo(() => {
        return alerts
    }, [alerts, serviceType]);

    const toggleStreamFav = async () => {
        const url = !makeFav ? `/camera/fav/add?cameraId=${id}` : `/camera/fav/remove?cameraId=${id}`
        const res = await protectApi<unknown, { cameraId: string }>(url, 'POST', { cameraId: id })
        if (res.status === 200) {
            showToast(`Stream ${makeFav ? 'Deleted from ' : 'Added in'} Favourites`, "success")
            setMakeFav((prev) => !prev)
        }
    };
    useEffect(() => {
        const alertFetch = async () => {
            setIsAllAlertLoading(true)
            try {
                const start = alertOffset > 0 && date && startTime ? getUtcTimestamp(date, startTime) : undefined
                const end = alertOffset > 0 && date && endTime ? getUtcTimestamp(date, endTime) : undefined
                const res = await fetchAlerts(alertOffset, serviceType, start, end)
                setAlerts(res)
            } catch (error) {
                console.error(error, "Err")
            } finally {
                setIsAllAlertLoading(false)
            }
        }
        alertFetch()
    }, [intrusionDetected,
        peopleDetected,
        peopleCountDetected,
        motionDetected,
        licensePlateDetected,
        fireSmokeDetected,
        faceDetection, serviceType])
    const handleAiToggle = async (key: 'fire_smoke_detection' | 'face_detection' | 'intrusion_detection' | 'people_count' | 'license_plate_detection', toggleValue: boolean,) => {
        setIsMlService(true)
        try {
            const endpoint = toggleValue ? `/camera/stream/start?action=add&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`
                : `/camera/stream/stop?action=remove&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`;
            const res = await protectApi<unknown, { cameraId: string, serviceType: typeof key }>(endpoint, 'POST', { cameraId: camera?.camera_id.toString() ?? '', serviceType: key })
            if (res?.status === 200) {
                showToast(`Camera stream ${key} ${toggleValue ? 'started ' : 'stoped'} successfully`, "success")
                const cameraRes = await fetchCamera(id)
                setCamera(cameraRes)
            }
            return res
        } catch (error) {
            console.error(error)
            showToast(error.response.data.message, "error")
        } finally {
            setIsMlService(false)
        }
    }
    const handleMotionToggle = async (toggleValue: boolean) => {
        setIsMlService(true)
        try {
            const endpoint = toggleValue ? '/camera/motion/start' : '/camera/motion/stop'
            const res = await protectApi<unknown, { camId: string }>(endpoint, "POST", { camId: camera?.camera_id ?? '' })
            if (res?.status === 200) {
                showToast(`Camera streams motion detection  ${toggleValue ? 'started ' : 'stoped'} successfully`, "success")
                const cameraRes = await fetchCamera(id)
                setCamera(cameraRes)
            }
            return res

        } catch (error) {
            console.error(error)
            showToast(error.response.data.message, "error")
        }
        finally {
            setIsMlService(false)
        }

    }

    const handleRecordinToggle = async (isRecord: boolean) => {
        setIsMlService(true)
        try {
            const url = isRecord
                ? `/camera/recording/start?action=add&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`
                : `/camera/recording/stop?action=remove&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`

            const res = await protectApi(url, "POST", { cameraId: camera?.camera_id, serviceType: 'cloud_storage' })
            if (res?.status === 200) {
                showToast(`Camera stream recording ${isRecord ? 'started ' : 'stoped'} successfully`, "success")
                const cameraRes = await fetchCamera(id)
                setCamera(cameraRes)

            }
            return res

        } catch (error) {
            console.error(error)
            showToast(error.response.data.message, "error")
        } finally {
            setIsMlService(false)
        }

    }
    const handleApplyFilter = async (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => {
        console.log("date", date, startTime, endTime)
        if (date && startTime && endTime) {
            
            setIsFilterLoading(true)
            if(isRecordingFIltered){
                const start = getUtcTimestamp(date, startTime)
                const end = getUtcTimestamp(date, endTime)
                const res = await  fetchRecordings(recordingOffset, start, end)
                setRecordings(res)
            }
            else{
                const start = getUtcTimestamp(date, startTime, true)
                const end = getUtcTimestamp(date, endTime, true)
                const res = await fetchAlerts(alertOffset, serviceType, start, end)
                setIsDateFiltered(true)
                setAlerts(res)
            }
            setFilterDial(false)
            setIsFilterLoading(false)
        }
        return
    }
    const handleToggleStream = async (toggleValue: boolean) => {
        setIsMlService(true)
        try {
            const url = toggleValue ? `/camera/start?action=add&hubId=${camera?.hub_id}` : `/camera/stop?action=remove&hubId=${camera?.hub_id}`
            const payload = {
                cameras: [
                    {
                        id: camera?.camera_id.toString(),
                        macaddress: camera?.physical_address,
                    },
                ],
            }
            const res = await protectApi<unknown, typeof payload>(url, "POST", payload)
            if (res?.status === 200) {
                showToast(`Camera stream  ${toggleValue ? 'started ' : 'stoped'} successfully`)
                setStream(toggleValue)
            }
        } catch (error) {
            console.error("err:", error),
                showToast(error.response.data.message, "error")
        } finally {
            setIsMlService(false)
        }

    }
    const handleSave = async () => {
        setIsEditLoading(true)
        const fallbackFolderId =
            formData.subfolder && Number(formData.subfolder) > 0
                ? formData.subfolder
                : formData.folderId && Number(formData.folderId) > 0
                    ? formData.folderId
                    : null;

        const payload: Partial<StreamFormData> = {
            name: formData.name,
            people_threshold_count: formData.people_threshold_count,
            organizationId: formData.organizationId,
            folderId: fallbackFolderId,
            detectionSensitivity: formData.detectionSensitivity,
            overlapSensitivity: formData.overlapSensitivity,
            sceneDensity: formData.sceneDensity,
        };
        try {
            const res = await protectApi<unknown, typeof payload>(
                `/camera?action=update&cameraId=${camera?.camera_id}`,
                'PUT',
                payload
            );

            if (res?.status === 200) {
                setIsEdit(false)
                showToast(`Camera stream updated successfully`, "success")
                const cam = await fetchCamera(id)
                const newFormData: Partial<StreamFormData> = {};
                setCamera(cam);
                setStream(cam.webrtc_url !== null && cam?.rtsp_url !== null);
                newFormData.name = cam.name ?? '';
                newFormData.people_threshold_count = cam.people_threshold_count ?? 0;
                newFormData.organizationId = cam.organization_id ?? '';
                newFormData.detectionSensitivity = cam.obj_thresh;
                newFormData.overlapSensitivity = cam.nms_thresh;
                newFormData.sceneDensity = cam.topk_pre_nms;
                setFormData((prev) => ({ ...prev, ...newFormData }));
            }

        } catch (error) {
            console.error(error)
            showToast(error.message ?? 'An error occured', "error")
        } finally {
            setIsEditLoading(false)
        }
    }
   
    const changeTab = async (tab: string) => {
        if (tab === selectedTab) {
            return
        }
        setIsDateFiltered(false)
        if (tab === 'ALL' || tab === 'all') {
            setServiceType('all');
        } else if (tab === 'INTRUSION_DETECTION') {
            setServiceType('intrusion_detection');

        } else if (tab === 'PEOPLE_COUNT') {
            setServiceType('people_count');

        } else if (tab === 'FACE_DETECTION') {
            setServiceType('face_detection');

        } else if (tab === 'MOTION_DETECTION') {
            setServiceType('motion_detection');

        } else if (tab === 'LICENSE_PLATE_DETECTION') {
            setServiceType('license_plate_detection');
        } else if (tab === 'FIRE_SMOKE_DETECTION') {
            setServiceType('fire_smoke_detection');
        } else {
            setServiceType(null);
        }
        setSelectedTab(tab);
        setAlertOffset(0)
        setHasMore(true)
    }
    const isFullscreen = useStore((state: RootState) => state.camera.isFullScreen)
    const isAlertFullScreen = useStore((state: RootState) => state.camera.isAlertFullScreen)
    return (

        <StreamPageView isAlertFullScreen={isAlertFullScreen} setIsRecordingFiltered={setIsRecordingFiltered} isRecordingFiltered={isRecordingFIltered} topRecordingRef={topRecordingRef} setIsAllAlertsLoading={setIsAllAlertLoading} isAllAlertLoading={isAllAlertLoading} isAiServiceLoading={isMlService} loading={loading} selectedTab={selectedTab} setAlertOffset={setAlertOffset} setAlerts={setAlerts} setAlertsLoading={setAlertsLoading} setDate={setDate} setEndTime={setEndTime} setFilterDial={setFilterDial} setFormData={setFormData} setHasMore={setHasMore} setHasRecordingMore={setHasRecordingMore} setIsDateFiltered={setIsDateFiltered} setIsEdit={setIsEdit} setRecordingLoading={setRecordingLoading} setRecordingOffset={setRecordingOffset} setRecordings={setRecordings} changeTab={changeTab} setSettingDial={setSettingDial} setStartTime={setStartTime} settingDial={settingDial} startTime={startTime} stream={stream} isDateFiltered={isDateFiltered} isEdit={isEdit} isEditLoading={isEditLoading} isFullscreen={isFullscreen} camera={camera} cameraLocation={cameraLocation} makeFav={makeFav} toggleStreamFav={toggleStreamFav} handleAiToggle={handleAiToggle} handleApplyFilter={handleApplyFilter} handleMotionToggle={handleMotionToggle} handleRecordingToggle={handleRecordinToggle} serviceType={serviceType} handleSave={handleSave} handleToggleStream={handleToggleStream} hasMore={hasMore} hasRecordingMore={hasRecordingMore} fetchAlerts={fetchAlerts} fetchRecordings={fetchRecordings} filterDial={filterDial} filteredAlerts={filteredAlerts} formData={formData} recordingLoading={recordingLoading} recordingOffset={recordingOffset} recordingref={recordingref} recordings={recordings} alertEndRef={alertEndRef} alertOffset={alertOffset} alerts={alerts} alertsLoading={alertsLoading} date={date} endTime={endTime} organizations={organizations} />
    )
}

export default StreamPageController