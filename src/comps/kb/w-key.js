import './kb.scss';

export default function WKey(props) { 
    
    return (      
        <div className='w-key' onClick={() => props.func(props.note)}>
            {props.note}
        </div>
    );
}