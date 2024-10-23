import { DATA, DISPLAY } from '@/data/stepConstants';
import { SingleOnOffButton } from '..';

import styles from './OnOffButtonsStyles.module.scss';

interface IOnOffButtonsProps {
  name?: string;
  isUser?: boolean;
  onChange?: (checked: boolean, info: string) => void;
  dataChecked?: boolean;
  displayChecked?: boolean;
}

const OnOffButtons = ({
  name,
  isUser,
  dataChecked,
  displayChecked,
  onChange,
}: IOnOffButtonsProps) => {
  const className = `from${name}`;

  return (
    <div className={`${styles.onOffButtons} ${styles[className]}`}>
      <SingleOnOffButton
        checked={displayChecked}
        isUser={isUser}
        info={DISPLAY}
        onChange={onChange}
      />
      <SingleOnOffButton
        onChange={onChange}
        checked={dataChecked}
        isUser={isUser}
        info={DATA}
      />
    </div>
  );
};

export default OnOffButtons;
