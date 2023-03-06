import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Loading from "../Layout/LayoutComponents/Loading";
import ProtectedRoute from "../Components/Auth/protectedRoute";
import Login from "./Auth/Login";

const NotFound = lazy(() => import('../Layout/LayoutComponents/NotFound'));


function AppRouter(){

    const [isAllowed, setIsAllowed] = useState(localStorage.getItem('token'))

    return <>
    <Suspense fallback={<Loading/>}>
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isAllowed} />} >
                <Route index element={<AppLayout/>} />
                <Route path="/app/*" element={<AppLayout/>} />
            </Route>
            <Route path="/auth" element={<Login setIsAllowed={setIsAllowed}/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
    </>
}

export default AppRouter