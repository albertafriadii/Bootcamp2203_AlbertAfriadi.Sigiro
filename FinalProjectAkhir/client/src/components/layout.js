import NavBars from "./navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBars />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
