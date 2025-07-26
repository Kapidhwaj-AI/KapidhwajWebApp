'use client'
import SearchBar from '@/components/common/Searchbar';
import Spinner from '@/components/ui/Spinner';
import StreamsView from '@/components/views/streams/Streams.view';
import { useOrganizations } from '@/hooks/useOrganizations';
import { Camera } from '@/models/camera';
import { Folders, Organization } from '@/models/organization';
import { RootState } from '@/redux/store';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';

const StreamsController = () => {
    const toogleColumnValue = useSelector((state: RootState) => state?.camera?.toogleColumns);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [selectedFolder, setSelectedFolder] = useState<Folders | null>(null)
    const [selectedChildFolder, setSelectedChildFolder] = useState<Folders | null>(null)
    const [selectedData, setSelecteddata] = useState<Camera[] | null>(null)
    const [searchQuery, setSearchQuery] = useState("");

    const { data: organizations, isLoading, error } = useOrganizations(undefined, {
        onSuccess: (data) => {
            setSelectedOrganization(data[0]);
        }
    });
    useEffect(() => {
        if (selectedChildFolder) {
            setSelecteddata(selectedChildFolder.cameras);
        } else if (selectedFolder) {
            setSelecteddata(selectedFolder.cameras);
        } else if (selectedOrganization) {
            setSelecteddata(selectedOrganization.cameras.filter((item) => item.folder_id === null));
        } else {
            setSelecteddata(null);
        }
    }, [selectedOrganization, selectedFolder, selectedChildFolder]);


    const visibleCameras = useMemo(() => {

        return searchQuery.trim()
            ? selectedData?.filter((camera) =>
                `${camera.name} ${camera.physical_address}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : selectedData;
    }, [selectedData, searchQuery]);
    const handleOrganizationSelect = (org: Organization) => {
        setSelectedOrganization(org);
        setSelectedFolder(null);
        setSelectedChildFolder(null);
    };

    const handleFolderSelect = (folder: Folders) => {
        setSelectedFolder(folder);
        setSelectedChildFolder(null);
    }
    const t = useTranslations()
    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4 h-full w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{t('streams.title')}</h1>
                    <div className="flex gap-2">
                        <SearchBar
                            search={searchQuery}
                            setSearch={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("streams.search_placeholder")}
                        />
                    </div>
                </div>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-4 p-4 h-full w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{t('streams.title')}</h1>
                    <div className="flex gap-2">
                        <SearchBar
                            search={searchQuery}
                            setSearch={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("streams.search_placeholder")}
                        />
                    </div>
                </div>
                <div className="text-center text-red-500 h-full w-full">Error loading organizations: {error.message}</div>
            </div>
        );
    }

    if (!organizations || organizations.length === 0) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{t('streams.title')}</h1>
                    <div className="flex gap-2">
                        <SearchBar
                            search={searchQuery}
                            setSearch={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("streams.search_placeholder")}
                        />
                    </div>
                </div>
                <div className="text-center text-gray-500">No organizations found</div>
            </div>
        );
    }
    const cameraCount = visibleCameras?.length ?? 0;
  return (
    <StreamsView cameraCount={cameraCount} visibleCameras={visibleCameras ?? []} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedChildFolder={selectedChildFolder} selectedData={selectedData} isLoading={isLoading} selectedFolder={selectedFolder}handleFolderSelect={handleFolderSelect} handleOrganizationSelect={handleOrganizationSelect} organizations={organizations} selectedOrganization={selectedOrganization } setSelectedChildFolder={setSelectedChildFolder} toogleColumnValue={toogleColumnValue}  />
  )
}

export default StreamsController