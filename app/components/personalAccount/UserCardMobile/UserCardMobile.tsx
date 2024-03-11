import { DropDown, Ellipse } from '@/app/common';
import roleOptions from '@/data/roleOptions';

import styles from './UserCardMobileStyles.module.scss';

const UserCardMobile = ({ user }: { user: IUserInPersonalAccount }) => {
  return (
    <article className={styles.userCard}>
      <header className={styles.cardHeader}>
        <div className={styles.fullName}>
          <div className={styles.ellipse}>
            <Ellipse object={user} />
          </div>
          {user.fullName}
        </div>

        <div className={styles.email}>{user.email}</div>
      </header>
      <div className={styles.selectRoleCtn}>
        <DropDown name="roleInUserCard" options={roleOptions} />
      </div>
      <button className={styles.onOffBtn}>Отключить</button>
    </article>
  );
};

export default UserCardMobile;
