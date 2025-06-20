import type { FC } from "react";
import styles from "./SidePanel.module.css";
import Tab from "../tab/Tab";

const SidePanel: FC = () => {
    return (
        <div className={styles.container}>
            <Tab
                title="Шаг 1"
                subtitle="Загрузка журнала событий"
                step="journal"
                stepIndex={0}
            />
            <Tab
                title="Шаг 2"
                subtitle="Настройка файла"
                step="file-settings"
                stepIndex={1}
            />
            <Tab
                title="Шаг 3"
                subtitle="Расстановка меток"
                step="marks"
                stepIndex={2}
            />
            <Tab
                title="Шаг 4"
                subtitle="Завершение"
                step="final"
                stepIndex={3}
            />
        </div>
    );
};

export default SidePanel;
