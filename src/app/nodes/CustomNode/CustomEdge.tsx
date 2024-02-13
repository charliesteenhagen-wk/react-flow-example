import {BaseEdge, EdgeLabelRenderer, getBezierPath, Position, useReactFlow,} from 'reactflow';
import React from "react";

export default function CustomEdge({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY
                                   }: { id: any, sourceX: any, sourceY: any, targetX: any, targetY: any }) {
    const {setEdges} = useReactFlow();
    const [edgePath, labelX, labelY, offsetX, offsetY] = getBezierPath({
        sourceX: sourceX,
        sourceY: sourceY,
        sourcePosition: Position.Right,
        targetX: targetX,
        targetY: targetY,
        targetPosition: Position.Left,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath}/>
            <EdgeLabelRenderer>
                <button
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                        zIndex: '2'
                    }}
                    className="nodrag nopan"
                    onClick={() => {
                        setEdges((es) => es.filter((e) => e.id !== id));
                    }}
                >
                    x
                </button>
            </EdgeLabelRenderer>
        </>
    );
}
