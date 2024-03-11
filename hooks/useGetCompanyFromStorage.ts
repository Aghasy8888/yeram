import { SET_COMPANY_IN_DETAILS } from "@/store/actions/company/companyActionTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyFromStorage = (companyInDetails: ICompany | null) => {
    const dispatch = useDispatch<TDispatch>();

    useEffect(() => {
        if (typeof window !== 'undefined' && !companyInDetails) {
          const companyInDetails = JSON.parse(
            window.localStorage.getItem('companyInDetails') as string
          );
    
          if (companyInDetails) {
            dispatch({ type: SET_COMPANY_IN_DETAILS, companyInDetails });
          }
        }
      }, []);
}

export default useGetCompanyFromStorage;