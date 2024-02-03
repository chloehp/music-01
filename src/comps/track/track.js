import options from '../func/options';
import './track.scss';
import { useRef } from 'react';

//import trackFill from '../func/track-fill';

export default function Track(props) {    
    const trRef = useRef();        
    
    //printTrack();
    setTimeout(function(){
        if (trRef.current) {trRef.current.classList.add("track-rend")}
        else {console.log("track trref false"); return}
    }, 150);  

    function changeTrack() {options.trackSelection = props.trackno}

    return (      
        <div ref={trRef} className='track' id={"track" + props.trackno}>
            <div className='track--details' onClick={changeTrack}></div>
            <div className='track--track'></div>
        </div>
    );
}
//onClick={() => trackFill(props.trackno)}