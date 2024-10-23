'use client';

import Image from 'next/image';
import { FormEvent } from 'react';
import { searchIcon } from '@/public/assets';
import useSearchEffects from '@/hooks/useSearchEffects';
import { selectSearchText, setSearch } from '@/redux/features/other/otherSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import styles from './SearchStyles.module.scss';

const Search = () => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(selectSearchText);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); //prevent page from updating
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  };

  useSearchEffects();

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <button className={styles.searchBtn}>
        <Image
          alt="searchIcon"
          src={searchIcon}
          width={19}
          height={19}
          priority
        />
      </button>
      <input
        type="text"
        className={styles.searchInput}
        name="searchInput"
        value={searchText}
        onChange={handleChange}
        placeholder="Search..."
      />
    </form>
  );
};

export default Search;
