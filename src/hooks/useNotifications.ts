import { useQuery } from '@tanstack/react-query';
import { Notification } from '@/models/notification';
import { useEffect } from 'react';
import { protectApi } from '@/lib/protectApi';

export const useNotifications = (offset: number, options?: { onSuccess: (data: Notification[]) => void }) => {
    const query = useQuery<Notification[]>({
        queryKey: ['notifications', offset],
        queryFn: async () => {
            const res = await protectApi<Notification[]>(
                '/user.notification'
            );

            return res.data.data
        },
        gcTime: 10 * 60 * 1000, // 10 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    useEffect(() => {
        if (query.data && options?.onSuccess) {
            options.onSuccess(query.data);
        }
    }, [query.data, options?.onSuccess]);

    return query;
}; 