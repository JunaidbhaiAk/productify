import { useContext, useEffect,useState} from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../utils/web3";
const Login = () => {
  const { updateAuthUser} = useContext(AuthContext);
  const [message,setMessage] = useState('Login')
  const navigate = useNavigate();
  useEffect(()=>{
    connectWallet().then((address) => {
      if(address){
        const check = true;
        if(check){
          updateAuthUser(address);
          navigate('/dashboard');
        }
        else setMessage('You are not the Admin')
      } 
    })
  },[])

  return <div>{message}</div>;
};

export default Login;