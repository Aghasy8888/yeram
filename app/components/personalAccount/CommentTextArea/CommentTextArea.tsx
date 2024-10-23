'use client';

import { useState } from 'react';
import { SaveButton } from '@/app/common';

import styles from './CommentTextAreaStyles.module.scss';

const CommentTextArea = ({
  handleSubmit,
  saveBtnDisabled,
  name,
  error,
  changeHandler,
  inputValue
}: ICommentTextAreaProps) => {

  return (
    <>
      <div className={styles.labelCtn}>
        <label htmlFor="comment" className={styles.sectionTitle}>
          Комментарии
        </label>
        <div className={styles.error}>{error}</div>
      </div>
      <textarea
        id="comment"
        placeholder="Write a comment..."
        className={styles.textarea}
        onChange={changeHandler}
        name={name}
        value={inputValue}
      ></textarea>

      <SaveButton
        saveBtnDisabled={saveBtnDisabled}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CommentTextArea;
