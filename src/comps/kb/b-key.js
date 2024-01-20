import './kb.scss';

export default function BKey(props) {    
    return (      
        <div className='b-key' 
        onMouseDown={() => props.func(props.note, props.React.createRef())}
        >
            {props.note}
        </div>
    );
}