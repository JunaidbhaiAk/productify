import { useContext, useEffect} from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { connectWallet, getHash } from "../utils/web3";
const Login = () => {
  const { updateAuthUser} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    connectWallet().then((address) => {
      if(address){
        getHash();
        updateAuthUser(address);
        navigate('/dashboard');
      } 
    })
  },[])

  return <div>LoginPage</div>;
};

export default Login;