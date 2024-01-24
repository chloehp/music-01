import './kb.scss';

export default function BKey(props) {    
    return (      
        <div className='b-key' 
        onMouseDown={() => props.keyPress(props.note)}
        onMouseUp={() => props.keyRelease(props.note)}
        onMouseLeave={() => props.keyRelease(props.note)}
        id={props.note}
        >
            {props.note}
        </div>
    );
}