import { useAppSelector } from 'shared/hooks/useAppSelector';
import { ReportsHeader } from '../reportsHeader/ReportsHeader';
import styles from './Reports.module.css';
import {
    selectCurrentProjectId,
    selectDataReports,
} from 'pages/projects/model/selectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchReportsAsync } from 'pages/projects/model/asyncThunks/fetchReportsAsync';
import { Card } from 'shared/ui/basics';
import { CreateCardButton } from 'shared/ui/buttons/CreateCardButton/CreateCardButton';
import { CreateReportButton } from './CreateReportButton';

export const Reports = () => {
    const dispatch = useAppDispatch();

    const currentProjectId = useAppSelector(selectCurrentProjectId);
    const reports = useAppSelector(selectDataReports);

    useEffect(() => {
        if (currentProjectId) {
            dispatch(fetchReportsAsync({ projectId: currentProjectId }));
        }
    }, [currentProjectId, dispatch]);

    const onSelectReportHandler = () => {
        console.log('report selected');
    };

    return (
        <div className={styles.container}>
            <ReportsHeader />
            <div className={styles.reportsGrid}>
                <CreateReportButton />
                {reports.map((report) => (
                    <Card
                        onClick={onSelectReportHandler}
                        title={report.name}
                        subtitle={report.created_at}
                    />
                ))}
            </div>
        </div>
    );
};
