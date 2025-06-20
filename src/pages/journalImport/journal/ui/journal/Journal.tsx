import type { FC } from "react";
import styles from "./Journal.module.css";
import JournalUpload from "../journalUpload/JournalUpload";

const Journal: FC = () => {
    return (
        <div className={styles.container}>
            <JournalUpload />
            <div className={styles.memo}>
                <p>Памятка с примером журнала событий</p>
            </div>
        </div>
    );
};

export default Journal;
