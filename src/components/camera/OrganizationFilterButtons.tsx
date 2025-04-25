"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Organization } from "@/models/organization";

interface OrganizationFilterButtonsProps {
    organizations: Organization[];
    isLoading: boolean;
    onOrganizationSelect: (organization: Organization) => void;
}

const OrganizationFilterButtons = ({ organizations, isLoading, onOrganizationSelect }: OrganizationFilterButtonsProps) => {
    const [selected, setSelected] = useState<string>("");
    // const { data: organizations, isLoading } = useOrganizations();

    useEffect(() => {
        if (organizations && organizations.length > 0 && !selected) {
            const firstOrg = organizations[0];
            setSelected(firstOrg.id);
            onOrganizationSelect(firstOrg);
        }
    }, [organizations]);

    if (isLoading) {
        return <div>Loading organizations...</div>;
    }

    return (
        <div className="w-full xl:max-w-250 lg:max-w-200 md:max-w-150 sm:max-w-100 pb-2">
            <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                {organizations?.map((org) => (
                    <Button
                        key={org.id}
                        variant="ghost"
                        className={`px-4 py-2 rounded-full transition-all ${selected === org.id
                            ? "bg-[#2B4C88] text-white shadow-md"
                            : "bg-[var(--surface-400)] text-gray-500"
                            }`}
                        onClick={() => {
                            setSelected(org.id);
                            onOrganizationSelect(org);
                        }}
                    >
                        {org.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default OrganizationFilterButtons;