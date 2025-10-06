import { useQuery } from '@tanstack/react-query';
import { Organization } from '@/models/organization';
import { protectApi } from '@/lib/protectApi';

export const useOrganizations = (organizationId?: string, isNotCustomHeader?: boolean) => {
  const query = useQuery<Organization[]>({
    queryKey: ['organizations', organizationId],
    queryFn: async () => {
      const res = await protectApi<{organization:Organization}[]>(
        organizationId
          ? `/organizations?organizationId=${organizationId}`
          : `/organizations`, 'GET', undefined,undefined, isNotCustomHeader
      );
      return res.data.data.map((item: { organization: Organization }) => item.organization);
    },
    refetchOnMount: 'always',  
  });

  return {
    ...query,
  };
}; 