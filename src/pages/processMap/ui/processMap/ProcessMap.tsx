import { type FC } from 'react';
import styles from './ProcessMap.module.css';
import { Graph } from './graph/Graph';
import { ProcessMapHeader } from 'pages/processMap/ProcessMapHeader';
import { FilterPanel } from '../filterPanel/FilterPanel';
import { ReactFlowProvider } from '@xyflow/react';

const ProcessMap: FC = () => {
    return (
        <ReactFlowProvider>
            <div className={styles.container}>
                <ProcessMapHeader />

                <div className={styles.contentContainer}>
                    <div className={styles.graphArea}>
                        <Graph />
                    </div>

                    <FilterPanel />
                </div>
            </div>
        </ReactFlowProvider>
    );
};

export default ProcessMap;
