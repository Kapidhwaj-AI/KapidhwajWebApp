'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Organization } from '@/models/organization';
import { getOrganizations } from '@/app/actions/organization';

export const useOrganizations = (organizationId?: string, p0?: { onSuccess: (data: any) => void; }) => {
    const queryClient = useQueryClient();

    const query = useQuery<Organization[]>({
        queryKey: ['organizations', organizationId],
        queryFn: () => getOrganizations(organizationId),
        gcTime: 10 * 60 * 1000, // 10 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        ...query,
    };
}; 