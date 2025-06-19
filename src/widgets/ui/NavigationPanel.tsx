import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationPanel.module.scss';
import { ReactComponent as ProjectIcon } from './icons/project.svg';
import { ReactComponent as DataModelIcon } from './icons/dataModel.svg';
import { ReactComponent as HelpIcon } from './icons/help.svg';
import { ReactComponent as UserIcon } from './icons/user.svg';

export const NavigationPanel: FC = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.logo}>
        <span className={styles.blue}>ITIS</span> Process Mining
      </div>

      <nav className={styles.nav}>
        <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ''}>
          <ProjectIcon /> Проекты
        </NavLink>
        <NavLink to="/models" className={({ isActive }) => isActive ? styles.active : ''}>
          <DataModelIcon /> Модели данных
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <NavLink to="/help" className={({ isActive }) => isActive ? styles.active : ''}>
          <HelpIcon /> Справка
        </NavLink>
        <div className={styles.user}>
          <UserIcon /> Иванов Иван
        </div>
      </div>
    </div>
  );
};
