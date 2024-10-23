import Loading from '@/app/loading';
import { ReactNode } from 'react';

const WithLoading = ({
  children,
  showSpinner = false,
}: {
  children: ReactNode;
  showSpinner?: boolean;
}) => {
  return (
    <>
      {children}
      {showSpinner && <Loading />}
    </>
  );
};

export default WithLoading;
