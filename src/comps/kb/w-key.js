import './kb.scss';

export default function WKey(props) { 
    
    return (      
        <div className='w-key' 
        onMouseDown={() => props.keyPress(props.note)}
        onMouseUp={() => props.keyRelease(props.note)}
        onMouseLeave={() => props.keyRelease(props.note)}
        id={props.note}
        >
            {props.note}
        </div>
    );
}