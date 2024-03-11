import styles from './loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
