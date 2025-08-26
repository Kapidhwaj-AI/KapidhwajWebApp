import { ProfileDialogue } from '@/components/dialogue/ProfileDialogue';
import { protectApi } from '@/lib/protectApi';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/storage';
import { setIsProfileOpen } from '@/redux/slices/settingsSlice';
import { AppDispatch, RootState } from '@/redux/store';
// import { GOOGLE_KPH_BUCKET_URL } from '@/services/config';
import { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProfileController = () => {
    const [file, setFile] = useState<File>()
    const [isLoading, setIsLoading] = useState(false);
    const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
    // const isValidHub = hub && typeof hub === 'object' && 'id' in hub && 'isRemotely' in hub;
    const baseUrl = `http://localhost:3000/`
    const user = JSON.parse(getLocalStorageItem('user') ?? '{}')
    const [preview, setPreview] = useState(baseUrl + user.profile_image)
    const [name, setName] = useState(user.name ?? '');
    const [customerId, setCustomerId] = useState(user.id ?? '');
    const [email, setEmail] = useState(user.email ?? '');
    const [phone, setPhone] = useState(user.phone ?? '')
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const showProfileDial = useSelector((state: RootState) => state.settings.isProfileOpen)
    const dispatch = useDispatch<AppDispatch>();
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file)
            const url = URL.createObjectURL(file);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    };
    const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            if (file) {
                formData.append('image', file);
            }
            const res = await protectApi<AxiosResponse, typeof formData>(`/user/updateUser`, "PUT", formData, 'multipart/form-data')
            if (res.status === 200) {
                setLocalStorageItem('user', JSON.stringify(res.data.data))
                dispatch(setIsProfileOpen(false))
            }
        } catch (error) {
            console.error("err:", error)
        }
        finally {
            dispatch(setIsProfileOpen(false))
        }
    }
    return (
        <ProfileDialogue isLoading={isLoading}  name={name} phone={phone} id={customerId} email={email} setName={setName} setPhone={setPhone} setId={setCustomerId} setEmail={setEmail} setFile={setFile} preview={preview} setPreview={setPreview} handleSave={handleProfileSave} handleImageClick={handleImageClick} handleImageChange={handleImageChange} fileInputRef={fileInputRef} file={file} isOpen={showProfileDial} onClose={() => { dispatch(setIsProfileOpen(false)) }} />

    )
}

export default ProfileController