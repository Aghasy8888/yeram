import styles from './RadioButtonStyles.module.scss';

const RadioButton = ({
  id,
  name,
  handleDownload,
  nameForRequest,
}: IRadioButtonProps) => {
  return (
    <div className={styles.radioBtn}>
      <input
        type="radio"
        id={id}
        name={name}
        value={id}
        translate="no"
      />
      <label
        translate="no"
        htmlFor={id}
        onClick={(event) => handleDownload(event, nameForRequest)}
      >
        {id}
      </label>
    </div>
  );
};

export default RadioButton;
