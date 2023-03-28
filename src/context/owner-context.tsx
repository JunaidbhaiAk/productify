import { createContext } from "react";

type OwnerContextType = {
  check?: boolean;
  updateCheck: (curr:boolean) => void;
  showownerModal?: boolean;
  updateshowownerModal: (curr:boolean) => void;
  currOwner?: any;
  updatecurrOwner: (data:any) => void;
};


export const OwnerContext = createContext<OwnerContextType>({
    updateCheck: () => {},updateshowownerModal: () => {},updatecurrOwner: () => {}
});
