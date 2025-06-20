import React from "react";
import styles from "./ProcessMap.module.css";
import { Graph } from "../../../widgets/ui/graph/Graph";

const ProcessMap: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button className={styles.tabActive}>Карта</button>
                <button className={styles.tab}>Статистика</button>
            </div>
            <div className={styles.graphArea}>
                <Graph />
            </div>
        </div>
    );
};

export default ProcessMap;
