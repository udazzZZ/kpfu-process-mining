import { type NodeProps, type Node, Handle, Position } from '@xyflow/react';
import type { FC } from 'react';

import styles from './SimpleNode.module.css';

type SimpleNodeProps = Node<
    {
        title: string;
        value: number;
    },
    'simpleNode'
>;

export const SimpleNode: FC<NodeProps<SimpleNodeProps>> = ({
    data: { title, value },
}) => {
    return (
        <div className={styles.container}>
            <Handle type="target" position={Position.Top} />

            <p>{title}</p>
            <p>{`${value} пр`}</p>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};
