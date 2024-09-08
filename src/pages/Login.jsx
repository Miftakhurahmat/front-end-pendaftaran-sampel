import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../store/authStore";
import imageUrl from "../images/Login.png";
import imageBackgroundLoginUrl from "../images/background.svg";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email harus sesuai dengan format")
      .required("Email wajib diisi"),
    password: yup.string().required("Kata sandi wajib diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async () => {
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
      };
      await loginUser(userData);
      navigate("/Home");
      // console.log(userData);
      // console.log("Login successful");
      reset();
    } catch (error) {
      // const { data } = error.response;
      // const keys = Object.keys(data);
      // console.log("Registration failed", error.response.data[keys[0]][0]);
      // setErrorMessage(error.response.data[keys[0]][0]);
      console.log("Login Error:", error);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src={imageUrl} alt="" className="w-mx-auto" />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Sign In Untuk mengakses Aplikasi
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="mt-4">
                      <label className="block font-semibold" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                        {...register("email")}
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                      />
                      <p>{errors.email?.message}</p>
                    </div>
                    <div className="mt-4">
                      <label className="block font-semibold" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                        {...register("password")}
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChange}
                      />
                      <p>{errors.password?.message}</p>
                    </div>
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-">Sign In</span>
                    </button>
                  </form>
                  <div className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account? &nbsp;
                    <a
                      href={`/register`}
                      className="font-medium text-[#4285f4]"
                    >
                      Sign up
                    </a>
                  </div>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Miftakhurahmat
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      &nbsp;Terms of Service&nbsp;
                    </a>
                    and its &nbsp;
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div
              style={{
                backgroundImage: `url(${imageBackgroundLoginUrl})`,
                backgroundSize: "cover",
              }}
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            ></div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
