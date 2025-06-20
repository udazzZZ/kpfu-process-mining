import React, { useState } from 'react';
import styles from './DataModels.module.css';
import { Models } from '../models/Models';
import Header from 'shared/ui/header/Header';
import { useNavigate } from 'react-router';

const DataModels: React.FC = () => {
    const isLoading = false;
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<'name' | 'date'>('date');


    return (
        <div className={styles.container}>
            <Header />
            <Models
                isLoading={isLoading}
            />
        </div>
    );
};

export default DataModels;
