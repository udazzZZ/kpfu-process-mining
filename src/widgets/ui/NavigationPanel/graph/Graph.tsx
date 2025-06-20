import React from "react";
import "./Graph.css"; 

export const Graph: React.FC = () => {
    return (
        <svg width="500" height="500">
            {/* пример "ручного" графа. можн заменить */}
            <circle cx="100" cy="50" r="20" fill="lightgray" />
            <circle cx="80" cy="120" r="20" fill="lightgray" />
            <circle cx="140" cy="120" r="20" fill="lightgray" />
            <line x1="100" y1="70" x2="80" y2="100" stroke="black" />
            <line x1="100" y1="70" x2="140" y2="100" stroke="black" />
        </svg>
    );
};
