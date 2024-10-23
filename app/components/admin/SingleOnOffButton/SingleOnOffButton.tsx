import useGetPage from '@/hooks/useGetPage';
import { DATA } from '@/data/stepConstants';

import styles from './SingleOnOffButtonsStyles.module.scss';

interface ISingleOnOffButtonProps {
  info: string;
  isUser?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean, info: string) => void;
}

const SingleOnOffButton = ({
  info,
  isUser,
  checked,
  onChange,
}: ISingleOnOffButtonProps) => {
  const page = useGetPage();
  const disableDataInAdmin = info === DATA && page === 'adminOfConnected';
  const onChangeLocal = () => {
    if (onChange && checked !== undefined) {
      onChange(checked, info);
    }
  };

  return (
    <label className={styles.switch}>
      <p className={styles.displayOrData}>{info}</p>
      <input
        type="checkbox"
        disabled={isUser || disableDataInAdmin}
        checked={checked}
        onChange={onChangeLocal}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default SingleOnOffButton;
