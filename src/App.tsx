import "./styles.css";
import { Toaster } from 'react-hot-toast';
import { AuthContext } from "./context/auth-context";
import { useState } from "react";
import { User } from "./utils/type";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import AuthRoutes from "./components/AuthRoutes";
import AddProduct from "./pages/AddProduct";
import Verify from "./pages/Verify";
import AddMerchant from "./pages/AddMerchant";
export default function App() {
  const [user, setUser] = useState<User>();
  const [products,setProducts] = useState<any>([]);
  const [postProductData,setpostProductData] = useState<any>({});
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser,products,updateProducts: setProducts,postProductData,updatepostProductData:setpostProductData }}>
      <div className="App">
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<AuthRoutes children={<Layout />} />}>
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<AddProduct />} path="/addproduct" />
            <Route element={<AddMerchant />} path="/addmerchant" />
          </Route>
          <Route element={<Verify />} path='/verify' />
        </Routes>
      </div>
      <Toaster position="top-right"/>
    </AuthContext.Provider>
  );
}
