import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance.js';

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password")
      return;
    }

    setError('')

    try {
      const response= await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if(response.data && response.data.error){
        setError(response.data.message);
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-full max-w-md border rounded bg-white px-6 sm:px-8 py-10 shadow-md">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7 font-semibold text-center">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box w-full mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

            <button
              type="submit"
              className="btn w-full mt-2 rounded p-2 bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
            >
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="font-medium underline text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
