import { NotificationType } from '@/utils/notification';

export interface Notification {
    id: string;
    title: string;
    description: string;
    type: NotificationType;
    seen: boolean;
    createdAt?: Date;
    updatedAt?: Date;
} 