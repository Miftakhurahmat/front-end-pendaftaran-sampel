import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const registerUser = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const schema = yup.object().shape({
    name: yup.string().required("Nama wajib diisi"),
    email: yup
      .string()
      .email("Email harus sesuai dengan format")
      .required("Email wajib diisi"),
    password: yup
      .string()
      .required("Kata sandi wajib diisi")
      .min(8, "Kata sandi minimal 8 karakter"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z]). {8,}$/,
    //   "Kata sandi harus ada huruf kecil, huruf besar"
    // )
    // .matches(
    //   /^(?=.*[!@#$%^&*-])/,
    //   "Kata sandi harus mengandung setidaknya satu simbol (!@#$%^&*-)"
    // ),
    confirmPassword: yup
      .string()
      .required("Konfirmasi kata sandi wajib diisi")
      .oneOf([yup.ref("password"), null], "Passwords harus sama"),
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
        name: formData.name,
        email: formData.email,
        password: formData.password,
        c_password: formData.confirmPassword,
      };
      await registerUser(userData);
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: "Selamat! Anda berhasil mendaftar.",
        confirmButtonText: "OK",
      }).then(() => {
        // Navigasi ke halaman login setelah alert
        navigate("/");
      });
      console.log(userData);
      console.log("Registration successful");
      setFormData("");
      reset();
    } catch (error) {
      // const { data } = error.response;
      // const keys = Object.keys(data);
      // console.log("Registration failed", error.response.data[keys[0]][0]);
      // setErrorMessage(error.response.data[keys[0]][0]);
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
      console.log("Registration Error:", error);
    }
  };
  return (
    <>
      <div className="p-10">
        <h1 className="mb-8 font-extrabold text-4xl">Register</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label className="block font-semibold" htmlFor="name">
                Nama
              </label>
              <input
                className="w-full shadow-inner rounded-lg text-2xl p-4 block mt-1 bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white"
                {...register("name")}
                id="name"
                type="text"
                name="name"
                required="required"
                autoFocus="autoFocus"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <p>{errors.name?.message}</p>
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="w-full shadow-inner rounded-lg text-2xl p-4 block mt-1 bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white"
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
                className="w-full shadow-inner rounded-lg text-2xl p-4 block mt-1 bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white"
                {...register("password")}
                id="password"
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
              <p>{errors.password?.message}</p>
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="w-full shadow-inner rounded-lg text-2xl p-4 block mt-1 bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white"
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
              />
              <p>{errors.confirmPassword?.message}</p>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
              >
                Register
              </button>
              <div className="mt-6 text-center font-semibold text-slate-600">
                Already registered?&nbsp;
                <span>
                  <a href={`/`} className="font-medium text-[#4285f4]">
                    Sign in
                  </a>
                </span>
              </div>
            </div>
          </form>

          <aside className="">
            <div className="bg-green-100 p-8 rounded">
              <h2 className="font-bold text-2xl">Instructions</h2>
              <ul className="list-disc mt-4 list-inside">
                <li>
                  All users must provide a valid email address and password to
                  create an account.
                </li>
                <li>
                  Users must not use offensive, vulgar, or otherwise
                  inappropriate language in their username or profile
                  information
                </li>
                <li>
                  Users must not create multiple accounts for the same person.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Register;
