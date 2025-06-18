import React from 'react';
import styles from './ModelCard.module.css';
import { Model } from '../model/types';

interface ModelCardProps {
  model: Model;
  onClick: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const formattedDate = new Date(model.updatedAt)
    .toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.name}>{model.name}</div>
    </div>
  );
};
