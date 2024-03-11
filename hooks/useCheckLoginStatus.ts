import { checkLoginStatus } from "@/helpers/auth";
import { USER_AUTHENTICATED, USER_NOT_AUTHENTICATED } from "@/store/actions/user/userActionTypes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useCheckLoginStatus = () => {
const router = useRouter();
const dispatch = useDispatch();

    useEffect(() => {
        const isAuthenticated = checkLoginStatus();
    
        if (isAuthenticated) {
          router.push('/');
          dispatch({ type: USER_AUTHENTICATED });
        } else {
          router.push('/login');
          dispatch({ type: USER_NOT_AUTHENTICATED });
        }
      }, []);
}

export default useCheckLoginStatus;