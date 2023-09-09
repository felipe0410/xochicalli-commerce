import { useContext, FC } from 'react'
import { Navigate } from 'react-router-dom'

import { PrivateRouteProps } from '@/types'
import { UserContext } from '@/context'

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {

    const { user } = useContext(UserContext)

    const uid = localStorage.getItem('uid') || ''

    if (!user && uid === '')
        return <Navigate to='/login' />

    return <>{children}</>
}
