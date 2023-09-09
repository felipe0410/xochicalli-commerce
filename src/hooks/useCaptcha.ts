import { useEffect, useState } from 'react'

import { ApplicationVerifier, RecaptchaVerifier } from 'firebase/auth'

import { auth } from '@/firebase'

export const useCaptcha = (compId: string) => {
    const [captcha, setCaptcha] = useState<ApplicationVerifier>()

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(compId, {
            'size': 'invisible',
            'callback': () => { },
        }, auth)

        setCaptcha(recaptchaVerifier)

        return () => {
            recaptchaVerifier.clear()
        }
    }, [compId])

    return captcha;
}