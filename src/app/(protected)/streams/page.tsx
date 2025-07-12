"use client";
import { useEffect, useMemo, useState } from "react";
import CameraStreamCard from "@/components/camera/CameraStreamCard";
import OrganizationFilterButtons from "@/components/camera/OrganizationFilterButtons";
import SearchBar from "@/components/common/Searchbar";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Folders, Organization } from "@/models/organization";
import { Camera } from "@/models/camera";
import { CameraDetailsViewToggleButton } from "@/components/camera/CameraDetailsViewToggleButton";
import ColumnDropdown from "@/components/camera/ColumnDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";

export default function Streams() {
  const toogleColumnValue = useSelector((state: RootState) => state?.camera?.toogleColumns);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folders | null>(null)
  const [selectedChildFolder, setSelectedChildFolder] = useState<Folders | null>(null)
  const [selectedData, setSelecteddata] = useState<Organization | Folders | null>(null)
  const [searchQuery, setSearchQuery] = useState("");

  const { data: organizations, isLoading, error } = useOrganizations(undefined, {
    onSuccess: (data) => {
      setSelectedOrganization(data[0]);
    }
  });
  useEffect(() => {
    if (selectedChildFolder) {
      setSelecteddata(selectedChildFolder);
    } else if (selectedFolder) {
      console.log
      setSelecteddata(selectedFolder);
    } else if (selectedOrganization) {
      setSelecteddata(selectedOrganization);
    } else {
      setSelecteddata(null);
    }
  }, [selectedOrganization, selectedFolder, selectedChildFolder]);

  const visibleCameras = useMemo(() => {
    const sourceCameras = selectedData?.cameras ?? [];

    return searchQuery.trim()
      ? sourceCameras.filter((camera) =>
        `${camera.name} ${camera.physical_address}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      : sourceCameras;
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
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 h-full w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Streams</h1>
          <div className="flex gap-2">
            <SearchBar
              search={searchQuery}
              setSearch={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cameras..."
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
          <h1 className="text-2xl font-bold">Streams</h1>
          <div className="flex gap-2">
            <SearchBar
              search={searchQuery}
              setSearch={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cameras..."
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
          <h1 className="text-2xl font-bold">Streams</h1>
          <div className="flex gap-2">
            <SearchBar
              search={searchQuery}
              setSearch={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cameras..."
            />
          </div>
        </div>
        <div className="text-center text-gray-500">No organizations found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Streams</h1>
        <div className="flex gap-2">
          <CameraDetailsViewToggleButton />
          <ColumnDropdown />
          <SearchBar
            search={searchQuery}
            setSearch={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cameras..."
          />
        </div>
      </div>
      <div className="">
        <div className="flex gap-2 items-center">
          <p className="text-gray-400">Organizations:</p>
          <OrganizationFilterButtons
            isLoading={isLoading}
            organizations={organizations}
            onOrganizationSelect={handleOrganizationSelect}
          />
        </div>
        {selectedOrganization && selectedOrganization?.folders?.length > 0 && (
          <div className="flex gap-2 items-center">
            <p className="text-gray-400">Folders:</p>
            <OrganizationFilterButtons
              isLoading={isLoading}
              folders={selectedOrganization.folders}
              onSelectedFolder={handleFolderSelect}
            />
          </div>
        )}
        {selectedFolder  && selectedFolder && selectedFolder?.child_folders?.length > 0 && (
          <div className="flex gap-2 items-center">
            <p className="text-gray-400">Sub folders:</p>
            <OrganizationFilterButtons
              isLoading={isLoading}
              childFolders={selectedFolder.child_folders}
              onSelectedChild={setSelectedChildFolder}
            />
          </div>
        )}
      </div>
      <h4 className="text-xl dark:text-white">Showing {visibleCameras.length} streams</h4>
      {selectedData ? (
        <div className={cn("grid grid-cols-1 gap-6 max-h-[55vh] overflow-y-auto scrollbar-hide p-2",
          {
            "md:grid-cols-1": toogleColumnValue === 1,
            "md:grid-cols-2": toogleColumnValue === 2,
            "md:grid-cols-3": toogleColumnValue === 3,
            "md:grid-cols-4": toogleColumnValue === 4,
            "md:grid-cols-5": toogleColumnValue === 5,
          }
        )}>
          {visibleCameras?.filter((item) => (!selectedChildFolder || !selectedFolder) ? item.folder_id === null : item).map((camera: any) => {
            return (
              <CameraStreamCard
                key={camera.camera_id}
                camera={camera}
              />
            )
          })}
        </div>

      ) :
        <div className="text-center text-gray-500">
          Please select an organization to view its cameras
        </div>
      }

      {selectedOrganization && visibleCameras.length === 0 && (
        <div className="text-center text-gray-500">
          No cameras found
        </div>
      )}
    </div>
  );
}
