import Image from 'next/image';
import { logo } from '@/public/assets';
import styles from './AuthWrapperStyles.module.scss';

const AuthWrapper = ({ children }: {children: React.ReactNode}) => {
  return (
    <section className={styles.authWrapper}>
      <div className={styles.container}>
        <div className={styles.logoCtn}>
          <Image
            src={logo}
            alt={'logo'}
            width={238}
            height={54}
            priority={true}
          />
        </div>

        {children}
      </div>
    </section>
  );
};

export default AuthWrapper;
