import type { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import styles from "./Import.module.css";
import SidePanel from "../sidePanel/SidePanel";
import { ButtonWithArrow } from "shared/ui/buttons/BackForwardButton/ButtonWithArrow";
import { stepToIndex } from "pages/journalImport/import/lib/steps";

import { useState } from "react";
import Header from "shared/ui/header/Header";
import {
    fileSettingsData,
    saveFileSettings,
} from "pages/journalImport/fileSettings/FileSettings";

const Import: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSaving, setIsSaving] = useState(false);
    const pathSegments = location.pathname.split("/");
    const currentPage =
        pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : "";

    const currentStepIndex = stepToIndex[currentPage] || 0;
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === 3;
    const isFileSettingsPage = currentPage === "file-settings";

    const handleBack = () => {
        if (isFirstStep) return;
        const previousStep = Object.keys(stepToIndex).find(
            (step) => stepToIndex[step] === currentStepIndex - 1
        );
        navigate(`/import/${previousStep}`);
    };

    const handleForward = async () => {
        if (isLastStep) return;

        // Если мы на странице настройки файла, сначала сохраняем настройки
        if (isFileSettingsPage && fileSettingsData.isDataReady) {
            setIsSaving(true);

            try {
                await saveFileSettings(
                    fileSettingsData.columnTypes,
                    fileSettingsData.fileInfoId
                );

                // Переходим к следующему шагу после успешного сохранения
                const nextStep = Object.keys(stepToIndex).find(
                    (step) => stepToIndex[step] === currentStepIndex + 1
                );
                navigate(`/import/${nextStep}`);
            } catch (error) {
                console.error("Ошибка при сохранении настроек файла:", error);
                // Здесь можно добавить отображение ошибки для пользователя
            } finally {
                setIsSaving(false);
            }
        } else {
            // Для других страниц просто переходим к следующему шагу
            const nextStep = Object.keys(stepToIndex).find(
                (step) => stepToIndex[step] === currentStepIndex + 1
            );
            navigate(`/import/${nextStep}`);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <SidePanel />
                <div className={styles.importContainer}>
                    <Outlet />
                    <div className={styles.buttonsContainer}>
                        <ButtonWithArrow
                            direction="left"
                            onClick={handleBack}
                            disabled={isFirstStep || isSaving}
                        />
                        <ButtonWithArrow
                            direction="right"
                            onClick={handleForward}
                            disabled={isLastStep || isSaving}
                            loading={isSaving}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Import;
