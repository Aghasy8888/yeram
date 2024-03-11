import { checkLoginStatus } from "@/helpers/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const useRenderLoginConditionally = (setLoading: setBoolean) => {
   const router = useRouter();
    
    useEffect(() => {
        const isAuthenticated = checkLoginStatus();
        if (isAuthenticated) {
          router.push('/'); 
        } else {
          setLoading(false);
        }
      }, []);
    
}

export default useRenderLoginConditionally;