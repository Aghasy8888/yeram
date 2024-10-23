import { GREEN_COLOR, WHITE_COLOR } from '@/data/stepConstants';
import useMediaWidth from '@/hooks/useMediaWidth';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import styles from './OneDotStyles.module.scss';

const OneDot = ({ color }: { color: string }) => {
  const windowWidth = useWindowWidth();
  const lessThan_1400_Screen = useMediaWidth(windowWidth <= 1400);
  const lessThan_940_Screen = useMediaWidth(windowWidth <= 940);
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);

  return (
    <div className={styles.oneDot}>
      {color === GREEN_COLOR ? (
        <svg
          className={styles.oneDot}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="12"
          viewBox="0 0 11 12"
          fill="none"
          style={{
            position: 'absolute',
            left: lessThan_1400_Screen ? '14px' : '25px',
            top: lessThan_1400_Screen
              ? lessThan_940_Screen
                ? '32px'
                : '35px'
              : '38px',
          }}
        >
          <circle cx="5.45342" cy="5.63116" r="5.45342" fill={color} />
        </svg>
      ) : (
        <svg
          className={styles.oneDot}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="12"
          viewBox="0 0 11 12"
          fill="none"
          style={{
            position: 'absolute',
            left: lessThan_1400_Screen ? '14px' : '25px',
            top: lessThan_1400_Screen
              ? lessThan_940_Screen
                ? '32px'
                : '35px'
              : '38px',
          }}
        >
          <circle cx="5.45342" cy="5.63116" r="4.95342" stroke={WHITE_COLOR} />
        </svg>
      )}
    </div>
  );
};

export default OneDot;
