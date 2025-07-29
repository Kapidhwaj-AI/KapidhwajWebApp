'use client'
import StreamPageView from '@/components/views/streams/id/StreamPage.view';
import { useOrganizations } from '@/hooks/useOrganizations';
import { protectApi } from '@/lib/protectApi';
import { Alert } from '@/models/alert';
import { Camera, CameraLocation } from '@/models/camera';
import { RecordedClip } from '@/models/clip';

import { StreamFormData } from '@/models/stream';
import { RootState } from '@/redux/store';
import { getUtcTimestamp } from '@/utils/getUTCTimestamp';
import React, { use, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
    const [selectedTab, setSelectedTab] = useState('all')
    const [date, setDate] = useState<Date | undefined>();
    const [startTime, setStartTime] = useState<Date | undefined>();
    const [endTime, setEndTime] = useState<Date | undefined>();
    const [isDateFiltered, setIsDateFiltered] = useState(false)
    const [isMlService, setIsMlService] = useState(false)
    const [formData, setFormData] = useState<StreamFormData>({
        name: camera?.name ?? '',
        people_threshold_count: camera?.people_threshold_count ?? NaN,
        organizationId: camera?.organization_id ?? '',
        folderId: cameraLocation?.parantFolderId ?? NaN,
        subfolder: cameraLocation?.folderId ?? NaN
    });
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [stream, setStream] = useState(false)
    const { data: organizations } = useOrganizations();
    const fetchCamera = async (id: string) => {
        const res = await protectApi<Camera, undefined>(`/camera?cameraId=${id}`)
        return res.data.data
    }
    const fetchCameraLocation = async () => {
        const res = await protectApi<CameraLocation, undefined>(`/camera/cam-details?cameraId=${id}`)
        return res.data.data
    }
    const fetchAlerts = async (offset: number, startTime?: number, endTime?: number) => {
        const endpoint = startTime ? `/alert/recent?offset=${offset}&cameraId=${id}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}` : `/alert/recent?offset=${offset}&cameraId=${id}`
        const res = await protectApi<Alert[]>(endpoint)
        return res.data.data
    }
    const fetchRecordings = async (offset: number) => {
        const res = await protectApi<RecordedClip[]>(`/recorded-clip?cameraId=${id}&offset=${offset}`)
        return res.data.data
    }
    const fetchIsFav = async (id: string) => {
        const res = await protectApi<{ is_fav: boolean }>(`/camera/fav-status?cameraId=${id}`)
        return res.data.data
    }


    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            fetchCamera(id),
            fetchAlerts(alertOffset),
            fetchRecordings(recordingOffset),
            fetchIsFav(id),
            fetchCameraLocation()
        ])
            .then(([camRes, alertsRes, recRes, isFav, location]) => {
                const newFormData: Partial<StreamFormData> = {};
                if (camRes.status === "fulfilled") {
                    setCamera(camRes.value);
                    setStream(camRes.value.is_ai_stream_active !== 0);
                    newFormData.name = camRes.value.name ?? '';
                    newFormData.people_threshold_count = camRes.value.people_threshold_count ?? 0;
                    newFormData.organizationId = camRes.value.organization_id ?? '';

                }

                if (alertsRes.status === "fulfilled") setAlerts(alertsRes.value);

                if (recRes.status === "fulfilled") setRecordings(recRes.value);

                if (isFav.status === "fulfilled") setMakeFav(isFav.value.is_fav);
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
    }, [id]);



    const filteredAlerts = useMemo(() => {
        if (selectedTab === "all") return alerts;

        return alerts.filter((alert) => alert.alertType === selectedTab);
    }, [alerts, selectedTab]);

    const toggleStreamFav = async () => {
        const res = await protectApi<unknown, { cameraId: number }>(`/camera/fav?cameraId=${id}`, makeFav ? 'DELETE' : 'POST', { cameraId: Number(id) })
        if (res.status === 200) {
            toast.success(`Stream ${makeFav ? 'Deleted from ' : 'Added in'} Favourites`)
            setMakeFav((prev) => !prev)
        }
    };

    const handleAiToggle = async (key: 'face_detection' | 'intrusion_detection' | 'people_count' | 'license_plate_detection', toggleValue: boolean,) => {
        setIsMlService(true)
        try {
            const endpoint = toggleValue ? `/camera/stream/start?action=add&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`
                : `/camera/stream/stop?action=remove&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`;

            const res = await protectApi<unknown, { cameraId: string, serviceType: typeof key }>(endpoint, 'POST', { cameraId: camera?.camera_id.toString() ?? '', serviceType: key })
            if (res.status === 200) {
                toast.success(`Camera stream ${key} ${toggleValue ? 'started ' : 'stoped'} successfully`)
                const cameraRes = await fetchCamera(id)
                setCamera(cameraRes)

            }
            return res
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        } finally {
            setIsMlService(false)
        }



    }
    const handleMotionToggle = async (toggleValue: boolean) => {
        setIsMlService(true)
        try {
            const endpoint = toggleValue ? '/camera/motion/start' : '/camera/motion/stop'
            const res = await protectApi<unknown, { camId: string }>(endpoint, "POST", { camId: camera?.camera_id ?? '' })
            if (res.status === 200) {
                toast.success(`Camera streams motion detection  ${toggleValue ? 'started ' : 'stoped'} successfully`)
                const cameraRes = await fetchCamera(id)
                setCamera(cameraRes)
            }
            return res

        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
        finally {
            setIsMlService(false)
        }

    }

    const handleRecordinToggle = async (isRecord: boolean) => {
        try {

        } catch (error) {

        } finally {

        }
        const url = isRecord
            ? `/camera/recording/start?action=add&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`
            : `/camera/recording/stop?action=remove&organizationId=${camera?.organization_id}&cameraId=${camera?.camera_id}`

        const res = await protectApi(url, "POST", { cameraId: Number(camera?.camera_id), serviceType: 'cloud_storage' })
        if (res.status === 200) {
            toast.success(`Camera stream recording ${isRecord ? 'started ' : 'stoped'} successfully`)
            const cameraRes = await fetchCamera(id)
            setCamera(cameraRes)

        }
        return res
    }
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
    const handleToggleStream = async (toggleValue: boolean) => {

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
        if (res.status === 200) {
            toast.success(`Camera stream  ${toggleValue ? 'started ' : 'stoped'} successfully`)
            setStream(toggleValue)
        }
    }
    const handleSave = async () => {
        setIsEditLoading(true)
        const fallbackFolderId =
            formData.folderId && Number(formData.folderId) > 0
                ? formData.folderId
                : formData.subfolder && Number(formData.subfolder) > 0
                    ? formData.subfolder
                    : null;

        const payload: Partial<StreamFormData> = {
            name: formData.name,
            people_threshold_count: formData.people_threshold_count,
            organizationId: formData.organizationId,
            folderId: fallbackFolderId,
        };
        try {
            const res = await protectApi<unknown, Partial<StreamFormData>>(
                `camera?action=update&cameraId=${camera?.camera_id}`,
                'PUT',
                payload
            );

            if (res.status === 200) {
                setIsEdit(false)
                toast.success(`Camera stream updated successfully`)
                setFormData({
                    name: '',
                    people_threshold_count: 0,
                    organizationId: '',
                    folderId: -1,
                    subfolder: -1
                })
            }

        } catch (error) {
            console.error(error)
            toast.success(error.message ?? 'An error occured')
        } finally {
            setIsEditLoading(false)
        }
    }


    const isFullscreen = useSelector((state: RootState) => state.camera.isFullScreen)
    return (
        <StreamPageView loading={loading} selectedTab={selectedTab} setAlertOffset={setAlertOffset} setAlerts={setAlerts} setAlertsLoading={setAlertsLoading} setDate={setDate} setEndTime={setEndTime} setFilterDial={setFilterDial} setFormData={setFormData} setHasMore={setHasMore} setHasRecordingMore={setHasRecordingMore} setIsDateFiltered={setIsDateFiltered} setIsEdit={setIsEdit} setRecordingLoading={setRecordingLoading} setRecordingOffset={setRecordingOffset} setRecordings={setRecordings} setSelectedTab={setSelectedTab} setSettingDial={setSettingDial} setStartTime={setStartTime} settingDial={settingDial} startTime={startTime} stream={stream} isDateFiltered={isDateFiltered} isEdit={isEdit} isEditLoading={isEditLoading} isFullscreen={isFullscreen} camera={camera} cameraLocation={cameraLocation} makeFav={makeFav} toggleStreamFav={toggleStreamFav} handleAiToggle={handleAiToggle} handleApplyFilter={handleApplyFilter} handleMotionToggle={handleMotionToggle} handleRecordingToggle={handleRecordinToggle} handleSave={handleSave} handleToggleStream={handleToggleStream} hasMore={hasMore} hasRecordingMore={hasRecordingMore} fetchAlerts={fetchAlerts} fetchRecordings={fetchRecordings} filterDial={filterDial} filteredAlerts={filteredAlerts} formData={formData} recordingLoading={recordingLoading} recordingOffset={recordingOffset} recordingref={recordingref} recordings={recordings} alertEndRef={alertEndRef} alertOffset={alertOffset} alerts={alerts} alertsLoading={alertsLoading} date={date} endTime={endTime} organizations={organizations} />
    )
}

export default StreamPageController