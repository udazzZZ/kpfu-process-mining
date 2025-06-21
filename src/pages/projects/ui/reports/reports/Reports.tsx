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
import { CreateReportButton } from '../CreateReportButton';
import { dataModelsModel } from 'entities/dataModels';
import { useNavigate } from 'react-router';
import { ROUTES } from 'shared/constants';

export const Reports = () => {
    const dispatch = useAppDispatch();

    const currentProjectId = useAppSelector(selectCurrentProjectId);
    const reports = useAppSelector(selectDataReports);

    const navigate = useNavigate();

    const onSelectReportHandler = () => {
        navigate(ROUTES.PROCESSMAP_PATH);
    };

    useEffect(() => {
        if (currentProjectId) {
            dispatch(fetchReportsAsync({ projectId: currentProjectId }));
        }
    }, [currentProjectId, dispatch]);

    useEffect(() => {
        dispatch(dataModelsModel.thunks.getModelsAsync());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <ReportsHeader />
            <div className={styles.reportsGrid}>
                <CreateReportButton />
                {reports.map((report) => (
                    <Card
                        description={report.description}
                        key={report.id}
                        onClick={onSelectReportHandler}
                        title={report.name}
                        subtitle={report.created_at}
                    />
                ))}
            </div>
        </div>
    );
};
