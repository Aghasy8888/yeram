import { DATA, DISPLAY } from '@/data/stepConstants';
import { SingleOnOffButton } from '..';

import styles from './OnOffButtonsStyles.module.scss';

const OnOffButtons = ({ name, isUser }: { name?: string, isUser?: boolean }) => {
  const className = `from${name}`;

  return (
    <div className={`${styles.onOffButtons} ${styles[className]}`}>
      <SingleOnOffButton isUser={isUser} info={DISPLAY} />
      <SingleOnOffButton isUser={isUser} info={DATA} />
    </div>
  );
};

export default OnOffButtons;
