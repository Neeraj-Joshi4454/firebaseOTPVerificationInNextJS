'use client'

import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { app } from '@/app/config'
import { useRouter } from 'next/navigation';


export default function PhoneOTP() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            'size': 'normal',
            'callback': (response) => {

            },
            'expired-callback': () => {

            }
        })
    }, [auth])

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleOTPChange = (e) => {
        setOtp(e.target.value)
    }

    const handleSendOtp = async () => {
        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setPhoneNumber('');
            setOtpSent(true); // Update otpSent state
            alert('OTP has been sent');
        } catch (error) {
            console.error(error);
        }
    };


    const handleOTPSubmit = async () => {
        try {
            await confirmationResult.confirm(otp);
            setOtp('')
            router.push('/test')
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            {!otpSent ? (
                <div id="recaptcha-container"></div>
            ) : null}
            <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder='Enter the phone number with the country code'
                className='border border-gray-500 p-2 rounded-md'
            />
            <input
                type="text"
                value={otp}
                onChange={handleOTPChange}
                placeholder='Enter OTP'
                className='border border-gray-500 p-2 rounded-md'
            />
            <button
                onClick={otpSent ? handleOTPSubmit : handleSendOtp}
                className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-md m-2`}
                style={{ backgroundColor: otpSent ? 'green' : 'blue' }}
            >
                {otpSent ? 'Submit OTP' : 'Send OTP'}

            </button>
        </>
    );

}



