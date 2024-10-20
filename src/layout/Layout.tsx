import React from "react";
import Navbar from "../components/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <main>{children}</main>
      </main>
    </div>
  );
};

export default Layout;
