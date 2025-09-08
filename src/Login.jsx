// src/App.js
import React, { useState } from "react";
import "./index.css";
import Inventory from "./Inventory";
import Error from "./Error";

export default function App() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    const loginRegister = (e) => {
        
    }

    return (
        <>
            <div className="p-4 sm:p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? "Cashier's Login" : "Cashier's Registration"}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-15px', marginBottom: '25px', fontSize: '12px' }}>
                    <span>Develop by: <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>K W A N G G O L ' S</span></span>
                </div>

                <div className="mt-10 border p-4 rounded-lg shadow-sm bg-white">
                    <form onSubmit={loginRegister}>

                        {!isLogin && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Full Name</h3>
                                <div className="mb-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <span style={{ marginTop: '5px' }}></span>
                                            <input
                                                type="text"
                                                placeholder="Fullname"
                                                className="border p-2 rounded w-full sm:w-64"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Email</h3>
                            <div className="mb-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span style={{ marginTop: '5px' }}></span>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            className="border p-2 rounded w-full sm:w-64"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Password</h3>
                            <div className="mb-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span style={{ marginTop: '5px' }}></span>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="border p-2 rounded w-full sm:w-64"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Confirm Password</h3>
                                <div className="mb-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <span style={{ marginTop: '5px' }}></span>
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                className="border p-2 rounded w-full sm:w-64"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button type="submit" className="bg-blue-600 text-white w-full p-2 mt-4">{isLogin ? "Login" : "Register"}</button>
                        <p className="text-center text-sm mt-4" style={{ fontSize: '16px' }}>
                            {isLogin ? "Dont't have an account?" : " Already have an account?"}{" "}
                            <span style={{ cursor: 'pointer' }} className="text-blue-600 font-semibold cursor-pointer" onClick={toggleForm}>{isLogin ? "Register" : "Login"}</span>
                        </p>
                    </form>
                </div>

            </div>

        </>
    );
}
