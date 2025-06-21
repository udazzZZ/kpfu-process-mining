import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import styles from "./Marks.module.css";
import { useAppSelector } from "shared/hooks/useAppSelector";
import {
    selectFile,
    selectFileId,
    selectColumnsConfig,
} from "entities/fileUpload/model/selectors";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { setColumnRole } from "entities/fileUpload/model/slice";
import { ColumnDataType, ColumnRole } from "shared/api/endpoints/file/types";

// Для обратной совместимости
enum ColumnType {
    NUMBER = "NUMBER",
    STRING = "STRING",
    DATETIME = "DATETIME",
}

// Маппинг между IndicatorType и ColumnRole API
const mapIndicatorToApiRole = (
    indicatorType: IndicatorType
): ColumnRole | undefined => {
    switch (indicatorType) {
        case IndicatorType.CASE_ID:
            return ColumnRole.CASE_ID;
        case IndicatorType.TIMESTAMP:
            return ColumnRole.TIMESTAMP;
        case IndicatorType.NAME:
            return ColumnRole.ACTIVITY;
        case IndicatorType.CASE_ATTRIBUTE:
            return ColumnRole.CASE_ATTRIBUTE;
        case IndicatorType.EVENT_ATTRIBUTE:
            return ColumnRole.EVENT_ATTRIBUTE;
        default:
            return undefined;
    }
};

const mapApiRoleToIndicator = (
    role: ColumnRole | undefined
): IndicatorType | undefined => {
    if (!role) return undefined;

    switch (role) {
        case ColumnRole.CASE_ID:
            return IndicatorType.CASE_ID;
        case ColumnRole.TIMESTAMP:
            return IndicatorType.TIMESTAMP;
        case ColumnRole.ACTIVITY:
            return IndicatorType.NAME;
        case ColumnRole.CASE_ATTRIBUTE:
            return IndicatorType.CASE_ATTRIBUTE;
        case ColumnRole.EVENT_ATTRIBUTE:
            return IndicatorType.EVENT_ATTRIBUTE;
        default:
            return undefined;
    }
};

// Типы указателей процесса
enum IndicatorType {
    CASE_ID = "Идентификатор экземпляра процесса",
    EVENT_ID = "Идентификатор события",
    NAME = "Имя события",
    TIMESTAMP = "Дата и время окончания",
    SORT_CRITERIA = "Критерий сортировки",
    CASE_ATTRIBUTE = "Атрибут экземпляра процесса",
    EVENT_ATTRIBUTE = "Атрибут события",
}

// Определение типа колонки для лучшего отображения таблицы
const getColumnClassByType = (
    type: ColumnType | ColumnDataType,
    columnName: string
): string => {
    if (
        (type === ColumnType.NUMBER || type === ColumnDataType.NUMBER) &&
        (columnName === "ID" || columnName.toLowerCase().includes("id"))
    ) {
        return styles.smallColumn;
    }

    if (type === ColumnType.DATETIME || type === ColumnDataType.DATETIME) {
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

// Компонент указателя, который можно перетаскивать
const DraggableIndicator: FC<{
    type: IndicatorType;
    isAssigned: boolean;
    onClick: () => void;
}> = ({ type, isAssigned, onClick }) => {
    return (
        <div
            className={`${styles.indicator} ${
                isAssigned ? styles.indicatorAssigned : ""
            }`}
            onClick={onClick}
            draggable="true"
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", type);
                e.dataTransfer.effectAllowed = "move";
                try {
                    // Создаем невидимое изображение для лучшей поддержки в браузерах
                    const img = new Image();
                    img.src =
                        "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
                    e.dataTransfer.setDragImage(img, 0, 0);
                } catch (error) {
                    console.error(
                        "Ошибка при установке изображения для перетаскивания",
                        error
                    );
                }

                // Добавляем класс для индикации перетаскивания
                e.currentTarget.classList.add(styles.dragging);
            }}
            onDragEnd={(e) => {
                // Удаляем класс при завершении перетаскивания
                e.currentTarget.classList.remove(styles.dragging);
            }}
        >
            <div className={styles.indicatorContent}>
                <span>{type}</span>
                <span
                    className={styles.infoIcon}
                    title="Информация об указателе"
                >
                    i
                </span>
            </div>
        </div>
    );
};

// Для обратной совместимости
export const marksData = {
    columnIndicators: {} as Record<number, IndicatorType>,
    isDataReady: false,
};

// Функция для сохранения настроек указателей
export const saveMarksSettings = async (
    columnIndicators: Record<number, IndicatorType>,
    fileId?: number
): Promise<boolean> => {
    // Эта функция теперь использует Redux
    return true;
};

export const Marks: FC = () => {
    const [currentDragColumn, setCurrentDragColumn] = useState<number | null>(
        null
    );
    const [isDragging, setIsDragging] = useState(false);
    const [isDataReady, setIsDataReady] = useState(false);
    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const file = useAppSelector(selectFile);
    const id = useAppSelector(selectFileId);
    const columnsConfig = useAppSelector(selectColumnsConfig);

    const dispatch = useAppDispatch();

    // Инициализация данных при загрузке компонента
    useEffect(() => {
        if (file?.columns?.length > 0) {
            // Проверка наличия всех необходимых ролей
            const hasRequiredRoles =
                Object.values(columnsConfig).some(
                    (config) => config.role === "case_id"
                ) &&
                Object.values(columnsConfig).some(
                    (config) => config.role === "activity"
                ) &&
                Object.values(columnsConfig).some(
                    (config) => config.role === "timestamp"
                );

            // Устанавливаем флаг готовности данных
            setIsDataReady(hasRequiredRoles);
            marksData.isDataReady = hasRequiredRoles;
        }
    }, [file, columnsConfig]);

    // Обработчик скролла для проверки работы sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (tableWrapperRef.current) {
                const scrollTop = tableWrapperRef.current.scrollTop;
                const headers = tableWrapperRef.current.querySelectorAll("th");

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
    }, []);

    // Обработка перетаскивания указателя на колонку
    const handleDragOver = (
        e: React.DragEvent<HTMLElement>,
        columnIndex: number
    ) => {
        e.preventDefault();
        e.stopPropagation();
        // Указываем, что разрешаем drop
        e.dataTransfer.dropEffect = "move";

        if (currentDragColumn !== columnIndex) {
            setCurrentDragColumn(columnIndex);
        }
    };

    const handleDragEnter = (
        e: React.DragEvent<HTMLElement>,
        columnIndex: number
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentDragColumn(columnIndex);
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // Проверяем, что мышь действительно покинула элемент, а не перешла на дочерний элемент
        if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return;
        }
        setCurrentDragColumn(null);
    };

    // Обработка завершения перетаскивания
    const handleDragEnd = () => {
        setCurrentDragColumn(null);
        setIsDragging(false);
    };

    // Обработка отпускания указателя на колонке
    const handleDrop = (
        e: React.DragEvent<HTMLElement>,
        columnName: string
    ) => {
        e.preventDefault();
        e.stopPropagation();

        // Получаем тип индикатора из dataTransfer
        const indicatorType = e.dataTransfer.getData(
            "text/plain"
        ) as IndicatorType;

        if (!indicatorType) {
            console.error("Не удалось получить тип индикатора");
            return;
        }

        // Проверяем совместимость типа колонки и указателя
        const columnConfig = columnsConfig[columnName];
        if (columnConfig && isCompatible(indicatorType, columnConfig.type)) {
            assignIndicatorToColumn(indicatorType, columnName);
        } else {
            alert(
                `Указатель "${indicatorType}" не совместим с типом данных колонки`
            );
        }

        setCurrentDragColumn(null);
        setIsDragging(false);
    };

    // Проверка совместимости указателя и типа данных колонки
    const isCompatible = (
        indicatorType: IndicatorType,
        columnType: ColumnDataType
    ): boolean => {
        // Проверка совместимости типов
        switch (indicatorType) {
            case IndicatorType.CASE_ID:
            case IndicatorType.EVENT_ID:
                return (
                    columnType === ColumnDataType.NUMBER ||
                    columnType === ColumnDataType.STRING
                );
            case IndicatorType.TIMESTAMP:
                return columnType === ColumnDataType.DATETIME;
            default:
                return true; // Остальные указатели совместимы с любыми типами
        }
    };

    // Назначение указателя на колонку
    const assignIndicatorToColumn = (
        indicatorType: IndicatorType,
        columnName: string
    ) => {
        // Преобразуем IndicatorType в ColumnRole API
        const apiRole = mapIndicatorToApiRole(indicatorType);
        if (!apiRole) return;

        // Убираем этот указатель с других колонок
        for (const colName in columnsConfig) {
            if (columnsConfig[colName]?.role === apiRole) {
                dispatch(
                    setColumnRole({
                        columnName: colName,
                        role: undefined as unknown as ColumnRole, // Убираем роль с явным приведением типов
                    })
                );
            }
        }

        // Устанавливаем роль для выбранной колонки
        dispatch(
            setColumnRole({
                columnName,
                role: apiRole,
            })
        );

        // Обновляем для обратной совместимости
        if (file) {
            const columnIndex = file.columns.findIndex(
                (col) => col === columnName
            );
            if (columnIndex !== -1) {
                marksData.columnIndicators[columnIndex] = indicatorType;
            }
        }
    };

    // Удаление указателя с колонки
    const removeIndicatorFromColumn = (columnName: string) => {
        dispatch(
            setColumnRole({
                columnName,
                role: undefined as unknown as ColumnRole,
            })
        );

        // Обновляем для обратной совместимости
        if (file) {
            const columnIndex = file.columns.findIndex(
                (col) => col === columnName
            );
            if (columnIndex !== -1) {
                delete marksData.columnIndicators[columnIndex];
            }
        }
    };

    // Проверка, назначен ли указатель на какую-либо колонку
    const isIndicatorAssigned = (indicatorType: IndicatorType): boolean => {
        const apiRole = mapIndicatorToApiRole(indicatorType);
        if (!apiRole) return false;

        return Object.values(columnsConfig).some(
            (config) => config.role === apiRole
        );
    };

    // Назначение указателя при клике на него
    const handleIndicatorClick = (indicatorType: IndicatorType) => {
        // Показываем модальное окно для выбора колонки или другой интерфейс
        console.log(`Выбран указатель: ${indicatorType}`);
    };

    // Получить индикатор для колонки
    const getIndicatorForColumn = (
        columnName: string
    ): IndicatorType | undefined => {
        const columnConfig = columnsConfig[columnName];
        if (!columnConfig || !columnConfig.role) return undefined;

        return mapApiRoleToIndicator(columnConfig.role);
    };

    if (!file || !file.columns) {
        return <div className={styles.loading}>Загрузка данных...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Укажите значения колонок</h1>
            <p className={styles.subtitle}>
                Перетащите указатели на соответствующие колонки для определения
                их роли в процессе.
                <br />
                Вы должны указать как минимум идентификатор экземпляра, имя
                события и временную метку.
            </p>

            <div
                className={`${styles.marksContainer} ${
                    isDragging ? styles.draggingActive : ""
                }`}
            >
                <div className={styles.indicatorsPanel}>
                    <h3>Указатели процесса</h3>
                    <div className={styles.indicatorsList}>
                        {Object.values(IndicatorType).map((type) => (
                            <DraggableIndicator
                                key={type}
                                type={type}
                                isAssigned={isIndicatorAssigned(type)}
                                onClick={() => handleIndicatorClick(type)}
                            />
                        ))}
                    </div>
                </div>

                <div
                    className={styles.tableWrapper}
                    ref={tableWrapperRef}
                    onDragEnd={handleDragEnd}
                >
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {file.columns.map((column, index) => {
                                    const indicator =
                                        getIndicatorForColumn(column);
                                    return (
                                        <th
                                            key={index}
                                            className={`
                                                ${getColumnClassByType(
                                                    columnsConfig[column]
                                                        ?.type ||
                                                        ColumnDataType.STRING,
                                                    column
                                                )}
                                                ${
                                                    currentDragColumn === index
                                                        ? styles.dragOver
                                                        : ""
                                                }
                                                ${
                                                    indicator
                                                        ? styles.hasIndicator
                                                        : ""
                                                }
                                            `}
                                            onDragOver={(e) =>
                                                handleDragOver(e, index)
                                            }
                                            onDragEnter={(e) =>
                                                handleDragEnter(e, index)
                                            }
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) =>
                                                handleDrop(e, column)
                                            }
                                        >
                                            <div
                                                className={styles.columnHeader}
                                            >
                                                <span>{column}</span>
                                                {indicator && (
                                                    <div
                                                        className={
                                                            styles.assignedIndicator
                                                        }
                                                    >
                                                        <span>{indicator}</span>
                                                        <button
                                                            className={
                                                                styles.removeButton
                                                            }
                                                            onClick={() =>
                                                                removeIndicatorFromColumn(
                                                                    column
                                                                )
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
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
                                                            columnsConfig[
                                                                columnName
                                                            ]?.type ||
                                                                ColumnDataType.STRING,
                                                            columnName
                                                        )}
                                                    >
                                                        {cellValue !==
                                                            undefined &&
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
        </div>
    );
};
