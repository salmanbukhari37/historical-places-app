import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-[#8B5E34] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand name */}
        <div
          className=" sm:block text-white text-2xl font-bold cursor-pointer"
          onClick={navigateToHome}
        >
          <img
            alt="history app logo"
            className="rounded-full"
            src={"../../images/history_logo_2.jpg"}
            style={{ maxWidth: "100%", maxHeight: "70px" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
