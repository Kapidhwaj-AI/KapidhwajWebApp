'use client'
import { getLocalStorageItem } from '@/lib/storage';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { apiSocketUrl } from '../../services/config'
import { setNotificationCount } from '@/redux/slices/userSlice';
import { setPeopleCount } from '@/redux/slices/singleCameraSlice';
import { toast } from 'react-toastify';
import { toggleFaceDetection, toggleFireSmokeDetection, toggleIntrusionDetection, toggleLicensePlateDetection, toggleMotionDetection, togglePeopleCountDetected, togglePeopleDetection } from '@/redux/slices/singleCameraSettingSlice';
import { RootState } from '@/redux/store';
const SocketNotification = () => {
    const dispatch = useDispatch();
    const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const reduxLocal = useSelector((state: RootState) => state.hub.localHub)
    const reduxRemote = useSelector((state: RootState) => state.hub.remoteHub)
    const [isValid, setIsValid] = useState(false)
    useEffect(() => {
        if (((reduxLocal !== null || reduxRemote !== null) && (reduxLocal?.id || reduxRemote?.id)) || (remoteHub.id || localHub.id)) {
            setIsValid(true)
        }
    }, [reduxLocal, reduxRemote, remoteHub.id, localHub.id ])
   
    useEffect(() => {
        const baseUrl = isValid && !(remoteHub.id || reduxRemote?.id) ? `ws://${localHub.id || reduxLocal?.id}.local:8084` : apiSocketUrl
        if (token) {
            const socket = io(baseUrl, {
                auth: {
                    token,
                },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 4000,
                secure: true,
                rejectUnauthorized: false,
            });

            socket.on('connect', () => {
                console.log('Connected to server with ID');
            });

            socket.on('connect_error', err => {
                console.error('Connection error:', JSON.stringify(err));
                if (socket.io.engine?.transport?.name === 'polling') {
                    socket.io.engine.transport.close();
                }
            });

            socket.on('error', err => {
                console.error('Socket error:', err);
            });

            socket.on('unseen_count', (data: { unSeenCount: number }) => {
                dispatch(setNotificationCount(data.unSeenCount));
            });

            socket.on('people_count', (data: {
                camera_id: string;
                people_count: string;
            }) => {
                dispatch(setPeopleCount(data));
            });

            socket.on('notification', (notification: { type: string, message: string }) => {
                const type = notification.type;
                toast.info(notification.message);
                if (type === 'intrusion_detected') {
                    dispatch(toggleIntrusionDetection());
                } else if (type === 'face_detected') {
                    dispatch(toggleFaceDetection());
                } else if (type === 'face_detected') {
                    dispatch(togglePeopleDetection());
                } else if (type === 'people_count') {
                    dispatch(togglePeopleCountDetected());
                } else if (type === 'license_plate_detected') {
                    dispatch(toggleLicensePlateDetection());
                } else if (type === 'motion_detected') {
                    dispatch(toggleMotionDetection());
                } else if (type === 'fire_smoke_detected') {
                    dispatch(toggleFireSmokeDetection());
                }
            });

            socket.on('disconnect', (reason) => {
                console.log('Disconnected from server. Reason:', reason);
            });

            return () => {
                socket.off('connect');
                socket.off('connect_error');
                socket.off('error');
                socket.off('unseen_count');
                socket.off('people_count')
                socket.off('notification');
                socket.off('disconnect');
                socket.disconnect();
            };
        }
        return () => { }; // Add empty cleanup function for when token is not present
    }, [token, isValid]); // Add token as dependency to reconnect if it changes
    return null;
}

export default SocketNotification