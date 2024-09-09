import React from "react";

const Drawer = () => {
  return (
    <div className="lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col justify-center ">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost btn-circle drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
          {/* Sidebar content here */}
          <li>
            <a>Tambah Data Pendaftaran</a>
          </li>
          <li>
            <a>Riwayat Data Pendaftaran</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
