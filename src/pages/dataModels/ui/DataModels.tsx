import React, { useEffect, useState, useMemo } from 'react';
import styles from './DataModels.module.css';
import { Header } from './Header';
import { Models } from './Models';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { fetchModels } from '../model/asyncThunks/fetchModelsAsync';
import { selectModels, selectIsLoading } from '../model/selectors';

export const DataModels: React.FC = () => {
  const dispatch = useAppDispatch();
  const models = useAppSelector(selectModels);
  const isLoading = useAppSelector(selectIsLoading);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'date'>('date');

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  const filteredAndSorted = useMemo(() => {
    const filtered = models.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sortKey === 'name') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...filtered].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [models, search, sortKey]);

  const handleCardClick = (id: string) => {
    // TODO: навигация на страницу модели
  };
  const handleCreateClick = () => {
    // TODO: открыть модалку или перейти на /dataModels/create
  };

  return (
    <div className={styles.container}>
      <Header
        searchValue={search}
        sortKey={sortKey}
        onSearch={setSearch}
        onSortChange={setSortKey}
      />
      <Models
        models={filteredAndSorted}
        isLoading={isLoading}
        onCardClick={handleCardClick}
        onCreateClick={handleCreateClick}
      />
    </div>
  );
};
