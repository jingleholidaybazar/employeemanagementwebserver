import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Make sure you have react-router-dom installed

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!email || !password || !selectedRole) {
      toast.error('Please fill in all fields.');
      return; // Stop further execution if validation fails
    }

    // Store details in local storage
    const userDetails = { email, password, role: selectedRole };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Show success toast
    toast.success('Login successful!');

    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard'); // Adjust this path according to your routing setup
    }, 2000);

    // Clear form
    setEmail('');
    setPassword('');
    setSelectedRole('');
  };

  // Navigate to the ChangePassword page
  const handleForgotPassword = () => {
    navigate('/changepassword');
  };

  return (
    <section className="min-h-screen flex box-border justify-center items-center">
      <div className="bg-gray-100 rounded-2xl flex max-w-5xl p-5 items-center">
        {/* Image Section */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://img.freepik.com/free-vector/programmer-working-isometric-style_52683-16803.jpg?t=st=1727072309~exp=1727075909~hmac=7922203560c80096eb8e0d94c0a2210223cb134f48d37fcc242bf8e22a9270a3&w=740"
            alt="login form"
          />
        </div>

        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl uppercase text-center text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">If you are already a member, log in now.</p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {/* Email Input */}
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input with Visibility Toggle */}
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                onClick={togglePasswordVisibility}
                className={`bi bi-eye${showPassword ? '-slash-fill' : ''} absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20`}
                viewBox="0 0 16 16"
              >
                <path
                  d={showPassword
                    ? 'M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z'
                    : 'M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z'}
                />
              </svg>
            </div>

            {/* Role Dropdown */}
            <div className="relative">
              <select
                className="p-2 rounded-xl border w-full"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="" className="text-gray-500">
                  Choose your role
                </option>
                <option value="Super Admin" className="text-black">
                  Super Admin
                </option>
                <option value="Master Email" className="text-black">
                  Master Email
                </option>
                <option value="Master Pass" className="text-black">
                  Master Pass
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-6 items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
           
          </div>

          {/* Google Login Button */}
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.932,26.688,37,24,37c-5.238,0-9.654-3.355-11.304-8.029l-6.59,5.075C9.679,39.569,16.403,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.793,2.241-2.225,4.167-4.094,5.487c0.001-0.001-0.001,0.001-0.001,0.001l6.19,5.238c-0.438,0.389,6.693-4.92,6.693-13.809C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Forgot Password Link */}
          <div className="mt-3 flex justify-between items-center text-sm">
            
            
            <div className="text-[#002D74] cursor-pointer hover:underline" onClick={handleForgotPassword}>
              Forget password?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;