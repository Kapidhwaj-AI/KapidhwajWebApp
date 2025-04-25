import { Organization } from './organization';
import { Camera } from './camera';
export interface Site {
    id: number;
    name: string;
    organization_id: number;
    Folders?: any;
    organization?: Organization;
    cameras?: Camera[];

    createdAt?: Date;
    updatedAt?: Date;
}
