import { NotificationType } from '@/utils/notification';

export interface Notification {
    id: number;
    title: string;
    description: string;
    type: NotificationType;
    seen: boolean;
    seen_at: Date;
    user_id: string;
    organization_id: string;
    message: string;
    meta_data: { camera_id: number }
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotificationViewProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    isLoading: boolean;
    allNotifications: Notification[];
    setAllNotifications: (val: Notification[]) => void;
    error: Error | undefined;
    filteredNotifications: Notification[];
    isDateFiltered: boolean;
    setIsDateFiltered: (val: boolean) => void;
    divRef: React.RefObject<HTMLDivElement | null>
    fetchNotification: (val: number) => Promise<Notification[]>
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>
    hasMore: boolean;
    setHasMore: (val: boolean) => void
    handleReadAll: () => void
    setIsMoreLoading:(val: boolean) => void
    isMoreLoading: boolean;
    
}