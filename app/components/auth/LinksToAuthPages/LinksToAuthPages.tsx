import Link from 'next/link';
import * as constants from '../../../(auth)/constants';
import { HaveAccountLink } from '../common';
import styles from './LinksToAuthPagesStyles.module.scss';
import useGetPage from '@/hooks/useGetPage';
import usePageBooleans from '@/hooks/usePageBooleans';

const LinksToAuthPages = ({onEmptyState}: {onEmptyState: () => void;}) => {
  const {
    resetOrRegisterBoolean,
    loginOrRegisterBoolean,
    loginOrResetBoolean,
  } = usePageBooleans();
    
  const page = useGetPage();

  return (
    <div
        className={`${styles.linksToAuthPages} ${
          page === constants.register && styles.inRegister
        }`}
      >
        {resetOrRegisterBoolean && (
          <div onClick={onEmptyState}>
            <HaveAccountLink />
          </div>
        )}

        {/* {loginOrRegisterBoolean && (
          <Link
            href={''}
            onClick={onEmptyState}
            className={styles.forgotPassword}
          >
            Забыли пароль?
          </Link>
        )}

        {loginOrResetBoolean && (
          <Link
            href={''}
            onClick={onEmptyState}
            className={styles.register}
          >
            Регистрация
          </Link>
        )} */}
      </div>
  )
}

export default LinksToAuthPages;