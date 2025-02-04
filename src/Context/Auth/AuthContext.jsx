import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const endpoint = import.meta.env.VITE_ENDPOINT;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  //   register user
  const registerUser = (user) => {
    setLoading(true);
    axios
      .post(`${endpoint}/users/register`, user)
      .then(() => {
        setLoading(false);
        toast.success("Account created successfully.", {
          autoClose: 2500,
          pauseOnHover: false,
        });
        setErrors({});
      })
      .catch((err) => {
        setLoading(false);
        if (err.status === 409) {
          setErrors({
            ...errors,
            userName: err.response?.data?.message,
            email: err.response?.data?.message,
          });
        }
        return;
      });
  };

  //   login user
  const loginUser = (user) => {
    setLoading(true);
    axios
      .post(`${endpoint}/users/login`, user)
      .then((res) => {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(res.data?.data?.user)
        );
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data?.data?.accessToken)
        );
        navigate("/dashboard");
        setErrors({});
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 404) {
          setErrors({
            ...errors,
            email: "User with this email does not exist.",
            password: "",
          });
          toast.error("User doesnot exists.", {
            autoClose: 2500,
            pauseOnHover: false,
          });
          return;
        } else if (err.response && err.response.status === 401) {
          setErrors({
            ...errors,
            password: "Invalid password.",
            email: "",
          });
          return;
        } else {
          setErrors({
            ...errors,
            email: "An error occurred. Please try again.",
            password: "",
          });
          return;
        }
      });
  };

  //   logout user
  const handleLogout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loggedInUser");
      navigate("/login");
      setLoading(false);
      toast.success("Account logged out.", {
        autoClose: 2500,
        pauseOnHover: false,
      });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        errors,

        loginUser,
        registerUser,
        handleLogout,
        setIsLoggedIn,
        setErrors,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
