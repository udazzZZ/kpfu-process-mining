import { type NodeProps, type Node, Handle, Position } from '@xyflow/react';
import type { FC } from 'react';

import styles from './EventNode.module.css';

type EventNodeProps = Node<
    {
        title: string;
        value: number;
    },
    'eventNode'
>;

export const EventNode: FC<NodeProps<EventNodeProps>> = ({
    data: { title, value },
}) => {
    return (
        <div className={styles.container}>
            <Handle type="target" position={Position.Top} />

            <div className={styles.text}>
                <p>{title}</p>
                <p>{`${value} пр`}</p>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};
