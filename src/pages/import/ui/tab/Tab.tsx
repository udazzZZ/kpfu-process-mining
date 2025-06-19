import type { FC } from "react";
import styles from "./Tab.module.css";
import { useLocation } from "react-router";
import clsx from "clsx";
import daw from "../../../../../public/daw.svg";
import { stepToIndex } from "pages/import/lib/steps";

type TabProps = {
    title: string;
    subtitle?: string;
    step: string;
    done?: boolean;
    stepIndex: number;
};

const Tab: FC<TabProps> = ({ title, subtitle, step, stepIndex }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/");
    const currentPage =
        pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : "";

    const isActive = currentPage === step;

    const currentStepIndex = stepToIndex[currentPage] || 0;
    const isDone = currentStepIndex > stepIndex;

    return (
        <div
            className={clsx(
                styles.container,
                isActive && styles.containerActive,
                isDone && styles.containerDone
            )}
        >
            <div className={styles.containerColumn}>
                <p className={styles.title}>{title}</p>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {isDone && <img src={daw} alt="done" className={styles.daw} />}
        </div>
    );
};

export default Tab;
