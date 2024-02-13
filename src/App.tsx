import {useCallback, useState} from 'react';
import 'reactflow/dist/style.css';
import './app/nodes/CustomNode/custom-node.css';

import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    DefaultEdgeOptions,
    Edge,
    FitViewOptions,
    Node,
    NodeTypes,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlowProvider
} from 'reactflow';

import CustomNode from './app/nodes/CustomNode/CustomNode';
import CustomEdge from "./app/nodes/CustomNode/CustomEdge";

const initialNodes: Node[] = [
    {id: '1', type: 'custom', data: {label: 'Workiva', value: '', name: 'Workiva'}, position: {x: 0, y: 5}},
    {id: '2', type: 'custom', data: {label: 'World', value: '', name: 'World'}, position: {x: 300, y: 5}},
];

// const initialEdges: Edge[] = [{id: 'e1-2', source: '1', sourceHandle: 'a', targetHandle: 'b', target: '2'}];

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
};

const nodeTypes: NodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    'custom-edge': CustomEdge,
};

function Flow() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>([]);

    const getNodeById = (id: string | null) => {
        const node = nodes.find((node) => node.id === id);
        return node;
    };

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => {
            console.log("hello");
            setEdges((eds) => applyEdgeChanges(changes, eds))
        },
        [setEdges],
    );
    const onConnect: OnConnect = useCallback(
        (connection) => {
            const edge = {...connection, type: 'custom-edge'};
            setEdges((eds) => addEdge(edge, eds));
            setNodes((nds) => nds.map((node) => {
                if (node.id === connection.target) {
                    node.data = {
                        ...node.data,
                        value: getNodeById(connection.source)?.data.name,
                    };
                }

                return node;
            }))
        },
        [setEdges, setNodes],
    );

    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
            >
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}

export default () => (
    <ReactFlowProvider>
        <Flow/>
    </ReactFlowProvider>
);