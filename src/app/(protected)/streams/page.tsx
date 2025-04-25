"use client";
import { useState } from "react";
import CameraStreamCard from "@/components/camera/CameraStreamCard";
import OrganizationFilterButtons from "@/components/camera/OrganizationFilterButtons";
import SearchBar from "@/components/common/Searchbar";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Organization } from "@/models/organization";
import { Camera } from "@/models/camera";
import { CameraDetailsViewToggleButton } from "@/components/camera/CameraDetailsViewToggleButton";
import ColumnDropdown from "@/components/camera/ColumnDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";

export default function Streams() {
  const toogleColumnValue = useSelector((state: RootState) => state?.camera?.toogleColumns);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: organizations, isLoading, error } = useOrganizations(undefined, {
    onSuccess: (data) => {
      setSelectedOrganization(data[0]);
    }
  });

  // Filter cameras based on selected organization and search query
  const filteredFolders = selectedOrganization?.Folders?.map(folder => ({
    ...folder, // Keep all folder properties (name, id, etc.)
    cameras: searchQuery
      ? folder.cameras?.filter(camera =>
        camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camera.physical_address.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
      : folder.cameras // Return all cameras if searchQuery is empty
  })) || [];
  // console.log("searchQuery", searchQuery);
  // console.log(selectedOrganization);
  // console.log(filteredFolders);
  if (isLoading) {
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
        <div className="text-center text-gray-500">Loading organizations...</div>
      </div>
    );
  }

  if (error) {
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
        <div className="text-center text-red-500">Error loading organizations: {error.message}</div>
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

      <OrganizationFilterButtons
        isLoading={isLoading}
        organizations={organizations}
        onOrganizationSelect={setSelectedOrganization}
      />

      {selectedOrganization ? (
        <div className={cn("grid grid-cols-1 gap-6 min-h-min",
          {
            "md:grid-cols-1": toogleColumnValue === 1,
            "md:grid-cols-2": toogleColumnValue === 2,
            "md:grid-cols-3": toogleColumnValue === 3,
            "md:grid-cols-4": toogleColumnValue === 4,
            "md:grid-cols-5": toogleColumnValue === 5,
          }
        )}>
          {filteredFolders.map((folder: any) => {
            const orgName = selectedOrganization?.name;
            return folder.cameras.map((camera: Camera) => (
              <CameraStreamCard
                key={camera.camera_id}
                camera={camera}
                folder={folder}
                orgName={orgName}
              />
            ))
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Please select an organization to view its cameras
        </div>
      )}

      {selectedOrganization && filteredFolders.length === 0 && (
        <div className="text-center text-gray-500">
          No cameras found in the selected organization
        </div>
      )}
    </div>
  );
}
