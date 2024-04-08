import './scale-cob.scss';

export default function Scales(props) {    
    return (
        <div className='scales-area'>
            <div className='scales-area--scale--type'></div>
            <p className='scales-area--in'>in</p>
            <div className='scales-area--scale--note'></div>
            <div className='scales-area--dropdown'></div>
        </div>
    )
}