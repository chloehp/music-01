import options from '../func/options';
import './track.scss';
import { useRef } from 'react';

export default function Track(props) {    
    const trRef = useRef(); const trackH = useRef();        
    
    //printTrack();
    setTimeout(function(){
        if (trRef.current) {trRef.current.classList.add("track-rend")}
        else {console.log("track trref false"); return}
    }, 150);  
    
    /*
    setInterval(function () { // move to trackfill
        try {trackH.current.style.top = (24 + (options.trackhead * 15)) + "px"}
        catch {}
    }, options.beat64Len);
    */

    function changeTrack() {options.trackSelection = props.trackno}

    return (      
        <div ref={trRef} className='track' onMouseDown={changeTrack} id={"track" + props.trackno}>
            <div className='track--details'>
                <div className='track--details--x' onClick={() => props.removeFunc(props.trackno)}>+</div>
            </div>
            <div className='track--track'>    
                {/*<div ref={trackH} className='track--track--head'></div>*/}
                <div className='track--track--tofill'></div>
            </div>
        </div>
    );
}