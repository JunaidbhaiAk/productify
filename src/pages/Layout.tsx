import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
const Layout = () => {
  return (  
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
