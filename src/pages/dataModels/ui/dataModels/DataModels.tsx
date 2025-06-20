import React from 'react';
import styles from './DataModels.module.css';
import { Models } from '../models/Models';
import Header from 'shared/ui/header/Header';

const DataModels: React.FC = () => {
    const isLoading = false;

    return (
        <div className={styles.container}>
            <Header />
            <Models isLoading={isLoading} />
        </div>
    );
};

export default DataModels;
