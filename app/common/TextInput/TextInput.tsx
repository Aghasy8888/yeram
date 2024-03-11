import { forwardRef } from 'react';
import styles from './TextInputStyles.module.scss';

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  (
    {
      changeHandler,
      label,
      maxLength = 255,
      minLength = 0,
      placeholder = '',
      name,
      inputValue,
      error = null,
      required = false,
      type = 'text',
      onKeyDown = () => {},
    },
    ref
  ) => {
    return (
      <>
        <label htmlFor={name} className={styles[`${name}Label`]}>
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={inputValue}
          onChange={changeHandler}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          required={required}
          className={styles[`${name}Input`]}
          ref={ref}
        />
        <div className={`${styles.error} ${styles[`${name}${'Error'}`]}`}>
          {error}
        </div>
      </>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
