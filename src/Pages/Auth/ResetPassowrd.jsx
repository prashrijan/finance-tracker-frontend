import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../Context/Auth/AuthContext";

const ResetPassword = () => {
    const { resetPassword, errors, setErrors } = useAuth();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetPasswordValidationSchema = Yup.object({
        oldPassword: Yup.string().required("Old Password is required."),
        newPassword: Yup.string()
            .required("New Password is required.")
            .min(8, "Password must be at least 8 characters.")
            .notOneOf(
                [Yup.ref("oldPassword")],
                "New Password must be different from Old Password."
            ),
        confirmPassword: Yup.string()
            .required("Confirm Password is required.")
            .oneOf([Yup.ref("newPassword")], "Passwords must match."),
    });

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await resetPasswordValidationSchema.validate(formData, {
                abortEarly: false,
            });
            setErrors({});
            resetPassword(formData);
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
                    src="/reset-password.png"
                    alt="Reset Password"
                    className="mb-5 size-72"
                />
                <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                <p className="text-lg text-gray-400">
                    Enter your old password and set a new password to secure
                    your account.
                </p>
            </div>
            {/* Right Section */}
            <form
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={handleResetPassword}
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Reset Password
                </h2>
                {/* Old Password */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        id="oldPassword"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                            errors.oldPassword
                                ? "border-red-500 shake-animation"
                                : "border-gray-600"
                        } text-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=" "
                        value={formData.oldPassword}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="oldPassword"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Old Password
                    </label>
                    {errors.oldPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.oldPassword}
                        </span>
                    )}
                    <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                        {showOldPassword ? (
                            <EyeOff className="text-gray-400" />
                        ) : (
                            <Eye className="text-gray-400" />
                        )}
                    </span>
                </div>
                {/* New Password */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                            errors.newPassword
                                ? "border-red-500 shake-animation"
                                : "border-gray-600"
                        } text-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=" "
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="newPassword"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        New Password
                    </label>
                    {errors.newPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.newPassword}
                        </span>
                    )}
                    <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? (
                            <EyeOff className="text-gray-400" />
                        ) : (
                            <Eye className="text-gray-400" />
                        )}
                    </span>
                </div>
                {/* Confirm Password */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                            errors.confirmPassword
                                ? "border-red-500 shake-animation"
                                : "border-gray-600"
                        } text-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=" "
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="confirmPassword"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Confirm Password
                    </label>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                        </span>
                    )}
                    <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? (
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
                    Reset Password
                </button>
                <p className="text-center text-gray-400 mt-4 ">
                    Remember your password?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ResetPassword;
