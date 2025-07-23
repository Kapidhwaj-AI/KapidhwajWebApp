'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Organization } from '@/models/organization';
import { getOrganizations } from '@/app/actions/organization';
import { protectApi } from '@/lib/protectApi';

export const useOrganizations = (organizationId?: string, p0?: { onSuccess: (data: any) => void; }) => {
  const queryClient = useQueryClient();
  const query = useQuery<Organization[]>({
    queryKey: ['organizations', organizationId],
    queryFn: async () => {
      const res = await protectApi<{organization:Organization}[]>(
        organizationId
          ? `/organizations?organizationId=${organizationId}`
          : `/organizations`
      );
      return res.data.data.map((item: { organization: Organization }) => item.organization);
    },
    gcTime: 10 * 60 * 1000, // 10 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...query,
  };
}; 