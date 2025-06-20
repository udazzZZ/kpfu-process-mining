import clsx from 'clsx';

export const createDiv = (containerClassName?: string) => {
    const div = document.createElement('div');

    div.className = clsx(containerClassName);

    return div;
};
