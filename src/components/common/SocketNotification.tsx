'use client'
import { getLocalStorageItem } from '@/lib/storage';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { apiSocketUrl } from '../../services/config'
import { showToast } from '@/lib/showToast';
import { RootActions, RootState, useStore } from '@/store';
const SocketNotification = () => {
    const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const reduxLocal = useStore((state: RootState) => state.hub.localHub)
    const reduxRemote = useStore((state: RootState) => state.hub.remoteHub)
    const togglePeopleDetection = useStore((state: RootActions) => state.togglePeopleDetection);
    const toggleFaceDetection = useStore((state: RootActions) => state.toggleFaceDetection);
    const toggleFireSmokeDetection = useStore((state: RootActions) => state.toggleFireSmokeDetection);
    const toggleIntrusionDetection = useStore((state: RootActions) => state.toggleIntrusionDetection);
    const toggleLicensePlateDetection = useStore((state: RootActions) => state.toggleLicensePlateDetection);
    const toggleMotionDetection = useStore((state: RootActions) => state.toggleMotionDetection);
    const togglePeopleCountDetected = useStore((state: RootActions) => state.togglePeopleCountDetected);
    const setNotificationCount = useStore((state: RootActions) => state.setNotificationCount);
    const setPeopleCount = useStore((state: RootActions) => state.setPeopleCount);
    const setFootFallCount = useStore((state: RootActions) => state.setFootFallCount);

    const setPorts = useStore((state: RootActions) => state.setPorts);

    const [isValid, setIsValid] = useState(false)
    useEffect(() => {
        if (((reduxLocal !== null || reduxRemote !== null) && (reduxLocal?.id || reduxRemote?.id)) || (remoteHub.id || localHub.id)) {
            setIsValid(true)
        }
    }, [reduxLocal, reduxRemote])

    const baseUrl =  (localHub.id || reduxLocal?.id) ? `ws://${localHub.id || reduxLocal?.id}.local:8084` : apiSocketUrl
    useEffect(() => {
        const baseUrl = isValid && !(remoteHub.id || reduxRemote?.id) ? `ws://${localHub.id || reduxLocal?.id}.local:8084` : apiSocketUrl
        if (token) {
            console.log(isValid, "socketValid", (!remoteHub.id || !reduxRemote?.id), remoteHub.id, reduxRemote?.id)
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
                setNotificationCount(data.unSeenCount);
            });

            socket.on('people_count', (data: {
                camera_id: string;
                people_count: string;
            }) => {
                setPeopleCount(data);
            });
            socket.on('footfall_count', (data: {
                camera_id: string;
                inCount: number;
                outCount: number;
            }) => {
                console.log(data, "footfall_count_socket")
                setFootFallCount(data);
            });
            socket.on('update_ports', (data: {
                static_port: number;
                live_port: number;
            }) => {
                setPorts(data)
            })

            socket.on('notification', (notification: { type: string, message: string }) => {
                const type = notification.type;
                showToast(notification.message, "info")
                if (type === 'intrusion_detected') {
                    toggleIntrusionDetection();
                } else if (type === 'face_detected') {
                    toggleFaceDetection();
                } else if (type === 'face_detected') {
                    togglePeopleDetection();
                } else if (type === 'people_count') {
                    togglePeopleCountDetected();
                } else if (type === 'license_plate_detected') {
                    toggleLicensePlateDetection();
                } else if (type === 'motion_detected') {
                    toggleMotionDetection();
                } else if (type === 'fire_smoke_detected') {
                    toggleFireSmokeDetection();
                }
            });

            socket.on('disconnect', reason => {
                console.log('Disconnected from server. Reason:', reason);
                if (reason === 'io server disconnect') {
                    socket.connect();
                }
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