import React, { ChangeEvent } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  searchValue: string;
  sortKey: 'name' | 'date';
  onSearch: (value: string) => void;
  onSortChange: (key: 'name' | 'date') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchValue,
  sortKey,
  onSearch,
  onSortChange,
}) => {
  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  const onSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as 'name' | 'date');
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Модели данных</h1>
      <div className={styles.controls}>
        <input
          type="text"
          className={styles.search}
          placeholder="Поиск"
          value={searchValue}
          onChange={onSearchInput}
        />
        <select
          className={styles.sort}
          value={sortKey}
          onChange={onSortSelect}
        >
          <option value="date">Сортировка</option>
          <option value="name">По названию</option>
          <option value="date">По дате</option>
        </select>
      </div>
    </div>
  );
};
