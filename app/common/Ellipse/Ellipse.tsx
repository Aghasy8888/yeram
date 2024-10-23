import Image from 'next/image';
import { activeEllipse, notActiveEllipse } from '@/public/assets';

import styles from './EllipseStyles.module.scss';

const Ellipse = ({ object }: { object: ITransportFromBack | IUserInfo }) => {
  const ellipseComponent =
    // object.isactive
    true ? (
      <Image
        alt="activeEllipse"
        src={activeEllipse}
        width={11}
        height={11}
        priority
        className={styles.ellipse}
      />
    ) : (
      <Image
        alt="notActiveEllipse"
        src={notActiveEllipse}
        width={11}
        height={11}
        priority
        className={styles.ellipse}
      />
    );

  return ellipseComponent;
};

export default Ellipse;
