import React, { useState } from "react";
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Register = ({setIsRegister}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
      
      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    },
    onError: (error) => {
      const { response } = error;
      const message = response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  return (
    <div>
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="flex flex-col  gap-4">
        {/* Employee Name */}
        <div>
          <label className="block text-white mb-2 text-sm font-medium">Employee Name</label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-white mb-2 text-sm font-medium">Employee Email</label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white mb-2 text-sm font-medium">Employee Phone</label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter employee phone"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4">
        {/* Password */}
        <div>
          <label className="block text-white mb-2 text-sm font-medium">Password</label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-white mb-2 text-sm font-medium">Choose your role</label>
          <div className="flex items-center gap-3 mt-1">
            {["Waiter", "Cashier", "Admin"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`bg-[#1f1f1f] px-4 py-2 w-full rounded-lg text-white ${
                  formData.role === role ? "bg-gradient-to-r from-orange-600 to-pink-600" : ""
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>

    <div>
      {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg mt-4 py-3 text-lg bg-gradient-to-r from-orange-600 to-pink-600 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-1"
        >
          Sign up
        </button>
    </div>

  </form>
</div>
  );
};

export default Register;
