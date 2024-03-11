'use client';

import { useState } from 'react';
import useCheckLoginStatus from '@/hooks/useCheckLoginStatus';
import useRenderLoginConditionally from '@/hooks/useRenderLoginConditionally';
import { AuthWrapper } from '../components/auth';
import useGetPage from '@/hooks/useGetPage';
import { Form } from '../components/auth';
import { useAppSelector } from '@/store/store';
import Loading from '../loading';
import { setAuthInstructions } from '@/helpers';
import { PHONE_NUMBER } from '@/data/stepConstants';

import styles from './layout.module.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const showAuthSpinner = useAppSelector(state => state.authReducer.loading);
  const page = useGetPage();
  let authInstructions = setAuthInstructions(page);
  useCheckLoginStatus();
  useRenderLoginConditionally(setLoading);

  if (loading) {
    return null;
  }

  return (
    <>
    <main className={styles.main}>
      {children}
      <AuthWrapper>
        <p className={styles.authInstructions}>
         {authInstructions}
        </p>
        <Form />
      </AuthWrapper>
      
      <p className={styles.techSupport}>Тех. поддержка:</p>
      <p className={styles.supportPhoneNum}>{PHONE_NUMBER}</p>
    </main>

    {showAuthSpinner && <Loading />}
    </>
    
  );
}
