'use client';

import { useState } from 'react';
import { SaveButton } from '@/app/common';

import styles from './CommentTextAreaStyles.module.scss';

const CommentTextArea = () => {
  const [inputValue, setInputValue] = useState('');
  const handleSave = () => {
    console.log('inputValue', inputValue);
  };

  return (
    <>
      <div className={styles.labelCtn}>
        <label htmlFor="comment" className={styles.sectionTitle}>
          Комментарии
        </label>
      </div>
      <textarea
        id="comment"
        placeholder="Write a comment..."
        className={styles.textarea}
        onChange={(event) => setInputValue(event.target.value)}
      ></textarea>

        <SaveButton handleSave={handleSave}/>
    </>
  );
};

export default CommentTextArea;
