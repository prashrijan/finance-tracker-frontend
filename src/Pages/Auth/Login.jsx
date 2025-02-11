import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../Context/Auth/AuthContext";

const Login = () => {
    const { loginUser, errors, setErrors } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const loginValidationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email.")
            .required("Email is required."),
        password: Yup.string().required("Password is required."),
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginValidationSchema.validate(formData, {
                abortEarly: false,
            });
            setErrors({});
            loginUser(formData);
        } catch (error) {
            const newErrors = {};

            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-full bg-gray-900 text-white p-5 gap-4">
            {/* Left Section */}
            <div className="flex flex-col justify-center p-5 text-left">
                <img
                    src="/login.png"
                    alt="Secure Login"
                    className="mb-5 size-72"
                />
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-lg text-gray-400">
                    Log in to your account to continue saving and achieving your
                    goals.
                </p>
            </div>
            {/* Right Section */}
            <form
                className=" bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={(e) => handleLogin(e)}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
                {/* Email */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                            errors.email
                                ? "border-red-500 shake-animation"
                                : "border-gray-600"
                        } text-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=" "
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email
                    </label>
                    {errors.email && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </span>
                    )}
                </div>
                {/* Password */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                            errors.password
                                ? "border-red-500 shake-animation"
                                : "border-gray-600"
                        } text-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=" "
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="password"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                    {errors.password && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </span>
                    )}
                    <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="text-gray-400" />
                        ) : (
                            <Eye className="text-gray-400" />
                        )}
                    </span>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Log In
                </button>
                <p className="text-center text-gray-400 mt-4 ">
                    Forgot your password?{" "}
                    <Link
                        to="/resetPassword"
                        className="text-blue-500 hover:underline"
                    >
                        Reset Password
                    </Link>
                </p>
                <p className="text-center text-gray-400 mt-2">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
