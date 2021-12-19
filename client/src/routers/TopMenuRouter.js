import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Chart from '../pages/Chart'
import Singup from '../pages/Singup'
import News from '../pages/News'
import Heart from '../pages/Heart'
export default function MenuRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home text="Home" />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/list" element={<Heart />} />
        </Routes>
    )
}
