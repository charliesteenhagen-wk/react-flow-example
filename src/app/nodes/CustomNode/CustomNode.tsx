import {useCallback} from 'react';
import {Handle, NodeProps, Position} from 'reactflow';

type NodeData = {
    value: string;
    name: string;
};

function MyCustomNode({data}: NodeProps<NodeData>) {

    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    return <div className="custom-node">
        <div>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" onChange={onChange} className="nodrag" placeholder='name' value={data.name}/>
            <label htmlFor="value">Value:</label>
            <input id="value" name="name" onChange={onChange} className="nodrag" placeholder='value'
                   value={data.value}/>
        </div>
        <Handle
            type="source"
            position={Position.Right}
            id="a"
            style={{top: 32, background: '#555'}}
        />
        <Handle type="target" position={Position.Left} id="b" style={{top: 67, background: '#555'}}/>
    </div>;

}

export default MyCustomNode