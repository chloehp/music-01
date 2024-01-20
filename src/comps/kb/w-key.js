import './kb.scss';

export default function WKey(props) { 
    
    return (      
        <div className='w-key' 
        onMouseDown={() => props.func(props.note, props.React.createRef())}
        >
            {props.note}
        </div>
    );
}