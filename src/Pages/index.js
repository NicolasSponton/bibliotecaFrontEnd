import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../Layout/LayoutComponents/Loading";

const Error = lazy(() => import('../Layout/LayoutComponents/Error'));
const NotFound = lazy(() => import('../Layout/LayoutComponents/NotFound'));
const Inicio = lazy(() => import('./inicio'));
const Categorias = lazy(() => import('./categorias'));
const Prestamos = lazy(() => import('./prestamos'));
const Usuarios = lazy(() => import('./usuarios'));
const Carreras = lazy(() => import('./carreras'));
const Editoriales = lazy(() => import('./editoriales'));
const Libros = lazy(() => import('./libros'));
const Alumnos = lazy(() => import('./alumnos'));
const Autores = lazy(() => import('./autores'));

function ViewRouter(){
    return <>
    <Suspense fallback={<Loading/>}>
        <Routes>
            <Route index element={<Inicio/>} />
            <Route path="/inicio" element={<Inicio/>} />
            <Route path="/usuarios" element={<Usuarios/>} />
            <Route path="/prestamos" element={<Prestamos/>} />
            <Route path="/alumnos" element={<Alumnos/>} />
            <Route path="/autores" element={<Autores/>} />
            <Route path="/carreras" element={<Carreras/>} />
            <Route path="/editoriales" element={<Editoriales/>} />
            <Route path="/libros" element={<Libros/>} />
            <Route path="/categorias" element={<Categorias/>} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    </Suspense>
    </>
}

export default ViewRouter