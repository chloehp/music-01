import './kb.scss';
import note from '../func/note';

export default function WKey(props) { 
    const noOctvNote = props.note.slice(0, 1);
    return (      
        <div className='w-key' 
        onMouseDown={() => note.attackNote(props.note)}
        onMouseUp={() => note.releaseNote(props.note)}
        onMouseLeave={() => note.releaseNote(props.note)}
        id={"kk-" + props.note}
        >
            <p className='key-note'>{noOctvNote}</p>
        </div>
    );
}