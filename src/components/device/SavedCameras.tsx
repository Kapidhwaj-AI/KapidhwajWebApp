import { IconDeviceCctvFilled, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { AddNewCameraDialogue } from '@/components/dialogue/AddNewCameraDialogue';
import { useEffect, useState } from "react";
import { DeleteDialog } from '@/components/dialogue/DeleteDialog'
import { DevicesMap, Hub } from "@/models/settings";
import { Camera, CameraLocation } from "@/models/camera";
import { AxiosResponse } from "axios";
import EditStreamDialogue from "../dialogue/EditStreamDialogue";
import { protectApi } from "@/lib/protectApi";
import { StreamFormData } from "@/models/stream";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Organization } from "@/models/organization";
import { useTranslations } from "next-intl";
import Spinner from "../ui/Spinner";

interface SavedCamerasProps {
    hub: Hub;
    className?: string;
    toggleStream: (toggleVal: boolean, id: string, physical_address: string, hub_id: string) => Promise<AxiosResponse>;
    setIsDelete: (val: boolean) => void;
    isDelete: boolean;
    handleDelet: (camearId: string | undefined, organizationId: string) => void;
    setSelectedSite: (val: string) => void;
    selectedSite: string;
    sites: Organization[];
    fetchSavedHubs: () => Promise<void>;
    camLoading: boolean
}

export const SavedCameras: React.FC<SavedCamerasProps> = ({ camLoading, hub, fetchSavedHubs, className = "", toggleStream, setIsDelete, isDelete, handleDelet, setSelectedSite, selectedSite, sites }) => {
    const [isEditCameraOpen, setIsEditCameraOpen] = useState(false);
    const [isAddCameraOpen, setIsAddCameraOpen] = useState(false);
    const [cameraToggle, setCameraToggle] = useState(false);
    const [cameraId, setCameraId] = useState<string>()
    const [organizationId, setOrganizationId] = useState('')
    const [nearbyCams, setNearbyCams] = useState<DevicesMap>({})
    const [camera, setCamera] = useState<Camera>()
    const [loading, setLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const { data: organizations, } = useOrganizations();
    const [formData, setFormData] = useState<StreamFormData>({
        name: '',
        people_threshold_count: NaN,
        organizationId: '',
        folderId: null,
        subfolder: null,
        detectionSensitivity: 0,
        overlapSensitivity: 0,
        sceneDensity: 0
    });
    const fetchNearByCam = async () => {
        setLoading(true)
        try {
            const res = await protectApi<{ devices: DevicesMap }>(`/camera/nearby?hubId=${hub.id}`)
            if (res.status === 200) {
                setNearbyCams(res.data.data.devices)
            }
        }
        catch (e) {
            console.error("Err:", e)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchNearByCam();
    }, [])

    const handleAddCamera = () => {
        setIsAddCameraOpen(true);
    };


    const handleEditCamera = async (camera: Camera) => {
        setIsEditCameraOpen(true);
        setCamera(camera)
        setCameraToggle(camera.is_ai_stream_active !== 0)
        await fetchCameraLocation(camera.camera_id)
        setFormData((prev) => ({ ...prev, name: camera.name, people_threshold_count: camera.people_threshold_count, organizationId: camera.organization_id ?? '', detectionSensitivity: camera.obj_thresh, overlapSensitivity: camera.nms_thresh, sceneDensity: camera.topk_pre_nms }))
    };
    const handleDeleteCamera = (id: string, orgId: string) => {

        setIsDelete(true)
        setCameraId(id)
        setOrganizationId(orgId)
    };

    const fetchCameraLocation = async (id: string) => {
        setEditLoading(true)
        try {
            const res = await protectApi<CameraLocation, undefined>(`/camera/cam-details?cameraId=${id}`)
            setFormData((prev) => ({
                ...prev, folderId: res.data.data.parantFolderId !== "NA"
                    ? Number(res.data.data.parantFolderId)
                    : res.data.data.folderId !== "NA" ? Number(res.data.data.folderId) : null, subfolder: res.data.data.folderId !== "NA" && res.data.data.parantFolderId !== "NA"
                        ? Number(res.data.data.folderId)
                        : null
            }))

        } catch (err) {
            console.error("err", err)
        }
        finally {
            setEditLoading(false)
        }
    }
    const handleSave = async () => {
        setLoading(true)
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
            const res = await protectApi<unknown, Partial<StreamFormData>>(
                `/camera?action=update&cameraId=${camera?.camera_id}`,
                'PUT',
                payload
            );

            if (res.status === 200) {
                setIsEditCameraOpen(false)
                await fetchSavedHubs()
                setFormData({
                    name: '',
                    people_threshold_count: 0,
                    organizationId: '',
                    folderId: -1,
                    subfolder: -1
                })
            }
            
        } catch (e) { console.error(e) }
        finally {
            setLoading(false)
        }
    }
    const t = useTranslations()
    console.log("nearcams", Object.entries(nearbyCams))
    return (
        <>
            <div className={`flex flex-col h-full px-8 ${className}`}>
                <div className="flex justify-between items-center pt-6 pb-5 flex-shrink-0">
                    <div>
                        <h2 className="text-sm font-bold">{hub.name}</h2>
                        <p className="text-sm text-gray-500">{hub.physical_address}</p>
                    </div>
                    <button
                        onClick={handleAddCamera}
                        className="flex items-center gap-2 shadow-md px-4 py-2 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors"
                    >
                        <IconPlus size={18} />
                        <span className="text-sm">{t('settings.add_new_camera')}</span>
                    </button>
                </div>
                {camLoading ? <Spinner /> : <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100%-6rem)]  pb-4 scrollbar-hide">
                    <div className="space-y-3">
                        {hub.cameras.filter((item) => item.camera_id !== cameraId).map((camera, index) => {
                            const matchedCam = Object.entries(nearbyCams).find(
                                ([mac]) => mac === camera.physical_address
                            )?.[1];
                            return (
                                <div
                                    key={camera.camera_id + index}
                                    className="grid grid-cols-5  p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors"
                                >
                                    <div className="col-span-3 flex gap-2" >
                                        <div className="w-15 h-15 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                            <IconDeviceCctvFilled size={20} className="text-[#888888]" />
                                        </div>
                                        <div className="flex flex-col items-start w-full max-w-[70px] md:max-w-[115px]">
                                            <h3 className="text-sm font-medium truncate w-full">{camera.name}</h3>
                                            <div className="flex flex-col items-start w-full">
                                                <p className="text-xs text-gray-500 truncate w-full ">{camera.physical_address}</p>
                                                {matchedCam ?
                                                    <p className="text-xs text-gray-400 truncate w-full">{matchedCam.ipaddress}</p>
                                                    : <p className="text-xs text-gray-400 italic w-full truncate
                                                    ">IP Not found</p>}

                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex md:gap-1 md:flex-row flex-col col-span-1 items-center justify-center md:justify-start text-start">
                                        <span
                                            className={`w-2 h-2 rounded-full ${matchedCam?.connected
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                                }`}
                                        ></span>
                                        <p className="text-xs text-gray-400 text-start truncate">{matchedCam?.connected ? 'Connected' : "Not Connected"}</p>
                                    </div>
                                    <div className="flex col-span-1 md:gap-1 md:flex-row flex-col col items-center justify-end ">
                                        <button
                                            onClick={() => handleEditCamera(camera)}
                                            className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconPencil size={24} className="text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCamera(camera.camera_id, camera.organization_id ?? '')}
                                            className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconTrash size={24} className="text-[#FF6868]" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>}
            </div>
            <AddNewCameraDialogue
                nearCams={nearbyCams}
                isOpen={isAddCameraOpen}
                onClose={() => setIsAddCameraOpen(false)}
                isLoading={loading}
                fetchNearCams={fetchNearByCam}
                sites={sites}
                setSelectedSite={setSelectedSite}
                selectedSite={selectedSite}
                hubId={hub.id}
                fetchSavedHubs={fetchSavedHubs}
                handleSwitchToggle={toggleStream}
            />
            {isEditCameraOpen &&
                <EditStreamDialogue
                    isEditLoading={editLoading}
                    isLoading={loading}
                    setFormData={setFormData}
                    folders={organizations?.find((item) => item.id === formData.organizationId)?.folders.map((folder) => ({ key: folder.id.toString(), value: folder.name }))}
                    organizations={organizations?.map((item) => ({ key: item.id, value: item.name }))}
                    subfolders={organizations?.find((item) => item.id === formData.organizationId)?.folders.find((item) => item.id === formData.folderId)?.child_folders.map((folder) => ({ key: folder.id.toString(), value: folder.name }))}
                    onClose={() => setIsEditCameraOpen(false)}
                    formData={formData}
                    handleSave={handleSave}
                />
            }
            {isDelete && <DeleteDialog<{ cameraId: string | undefined, organizationId: string }> title={t('settings.delete_camera_confirm')} handleDelete={() => handleDelet(cameraId, organizationId)} data={{ cameraId, organizationId }} onClose={() => setIsDelete(false)} />}
        </>
    );
}; 