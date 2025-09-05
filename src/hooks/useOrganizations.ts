'use client'
import { useQuery } from '@tanstack/react-query';
import { Organization } from '@/models/organization';
import { protectApi } from '@/lib/protectApi';

export const useOrganizations = (organizationId?: string) => {
  const query = useQuery<Organization[]>({
    queryKey: ['organizations', organizationId],
    queryFn: async () => {
      const res = await protectApi<{organization:Organization}[]>(
        organizationId
          ? `/organizations?organizationId=${organizationId}`
          : `/organizations`
      );
      return res?.data.data.map((item: { organization: Organization }) => item.organization) ?? [];
    },
    gcTime: 10 * 60 * 1000, 
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true 
  });

  return {
    ...query,
  };
}; 