import type { FC } from "react";
import styles from "./NavigationPanel.module.css";
import { NavLink } from "react-router";
import projectIcon from "../../../../public/projects-icon.svg";
import dataModelIcon from "../../../../public/models-icon.svg";
import helpIcon from "../../../../public/help-icon.svg";
import profileIcon from "../../../../public/profile-icon.svg";
import { getUserInfo } from "shared/utils";

interface NavigationPanelProps {
    isVisible: boolean;
}

export const NavigationPanel: FC<NavigationPanelProps> = ({ isVisible }) => {
    const user = getUserInfo();

    return (
        <div
            className={`${styles.panel} ${
                isVisible ? styles.panelVisible : ""
            }`}
        >
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
                    <img src={projectIcon} alt="Projects" />
                    Проекты
                </NavLink>
                <NavLink
                    to="/models"
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                >
                    <img src={dataModelIcon} alt="Data Models" />
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
                    <img src={helpIcon} alt="Help" />
                    Справка
                </NavLink>
                <div className={styles.user}>
                    <img src={profileIcon} alt="Profile" />
                    {user?.username}
                </div>
            </div>
        </div>
    );
};
