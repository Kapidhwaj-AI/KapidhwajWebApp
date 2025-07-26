import { Folders, Organization } from './organization';
import { Camera } from './camera';
export interface Site {
    id: number;
    name: string;
    organization_id: number;
    Folders?: Folders[];
    organization?: Organization;
    cameras?: Camera[];

    createdAt?: Date;
    updatedAt?: Date;
}
