import './kb.scss';

export default function WKey(props) { 
    const noOctvNote = props.note.slice(0, 1);
    return (      
        <div className='w-key' 
        onMouseDown={() => props.keyPress(props.note)}
        onMouseUp={() => props.keyRelease(props.note)}
        onMouseLeave={() => props.keyRelease(props.note)}
        id={"kk-" + props.note}
        >
            <p className='key-note'>{noOctvNote}</p>
        </div>
    );
}