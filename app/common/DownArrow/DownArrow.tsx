import useMediaWidth from '@/hooks/useMediaWidth';
import { useWindowWidth } from '@/hooks/useWindowWidth';

import styles from './DownArrowStyles.module.scss';

const DownArrow = () => {
  const windowWidth = useWindowWidth();
  const lessThan_940_Screen = useMediaWidth(windowWidth <= 940);

  return (
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
      >
        <path
          d="M11.2917 1.65036L6.40836 6.53369L1.52502 1.65036"
          stroke="white"
          strokeWidth="1.34791"
          strokeLinecap="round"
        />
      </svg>
  );
};

export default DownArrow;
