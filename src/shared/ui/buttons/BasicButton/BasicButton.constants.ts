import type { Size } from './BasicButton.types';

export const stylesBySizes: Record<Size, React.CSSProperties> = {
    s: {
        padding: '4px 16px',
    },
    m: {
        padding: '8px 16px',
    },
    l: {
        padding: '16px 16px',
    },
};
