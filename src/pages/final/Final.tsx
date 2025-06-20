import { useState, useEffect } from "react";
import type { FC } from "react";
import styles from "./Final.module.css";
import { fileSettingsData } from "pages/fileSettings/FileSettings";
import { marksData } from "pages/marks/Marks";
import { useNavigate } from "react-router";

// Типы для отслеживания прогресса
interface ProcessingProgress {
    queueStatus: "waiting" | "processing" | "completed";
    dataProcessingPercent: number;
    statisticsCalculationPercent: number;
    isComplete: boolean;
}

// Начальное состояние прогресса
const initialProgress: ProcessingProgress = {
    queueStatus: "waiting",
    dataProcessingPercent: 0,
    statisticsCalculationPercent: 0,
    isComplete: false,
};

// SVG иконки для статусов
const CheckIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.642 6.34395C15.1647 5.88535 14.391 5.88535 13.9137 6.34395L8.89591 11.1651L7.08645 9.42653L6.99394 9.34568C6.51389 8.96943 5.80564 8.99657 5.35814 9.42653C4.91065 9.85648 4.8824 10.537 5.274 10.9982L5.35814 11.0871L8.03176 13.6559L8.12426 13.7367C8.60432 14.113 9.31257 14.0858 9.76006 13.6559L15.642 8.0045C16.1193 7.5459 16.1193 6.80255 15.642 6.34395Z"
            fill="#007AFF"
        />
        <path
            d="M13.9137 6.34395C14.391 5.88535 15.1647 5.88535 15.642 6.34395C16.1193 6.80255 16.1193 7.5459 15.642 8.0045L9.76006 13.6559C9.31257 14.0858 8.60432 14.113 8.12426 13.7367L8.03176 13.6559L5.35814 11.0871L5.274 10.9982C4.8824 10.537 4.91065 9.85648 5.35814 9.42653C5.80564 8.99657 6.51389 8.96943 6.99394 9.34568L7.08645 9.42653L8.89591 11.1651L13.9137 6.34395Z"
            fill="white"
        />
    </svg>
);

const ClockIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#clip0_12_732)">
            <path
                d="M18.1818 10C18.1818 5.48131 14.5187 1.81818 10 1.81818C5.48131 1.81818 1.81818 5.48131 1.81818 10C1.81818 14.5187 5.48131 18.1818 10 18.1818C14.5187 18.1818 18.1818 14.5187 18.1818 10ZM9.09091 4.54545C9.09091 4.04338 9.49792 3.63636 10 3.63636C10.5021 3.63636 10.9091 4.04338 10.9091 4.54545V9.43803L14.043 11.005L14.1238 11.0507C14.5131 11.2973 14.6601 11.8037 14.4496 12.2248C14.2391 12.6458 13.7458 12.8321 13.315 12.6687L13.2298 12.6314L9.5934 10.8132C9.28541 10.6592 9.09091 10.3443 9.09091 10V4.54545ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                fill="#007AFF"
            />
        </g>
        <defs>
            <clipPath id="clip0_12_732">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const ProcessingIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#clip0_12_732)">
            <path
                d="M18.1818 10C18.1818 5.48131 14.5187 1.81818 10 1.81818C5.48131 1.81818 1.81818 5.48131 1.81818 10C1.81818 14.5187 5.48131 18.1818 10 18.1818C14.5187 18.1818 18.1818 14.5187 18.1818 10ZM9.09091 4.54545C9.09091 4.04338 9.49792 3.63636 10 3.63636C10.5021 3.63636 10.9091 4.04338 10.9091 4.54545V9.43803L14.043 11.005L14.1238 11.0507C14.5131 11.2973 14.6601 11.8037 14.4496 12.2248C14.2391 12.6458 13.7458 12.8321 13.315 12.6687L13.2298 12.6314L9.5934 10.8132C9.28541 10.6592 9.09091 10.3443 9.09091 10V4.54545ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                fill="#007AFF"
            />
        </g>
        <defs>
            <clipPath id="clip0_12_732">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export const Final: FC = () => {
    const [progress, setProgress] =
        useState<ProcessingProgress>(initialProgress);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onContinueButtonClickHandler = () => {
        navigate("/models");
    };

    // Имитация получения данных с сервера
    useEffect(() => {
        // Проверяем, что данные с предыдущих страниц доступны
        if (!fileSettingsData.isDataReady || !marksData.isDataReady) {
            setError(
                "Данные с предыдущих шагов не найдены. Пожалуйста, вернитесь и заполните необходимую информацию."
            );
            return;
        }

        // Функция для имитации получения обновлений прогресса с сервера
        const simulateServerUpdates = () => {
            let currentProgress = { ...initialProgress };
            let queueTimer: NodeJS.Timeout;
            let processingTimer: NodeJS.Timeout;
            let statisticsTimer: NodeJS.Timeout;

            // Шаг 1: Ожидание в очереди
            queueTimer = setTimeout(() => {
                currentProgress.queueStatus = "processing";
                setProgress({ ...currentProgress });

                // Шаг 2: Обработка данных
                let dataProcessingInterval = 0;
                processingTimer = setInterval(() => {
                    dataProcessingInterval += 2;
                    currentProgress.dataProcessingPercent = Math.min(
                        dataProcessingInterval,
                        100
                    );
                    setProgress({ ...currentProgress });

                    if (dataProcessingInterval >= 100) {
                        clearInterval(processingTimer);

                        // Шаг 3: Расчет статистики
                        let statisticsInterval = 0;
                        statisticsTimer = setInterval(() => {
                            statisticsInterval += 1;
                            currentProgress.statisticsCalculationPercent =
                                Math.min(statisticsInterval, 100);
                            setProgress({ ...currentProgress });

                            if (statisticsInterval >= 100) {
                                clearInterval(statisticsTimer);
                                currentProgress.isComplete = true;
                                setProgress({ ...currentProgress });
                            }
                        }, 150); // Медленнее, чем обработка данных
                    }
                }, 100);
            }, 1500); // Имитация ожидания в очереди

            // Очистка таймеров при размонтировании компонента
            return () => {
                clearTimeout(queueTimer);
                clearInterval(processingTimer);
                clearInterval(statisticsTimer);
            };
        };

        // Запускаем симуляцию
        const cleanupFn = simulateServerUpdates();

        return cleanupFn;
    }, []);

    // Рендеринг индикатора прогресса
    const renderProgressBar = (percent: number, color: string) => {
        return (
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{
                        width: `${percent}%`,
                        backgroundColor: color,
                    }}
                />
                <span className={styles.progressPercent}>{percent}%</span>
            </div>
        );
    };

    // Если есть ошибка, показываем сообщение
    if (error) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Ошибка</h1>
                <div className={styles.errorContainer}>
                    <p className={styles.errorMessage}>{error}</p>
                    <button className={styles.returnButton}>
                        Вернуться к предыдущему шагу
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Завершение</h1>
            <p className={styles.subtitle}>
                Дождитесь завершения обработки и преобразования загруженных
                данных. Время обработки зависит от объема. Вы сможете привязать
                модель данных к проекту сразу после завершения загрузки
            </p>

            <div className={styles.progressSection}>
                <h2 className={styles.sectionTitle}>Ход выполнения</h2>

                <div className={styles.progressItem}>
                    <div className={styles.progressHeader}>
                        <div className={styles.progressIcon}>
                            {progress.queueStatus !== "waiting" ? (
                                <div
                                    className={`${styles.checkIcon} ${styles.completed}`}
                                >
                                    <CheckIcon />
                                </div>
                            ) : (
                                <div className={styles.waitingIcon}>
                                    <ClockIcon />
                                </div>
                            )}
                        </div>
                        <div className={styles.progressTitle}>
                            Ожидание в очереди на загрузку
                        </div>
                    </div>
                </div>

                <div className={styles.progressItem}>
                    <div className={styles.progressHeader}>
                        <div className={styles.progressIcon}>
                            {progress.dataProcessingPercent === 100 ? (
                                <div
                                    className={`${styles.checkIcon} ${styles.completed}`}
                                >
                                    <CheckIcon />
                                </div>
                            ) : progress.queueStatus === "processing" ? (
                                <div className={styles.processingIcon}>
                                    <ProcessingIcon />
                                </div>
                            ) : (
                                <div className={styles.waitingIcon}>
                                    <ClockIcon />
                                </div>
                            )}
                        </div>
                        <div className={styles.progressTitle}>
                            Обработка данных
                        </div>
                    </div>
                    {progress.queueStatus === "processing" &&
                        renderProgressBar(
                            progress.dataProcessingPercent,
                            "#007AFF"
                        )}
                </div>

                <div className={styles.progressItem}>
                    <div className={styles.progressHeader}>
                        <div className={styles.progressIcon}>
                            {progress.statisticsCalculationPercent === 100 ? (
                                <div
                                    className={`${styles.checkIcon} ${styles.completed}`}
                                >
                                    <CheckIcon />
                                </div>
                            ) : progress.dataProcessingPercent === 100 ? (
                                <div className={styles.processingIcon}>
                                    <ProcessingIcon />
                                </div>
                            ) : (
                                <div className={styles.waitingIcon}>
                                    <ClockIcon />
                                </div>
                            )}
                        </div>
                        <div className={styles.progressTitle}>
                            Расчет статистики
                        </div>
                    </div>
                    {progress.dataProcessingPercent === 100 &&
                        renderProgressBar(
                            progress.statisticsCalculationPercent,
                            "#007AFF"
                        )}
                </div>
            </div>

            {progress.isComplete && (
                <div className={styles.completionMessage}>
                    <div className={styles.successIcon}>
                        <CheckIcon />
                    </div>
                    <h2 className={styles.completionTitle}>
                        Обработка завершена
                    </h2>
                    <p className={styles.completionText}>
                        Ваши данные успешно загружены и обработаны. Теперь вы
                        можете продолжить работу с моделью.
                    </p>
                    <button
                        className={styles.continueButton}
                        onClick={onContinueButtonClickHandler}
                    >
                        Перейти к модели
                    </button>
                </div>
            )}
        </div>
    );
};
