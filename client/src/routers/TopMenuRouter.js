import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Chart from "../pages/Chart";

export default function MenuRouter(){
    return(
        <Routes>
            <Route path="/" element={<Home text="Home"/>} />
            <Route path="/Chart" element={<Chart />} />
            <Route path="/Login" element={<Login />} />
        </Routes>
    )
}
