//scss
import '../App.scss';
//
//import options from './func/options';

export default function Start(props) {    

    const start = "Start";

    return (      
        <div ref={props.startRef} className='start'>
          <div className='start--scn center'>
            <div className='start--scn--btn' onClick={props.startInitFun}>
                <p className='start--scn--p center'>{start}</p>
            </div>
          </div>
        </div>
    );
}