import { useState, useEffect, useRef, useContext, createContext } from "react";
import type { FC } from "react";
import styles from "./FileSettings.module.css";
import { useNavigate } from "react-router";
import { useAppSelector } from "shared/hooks/useAppSelector";
import {
    selectFile,
    selectFileId,
    selectColumnsConfig,
    selectIsConfigSaving,
} from "entities/fileUpload/model/selectors";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { getFilePreviewAsync } from "entities/fileUpload/model/asyncThunks/getFilePreviewAsync";
import { setColumnType } from "entities/fileUpload/model/slice";
import type { UpdateFileConfigRequest } from "shared/api/endpoints/file/types";
import { ColumnDataType } from "shared/api/endpoints/file/types";
import { updateFileConfigAsync } from "entities/fileUpload/model/asyncThunks/updateFileConfigAsync";
import { store } from "app/store/store";

// Перечисление доступных типов данных для обратной совместимости
enum ColumnType {
    NUMBER = "NUMBER",
    STRING = "STRING",
    DATETIME = "DATETIME",
    BOOLEAN = "BOOLEAN",
}

// Отображение между старыми и новыми типами для обратной совместимости
const mapColumnTypeToApiType = (type: ColumnType): ColumnDataType => {
    switch (type) {
        case ColumnType.NUMBER:
            return ColumnDataType.NUMBER;
        case ColumnType.STRING:
            return ColumnDataType.STRING;
        case ColumnType.DATETIME:
            return ColumnDataType.DATETIME;
        case ColumnType.BOOLEAN:
            return ColumnDataType.BOOLEAN;
        default:
            return ColumnDataType.STRING;
    }
};

const mapApiTypeToColumnType = (type: ColumnDataType): ColumnType => {
    switch (type) {
        case ColumnDataType.NUMBER:
            return ColumnType.NUMBER;
        case ColumnDataType.STRING:
            return ColumnType.STRING;
        case ColumnDataType.DATETIME:
            return ColumnType.DATETIME;
        case ColumnDataType.BOOLEAN:
            return ColumnType.BOOLEAN;
        default:
            return ColumnType.STRING;
    }
};

// Создаем контекст для доступа к типам колонок извне
export interface FileSettingsContextType {
    columnTypes: Record<number, ColumnType>;
    fileInfoId?: number;
    isDataReady: boolean;
}

// Создаем контекст для настроек файла
export const FileSettingsContext = createContext<FileSettingsContextType>({
    columnTypes: {},
    fileInfoId: undefined,
    isDataReady: false,
});

// Для обратной совместимости, эти экспорты нужны другим компонентам
export const fileSettingsData: FileSettingsContextType = {
    columnTypes: {},
    fileInfoId: undefined,
    isDataReady: false,
};

// Функция для сохранения настроек файла
export const saveFileSettings = async (
    columnTypes: Record<number, ColumnType>,
    fileId?: number
): Promise<boolean> => {
    if (!fileId) return false;

    // Преобразуем старый формат в новый для API
    const columnsConfig: Record<string, { type: ColumnDataType }> = {};

    Object.entries(columnTypes).forEach(([index, type]) => {
        // Предполагаем, что в Redux store мы имеем доступ к именам колонок через file.columns
        const state = store.getState();
        const file = state.fileReducer.currentFile;

        if (file && file.columns && file.columns[Number(index)]) {
            const columnName = file.columns[Number(index)];
            columnsConfig[columnName] = {
                type: mapColumnTypeToApiType(type),
            };
        }
    });

    // Формируем данные для запроса
    const requestData: UpdateFileConfigRequest = {
        columns_config: columnsConfig,
    };

    // Отправляем запрос через Redux thunk
    try {
        await store.dispatch(
            updateFileConfigAsync({
                fileId,
                data: requestData,
            })
        );
        return true;
    } catch (error) {
        console.error("Error saving file settings:", error);
        return false;
    }
};

// Определение типа колонки для лучшего отображения таблицы
const getColumnClassByType = (
    type: ColumnDataType,
    columnName: string
): string => {
    if (
        type === ColumnDataType.NUMBER &&
        (columnName === "ID" || columnName.toLowerCase().includes("id"))
    ) {
        return styles.smallColumn;
    }

    if (type === ColumnDataType.DATETIME) {
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
): ColumnDataType => {
    if (typeof value === "number") {
        return ColumnDataType.NUMBER;
    }

    if (typeof value === "string") {
        // Проверяем дату
        const datePattern = /^\d{4}-\d{2}-\d{2}([ T]\d{2}:\d{2}(:\d{2})?)?$/;
        if (datePattern.test(value) && !isNaN(Date.parse(value))) {
            return ColumnDataType.DATETIME;
        }

        // Проверяем число
        if (/^-?\d+(\.\d+)?$/.test(value) && !isNaN(Number(value))) {
            return ColumnDataType.NUMBER;
        }
    }

    return ColumnDataType.STRING;
};

// Компонент выбора типа колонки
const ColumnTypeSelector: FC<{
    selectedType: ColumnDataType;
    onChange: (type: ColumnDataType) => void;
}> = ({ selectedType, onChange }) => {
    return (
        <div className={styles.selectorContainer}>
            <select
                className={styles.selector}
                value={selectedType}
                onChange={(e) => onChange(e.target.value as ColumnDataType)}
            >
                {Object.values(ColumnDataType).map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export const FileSettings: FC = () => {
    const [isDataReady, setIsDataReady] = useState(false);
    const navigate = useNavigate();
    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const file = useAppSelector(selectFile);
    const id = useAppSelector(selectFileId);
    const columnsConfig = useAppSelector(selectColumnsConfig);
    const isConfigSaving = useAppSelector(selectIsConfigSaving);

    const dispatch = useAppDispatch();

    const initColumnTypes = (data: typeof file) => {
        data.columns.forEach((columnName) => {
            // Определяем тип по первой непустой ячейке в колонке
            if (data.data.length > 0) {
                for (const rowItem of data.data) {
                    // Безопасное преобразование типов с промежуточным unknown
                    const rowObject = rowItem as unknown as Record<
                        string,
                        string | number | null
                    >;
                    const cellValue = rowObject[columnName];

                    if (
                        cellValue !== null &&
                        cellValue !== undefined &&
                        cellValue !== ""
                    ) {
                        const guessedType = guessColumnType(cellValue);

                        // Устанавливаем тип колонки в Redux store
                        dispatch(
                            setColumnType({
                                columnName,
                                type: guessedType,
                            })
                        );
                        break;
                    }
                }

                // Если не смогли определить тип, устанавливаем STRING по умолчанию
                if (!columnsConfig[columnName]) {
                    dispatch(
                        setColumnType({
                            columnName,
                            type: ColumnDataType.STRING,
                        })
                    );
                }
            } else {
                dispatch(
                    setColumnType({
                        columnName,
                        type: ColumnDataType.STRING,
                    })
                );
            }
        });

        setIsDataReady(true);

        // Обновляем экспортируемые данные для обратной совместимости
        const columnTypesForCompatibility: Record<number, ColumnType> = {};
        data.columns.forEach((columnName, index) => {
            if (columnsConfig[columnName]) {
                columnTypesForCompatibility[index] = mapApiTypeToColumnType(
                    columnsConfig[columnName].type
                );
            } else {
                columnTypesForCompatibility[index] = ColumnType.STRING;
            }
        });

        fileSettingsData.columnTypes = columnTypesForCompatibility;
        fileSettingsData.isDataReady = true;
        fileSettingsData.fileInfoId = id ? Number(id) : undefined;
    };

    const handleColumnTypeChange = (
        columnName: string,
        type: ColumnDataType
    ) => {
        dispatch(setColumnType({ columnName, type }));

        // Обновляем экспортируемые данные для обратной совместимости
        if (file) {
            const columnIndex = file.columns.findIndex(
                (col) => col === columnName
            );
            if (columnIndex !== -1) {
                fileSettingsData.columnTypes = {
                    ...fileSettingsData.columnTypes,
                    [columnIndex]: mapApiTypeToColumnType(type),
                };
            }
        }
    };

    useEffect(() => {
        if (file?.columns?.length > 0 && !isDataReady) {
            initColumnTypes(file);
        }
    }, [file, dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getFilePreviewAsync({ id }));
        }
    }, [dispatch, id]);

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
    }, [file]);

    if (!file) {
        return <div className={styles.loading}>Загрузка данных...</div>;
    }

    const getColumnType = (columnName: string): ColumnDataType => {
        return columnsConfig[columnName]?.type || ColumnDataType.STRING;
    };

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
                            {file.columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={getColumnClassByType(
                                        getColumnType(column),
                                        column
                                    )}
                                >
                                    <div className={styles.columnHeader}>
                                        <span>{column}</span>
                                        <ColumnTypeSelector
                                            selectedType={getColumnType(column)}
                                            onChange={(type) =>
                                                handleColumnTypeChange(
                                                    column,
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
                        {file.data.map((rowItem, rowIndex) => {
                            // Безопасное приведение типа с промежуточным unknown
                            const rowObject = rowItem as unknown as Record<
                                string,
                                string | number | null
                            >;

                            return (
                                <tr key={rowIndex}>
                                    {file.columns.map(
                                        (columnName, cellIndex) => {
                                            const cellValue =
                                                rowObject[columnName];

                                            return (
                                                <td
                                                    key={cellIndex}
                                                    className={getColumnClassByType(
                                                        getColumnType(
                                                            columnName
                                                        ),
                                                        columnName
                                                    )}
                                                >
                                                    {cellValue !== undefined &&
                                                    cellValue !== null
                                                        ? cellValue
                                                        : "-"}
                                                </td>
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
