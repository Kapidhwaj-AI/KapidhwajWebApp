import { useState, useEffect } from "react";
import { Folders, Organization } from "@/models/organization";
import dynamic from "next/dynamic";
const Button = dynamic(() => import("@/components/ui/button").then((mod) => mod.Button),
    { ssr: false });


interface OrganizationFilterButtonsProps {
    organizations?: Organization[];
    folders?: Folders[];
    childFolders?: Folders[];
    isLoading: boolean;
    selectedId?: string | number | null;
    onOrganizationSelect?: (organization: Organization) => void;
    onSelectedFolder?: (data: Folders) => void;
    onSelectedChild?: (data: Folders) => void;
}

const OrganizationFilterButtons = ({ organizations, folders, isLoading, onOrganizationSelect, selectedId, onSelectedFolder, childFolders, onSelectedChild }: OrganizationFilterButtonsProps) => {
    const [selected, setSelected] = useState<string | number | null>(null);

    useEffect(() => {
        if (organizations && organizations.length > 0 && !selected && onOrganizationSelect) {
            const firstOrg = organizations[0];
            setSelected(firstOrg.id);
            onOrganizationSelect(firstOrg);
        }

    }, [organizations]);

    if (isLoading) {
        return <div>Loading organizations...</div>;
    }

    return (
        <div className="w-full xl:max-w-250 lg:max-w-200 md:max-w-150 sm:max-w-100 ">
            <div className="flex items-center overflow-x-auto overflow-visible gap-2 py-3 scrollbar-hide">
                {organizations?.map((org) => (
                    <Button
                        key={org.id}
                        variant="ghost"
                        className={`px-4 py-2 rounded-full transition-all ${selectedId === org.id
                            ? "bg-[#2B4C88] text-white shadow-md"
                            : "bg-[var(--surface-400)] text-gray-500"
                            }`}
                        onClick={() => {
                            setSelected(org.id);
                            if (onOrganizationSelect) {
                                onOrganizationSelect(org);
                            }
                        }}
                    >
                        {org.name}
                    </Button>
                ))}
                {folders?.map((folder) => (
                    <Button
                        key={folder.id}
                        variant="ghost"
                        className={`px-4 py-2 rounded-full transition-all ${selectedId === folder.id
                            ? "bg-[#2B4C88] text-white shadow-md"
                            : "bg-[var(--surface-400)] text-gray-500"
                            }`}
                        onClick={() => {
                            setSelected(folder.id);
                            onSelectedFolder?.(folder);
                        }}
                    >
                        {folder.name}
                    </Button>
                ))}
                {childFolders?.map((folder) => (
                    <Button
                        key={folder.id}
                        variant="ghost"
                        className={`px-4 py-2 rounded-full transition-all ${selectedId === folder.id
                            ? "bg-[#2B4C88] text-white shadow-md"
                            : "bg-[var(--surface-400)] text-gray-500"
                            }`}
                        onClick={() => {
                            setSelected(folder.id);
                            onSelectedChild?.(folder);
                        }}
                    >
                        {folder.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default OrganizationFilterButtons;