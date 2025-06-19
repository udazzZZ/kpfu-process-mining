import type { FC } from "react";
import { useState, useRef } from "react";
import styles from "./JournalUpload.module.css";
import journalUpload from "../../../../../public/upload-icon.svg";
import { useNavigate } from "react-router";

const JournalUpload: FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFileName(selectedFile.name);
            setFile(selectedFile);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            setFileName(droppedFile.name);
            setFile(droppedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            setIsLoading(true);
            // Здесь будет код для отправки файла на сервер
            // Например, с использованием FormData и fetch

            // Пример:
            // const formData = new FormData();
            // formData.append('file', file);
            // const response = await fetch('/api/upload', {
            //    method: 'POST',
            //    body: formData
            // });

            // Если загрузка успешна, перенаправляем на следующий шаг
            setTimeout(() => {
                setIsLoading(false);
                navigate("/import/file-settings");
            }, 1000);
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Загрузите журнал событий</h1>
            <div
                className={`${styles.uploadContainer} ${
                    isDragging ? styles.dragging : ""
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <img src={journalUpload} alt="journal" />
                {fileName ? (
                    <>
                        <p className={styles.fileName}>{fileName}</p>
                        <button
                            type="button"
                            className={`${styles.customFileButton} ${
                                isLoading ? styles.loading : ""
                            }`}
                            onClick={handleUpload}
                            disabled={isLoading}
                        >
                            {isLoading ? "Загрузка..." : "Загрузить"}
                        </button>
                    </>
                ) : (
                    <>
                        <p className={styles.dragText}>
                            Перетащите файл сюда или
                        </p>
                        <div className={styles.inputWrapper}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className={styles.hiddenInput}
                                accept=".xes,.csv,.xlsx"
                            />
                            <button
                                type="button"
                                className={styles.customFileButton}
                                onClick={handleButtonClick}
                            >
                                Выберите файл
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default JournalUpload;
