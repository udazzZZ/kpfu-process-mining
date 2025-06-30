import type { FC } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import styles from "./Import.module.css";
import SidePanel from "../sidePanel/SidePanel";
import { ButtonWithArrow } from "shared/ui/buttons/BackForwardButton/ButtonWithArrow";
import { stepToIndex } from "pages/journalImport/import/lib/steps";

import { useState } from "react";
import Header from "shared/ui/header/Header";
import { fileSettingsData } from "pages/journalImport/fileSettings/FileSettings";
import { marksData } from "pages/journalImport/marks/Marks";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import {
    selectFileId,
    selectIsConfigSaving,
    selectColumnsConfig,
    selectConfigSaveError,
} from "entities/fileUpload/model/selectors";
import { saveFileConfigAsync } from "entities/fileUpload/model/asyncThunks/saveFileConfigAsync";

const Import: FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const fileId = useAppSelector(selectFileId);
    const isConfigSaving = useAppSelector(selectIsConfigSaving);
    const columnsConfig = useAppSelector(selectColumnsConfig);
    const configSaveError = useAppSelector(selectConfigSaveError);
    const [error, setError] = useState<string | null>(null);

    const pathSegments = location.pathname.split("/");
    const currentPage =
        pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : "";

    const currentStepIndex = stepToIndex[currentPage] || 0;
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === 3;
    const isFileSettingsPage = currentPage === "file-settings";
    const isMarksPage = currentPage === "marks";

    const handleBack = () => {
        if (isFirstStep) return;
        const previousStep = Object.keys(stepToIndex).find(
            (step) => stepToIndex[step] === currentStepIndex - 1
        );
        navigate(`/models/${params.model}/import/${previousStep}`);
    };

    const handleForward = async () => {
        if (isLastStep) return;
        setError(null);

        // Получаем следующий шаг
        const nextStep = Object.keys(stepToIndex).find(
            (step) => stepToIndex[step] === currentStepIndex + 1
        );

        // Если мы на странице marks (где устанавливаются роли колонок),
        // тогда сохраняем все настройки на сервере
        if (isMarksPage && fileId) {
            if (!marksData.isDataReady) {
                setError(
                    "Необходимо указать как минимум идентификатор экземпляра (case_id), имя события (activity) и временную метку (timestamp)."
                );
                return;
            }

            try {
                // Сохраняем настройки через Redux
                await dispatch(saveFileConfigAsync({ fileId })).unwrap();

                // Переходим к следующему шагу после успешного сохранения
                navigate(`/models/${params.model}/import/${nextStep}`);
            } catch (error) {
                console.error("Ошибка при сохранении настроек файла:", error);
                if (typeof error === "string") {
                    setError(error);
                } else if (
                    error &&
                    typeof error === "object" &&
                    "message" in error
                ) {
                    setError(String(error.message));
                } else {
                    setError("Произошла ошибка при сохранении настроек файла");
                }
            }
        } else {
            // Для других страниц просто переходим к следующему шагу без сохранения
            navigate(`/models/${params.model}/import/${nextStep}`);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <SidePanel />
                <div className={styles.importContainer}>
                    <Outlet />
                    {error && (
                        <div className={styles.errorMessage}>{error}</div>
                    )}
                    <div className={styles.buttonsContainer}>
                        <ButtonWithArrow
                            direction="left"
                            onClick={handleBack}
                            disabled={isFirstStep || isConfigSaving}
                        />
                        <ButtonWithArrow
                            direction="right"
                            onClick={handleForward}
                            disabled={isLastStep || isConfigSaving}
                            loading={isConfigSaving}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Import;
