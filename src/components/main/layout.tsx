import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />
      <main className="m-5 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
