import Image from 'next/image';
import Link from 'next/link';
import { lessThanSign } from '@/public/assets';
import styles from './HaveAccountLinkStyles.module.scss';



const HaveAccountLink = () => {
  return (
    <div className={styles.haveAccount}>
          <Image
            src={lessThanSign}
            alt={'lessThanSign'}
            width={11}
            height={7.423}
            priority={true}
          />
          <Link href={'login'} className={styles.haveAccountText}>Уже есть аккаунт</Link>
        </div>
  )
}

export default HaveAccountLink;