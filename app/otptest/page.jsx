'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/app/config'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PhoneOTP from '@/components/phoneOTP/phoneOTP';



export default function Otptest() {
    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/test')
            }
        });
    }, [auth, router])

    return (
        <main className='flex min-h-screen flex-col items-center p-12'>
            <h1 className='text-4xl font-bold mb-10'>Firebase OTP Sign-in</h1>
            <PhoneOTP />
        </main>
    );
}





