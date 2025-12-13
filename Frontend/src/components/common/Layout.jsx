import Navbar from "./Navbar";

const Layout = ({ children, showNavbar = true }) => {
  return (
    <>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-16" : ""}>{children}</main>
    </>
  );
};

export default Layout;
