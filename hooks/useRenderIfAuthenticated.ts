import { checkLoginStatus } from "@/helpers/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRenderIfAuthenticated = (setLoading: setBoolean) => {
   const navigate = useRouter();
    
    useEffect(() => {
        const isAuthenticated = checkLoginStatus();
        if (!isAuthenticated) {
          navigate.push('/login'); 
        } else {
          setLoading(false);
        }
      }, []);
    
}

export default useRenderIfAuthenticated;