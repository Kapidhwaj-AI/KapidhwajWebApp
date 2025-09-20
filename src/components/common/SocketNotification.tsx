'use client'
import { getLocalStorageItem } from '@/lib/storage';
import { useEffect } from 'react'
import { io } from 'socket.io-client';
import { showToast } from '@/lib/showToast';
import { RootActions, useStore } from '@/store';
import { getSocketApiBaseUrl } from '@/lib/protectApi';
const SocketNotification = () => {
    const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
    const togglePeopleDetection = useStore((state: RootActions) => state.togglePeopleDetection);
    const toggleFaceDetection = useStore((state: RootActions) => state.toggleFaceDetection);
    const toggleFireSmokeDetection = useStore((state: RootActions) => state.toggleFireSmokeDetection);
    const toggleIntrusionDetection = useStore((state: RootActions) => state.toggleIntrusionDetection);
    const toggleLicensePlateDetection = useStore((state: RootActions) => state.toggleLicensePlateDetection);
    const toggleMotionDetection = useStore((state: RootActions) => state.toggleMotionDetection);
    const togglePeopleCountDetected = useStore((state: RootActions) => state.togglePeopleCountDetected);
    const setNotificationCount = useStore((state: RootActions) => state.setNotificationCount);
    const setPeopleCount = useStore((state: RootActions) => state.setPeopleCount);
    const setPorts = useStore((state: RootActions) => state.setPorts);
    useEffect(() => {
        if (token) {
            
            const socket = io(getSocketApiBaseUrl(), {
                auth: {
                    token,
                },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 50,
                reconnectionDelay: 8000,
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
                //   /  socket.connect();
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
                // socket.disconnect();
            };
        }
        return () => { }; // Add empty cleanup function for when token is not present
    }, [token]); // Add token as dependency to reconnect if it changes
    return null;
}

export default SocketNotification