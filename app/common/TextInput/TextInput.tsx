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
      classNameForLabel = '',
      classNameForInput = '',
      onKeyDown = () => {},
    },
    ref
  ) => {
    return (
      <>
        <label
          htmlFor={name}
          className={`${styles[`${name}Label`]} ${
            classNameForLabel ? styles[classNameForLabel] : ''
          }`}
        >
          {label}
        </label>
        <div className={styles.errorAndInputCtn}>
          <input
            type={type}
            id={name}
            name={name}
            value={inputValue && inputValue !== 'undefined' ? inputValue : ''}
            onChange={changeHandler}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            required={required}
            className={`${styles[`${name}Input`]} ${
              classNameForInput ? styles[classNameForInput] : ''
            }`}
            ref={ref}
          />
          <div
            className={`${styles.error} ${
              styles[`${classNameForLabel}Error`]
            } ${styles[`${name}${'Error'}`]}`}
          >
            {error}
          </div>
        </div>
      </>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
