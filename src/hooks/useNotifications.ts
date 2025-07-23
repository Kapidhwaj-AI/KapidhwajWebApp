'use client'
import { useQuery } from '@tanstack/react-query';
import { Notification } from '@/models/notification';
import { getNotifications } from '@/services/notification';
import { useEffect } from 'react';
import { protectApi } from '@/lib/protectApi';

export const useNotifications = (offset: number, options?: { onSuccess: (data: Notification[]) => void }) => {
    console.log("useNotifications hook called with offset:", offset);

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
            console.log("Calling onSuccess with data:", query.data);
            options.onSuccess(query.data);
        }
    }, [query.data, options?.onSuccess]);

    return query;
}; 