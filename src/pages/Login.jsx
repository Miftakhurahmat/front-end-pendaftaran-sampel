import React from "react";
import imageUrl from "../images/Login.png";
import imageBackgroundLoginUrl from "../images/background.svg";

const Login = () => {
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
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
