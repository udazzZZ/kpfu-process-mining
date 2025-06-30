import React, { useEffect } from 'react';
import './Graph.css';
import { MarkerType, ReactFlow, useReactFlow } from '@xyflow/react';
import { nodeTypes } from '../nodes/constants';
import { EventNode } from '../nodes/eventNode/EventNode';

const initX = 0;
const initY = 0;

const VERTICAL_STEP = 160;
const HORIZONTAL_STEP = 100;

const dashedEdgeStyle = {
    strokeDasharray: '5, 5', // Пунктир: 5px длина штриха, 5px промежуток
    stroke: 'var(--text-gray)', // Цвет линии
    strokeWidth: 2, // Толщина линии
};

const dashedBoldEdgeStyle = {
    strokeDasharray: '10, 5', // Пунктир: 5px длина штриха, 5px промежуток
    stroke: 'var(--text)', // Цвет линии
    strokeWidth: 5, // Толщина линии
};

const solidBoldEdgeStyle = {
    stroke: 'var(--text)', // Цвет линии
    strokeWidth: 5, // Толщина линии
};

const solidEdgeStyle = {
    stroke: 'var(--text-gray)', // Цвет линии
    strokeWidth: 2, // Толщина линии
};

const initialNodes = [
    {
        id: '1',
        position: { x: initX + 0, y: initY + 0 },
        data: { title: 'Начало', value: 339 },
        type: 'simpleNode',
    },
    {
        id: '2',
        position: { x: initX + -2 * HORIZONTAL_STEP, y: initY + VERTICAL_STEP },
        data: { title: 'РКД_Назначена', value: 339 },
        type: 'eventNode',
    },
    {
        id: '3',
        position: {
            x: initX + -2 * HORIZONTAL_STEP,
            y: initY + 2 * VERTICAL_STEP,
        },

        data: { title: 'РКД_В работе', value: 339 },
        type: 'eventNode',
    },
    {
        id: '4',
        position: {
            x: initX + -6 * HORIZONTAL_STEP,
            y: initY + 3 * VERTICAL_STEP,
        },
        data: { title: 'РКД_Возвращена', value: 339 },
        type: 'eventNode',
    },
    {
        id: '5',
        position: {
            x: initX + -4 * HORIZONTAL_STEP,
            y: initY + 3 * VERTICAL_STEP,
        },
        data: { title: 'КОНТ_Назначена', value: 339 },
        type: 'eventNode',
    },
    {
        id: '6',
        position: {
            x: initX + 2 * HORIZONTAL_STEP,
            y: initY + 3 * VERTICAL_STEP,
        },
        data: { title: 'СВК_Назначена', value: 339 },
        type: 'eventNode',
    },
    {
        id: '7',
        position: {
            x: initX + -4 * HORIZONTAL_STEP,
            y: initY + 4 * VERTICAL_STEP,
        },
        data: { title: 'КОНТ_В работе', value: 339 },
        type: 'eventNode',
    },
    {
        id: '8',
        position: {
            x: initX + 2 * HORIZONTAL_STEP,
            y: initY + 4 * VERTICAL_STEP,
        },
        data: { title: 'СВК_В работе', value: 339 },
        type: 'eventNode',
    },
    {
        id: '9',
        position: {
            x: initX - 4 * HORIZONTAL_STEP,
            y: initY + 5 * VERTICAL_STEP,
        },
        data: { title: 'КОНТ_Завершена', value: 339 },
        type: 'eventNode',
    },
    {
        id: '10',
        position: { x: initX, y: initY + 5 * VERTICAL_STEP },
        data: { title: 'СВК_Завершена', value: 339 },
        type: 'eventNode',
    },
    {
        id: '11',
        position: {
            x: initX - 2 * HORIZONTAL_STEP,
            y: initY + 6 * VERTICAL_STEP,
        },
        data: { title: 'РКД_Завершена', value: 339 },
        type: 'eventNode',
    },
    {
        id: '12',
        position: {
            x: initX + 1 * HORIZONTAL_STEP,
            y: initY + 8 * VERTICAL_STEP,
        },
        data: { title: 'Начало', value: 339 },
        type: 'simpleNode',
    },
];

const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        style: solidBoldEdgeStyle,
        animated: true,
    },
    { id: 'e2-3', source: '2', target: '3', style: solidBoldEdgeStyle },
    { id: 'e2-4', source: '2', target: '4', style: solidEdgeStyle },
    { id: 'e3-4', source: '3', target: '4', style: solidEdgeStyle },
    {
        id: 'e1-6',
        source: '1',
        target: '6',
        style: solidEdgeStyle,
        animated: true,
    },
    { id: 'e3-5', source: '3', target: '5', style: solidEdgeStyle },
    { id: 'e3-6', source: '3', target: '6' },
    { id: 'e3-11', source: '3', target: '11', style: solidBoldEdgeStyle },
    { id: 'e5-7', source: '5', target: '7', style: solidEdgeStyle },
    { id: 'e6-8', source: '6', target: '8', style: solidEdgeStyle },
    { id: 'e7-9', source: '7', target: '9', style: solidEdgeStyle },
    { id: 'e8-10', source: '8', target: '10', style: solidEdgeStyle },
    { id: 'e9-11', source: '9', target: '11', style: solidEdgeStyle },
    { id: 'e10-11', source: '10', target: '11', style: solidEdgeStyle },
    {
        id: 'e10-12',
        source: '10',
        target: '12',
        style: solidEdgeStyle,
        animated: true,
    },
    {
        id: 'e11-12',
        source: '11',
        target: '12',
        style: solidBoldEdgeStyle,
        animated: true,
    },
];

export const Graph: React.FC = () => {
    const { fitView } = useReactFlow();

    useEffect(() => {
        fitView();
    }, []);

    return (
        <ReactFlow
            edges={initialEdges}
            nodes={initialNodes}
            defaultEdgeOptions={{
                markerEnd: {
                    type: MarkerType.Arrow,
                },
            }}
            nodeTypes={nodeTypes}
        ></ReactFlow>
    );
};
