import { useState, useEffect, useRef, useContext } from "react";
import type { FC } from "react";
import styles from "./FileSettings.module.css";
import { useNavigate } from "react-router";

// Перечисление доступных типов данных
enum ColumnType {
    NUMBER = "NUMBER",
    STRING = "STRING",
    DATETIME = "DATETIME",
}

// Типы для данных
interface FilePreviewData {
    data: Array<Array<string | number>>;
    columns: string[];
    file_info: {
        id: number;
    };
    rows_count: number;
}

// Создаем контекст для доступа к типам колонок извне
export interface FileSettingsContextType {
    columnTypes: Record<number, ColumnType>;
    fileInfoId?: number;
    isDataReady: boolean;
}

// Экспортируем функцию для сохранения настроек, чтобы ее можно было вызвать из родительского компонента
export const saveFileSettings = async (
    columnTypes: Record<number, ColumnType>,
    fileId?: number
): Promise<boolean> => {
    // Здесь будет запрос к API для сохранения настроек колонок
    console.log(
        "Сохранение настроек колонок:",
        columnTypes,
        "для файла:",
        fileId
    );

    // Имитация успешного сохранения
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 500);
    });
};

// Расширенные моковые данные с большим количеством колонок для демонстрации горизонтального скролла
const mockFilePreviewData: FilePreviewData = {
    data: [
        [
            1,
            "Главная страница",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            2,
            "Поиск",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            3,
            "Страница товара",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            5,
            "Корзина",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            6,
            "Оформление заказа",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            7,
            "Личный кабинет",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            9,
            "История заказов",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            10,
            "Настройки",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            11,
            "Контакты",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            12,
            "Часто задаваемые вопросы",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            13,
            "О компании",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            14,
            "Акции",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            15,
            "Доставка",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            16,
            "Оплата",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            17,
            "Гарантия",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            18,
            "Возврат",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            19,
            "Сервис",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
        [
            20,
            "Бренды",
            "2021-01-09 05:01:19",
            "Нет",
            "Дополнительно 1",
            "Дополнительно 2",
            "Дополнительно 3",
        ],
    ],
    columns: [
        "ID",
        "Страница",
        "Дата и время",
        "Вход выполнен",
        "Дополнительно 1",
        "Дополнительно 2",
        "Дополнительно 3",
    ],
    file_info: {
        id: 123,
    },
    rows_count: 18,
};

// Определение типа колонки для лучшего отображения таблицы
const getColumnClassByType = (type: ColumnType, columnName: string): string => {
    if (
        type === ColumnType.NUMBER &&
        (columnName === "ID" || columnName.toLowerCase().includes("id"))
    ) {
        return styles.smallColumn;
    }

    if (type === ColumnType.DATETIME) {
        return styles.mediumColumn;
    }

    if (
        columnName.toLowerCase().includes("нет") ||
        columnName.toLowerCase().includes("да") ||
        columnName.toLowerCase().includes("статус") ||
        columnName.toLowerCase().includes("выполнен")
    ) {
        return styles.smallColumn;
    }

    return "";
};

// Интеллектуальное определение типа данных по значению
const guessColumnType = (
    value: string | number | null | undefined
): ColumnType => {
    if (typeof value === "number") {
        return ColumnType.NUMBER;
    }

    if (typeof value === "string") {
        // Проверяем дату
        const datePattern = /^\d{4}-\d{2}-\d{2}([ T]\d{2}:\d{2}(:\d{2})?)?$/;
        if (datePattern.test(value) && !isNaN(Date.parse(value))) {
            return ColumnType.DATETIME;
        }

        // Проверяем число
        if (/^-?\d+(\.\d+)?$/.test(value) && !isNaN(Number(value))) {
            return ColumnType.NUMBER;
        }
    }

    return ColumnType.STRING;
};

// Компонент выбора типа колонки
const ColumnTypeSelector: FC<{
    selectedType: ColumnType;
    onChange: (type: ColumnType) => void;
}> = ({ selectedType, onChange }) => {
    return (
        <div className={styles.selectorContainer}>
            <select
                className={styles.selector}
                value={selectedType}
                onChange={(e) => onChange(e.target.value as ColumnType)}
            >
                {Object.values(ColumnType).map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

// Экспортируем глобальные переменные для доступа извне
export let fileSettingsData: FileSettingsContextType = {
    columnTypes: {},
    isDataReady: false,
};

export const FileSettings: FC = () => {
    const [fileData, setFileData] = useState<FilePreviewData | null>(null);
    const [columnTypes, setColumnTypes] = useState<Record<number, ColumnType>>(
        {}
    );
    const [isDataReady, setIsDataReady] = useState(false);
    const navigate = useNavigate();
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Здесь будет запрос к API для получения данных файла
        // Пример запроса:
        // const fetchFileData = async () => {
        //   try {
        //     const response = await fetch(`/api/filemetadata/${fileId}/preview-data/`);
        //     const data = await response.json();
        //     setFileData(data);
        //     initColumnTypes(data);
        //   } catch (error) {
        //     console.error("Ошибка при загрузке данных файла:", error);
        //   }
        // };
        // fetchFileData();

        // Сейчас используем моковые данные
        setFileData(mockFilePreviewData);
        initColumnTypes(mockFilePreviewData);
    }, []);

    // Обработчик скролла для проверки работы sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (tableWrapperRef.current) {
                const scrollTop = tableWrapperRef.current.scrollTop;
                const headers = tableWrapperRef.current.querySelectorAll("th");

                // Можно добавить классы или стили при прокрутке
                if (scrollTop > 0) {
                    headers.forEach((header) => {
                        header.classList.add(styles.headerScrolling);
                    });
                } else {
                    headers.forEach((header) => {
                        header.classList.remove(styles.headerScrolling);
                    });
                }
            }
        };

        const tableWrapper = tableWrapperRef.current;
        if (tableWrapper) {
            tableWrapper.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (tableWrapper) {
                tableWrapper.removeEventListener("scroll", handleScroll);
            }
        };
    }, [fileData]);

    // Обновляем глобальные данные при изменении состояния
    useEffect(() => {
        if (fileData) {
            fileSettingsData = {
                columnTypes,
                fileInfoId: fileData.file_info.id,
                isDataReady: isDataReady,
            };
        }
    }, [columnTypes, fileData, isDataReady]);

    const initColumnTypes = (data: FilePreviewData) => {
        const initialColumnTypes: Record<number, ColumnType> = {};
        data.columns.forEach((_, index) => {
            // Определяем тип по первой непустой ячейке в колонке
            if (data.data.length > 0) {
                for (const row of data.data) {
                    if (
                        row[index] !== null &&
                        row[index] !== undefined &&
                        row[index] !== ""
                    ) {
                        initialColumnTypes[index] = guessColumnType(row[index]);
                        break;
                    }
                }

                // Если не смогли определить тип, устанавливаем STRING по умолчанию
                if (!(index in initialColumnTypes)) {
                    initialColumnTypes[index] = ColumnType.STRING;
                }
            } else {
                initialColumnTypes[index] = ColumnType.STRING;
            }
        });

        setColumnTypes(initialColumnTypes);
        setIsDataReady(true);
    };

    const handleColumnTypeChange = (columnIndex: number, type: ColumnType) => {
        setColumnTypes((prev) => ({
            ...prev,
            [columnIndex]: type,
        }));
    };

    if (!fileData) {
        return <div className={styles.loading}>Загрузка данных...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Настройте файл</h1>
            <p className={styles.subtitle}>
                Настройте таблицу и установите тип данных для каждого столбца.
                <br />
                Обязательно укажите правильный формат даты и времени
            </p>

            <div className={styles.tableWrapper} ref={tableWrapperRef}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {fileData.columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={getColumnClassByType(
                                        columnTypes[index] || ColumnType.STRING,
                                        column
                                    )}
                                >
                                    <div className={styles.columnHeader}>
                                        <span>{column}</span>
                                        <ColumnTypeSelector
                                            selectedType={
                                                columnTypes[index] ||
                                                ColumnType.STRING
                                            }
                                            onChange={(type) =>
                                                handleColumnTypeChange(
                                                    index,
                                                    type
                                                )
                                            }
                                        />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={getColumnClassByType(
                                            columnTypes[cellIndex] ||
                                                ColumnType.STRING,
                                            fileData.columns[cellIndex]
                                        )}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
