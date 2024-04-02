//scss
import '../App.scss';
//
//import options from './func/options';

export default function Start(props) {    

    const start = "SNART (snail start)";

    return (      
        <div ref={props.startRef} className='start'>
          <div className='start--scn center'>
            <div className='start--scn--btn' onClick={props.startInitFun}>
                <div className='start--scn--p center'>
                  <h1>SNART</h1>
                  <p>(snail start)</p>
                </div>
            </div>
          </div>
        </div>
    );
}