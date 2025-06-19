import type { FC } from "react";
import menuButtonImg from "../../../../../public/menu-button.svg";
import styles from "./Header.module.css";

const Header: FC = () => {
    return (
        <header className={styles.container}>
            <div className={styles.buttonContainer}>
                <img className={styles.buttonImage} src={menuButtonImg} />
            </div>
        </header>
    );
};

export default Header;
