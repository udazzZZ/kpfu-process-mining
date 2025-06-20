import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { fileSettingsData } from 'pages/journalImport/file-settings/FileSettings';
import styles from './Marks.module.css';

// Импортируем ColumnType из FileSettings
enum ColumnType {
    NUMBER = 'NUMBER',
    STRING = 'STRING',
    DATETIME = 'DATETIME',
}

// Типы указателей процесса
enum IndicatorType {
    CASE_ID = 'Идентификатор экземпляра процесса',
    EVENT_ID = 'Идентификатор события',
    NAME = 'Имя события',
    TIMESTAMP = 'Дата и время окончания',
    SORT_CRITERIA = 'Критерий сортировки',
    CASE_ATTRIBUTE = 'Атрибут экземпляра процесса',
    EVENT_ATTRIBUTE = 'Атрибут события',
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

// Моковые данные таблицы
const mockFilePreviewData: FilePreviewData = {
    data: [
        [
            1,
            'Главная страница',
            '2021-01-09 05:01:19',
            'Нет',
            'Дополнительно 1',
            'Дополнительно 2',
            'Дополнительно 3',
        ],
        [
            2,
            'Поиск',
            '2021-01-09 05:01:19',
            'Нет',
            'Дополнительно 1',
            'Дополнительно 2',
            'Дополнительно 3',
        ],
        [
            3,
            'Страница товара',
            '2021-01-09 05:01:19',
            'Нет',
            'Дополнительно 1',
            'Дополнительно 2',
            'Дополнительно 3',
        ],
        [
            5,
            'Корзина',
            '2021-01-09 05:01:19',
            'Нет',
            'Дополнительно 1',
            'Дополнительно 2',
            'Дополнительно 3',
        ],
        [
            6,
            'Оформление заказа',
            '2021-01-09 05:01:19',
            'Нет',
            'Дополнительно 1',
            'Дополнительно 2',
            'Дополнительно 3',
        ],
    ],
    columns: [
        'ID',
        'Страница',
        'Дата и время',
        'Вход выполнен',
        'Дополнительно 1',
        'Дополнительно 2',
        'Дополнительно 3',
    ],
    file_info: {
        id: 123,
    },
    rows_count: 5,
};

// Определение типа колонки для лучшего отображения таблицы
const getColumnClassByType = (type: ColumnType, columnName: string): string => {
    if (
        type === ColumnType.NUMBER &&
        (columnName === 'ID' || columnName.toLowerCase().includes('id'))
    ) {
        return styles.smallColumn;
    }

    if (type === ColumnType.DATETIME) {
        return styles.mediumColumn;
    }

    if (
        columnName.toLowerCase().includes('нет') ||
        columnName.toLowerCase().includes('да') ||
        columnName.toLowerCase().includes('статус') ||
        columnName.toLowerCase().includes('выполнен')
    ) {
        return styles.smallColumn;
    }

    return '';
};

// Экспортируем данные для доступа извне
export let marksData = {
    columnIndicators: {} as Record<number, IndicatorType>,
    fileInfoId: undefined as number | undefined,
    isDataReady: false,
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
                isAssigned ? styles.indicatorAssigned : ''
            }`}
            onClick={onClick}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('indicatorType', type);
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

// Функция для сохранения настроек указателей
export const saveMarksSettings = async (
    columnIndicators: Record<number, IndicatorType>,
    fileId?: number
): Promise<boolean> => {
    // Здесь будет запрос к API для сохранения настроек указателей
    console.log(
        'Сохранение настроек указателей:',
        columnIndicators,
        'для файла:',
        fileId
    );

    // Имитация успешного сохранения
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 500);
    });
};

export const Marks: FC = () => {
    const [fileData, setFileData] = useState<FilePreviewData | null>(null);
    const [columnTypes, setColumnTypes] = useState<Record<number, ColumnType>>(
        {}
    );
    const [columnIndicators, setColumnIndicators] = useState<
        Record<number, IndicatorType>
    >({});
    const [currentDragColumn, setCurrentDragColumn] = useState<number | null>(
        null
    );
    const [isDataReady, setIsDataReady] = useState(false);
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    // Получение данных из предыдущей страницы
    useEffect(() => {
        // Используем данные из предыдущего компонента
        if (fileSettingsData.isDataReady) {
            setColumnTypes(fileSettingsData.columnTypes);
        } else {
            // Если данных нет (например, пользователь зашел напрямую), используем моковые данные
            console.warn(
                'Данные с предыдущей страницы не найдены, используем моковые данные'
            );
        }

        // Подготовка данных таблицы
        setFileData(mockFilePreviewData);
        setIsDataReady(true);
    }, []);

    // Обработчик скролла для проверки работы sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (tableWrapperRef.current) {
                const scrollTop = tableWrapperRef.current.scrollTop;
                const headers = tableWrapperRef.current.querySelectorAll('th');

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
            tableWrapper.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableWrapper) {
                tableWrapper.removeEventListener('scroll', handleScroll);
            }
        };
    }, [fileData]);

    // Обновляем глобальные данные при изменении состояния
    useEffect(() => {
        if (fileData) {
            marksData = {
                columnIndicators,
                fileInfoId: fileData.file_info.id,
                isDataReady: isDataReady,
            };
        }
    }, [columnIndicators, fileData, isDataReady]);

    // Обработка перетаскивания указателя на колонку
    const handleDragOver = (
        e: React.DragEvent<HTMLElement>,
        columnIndex: number
    ) => {
        e.preventDefault();
        setCurrentDragColumn(columnIndex);
    };

    // Обработка отпускания указателя на колонке
    const handleDrop = (
        e: React.DragEvent<HTMLElement>,
        columnIndex: number
    ) => {
        e.preventDefault();
        const indicatorType = e.dataTransfer.getData(
            'indicatorType'
        ) as IndicatorType;

        // Проверяем совместимость типа колонки и указателя
        const columnType = columnTypes[columnIndex];
        if (isCompatible(indicatorType, columnType)) {
            assignIndicatorToColumn(indicatorType, columnIndex);
        } else {
            alert(
                `Указатель "${indicatorType}" не совместим с типом данных колонки "${columnType}"`
            );
        }

        setCurrentDragColumn(null);
    };

    // Проверка совместимости указателя и типа данных колонки
    const isCompatible = (
        indicatorType: IndicatorType,
        columnType: ColumnType
    ): boolean => {
        // Проверка совместимости типов
        switch (indicatorType) {
            case IndicatorType.CASE_ID:
            case IndicatorType.EVENT_ID:
                return (
                    columnType === ColumnType.NUMBER ||
                    columnType === ColumnType.STRING
                );
            case IndicatorType.TIMESTAMP:
                return columnType === ColumnType.DATETIME;
            default:
                return true; // Остальные указатели совместимы с любыми типами
        }
    };

    // Назначение указателя на колонку
    const assignIndicatorToColumn = (
        indicatorType: IndicatorType,
        columnIndex: number
    ) => {
        // Убираем этот указатель с других колонок, если он уже назначен
        const updatedIndicators = { ...columnIndicators };

        // Находим колонку, на которую уже назначен этот указатель
        const existingColumnIndex = Object.entries(updatedIndicators).find(
            ([_, type]) => type === indicatorType
        )?.[0];

        // Если указатель уже назначен на другую колонку, удаляем его оттуда
        if (existingColumnIndex) {
            delete updatedIndicators[Number(existingColumnIndex)];
        }

        // Назначаем указатель на новую колонку
        updatedIndicators[columnIndex] = indicatorType;
        setColumnIndicators(updatedIndicators);
    };

    // Удаление указателя с колонки
    const removeIndicatorFromColumn = (columnIndex: number) => {
        const updatedIndicators = { ...columnIndicators };
        delete updatedIndicators[columnIndex];
        setColumnIndicators(updatedIndicators);
    };

    // Проверка, назначен ли указатель на какую-либо колонку
    const isIndicatorAssigned = (indicatorType: IndicatorType): boolean => {
        return Object.values(columnIndicators).includes(indicatorType);
    };

    // Назначение указателя при клике на него
    const handleIndicatorClick = (indicatorType: IndicatorType) => {
        // Показываем модальное окно для выбора колонки или другой интерфейс
        console.log(`Выбран указатель: ${indicatorType}`);
    };

    // Отметить все оставшиеся колонки атрибутом события
    const markAllRemainingColumns = () => {
        if (!fileData) return;

        const updatedIndicators = { ...columnIndicators };
        fileData.columns.forEach((_, index) => {
            // Если колонка не имеет указателя, назначаем EVENT_ATTRIBUTE
            if (!updatedIndicators[index]) {
                updatedIndicators[index] = IndicatorType.EVENT_ATTRIBUTE;
            }
        });

        setColumnIndicators(updatedIndicators);
    };

    if (!fileData) {
        return <div className={styles.loading}>Загрузка данных...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Сформируйте журнал событий</h1>
            <p className={styles.subtitle}>
                Необходимо сформировать журнал событий. Последовательно
                перенесите каждый указатель на колонку, которая ему
                соответствует. По каждому указателю есть подсказка, а также не
                все из них обязательны для заполнения
            </p>

            <div className={styles.indicators}>
                {Object.values(IndicatorType).map((indicatorType) => (
                    <DraggableIndicator
                        key={indicatorType}
                        type={indicatorType}
                        isAssigned={isIndicatorAssigned(indicatorType)}
                        onClick={() => handleIndicatorClick(indicatorType)}
                    />
                ))}

                <button
                    className={styles.markAllBtn}
                    onClick={markAllRemainingColumns}
                >
                    Отметить все оставшиеся колонки атрибутом события
                </button>
            </div>

            <div className={styles.tableWrapper} ref={tableWrapperRef}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {fileData.columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`
                    ${getColumnClassByType(
                        columnTypes[index] || ColumnType.STRING,
                        column
                    )} 
                    ${currentDragColumn === index ? styles.columnDragOver : ''}
                    ${columnIndicators[index] ? styles.columnWithIndicator : ''}
                  `}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDrop={(e) => handleDrop(e, index)}
                                    onDragLeave={() =>
                                        setCurrentDragColumn(null)
                                    }
                                >
                                    <div className={styles.columnHeader}>
                                        <span>{column}</span>
                                        <div className={styles.columnType}>
                                            {columnTypes[index] ||
                                                ColumnType.STRING}
                                        </div>
                                        {columnIndicators[index] && (
                                            <div
                                                className={
                                                    styles.columnIndicator
                                                }
                                            >
                                                {columnIndicators[index]}
                                                <button
                                                    className={
                                                        styles.removeIndicator
                                                    }
                                                    onClick={() =>
                                                        removeIndicatorFromColumn(
                                                            index
                                                        )
                                                    }
                                                    title="Удалить указатель"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
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
