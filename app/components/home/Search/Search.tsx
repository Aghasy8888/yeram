import Image from 'next/image';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { searchIcon } from '@/public/assets';
import { SET_SEARCH } from '@/store/actions/other/otherActionTypes';
import { useAppSelector } from '@/store/store';

import styles from './SearchStyles.module.scss';

const Search = () => {
  const dispatch = useDispatch<TDispatch>();
  const searchText = useAppSelector((state) => state.otherReducer.searchText);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); //prevent page from updating
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_SEARCH, searchText: e.target.value });
  };

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
