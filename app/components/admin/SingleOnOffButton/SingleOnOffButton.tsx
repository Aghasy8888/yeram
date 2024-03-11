import styles from './SingleOnOffButtonsStyles.module.scss';

const SingleOnOffButton = ({info, isUser} : {info: string, isUser?: boolean}) => {
  return (
    <label className={styles.switch}>
        <p className={styles.displayOrData}>{info}</p>
        <input
          type="checkbox"
          disabled={isUser}
          // checked={displayChecked}
          // onChange={() => setDisplayChecked(!displayChecked)}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
  )
}

export default SingleOnOffButton