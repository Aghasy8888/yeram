import { getEditBodyFromFormValues } from '@/helpers/helpers_4';
import { letOnlyValidPhoneNumber } from '@/helpers/helpers_5';
import { useEffect } from 'react';

const useSetDefaultFormValues = (
  companyInDetails: ICompany | null,
  setFormValues: TSetFormValues
) => {
  useEffect(() => {
    if (companyInDetails) {
      const defaultFormValues = {
        name: companyInDetails.name || '',
        comment: companyInDetails.comment || '',
        phone: letOnlyValidPhoneNumber((companyInDetails.phone as string)) || '',
        PSRN: String(companyInDetails.PSRN) || '',
        RBOC: String(companyInDetails.RBOC) || '',
        TIN: String(companyInDetails.TIN) || '',
        TRRC: String(companyInDetails.TRRC) || '',
      };

      const editCompanyBody = getEditBodyFromFormValues(
        defaultFormValues,
        companyInDetails
      );

      setFormValues(defaultFormValues);

      localStorage.setItem(
        'editCompanyRequestBody',
        JSON.stringify(editCompanyBody)
      );
    }
  }, [JSON.stringify(companyInDetails)]);
};

export default useSetDefaultFormValues;
