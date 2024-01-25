import './kb.scss';

export default function BKey(props) {    
    const noOctvNote = props.note.slice(0, 2);
    return (      
        <div className='b-key' 
        onMouseDown={() => props.keyPress(props.note)}
        onMouseUp={() => props.keyRelease(props.note)}
        onMouseLeave={() => props.keyRelease(props.note)}
        id={"kk-" + props.note}
        >
            <p className='key-note'>{noOctvNote}</p>
        </div>
    );
}