import { FC, lazy, useContext } from "react"

import { UserContext } from "@/context"
import { Navigate, useLocation } from "react-router-dom";

const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Signup'))

const LoggedUserRedirect: FC = (): JSX.Element => {

    const { user, userRole } = useContext(UserContext)

    const { pathname } = useLocation()

    if (user && userRole) {
        if (userRole === 'user') return <Navigate to={`/user/profile/${user?.uid}`} replace />
        if (userRole === 'admin') return <Navigate to='/admin/products' replace />
        if (userRole === 'moderator') return <Navigate to='/moderator/' replace />
    }

    return pathname === '/signup' ? <Register /> : <Login />

}

export default LoggedUserRedirect