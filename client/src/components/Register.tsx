import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import img from '../assets/img2.jpg';
import { Link } from 'react-router-dom';


const SignupFrame = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    if (!formData.fullName.trim()) return 'Full Name is required.';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) return 'Invalid email format.';
    if (!formData.phone.match(/^\d{10}$/)) return 'Phone number must be 10 digits.';
    if (!formData.dob) return 'Date of Birth is required.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters.';
    if (formData.password !== formData.confirmPassword) return "Passwords don't match.";
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
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Account created successfully');
        console.log('Account created successfully:', result);
        setFormData({
          fullName: '',
          email: '',
          dob: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
        setError(null);
      } else {
        toast.error(result.message || 'Something went wrong.');
        setError(result.message || 'Something went wrong.');
      }
    } catch (err) {
      toast.error('Failed to submit form. Please try again.');
      setError('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-blue-200 to-pink-200 gap-2 p-2">
      <Toaster />
      {/* Left Section */}
      <div className="hidden md:flex w-full md:w-2/3 justify-center items-center bg-white">
        <img src={img} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/3 flex-col justify-center  bg-white p-6">
        <div className=" mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create an Account</h1>
          <p className="text-gray-600 text-sm">
            Enter your details below to create an account and get started.
          </p>
        </div>
        <form
          className="w-full max-w-lg md:flex md:flex-col lg:flex lg:flex-col xl:grid xl:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >



          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="fullName"
              type="text"
              placeholder="e.g., Ronit Kumar"
              className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

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

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="1234567890"
              className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.phone}
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="mt-2 px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className=" px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-black  text-right">
          Already have an Account?{' '}
          <Link to="/login" className="text-orange-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupFrame;
