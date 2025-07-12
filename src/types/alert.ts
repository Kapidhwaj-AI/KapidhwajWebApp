export interface Alerts {
    id: number,
    frame_url: string,
    timestamp: number,
    person_ids: number[],
    persons: [],
    camera: Camera,
    alertType: string,
    meta_data: string | null
}

export interface Camera {
    id: number;
    name: string,
    rtsp_url: string,
    webrtc_url: string,
    is_record: number,
    is_ai_stream_active: number,
    organization_id: string,
    folder: {
        id: null | string,
        name: null | string
    }
}