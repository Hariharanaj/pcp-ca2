import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
