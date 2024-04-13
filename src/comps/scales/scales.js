import './scale-cob.scss';

export default function Scales(props) {   

    return (
        <div className='scales-area' title='Scales'>
            <div className='scales-area--scale--type' id='scale-type'></div>
            <p className='scales-area--in'>in</p>
            <div className='scales-area--scale--note' id='scale-note'></div>
        </div>
    )
}