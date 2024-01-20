import './kb.scss';

export default function BKey(props) {    
    return (      
        <div className='b-key' onClick={() => props.func(props.note)}>
            {props.note}
        </div>
    );
}