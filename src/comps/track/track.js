import './track.scss';
import { useRef } from 'react';

import options from '../func/options';

export default function Track(props) {    
    const trRef = useRef();    

    setTimeout(function(){
        if (trRef.current) {trRef.current.classList.add("track-rend")}
        else {console.log("track trref false")}

        
        if (props.track === options.trackSelection){
            
        }
    }, 150);    


    return (      
        <div ref={trRef} className='track'>
            <div className='track--details'></div>
            <div  className='track--track'></div>
        </div>
    );
}