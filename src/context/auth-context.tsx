import { createContext } from "react";
import { User } from "../utils/type";

type AuthContextType = {
  user?: User;
  updateAuthUser: (data: User) => void;
  products?: any;
  updateProducts: (data:any) => void;
  postProductData?: any;
  updatepostProductData: (data:any) => void;
};


export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},updateProducts: () => {},updatepostProductData: () => {}
});
