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
import ViewProducts from "./pages/ViewProducts";
import { OwnerContext } from "./context/owner-context";
import Modal from "./components/Modal/Modal";
import Ownerchange from "./components/Ownerchange/Ownerchange";
import ViewMerchants from "./pages/ViewMerchants";
export default function App() {
  const [user, setUser] = useState<User>();
  const [products,setProducts] = useState<any>([]);
  const [postProductData,setpostProductData] = useState<any>({});
  const [check,setCheck] = useState(false);
  const [showownerModal,setShowOwnerModal] = useState(false);
  const [currOwner,setcurrOwner] = useState({owner:'',ownerName:'',pid:''});
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser,products,updateProducts: setProducts,postProductData,updatepostProductData:setpostProductData }}>
      <OwnerContext.Provider value={{check,updateCheck:setCheck,showownerModal,updateshowownerModal:setShowOwnerModal,currOwner,updatecurrOwner:setcurrOwner}}>
        <div className="App">
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<AuthRoutes children={<Layout />} />}>
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<AddProduct />} path="/addproduct" />
              <Route element={<AddMerchant />} path="/addmerchant" />
              <Route element={<ViewProducts />} path='/viewproducts' />
              <Route element={<ViewMerchants />} path='/viewmerchants' />
            </Route>
            <Route element={<Verify />} path='/verify' />
          </Routes>
        </div>
        <Toaster position="top-right"/>
        {showownerModal && 
          <Modal show={showownerModal} setShow={setShowOwnerModal}>
            <Ownerchange currOwner={currOwner} setCheck={setCheck}/>
            <button onClick={() => setShowOwnerModal(false)} style={{width:'100%',marginBottom:'4px'}}>Close</button>
          </Modal>
        }
      </OwnerContext.Provider>
    </AuthContext.Provider>
  );
}
