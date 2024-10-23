import { checkLoginStatus } from "@/helpers/auth";
import { setUserAuth } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckLoginStatus = () => {
const router = useRouter();
const dispatch = useAppDispatch();

    useEffect(() => {
        const isAuthenticated = checkLoginStatus();
    
        if (isAuthenticated) {
          router.push('/');
          dispatch(setUserAuth(true));
        } else {
          router.push('/login');
          dispatch(setUserAuth(false));
        }
      }, []);
}

export default useCheckLoginStatus;