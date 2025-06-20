import type { FC } from "react";
import Header from "shared/ui/header/Header";
import styles from "./Model.module.css";
import { ModelInfo } from "../modelInfo/ModelInfo";
import helpIcon from "public/help-icon.svg";
import { FastStartButton } from "../fastStartButton/fastStartButton";

const Model: FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.sidePanel}>
                    <ModelInfo />
                    <div className={styles.infoContainer}>
                        <div className={styles.infoParagraph}>
                            <p className={styles.infoText}>Быстрый старт</p>
                            <img src={helpIcon}></img>
                        </div>
                        <div className={styles.infoParagraph}>
                            <p className={styles.infoText}>
                                Самостоятельная работа с данными
                            </p>
                            <img src={helpIcon}></img>
                        </div>
                        <div className={styles.infoParagraph}>
                            <p className={styles.infoText}>Календарь процеса</p>
                            <img src={helpIcon}></img>
                        </div>
                        <div className={styles.infoParagraph}>
                            <p className={styles.infoText}>Типы данных</p>
                            <img src={helpIcon}></img>
                        </div>
                        <div className={styles.infoParagraph}>
                            <p className={styles.infoText}>Переменные</p>
                            <img src={helpIcon}></img>
                        </div>
                        <div className={styles.infoParagraph}>
                            <p className={styles.infoText}>Журнал</p>
                            <img src={helpIcon}></img>
                        </div>
                    </div>
                </div>
                <div className={styles.contentMain}>
                    <FastStartButton />
                </div>
            </div>
        </div>
    );
};

export default Model;
