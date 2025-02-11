import React, { useState } from "react";
import {
    Footer,
    NavBar,
    SignUp,
    Login,
    HomePage,
    ContactUs,
    AboutUs,
    Dashboard,
    SkeletonLoader,
    TransactionsPage,
    ResetPassword,
} from "./index";
import { motion } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuth } from "./Context/Auth/AuthContext";

function App() {
    const [showContent, setShowContent] = useState(false);

    const { isLoggedIn, loading } = useAuth();

    const ProtectedRoute = ({ children }) => {
        if (!isLoggedIn) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    const handleAnimationComplete = () => {
        setShowContent(true);
    };

    return (
        <div className="relative min-h-screen bg-gray-900 text-white flex">
            {/* Animated Blur Text */}
            {!showContent && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: -90 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    onAnimationComplete={handleAnimationComplete}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-center ">
                        Smart Budgeting, <br />
                        Happier Saving.
                    </h2>
                </motion.div>
            )}

            {/* Main Content */}
            {showContent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col flex-grow w-[100%]"
                >
                    <NavBar />

                    {loading ? (
                        <SkeletonLoader />
                    ) : (
                        <div className="flex flex-col flex-grow items-center justify-center">
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        isLoggedIn ? (
                                            <Navigate to="/dashboard" replace />
                                        ) : (
                                            <HomePage />
                                        )
                                    }
                                />

                                <Route
                                    path="/login"
                                    element={
                                        isLoggedIn ? (
                                            <Navigate to="/dashboard" replace />
                                        ) : (
                                            <Login />
                                        )
                                    }
                                />

                                <Route
                                    path="/signup"
                                    element={
                                        isLoggedIn ? (
                                            <Navigate to="/dashboard" replace />
                                        ) : (
                                            <SignUp />
                                        )
                                    }
                                />
                                <Route
                                    path="/resetPassword"
                                    element={
                                        isLoggedIn ? (
                                            <Navigate
                                                to="/resetPassword"
                                                replace
                                            />
                                        ) : (
                                            <ResetPassword />
                                        )
                                    }
                                />

                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/transactions"
                                    element={
                                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                                            <TransactionsPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/contact"
                                    element={<ContactUs />}
                                />
                                <Route path="/about" element={<AboutUs />} />
                            </Routes>
                        </div>
                    )}

                    <Footer />
                    <ToastContainer />
                </motion.div>
            )}
        </div>
    );
}

export default App;
