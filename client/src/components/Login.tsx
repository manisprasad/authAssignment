import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import img from '../assets/img2.jpg';
import { Link } from 'react-router-dom';

const LoginFrame = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) return 'Invalid email format.';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError);
            setError(validationError);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Login successful');
                console.log('Login successful:', result);
                // Perform actions like saving a token or redirecting the user
                setFormData({
                    email: '',
                    password: '',
                });
                setError(null);
            } else {
                toast.error(result.message || 'Login failed.');
                setError(result.message || 'Login failed.');
            }
        } catch (err) {
            toast.error('Failed to submit form. Please try again.');
            setError('Failed to submit form. Please try again.');
        }
    };

    return (
        <div className="flex flex-col  md:flex-row min-h-screen bg-gradient-to-b from-blue-200 to-pink-200 gap-2 p-2">
            <Toaster />
            {/* Left Section */}
            <div className="hidden md:flex w-full md:w-2/3 justify-center items-center bg-white">
                <img src={img} alt="Background" className="w-full h-full object-cover" />
            </div>

            {/* Right Section */}
            <div className="flex w-full h-screen md:w-1/3 flex-col justify-center  bg-white p-6">
                <div className=" mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Login</h1>
                    <p className="text-gray-600 text-sm">
                        Enter your credentials to access your account.
                    </p>
                </div>
                <form
                    className="w-full max-w-lg grid grid-cols-1 gap-6"
                    onSubmit={handleSubmit}
                >
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1">
                        <button
                            type="submit"
                            className=" px-4 w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-black mt-3">
                    Don’t have an Account?{' '}
                    <Link to="/register" className="text-orange-400">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginFrame;
