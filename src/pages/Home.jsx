import React from "react";
import NavBar from "../components/NavBar";
import Drawer from "../components/Drawer";
import FormAddData from "../components/FormAddData";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <Drawer className="flex-none" />
        <FormAddData className="flex-auto" />
      </div>
    </div>
  );
};

export default Home;
