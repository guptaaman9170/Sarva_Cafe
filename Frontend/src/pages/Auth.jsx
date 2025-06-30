import React, { useEffect, useState } from "react";
import restaurant from "../assets/images/restaurant-img.png"
import logo from "../assets/images/logo.png"
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {

  useEffect(() => {
    document.title = "POS | Auth"
  }, [])

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${restaurant})` }}>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>

  {/* Centered Card */}
  <div className="relative z-10 max-w-[600px] bg-[#1a1a1a] rounded-2xl p-10 w-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-transform duration-300 hover:scale-[1.03] hover:rotate-[0.3deg] animate-fadeIn">
    <div className="flex flex-col items-center gap-4">
      <img src={logo} className="h-24 w-32"/>
    </div>

    <h2 className="text-4xl text-center mt-5 font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-10">
      {isRegister ? "Employee Registration" : "Employee Login"}
    </h2>

    {/* Form Component */}
    {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}

    <div className="flex justify-center mt-6">
      <p className="text-sm text-[#ababab]">
        {isRegister ? "Already have an account? " : "Don't have an account?"}
        <a
          onClick={() => setIsRegister(!isRegister)}
          className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-semibold ml-1 cursor-pointer"
        >
          {isRegister ? "Sign in" : "Sign up"}
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Auth;
