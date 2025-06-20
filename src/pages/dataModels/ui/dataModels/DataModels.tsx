import React, { useState } from 'react';
import styles from './DataModels.module.css';
import { Models } from '../models/Models';
import Header from 'shared/ui/header/Header';
import { useNavigate } from 'react-router';

const models = [
    {
        name: 'Модель 1',
        id: '1',
    },
    {
        name: 'Модель 2',
        id: '2',
    },
    {
        name: 'Модель 3',
        id: '3',
    },
];

const DataModels: React.FC = () => {
    const isLoading = false;
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<'name' | 'date'>('date');

    const handleCardClick = (id: string) => {
        // TODO: навигация на страницу модели
    };
    const handleCreateClick = () => {
        navigate('/import/journal');
    };

    return (
        <div className={styles.container}>
            <Header />
            <Models
                models={models}
                isLoading={isLoading}
                onCardClick={handleCardClick}
                onCreateClick={handleCreateClick}
            />
        </div>
    );
};

export default DataModels;
