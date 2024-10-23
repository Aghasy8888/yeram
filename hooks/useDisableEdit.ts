import { getEditBodyFromFormValues } from '@/helpers/helpers_4';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';
import { setEditCompanyBtnDisabled } from '@/redux/features/other/otherSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

const useDisableEdit = (
  formValues: IEditFormValues,
  editCompanyBodyFromStorage: IEditCompanyBody | undefined
) => {
  const dispatch = useAppDispatch();
  const companyInDetails: ICompany = useAppSelector(
    selectCompanyInDetails
  ) as ICompany;

  useEffect(() => {
    const editCompanyBody = getEditBodyFromFormValues(
      formValues,
      companyInDetails
    );

    if (editCompanyBodyFromStorage) {
      dispatch(setEditCompanyBtnDisabled(false));
    }

    if (
      JSON.stringify(editCompanyBody) ===
      JSON.stringify(editCompanyBodyFromStorage)
    ) {
      dispatch(setEditCompanyBtnDisabled(true))
    }
  }, [JSON.stringify(formValues), JSON.stringify(companyInDetails)]);
};

export default useDisableEdit;
