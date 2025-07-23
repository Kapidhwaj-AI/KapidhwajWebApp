import { Camera } from "./camera";

export interface Favourite{
    camera: Camera;
    organization: Organization
}

interface Organization{
    created_at:Date
    id:string
    name:string
    owner:string
    updated_at:Date
}