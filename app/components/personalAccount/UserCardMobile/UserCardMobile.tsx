import { DropDown, Ellipse } from '@/app/common';
import roleOptions from '@/data/roleOptions';

import styles from './UserCardMobileStyles.module.scss';

const UserCardMobile = ({
  user,
  defaultUserRoleOption,
  onSetUserRole,
  roleDropdownDisabled,
}: IUserCardMobileProps) => {
  return (
    <article className={styles.userCard}>
      <header className={styles.cardHeader}>
        <div className={styles.fullName}>
          <div className={styles.ellipse}>
            <Ellipse object={user} />
          </div>
          <span>{user.last_name} </span>
          <span>{user.first_name} </span>
          <span>{user.middle_name}</span>
        </div>

        <div className={styles.email}>{user.email}</div>
      </header>
      <div className={styles.selectRoleCtn}>
        <DropDown
          name="roleInUserCard"
          options={roleOptions}
          initiallySelectedOption={defaultUserRoleOption}
          makeTheChange={onSetUserRole}
          disabled={roleDropdownDisabled}
        />
      </div>
      <button className={styles.onOffBtn}>Отключить</button>
    </article>
  );
};

export default UserCardMobile;
