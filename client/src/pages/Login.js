import React from 'react';
import { useSelector } from 'react-redux';

export default function Login() {
    const age = useSelector((state)=>state)
    return (
        <div className="Login">
            {age}
        </div>
    );
}