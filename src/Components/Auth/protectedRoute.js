import { Navigate, Outlet } from "react-router-dom"

export default function({isAllowed, children, redirectTo = "/auth"}) {
    
    if (!isAllowed){
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet/>
}