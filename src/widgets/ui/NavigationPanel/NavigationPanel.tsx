import type { FC } from "react";
import styles from "./NavigationPanel.module.scss";
import { NavLink } from "react-router";
import projectIcon from "../../../../public/projects-icon.svg";
import dataModelIcon from "../../../../public/data-model-icon.svg";
import helpIcon from "../../../../public/help-icon.svg";
import profileIcon from "../../../../public/profile-icon.svg";

export const NavigationPanel: FC = () => {
    return (
        <div className={styles.panel}>
            <div className={styles.logo}>
                <span className={styles.blue}>ITIS</span> Process Mining
            </div>

            <nav className={styles.nav}>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                >
                    <img src={projectIcon}></img>
                    Проекты
                </NavLink>
                <NavLink
                    to="/models"
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                >
                    <img src={dataModelIcon}></img>
                    Модели данных
                </NavLink>
            </nav>

            <div className={styles.footer}>
                <NavLink
                    to="/help"
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                >
                    <img src={helpIcon}></img>
                    Справка
                </NavLink>
                <div className={styles.user}>
                    <img src={profileIcon}></img>
                    Иванов Иван
                </div>
            </div>
        </div>
    );
};
