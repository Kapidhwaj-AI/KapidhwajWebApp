import { ChangePasswordDialogue } from '@/components/dialogue/ChangePasswordDialogue'
import { protectApi } from '@/lib/protectApi'
import { getLocalStorageItem } from '@/lib/storage'
import { setIsChangePasswordOpen } from '@/redux/slices/settingsSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OtpFormController } from '../auth/Otp.form.controller'

const ChangePasswordController = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [isOtpSend, setIsOtpSend] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const user = JSON.parse(getLocalStorageItem('user') ?? '{}')
    const showChangePasswordDial = useSelector((state: RootState) => state.settings.isChangePasswordOpen)
    const handleOtpSend = async () => {
        setPasswordErr('')
        if (newPassword.trim() !== confirmPassword.trim()) {
            setPasswordErr(`Passwords must be same`)
            return;
        }
        if (!newPassword.trim() || !confirmPassword.trim()) {
            setPasswordErr("Both fields are required")
            return;
        }
        setLoading(true)
        try {
            const res = await protectApi<AxiosResponse, { email: string, phone: string }>('/sendOTP', 'POST', { email: user.email, phone: user.phone }, undefined, true)
            if (res.status === 200 && !isOtpSend) {
                setIsOtpSend(true)
            }

        } catch (error) {
            console.error("err:", error)
        } finally {
            setLoading(false)
        }
    }
    const handleChangePassword = async () => {
        try {
            const res = await protectApi<AxiosResponse, { email: string, newPassword: string }>('/user/changePassword', 'POST', { email: user.email, newPassword }, undefined, true)
            if (res.status === 200) {
                setIsOtpSend(false)
                dispatch(setIsChangePasswordOpen(false))
            }


        } catch (error) {
            console.error("err:", error)
        }
    }
    return (
        <>
            <ChangePasswordDialogue showConfirm={showConfirm} setShowConfirm={setShowConfirm} showPassword={showPassword} setShowPassword={setShowPassword} newPassword={newPassword} confirmPassword={confirmPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword} isLoading={loading} err={passwordErr} handleOtpSend={handleOtpSend} isOpen={showChangePasswordDial} onClose={() => dispatch(setIsChangePasswordOpen(false))} />
            {isOtpSend && <OtpFormController handleChangePassword={handleChangePassword} value={user.email} isProtected={true} setIsOpen={setIsOtpSend} backKey='email' verify='/verifyOTP' resend='/sendOTP' />}
        </>

    )
}

export default ChangePasswordController